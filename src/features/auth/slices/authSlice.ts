// src/features/auth/slices/authSlice.ts
// ─────────────────────────────────────────────────────────────────────────────
// Adapted for cookie-based refresh token flow:
//   • refreshToken is an HttpOnly cookie — never stored in Redux/localStorage
//   • Only accessToken is persisted (needed to bootstrap auth & for /me call)
//   • setTokens() updates only accessToken (refresh token rotation via cookie)
//   • initializeAuth() bootstraps from persisted accessToken only
// ─────────────────────────────────────────────────────────────────────────────

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { User } from "../../../shared/types/user.types";

// ── State ─────────────────────────────────────────────────────────────────────

interface AuthState {
  user: User | null;
  accessToken: string | null; // refreshToken lives in HttpOnly cookie — not here
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  isLoading: false,
  error: null,
};

// ── localStorage helpers ───────────────────────────────────────────────────────
// Only the accessToken is persisted — the refresh token cookie is handled by
// the browser automatically (HttpOnly, sent on every request to the API origin).

export const TOKEN_KEY = "commutr_access_token";

export const persistAccessToken = (accessToken: string): void => {
  try {
    localStorage.setItem(TOKEN_KEY, accessToken);
  } catch {
    // SSR / incognito — silently swallow
  }
};

export const clearPersistedToken = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEY);
  } catch {
    // silently swallow
  }
};

export const readPersistedToken = (): string | null => {
  try {
    return localStorage.getItem(TOKEN_KEY);
  } catch {
    return null;
  }
};

// ── Slice ─────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * setCredentials — called after a successful LOGIN response.
     * Stores user + accessToken. RefreshToken arrives as a cookie automatically.
     *
     * After dispatching, call persistAccessToken() in your hook:
     *   dispatch(setCredentials({ user, accessToken }));
     *   persistAccessToken(accessToken);
     */
    setCredentials: (
      state,
      action: PayloadAction<{ user: User; accessToken: string }>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.error = null;
      state.isLoading = false;
    },

    /**
     * setTokens — called by baseQueryWithReauth after a silent refresh.
     * Only updates accessToken; new refresh token cookie is set by server.
     *
     * After dispatching, call persistAccessToken() in baseQueryWithReauth:
     *   api.dispatch(setTokens(newAccessToken));
     *   persistAccessToken(newAccessToken);
     */
    setTokens: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },

    /**
     * logout — clears ALL auth state.
     * After dispatching, call clearPersistedToken():
     *   dispatch(logout());
     *   clearPersistedToken();
     */
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.error = null;
      state.isLoading = false;
    },

    /**
     * initializeAuth — bootstraps accessToken from localStorage on app start.
     * The user object is then re-fetched via useGetCurrentUserQuery.
     *
     * Usage (once, before routes render):
     *   const token = readPersistedToken();
     *   if (token) dispatch(initializeAuth(token));
     */
    initializeAuth: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },

    updateUser: (state, action: PayloadAction<Partial<User>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const {
  setCredentials,
  setTokens,
  logout,
  initializeAuth,
  updateUser,
  setLoading,
  setError,
} = authSlice.actions;

export default authSlice.reducer;

// ── Selectors ─────────────────────────────────────────────────────────────────

export const selectIsAuthenticated = (state: { auth: AuthState }) =>
  !!state.auth.accessToken;

export const selectCurrentUser = (state: { auth: AuthState }) =>
  state.auth.user;

export const selectAccessToken = (state: { auth: AuthState }) =>
  state.auth.accessToken;

export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
