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
// import { clearRefreshToken } from "../../../shared/lib/api/baseQueryWithReauth";

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
  // Runs once on app start. Puts the persisted token into Redux so:
  //   (a) prepareHeaders sends it on the very first RTK Query call
  //   (b) useGetCurrentUserQuery below can skip: false and re-fetch the user
  useEffect(() => {
    const token = readPersistedToken();
    if (token) {
      dispatch(initializeAuth(token));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Re-hydrate user after bootstrap (page reload) ─────────────────────────
  // Skips when: no accessToken yet OR user already loaded in Redux
  const { data: currentUserData, isLoading: isUserLoading } =
    useGetCurrentUserQuery(undefined, {
      skip: !accessToken || !!user,
    });

  // When /me returns data, push user into Redux
  useEffect(() => {
    if (currentUserData && accessToken) {
      dispatch(
        setCredentials({
          user: currentUserData,
          accessToken,
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
        // refreshToken arrives ONLY as an HttpOnly Set-Cookie header — invisible to JS
        // Browser stores it automatically and will send it on future requests

        // 1. Push user + accessToken into Redux
        dispatch(
          setCredentials({
            user: response.user,
            accessToken: response.accessToken,
          }),
        );

        // 2. Persist accessToken to localStorage so page reloads don't log out
        persistAccessToken(response.accessToken);

        // 3. Navigate to dashboard
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
      // Tell server to invalidate + clear the refreshToken cookie via Set-Cookie
      await logoutMutation().unwrap();
    } catch {
      // Even if server call fails, clear local state
    } finally {
      dispatch(logoutAction());
      clearPersistedToken();
      // clearRefreshToken(); // noop — just for compatibility
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
