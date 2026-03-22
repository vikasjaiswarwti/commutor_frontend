// src/features/auth/hooks/useAuth.ts
// ─────────────────────────────────────────────────────────────────────────────
// Synced with cookie-based refresh token flow:
//   • Login field is `userName` (not `email`)
//   • No refreshToken in Redux state — it lives in an HttpOnly cookie
//   • storeRefreshToken() saves the refresh token value to sessionStorage
//     so baseQueryWithReauth can send it in the body (your API requires this)
//   • initializeAuth() bootstraps from localStorage accessToken only
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
  persistAccessToken,
  clearPersistedToken,
  readPersistedToken,
  selectIsAuthenticated,
  selectCurrentUser,
  selectAccessToken,
  selectAuthError,
  selectAuthLoading,
} from "../slices/authSlice";
import {
  storeRefreshToken,
  clearRefreshToken,
} from "../../../shared/lib/api/baseQueryWithReauth";

import { useAppDispatch } from "../../../app/store";
import type { LoginCredentials } from "../types/auth.types";
import { ROUTES } from "../../../shared/constants/app.constants";

export const useAuth = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // ── RTK Query mutations ───────────────────────────────────────────────────
  const [loginMutation, { isLoading: isLoginLoading }] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  // ── Selectors ─────────────────────────────────────────────────────────────
  const user = useSelector(selectCurrentUser);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const accessToken = useSelector(selectAccessToken);
  const error = useSelector(selectAuthError);
  const isSliceLoading = useSelector(selectAuthLoading);

  // ── Bootstrap: hydrate accessToken from localStorage on first mount ───────
  // Runs once. If a persisted token exists, put it in Redux so:
  //   (a) prepareHeaders sends it immediately on any RTK Query call
  //   (b) useGetCurrentUserQuery below can skip: false and fetch the user
  useEffect(() => {
    const token = readPersistedToken();
    if (token) {
      dispatch(initializeAuth(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Re-hydrate user after bootstrap ──────────────────────────────────────
  // Skips if: no accessToken yet (not logged in) OR user already loaded.
  const { data: currentUserData, isLoading: isUserLoading } =
    useGetCurrentUserQuery(undefined, {
      skip: !accessToken || !!user,
    });

  // Wire up: when /me returns, store the user in Redux
  useEffect(() => {
    if (currentUserData && accessToken) {
      dispatch(
        setCredentials({
          user: currentUserData,
          accessToken, // already in state — just keeping setCredentials happy
        }),
      );
    }
  }, [currentUserData, accessToken, dispatch]);

  // ── Login ─────────────────────────────────────────────────────────────────
  const handleLogin = useCallback(
    async (credentials: LoginCredentials) => {
      try {
        const response = await loginMutation(credentials).unwrap();
        // response = { user, accessToken, roles }
        // refreshToken arrived as an HttpOnly cookie via Set-Cookie header

        // 1. Update Redux
        dispatch(
          setCredentials({
            user: response.user,
            accessToken: response.accessToken,
          }),
        );

        // 2. Persist accessToken to localStorage (survives page reload)
        persistAccessToken(response.accessToken);

        // 3. If your server ALSO returns the refreshToken value in the body
        //    (needed because your curl sends it in the body, not just cookie),
        //    store it in sessionStorage for baseQueryWithReauth to use.
        //    Check your actual login response — add this field to LoginResponse
        //    type if present:
        //
        //    if ((response as any).refreshToken) {
        //      storeRefreshToken((response as any).refreshToken);
        //    }
        //
        // If the server reads it ONLY from the cookie (body not needed),
        // remove the body: line in baseQueryWithReauth and skip this.

        navigate(ROUTES.DASHBOARD);
      } catch (err: unknown) {
        const message =
          (err as { data?: { message?: string } })?.data?.message ||
          "Invalid username or password";
        dispatch(setError(message));
        throw err;
      }
    },
    [dispatch, loginMutation, navigate],
  );

  // ── Logout ────────────────────────────────────────────────────────────────
  const handleLogout = useCallback(async () => {
    try {
      // Best-effort: tell server to invalidate the refresh token cookie
      await logoutMutation().unwrap();
    } catch {
      // Even on failure, clear local state
    } finally {
      dispatch(logoutAction());
      clearPersistedToken();
      clearRefreshToken();
      navigate(ROUTES.LOGIN);
    }
  }, [dispatch, logoutMutation, navigate]);

  return {
    user,
    isAuthenticated,
    isLoading: isLoginLoading || isUserLoading || isSliceLoading,
    error,
    accessToken,
    handleLogin,
    handleLogout,
  };
};
