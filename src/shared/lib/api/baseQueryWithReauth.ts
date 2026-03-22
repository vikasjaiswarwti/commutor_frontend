// src/shared/lib/api/baseQueryWithReauth.ts
// ─────────────────────────────────────────────────────────────────────────────
// Cookie-based refresh token flow:
//
//   • Login response sets an HttpOnly refresh token cookie automatically.
//   • When a 401 is hit, we call POST /api/v1/Auth/refresh-token with:
//       - Authorization: Bearer <expired accessToken>   (in header)
//       - { refreshToken: "<value>" }                   (in body — from cookie)
//
//   IMPORTANT: The refresh token value itself is in an HttpOnly cookie, so
//   JavaScript cannot read it directly. The server must either:
//     (a) Accept credentials: "include" and read the cookie server-side, OR
//     (b) Return the refresh token value in the login body so we can store it.
//
//   Looking at your curl example, the refresh token IS sent in the request body
//   (not just via cookie), which means the server must be providing it somewhere
//   readable. Two strategies are handled below — see STRATEGY comment.
//
//   Mutex prevents the thundering-herd problem:
//     10 concurrent 401s → only 1 refresh call → others wait & retry.
// ─────────────────────────────────────────────────────────────────────────────

import {
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

import type { RootState } from "../../../app/store";
import {
  setTokens,
  logout,
  persistAccessToken,
  clearPersistedToken,
} from "../../../features/auth/slices/authSlice";

import type { RefreshTokenResponse } from "../../../features/auth/types/auth.types";
import { API_BASE_URL } from "../../constants/app.constants";

// ── STRATEGY ──────────────────────────────────────────────────────────────────
// Your curl sends refreshToken in the body AND the expired accessToken in the
// Authorization header. This means the server gave you the refreshToken value
// somewhere — most likely in the login response body (even if not in the type).
//
// We store it in sessionStorage (not Redux) so it's not XSS-accessible via JS
// bundle analysis, but is still available across the tab session.
//
// If your server ONLY reads it from the HttpOnly cookie (no body needed),
// remove the REFRESH_TOKEN_KEY storage and just use credentials: "include".
// ─────────────────────────────────────────────────────────────────────────────

const REFRESH_TOKEN_KEY = "commutr_rt"; // sessionStorage — tab-scoped

export const storeRefreshToken = (token: string) => {
  try {
    sessionStorage.setItem(REFRESH_TOKEN_KEY, token);
  } catch {
    /* noop */
  }
};

export const getStoredRefreshToken = (): string | null => {
  try {
    return sessionStorage.getItem(REFRESH_TOKEN_KEY);
  } catch {
    return null;
  }
};

export const clearRefreshToken = () => {
  try {
    sessionStorage.removeItem(REFRESH_TOKEN_KEY);
  } catch {
    /* noop */
  }
};

// ── Mutex — one instance for the entire app lifetime ─────────────────────────
const refreshMutex = new Mutex();

// ── Raw base query — attaches Bearer token from Redux, sends cookies ──────────
const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include", // sends HttpOnly cookies automatically on every request
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// ── Authenticated base query with silent refresh ──────────────────────────────
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // 1. Attempt the request normally
  let result = await rawBaseQuery(args, api, extraOptions);

  // Pass through anything that isn't a 401
  if (result.error?.status !== 401) {
    return result;
  }

  // ── 2. Got a 401 ─────────────────────────────────────────────────────────

  if (refreshMutex.isLocked()) {
    // Another concurrent request is already refreshing.
    // Wait for it to finish, then retry with the new token already in Redux.
    await refreshMutex.waitForUnlock();
    result = await rawBaseQuery(args, api, extraOptions);
    return result;
  }

  // ── 3. We are the first 401 — acquire lock and refresh ───────────────────
  const release = await refreshMutex.acquire();

  try {
    const expiredAccessToken = (api.getState() as RootState).auth.accessToken;
    const refreshToken = getStoredRefreshToken();

    if (!expiredAccessToken) {
      // Nothing to refresh with
      api.dispatch(logout());
      clearPersistedToken();
      clearRefreshToken();
      return result;
    }

    // Build refresh request:
    //   - Authorization header carries the EXPIRED access token (your API requires this)
    //   - Body carries the refresh token value
    //   - credentials: "include" also sends the HttpOnly cookie automatically
    const refreshResult = await rawBaseQuery(
      {
        url: "api/v1/Auth/refresh-token",
        method: "POST",
        // Include refresh token in body if available (your curl shows this pattern)
        // If server reads it only from cookie, you can remove the body entirely
        body: refreshToken ? { refreshToken } : undefined,
        // Override headers to send the EXPIRED token (rawBaseQuery would send
        // the same expired token from state anyway — this makes it explicit)
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${expiredAccessToken}`,
        },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // ✅ Refresh succeeded
      const { accessToken: newAccessToken } =
        refreshResult.data as RefreshTokenResponse;

      // Update Redux with new access token
      api.dispatch(setTokens(newAccessToken));

      // Persist new access token to localStorage
      persistAccessToken(newAccessToken);

      // Note: if server rotates the refresh token, the new one arrives via
      // Set-Cookie and is updated automatically by the browser — nothing to do.

      // Retry the original request — prepareHeaders now picks up newAccessToken
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // ❌ Refresh failed — session is unrecoverable, log out
      api.dispatch(logout());
      clearPersistedToken();
      clearRefreshToken();
    }
  } finally {
    // CRITICAL: always release — even on throw — or waiting requests deadlock.
    release();
  }

  return result;
};
