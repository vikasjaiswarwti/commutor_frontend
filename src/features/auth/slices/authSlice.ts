// src/features/auth/slices/authSlice.ts
// ─────────────────────────────────────────────────────────────────────────────
// Fixes applied:
//   1. Removed direct localStorage writes from reducers (side-effect violation)
//   2. Added refreshToken to state (required by baseQueryWithReauth mutex flow)
//   3. setTokens() — called by baseQueryWithReauth after silent refresh
//   4. logout() — single action that clears everything (replaces clearCredentials)
//   5. initializeAuth now accepts tokens as payload (no localStorage inside reducer)
//   6. All localStorage I/O via exported helpers called OUTSIDE reducers
//   7. isAuthenticated derived via selector from accessToken (not stored as bool)
// ─────────────────────────────────────────────────────────────────────────────

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

import type { User } from "../../../shared/types/user.types";
import type { AuthTokens } from "../types/auth.types";

// ── State ─────────────────────────────────────────────────────────────────────

interface AuthState {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isLoading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  accessToken: null,
  refreshToken: null,
  isLoading: false,
  error: null,
};

// ── localStorage helpers (called OUTSIDE reducers — no side-effects in Redux) ─

export const TOKEN_KEYS = {
  ACCESS: "commutr_access_token",
  REFRESH: "commutr_refresh_token",
} as const;

export const persistTokens = (tokens: AuthTokens): void => {
  try {
    localStorage.setItem(TOKEN_KEYS.ACCESS, tokens.accessToken);
    localStorage.setItem(TOKEN_KEYS.REFRESH, tokens.refreshToken);
  } catch {
    // SSR / incognito — silently swallow
  }
};

export const clearPersistedTokens = (): void => {
  try {
    localStorage.removeItem(TOKEN_KEYS.ACCESS);
    localStorage.removeItem(TOKEN_KEYS.REFRESH);
  } catch {
    // silently swallow
  }
};

export const readPersistedTokens = (): AuthTokens | null => {
  try {
    const accessToken = localStorage.getItem(TOKEN_KEYS.ACCESS);
    const refreshToken = localStorage.getItem(TOKEN_KEYS.REFRESH);
    if (accessToken && refreshToken) return { accessToken, refreshToken };
  } catch {
    // silently swallow
  }
  return null;
};

// ── Slice ─────────────────────────────────────────────────────────────────────

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * setCredentials — called after a successful LOGIN.
     * Sets user + both tokens in state.
     *
     * After dispatching, call persistTokens() in your hook/thunk:
     *   dispatch(setCredentials({ user, accessToken, refreshToken }));
     *   persistTokens({ accessToken, refreshToken });
     */
    setCredentials: (
      state,
      action: PayloadAction<{ user: User } & AuthTokens>,
    ) => {
      state.user = action.payload.user;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.error = null;
      state.isLoading = false;
    },

    /**
     * setTokens — called ONLY by baseQueryWithReauth after a silent refresh.
     * Updates both tokens without touching the user object.
     *
     * After dispatching, call persistTokens() in baseQueryWithReauth:
     *   api.dispatch(setTokens({ accessToken, refreshToken }));
     *   persistTokens({ accessToken, refreshToken });
     */
    setTokens: (state, action: PayloadAction<AuthTokens>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },

    /**
     * logout — clears ALL auth state.
     * After dispatching, call clearPersistedTokens():
     *   api.dispatch(logout());
     *   clearPersistedTokens();
     */
    logout: (state) => {
      state.user = null;
      state.accessToken = null;
      state.refreshToken = null;
      state.error = null;
      state.isLoading = false;
    },

    /**
     * initializeAuth — bootstraps state from persisted tokens on app start.
     * Read tokens first, then dispatch if found. User is re-fetched via
     * useGetCurrentUserQuery (skip: !accessToken || !!user).
     *
     * Usage in App.tsx (once, before routes render):
     *   const persisted = readPersistedTokens();
     *   if (persisted) dispatch(initializeAuth(persisted));
     */
    initializeAuth: (state, action: PayloadAction<AuthTokens>) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
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

export const selectRefreshToken = (state: { auth: AuthState }) =>
  state.auth.refreshToken;

export const selectAuthError = (state: { auth: AuthState }) => state.auth.error;

export const selectAuthLoading = (state: { auth: AuthState }) =>
  state.auth.isLoading;
