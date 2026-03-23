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

// ── Compatibility exports ─────────────────────────────────────────────────────
export const clearRefreshToken = () => {
  /* noop — server clears via Set-Cookie */
};
export const storeRefreshToken = (_token: string) => {
  /* noop — HttpOnly cookie */
};

// ── Mutex ─────────────────────────────────────────────────────────────────────
const refreshMutex = new Mutex();

// ── Raw base query ────────────────────────────────────────────────────────────
// API_BASE_URL is "" so fetchBaseQuery uses relative URLs → same-origin → proxy
const rawBaseQuery = fetchBaseQuery({
  baseUrl: API_BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

// ── Standalone refresh using native fetch ─────────────────────────────────────
// Uses a relative URL (/api/...) so Vite proxies it → same-origin →
// browser attaches the HttpOnly SameSite=Strict cookie automatically.
const callRefreshToken = async (
  expiredAccessToken: string,
): Promise<RefreshTokenResponse | null> => {
  try {
    const response = await fetch("/api/v1/Auth/refresh-token", {
      method: "POST",
      credentials: "include", // sends HttpOnly cookie (same-origin via proxy)
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${expiredAccessToken}`,
      },
      // No body — backend reads refreshToken from Request.Cookies["refreshToken"]
    });

    if (!response.ok) return null;

    return (await response.json()) as RefreshTokenResponse;
  } catch {
    return null;
  }
};

// ── Authenticated base query with silent refresh ──────────────────────────────
export const baseQueryWithReauth = (async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  if (result.error?.status !== 401) {
    return result;
  }

  if (refreshMutex.isLocked()) {
    await refreshMutex.waitForUnlock();
    return await rawBaseQuery(args, api, extraOptions);
  }

  const release = await refreshMutex.acquire();

  try {
    const expiredAccessToken = (api.getState() as RootState).auth.accessToken;

    if (!expiredAccessToken) {
      api.dispatch(logout());
      clearPersistedToken();
      return result;
    }

    const refreshData = await callRefreshToken(expiredAccessToken);

    if (refreshData?.accessToken) {
      // ✅ Refresh succeeded
      api.dispatch(setTokens(refreshData.accessToken));
      persistAccessToken(refreshData.accessToken);
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // ❌ Refresh failed
      api.dispatch(logout());
      clearPersistedToken();
    }
  } finally {
    release();
  }

  return result;
}) as BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError>;
