// src/features/auth/hooks/useAuth.ts
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation, useLogoutMutation } from "../services/authApi";

import { setCredentials, clearCredentials } from "../slices/authSlice";
import type { LoginCredentials } from "../types/auth.types";

export const useAuth = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loginMutation] = useLoginMutation();
  const [logoutMutation] = useLogoutMutation();

  const { user, isAuthenticated, isLoading } = useSelector(
    (state: any) => state.auth,
  );

  const login = useCallback(

    async (credentials: LoginCredentials) => {
      try {
        const response = await loginMutation(credentials).unwrap();
        dispatch(
          setCredentials({
            user: response.user,
            token: response.token,
          }),
        );
        navigate("/dashboard");
      } catch (error) {
        console.error("Login failed:", error);
        throw error;
      }
    },
    [dispatch, loginMutation, navigate],
  );

  const logout = useCallback(async () => {
    try {
      await logoutMutation().unwrap();
    } finally {
      dispatch(clearCredentials());
      navigate("/login");
    }
  }, [dispatch, logoutMutation, navigate]);

  return {
    user,
    isAuthenticated,
    isLoading,
    login,
    logout,
  };
};
