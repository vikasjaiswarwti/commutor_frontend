// src/features/navigation/services/menuApi.ts
// ─────────────────────────────────────────────────────────────────────────────
// Fixes:
//   1. Uses baseQueryWithReauth (not raw baseQuery) — gets token refresh for free
//   2. getMenu uses correct API path aligned with backend
//   3. Removed unused getMenuById / updateMenu if not needed — kept for completeness
//      but marked optional
// ─────────────────────────────────────────────────────────────────────────────

import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../../../shared/lib/api/baseQueryWithReauth";
import type { MenuItem } from "../../../shared/types/menu.types";

interface MenuResponse {
  data: MenuItem[];
  success: boolean;
  message?: string;
}

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Menu"],
  endpoints: (builder) => ({
    getMenu: builder.query<MenuItem[], void>({
      query: () => "api/v1/Menu",
      transformResponse: (response: MenuResponse) => response.data ?? [],
      providesTags: ["Menu"],
    }),

    refreshMenu: builder.mutation<MenuItem[], void>({
      query: () => ({ url: "api/v1/Menu/refresh", method: "POST" }),
      transformResponse: (response: MenuResponse) => response.data ?? [],
      invalidatesTags: ["Menu"],
    }),
  }),
});

export const { useGetMenuQuery, useRefreshMenuMutation } = menuApi;
