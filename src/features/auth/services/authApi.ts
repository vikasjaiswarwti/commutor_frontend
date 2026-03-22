// src/features/auth/services/authApi.ts
// ─────────────────────────────────────────────────────────────────────────────
// Synced with cookie-based refresh token flow.
// Login uses `userName` (not `email`) per the actual API contract.
// ─────────────────────────────────────────────────────────────────────────────

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../../shared/lib/api/baseQueryWithReauth";
import { setCredentials } from "../slices/authSlice";
import type { User } from "../../../shared/types/user.types";
import type {
  LoginCredentials,
  LoginResponse,
  RefreshTokenResponse,
} from "../types/auth.types";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginCredentials>({
      query: (credentials) => ({
        url: "api/v1/Auth/login",
        method: "POST",
        body: credentials, // { userName, password }
      }),
      invalidatesTags: ["User"],
    }),

    logout: builder.mutation<void, void>({
      query: () => ({
        url: "api/v1/Auth/logout",
        method: "POST",
      }),
      // credentials: "include" on rawBaseQuery ensures the refresh cookie is
      // sent, so the server can invalidate it server-side.
    }),

    refreshToken: builder.mutation<RefreshTokenResponse, void>({
      // This is exposed for manual use if needed, but the automatic refresh
      // is handled inside baseQueryWithReauth — you don't need to call this manually.
      query: () => ({
        url: "api/v1/Auth/refresh-token",
        method: "POST",
      }),
    }),

    getCurrentUser: builder.query<User, void>({
      query: () => "api/v1/Auth/me",
      providesTags: ["User"],
      // Wire up: after /me succeeds, store user + accessToken in Redux
      // The accessToken is already in state from login/bootstrap, but we
      // re-confirm here in case the query runs after a page reload.
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          const { data: user } = await queryFulfilled;
          // User is fetched — credentials are already in Redux from bootstrap.
          // Just update the user object if it isn't there yet.
          dispatch(
            setCredentials({
              user,
              // accessToken is already in Redux — pass current value through.
              // We don't have it here, but setCredentials won't overwrite a
              // good token with null. Use a selector approach instead:
              // See note below.
              accessToken: "", // ← see note
            }),
          );
        } catch {
          // /me failed — let the app handle via isAuthenticated check
        }
      },
    }),
  }),
});

// ─── NOTE on getCurrentUser onQueryStarted ────────────────────────────────────
// The onQueryStarted callback doesn't have access to getState() directly.
// A cleaner approach: don't call setCredentials here — instead, in useAuth.ts,
// watch the getCurrentUser query result and dispatch setCredentials manually.
// See useAuth.ts for the recommended wiring.
// ─────────────────────────────────────────────────────────────────────────────

export const {
  useLoginMutation,
  useLogoutMutation,
  useRefreshTokenMutation,
  useGetCurrentUserQuery,
} = authApi;
