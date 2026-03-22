// src/features/user-management/services/userApi.ts
// ─────────────────────────────────────────────────────────────────────────────
// RTK Query endpoint template.
// Copy this file for every new feature — change the types and URLs.
//
// The paginated response shape mirrors most .NET / Node backends.
// If your backend returns a different shape, adapt transformResponse only here.
// ─────────────────────────────────────────────────────────────────────────────

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../../shared/lib/api/baseQueryWithReauth";
import type { User } from "../../../shared/types/user.types";
import type { PaginatedQueryArgs } from "../../../shared/hooks/useTableState";

// ── Paginated response wrapper ────────────────────────────────────────────────
// Your backend's paginated response shape goes here.
// Adapt transformResponse if the shape differs.

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

// ── Request/response types ────────────────────────────────────────────────────

export type GetUsersArgs = PaginatedQueryArgs & {
  search?: string;
};

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  phone?: string;
  notes?: string;
}

export interface UpdateUserDto extends Partial<CreateUserDto> {
  id: string;
  status?: string;
}

// ── API slice ─────────────────────────────────────────────────────────────────

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    getUsers: builder.query<PaginatedResponse<User>, GetUsersArgs>({
      query: ({ page, pageSize, sortBy, sortOrder, search }) => ({
        url: "api/v1/Users",
        params: {
          page,
          pageSize,
          ...(sortBy && { sortBy }),
          ...(sortOrder && { sortOrder }),
          ...(search && { search }),
        },
      }),
      // If your backend returns { data: { items, total } }, unwrap here:
      // transformResponse: (res: { data: PaginatedResponse<User> }) => res.data,
      providesTags: (result) =>
        result
          ? [
              ...result.items.map(({ id }) => ({ type: "User" as const, id })),
              { type: "User", id: "LIST" },
            ]
          : [{ type: "User", id: "LIST" }],
    }),

    getUserById: builder.query<User, string>({
      query: (id) => `api/v1/Users/${id}`,
      providesTags: (_result, _error, id) => [{ type: "User", id }],
    }),

    createUser: builder.mutation<User, CreateUserDto>({
      query: (body) => ({
        url: "api/v1/Users",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User", id: "LIST" }],
    }),

    updateUser: builder.mutation<User, UpdateUserDto>({
      query: ({ id, ...body }) => ({
        url: `api/v1/Users/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: (_result, _error, { id }) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),

    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: `api/v1/Users/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: (_result, _error, id) => [
        { type: "User", id },
        { type: "User", id: "LIST" },
      ],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserByIdQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
