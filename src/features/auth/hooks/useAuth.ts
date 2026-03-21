// src/features/auth/hooks/useAuth.ts
// ─────────────────────────────────────────────────────────────────────────────
// Fixes applied:
//   1. initializeAuth now receives payload (readPersistedTokens) — not a void call
//   2. Uses typed RootState selector instead of (state: any)
//   3. isAuthenticated derived from accessToken (consistent with new slice)
//   4. setError imported correctly (was missing from original import)
//   5. persistTokens / clearPersistedTokens called here — not inside reducers
//   6. Replaced token with accessToken / refreshToken to match new slice shape
//   7. login renamed to handleLogin consistently — export as `login` for API compat
// ─────────────────────────────────────────────────────────────────────────────

import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  useLoginMutation,
  useLogoutMutation,
  useGetCurrentUserQuery,
} from "../services/authApi";
import {
  setCredentials,
  setError,
  logout as logoutAction,
  initializeAuth,
  persistTokens,
  clearPersistedTokens,
  readPersistedTokens,
  selectIsAuthenticated,
  selectCurrentUser,
  selectAccessToken,
  selectRefreshToken,
  selectAuthError,
  selectAuthLoading,
} from "../slices/authSlice";

import { useAppDispatch } from "../../../app/store";

import type { LoginCredentials } from "../types/auth.types";

import { ROUTES } from "../../../shared/constants/app.constants";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ── RTK Query mutations ────────────────────────────────────────────────────
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  // ── Typed selectors (no more `state: any`) ────────────────────────────────
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const accessToken = useSelector(selectAccessToken);
  const refreshToken = useSelector(selectRefreshToken);
  const error = useSelector(selectAuthError);
  const isSliceLoading = useSelector(selectAuthLoading);

  // ── Bootstrap: hydrate tokens from localStorage on first mount ────────────
  // This runs once. If tokens exist, dispatch initializeAuth so RTK Query
  // can immediately use the access token (via baseQueryWithReauth prepareHeaders).
  // The getCurrentUser query below then re-fetches the user object.
  useEffect(() => {
    const persisted = readPersistedTokens();
    if (persisted) {
      dispatch(initializeAuth(persisted));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — runs once on mount only

  // ── Re-hydrate user after bootstrap ───────────────────────────────────────
  // Skip if: no accessToken yet (not logged in / not bootstrapped yet)
  //          OR user is already in Redux (already fetched)
  const { isLoading: isUserLoading } = useGetCurrentUserQuery(undefined, {
    skip: !accessToken || !!user,
  });
  // Note: authApi's getCurrentUser endpoint dispatches setCredentials on success
  // via the onQueryStarted lifecycle — see authApi.ts for that wiring.

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        const response = await loginMutation(credentials).unwrap();

        // 1. Update Redux state
        dispatch(
          setCredentials({
            user: response.user,
            accessToken: response.accessToken,
            refreshToken: response.refreshToken,
          }),
        );

        // 2. Persist to localStorage (side-effect outside reducer)
        persistTokens({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
        });

        navigate(ROUTES.DASHBOARD);
      } catch (err: unknown) {
        const message =
          (err as { data?: { message?: string } })?.data?.message ||
          "Invalid username or password";
        dispatch(setError(message));
        throw err; // re-throw so LoginPage can catch if needed
      }
    },
    [dispatch, loginMutation, navigate],
  );

  // ── Logout ─────────────────────────────────────────────────────────────────
  const logout = useCallback(async () => {
    try {
      // Best-effort server logout (invalidate refresh token server-side)
      await logoutMutation().unwrap();
    } catch {
      // Even if server logout fails, we clear local state
    } finally {
      // 1. Clear Redux state
      dispatch(logoutAction());

      // 2. Clear localStorage (side-effect outside reducer)
      clearPersistedTokens();

      navigate(ROUTES.LOGIN);
    }
  }, [dispatch, logoutMutation, navigate]);

  return {
    user,
    isAuthenticated,
    isLoading: isLoginLoading || isUserLoading || isSliceLoading,
    error,
    accessToken,
    refreshToken,
    login,
    logout,
  };
};
