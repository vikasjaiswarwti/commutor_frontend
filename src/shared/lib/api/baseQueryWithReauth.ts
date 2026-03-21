// src/shared/lib/api/baseQueryWithReauth.ts
// ─────────────────────────────────────────────────────────────────────────────
// RTK Query base query with silent token refresh guarded by a Mutex.
//
// Problem without mutex:
//   10 concurrent requests all get 401 → 10 parallel refresh calls →
//   first one succeeds, the other 9 fail (refresh token already rotated) →
//   user gets logged out even though their session was valid.
//
// Solution:
//   • First 401 acquires the Mutex lock and refreshes.
//   • All subsequent 401s see the lock is taken, wait for it to release,
//     then simply retry their original request with the new token in state.
//   • Only ONE refresh ever happens per expiry cycle.
//
// Install peer dep: npm install async-mutex
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
  persistTokens,
  clearPersistedTokens,
} from "../../../features/auth/slices/authSlice";

import type { AuthTokens } from "../../../features/auth/types/auth.types";
import { API_BASE_URL } from "../../constants/app.constants";

// ── One shared Mutex for the entire app lifetime ──────────────────────────────
// Module-level singleton — survives hot reloads in dev only if this module
// is not itself reloaded. In prod this is never an issue.
const refreshMutex = new Mutex();

// ── Base query — attaches Bearer token from Redux state ───────────────────────
const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
  // Uncomment if your refresh token is sent as an HttpOnly cookie instead:
  // credentials: "include",
});

// ── Authenticated base query with silent refresh ───────────────────────────────
export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  // ── 1. Attempt the request normally ─────────────────────────────────────────
  let result = await rawBaseQuery(args, api, extraOptions);

  // Only intercept 401 — all other errors pass through untouched
  if (result.error?.status !== 401) {
    return result;
  }

  // ── 2. Got a 401 — need to refresh ──────────────────────────────────────────

  if (refreshMutex.isLocked()) {
    // Another request is already refreshing.
    // Wait until it finishes (lock released), then retry.
    // By then, setTokens() will have updated the accessToken in Redux,
    // so rawBaseQuery's prepareHeaders will pick up the new token automatically.
    await refreshMutex.waitForUnlock();
    result = await rawBaseQuery(args, api, extraOptions);
    return result;
  }

  // ── 3. We are the first 401 — acquire lock and refresh ──────────────────────
  const release = await refreshMutex.acquire();

  try {
    const refreshToken = (api.getState() as RootState).auth.refreshToken;

    if (!refreshToken) {
      // No refresh token stored — session is unrecoverable
      api.dispatch(logout());
      clearPersistedTokens();
      return result;
    }

    // Call the refresh endpoint
    // If your refresh token is in an HttpOnly cookie, omit `body` and add
    // `credentials: "include"` to rawBaseQuery above instead.
    const refreshResult = await rawBaseQuery(
      {
        url: "api/v1/Auth/refresh-token",
        method: "POST",
        body: { refreshToken },
      },
      api,
      extraOptions,
    );

    if (refreshResult.data) {
      // ✅ Refresh succeeded
      const tokens = refreshResult.data as AuthTokens;

      // Update Redux state (used by all subsequent prepareHeaders calls)
      api.dispatch(setTokens(tokens));

      // Persist new tokens to localStorage (side-effect — outside reducer)
      persistTokens(tokens);

      // Retry the original request — prepareHeaders now has the new token
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // ❌ Refresh failed (invalid/expired refresh token)
      // Log the user out and clear everything
      api.dispatch(logout());
      clearPersistedTokens();
    }
  } finally {
    // CRITICAL: always release, even on throw — otherwise all waiting
    // requests will deadlock forever.
    release();
  }

  return result;
};
