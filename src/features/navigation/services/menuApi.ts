import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/shared/lib/api/baseQuery";
import { MenuItem } from "@/shared/types/menu.types";

interface MenuResponse {
  data: MenuItem[];
  success: boolean;
  message?: string;
}

export const menuApi = createApi({
  reducerPath: "menuApi",
  baseQuery,
  tagTypes: ["Menu"],
  endpoints: (builder) => ({
    getMenu: builder.query<MenuItem[], void>({
      query: () => "/menu",
      transformResponse: (response: MenuResponse) => {
        return response.data;
      },
      providesTags: ["Menu"],
    }),

    getMenuById: builder.query<MenuItem, string>({
      query: (id) => `/menu/${id}`,
      providesTags: (result, error, id) => [{ type: "Menu", id }],
    }),

    refreshMenu: builder.mutation<MenuItem[], void>({
      query: () => ({
        url: "/menu/refresh",
        method: "POST",
      }),
      transformResponse: (response: MenuResponse) => response.data,
      invalidatesTags: ["Menu"],
    }),

    updateMenu: builder.mutation<
      MenuItem,
      Partial<MenuItem> & { menuId: string }
    >({
      query: ({ menuId, ...patch }) => ({
        url: `/menu/${menuId}`,
        method: "PATCH",
        body: patch,
      }),
      invalidatesTags: (result, error, { menuId }) => [
        { type: "Menu", id: menuId },
        "Menu",
      ],
    }),
  }),
});

export const {
  useGetMenuQuery,
  useGetMenuByIdQuery,
  useRefreshMenuMutation,
  useUpdateMenuMutation,
} = menuApi;
