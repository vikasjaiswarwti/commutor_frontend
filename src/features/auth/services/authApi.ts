import { createApi } from "@reduxjs/toolkit/query/react";
// import { baseQuery } from "../../../shared/lib/api/baseQuery";

import { baseQueryWithReauth } from "../../../shared/lib/api/baseQueryWithReauth";

import type { User } from "../../../shared/types/user.types";
import type {
  LoginCredentials,
  LoginResponse,
  RefreshTokenResponse,
} from "../types/auth.types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth, // Use the enhanced base query
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "api/v1/Auth/login",
        method: "POST",
        body: credentials,
      }),
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "api/v1/Auth/logout",
        method: "POST",
      }),
    }),

    refreshToken: builder.mutation<RefreshTokenResponse, void>({
      query: () => ({
        url: "api/v1/Auth/refresh-token",
        method: "POST",
        // Don't send refresh token in body if it's in cookies
        // If it needs to be in body, get it from state
      }),
    }),

    getCurrentUser: builder.query<User, void>({
      query: () => "api/v1/Auth/me",
      providesTags: ["User"],
    }),

    // ... other endpoints
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetCurrentUserQuery,
} = authApi;
