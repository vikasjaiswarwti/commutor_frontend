import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { MenuItem } from "@/shared/types/menu.types";

export interface NavigationState {
  items: MenuItem[];
  flattenedMap: Record<string, MenuItem>;
  isLoading: boolean;
  error: string | null;
  collapsed: boolean;
  mobileOpen: boolean;
}

const initialState: NavigationState = {
  items: [],
  flattenedMap: {},
  isLoading: false,
  error: null,
  collapsed: false,
  mobileOpen: false,
};

// Helper function to flatten menu items for quick lookup
const flattenMenuItems = (items: MenuItem[]): Record<string, MenuItem> => {
  const result: Record<string, MenuItem> = {};

  const traverse = (menuItems: MenuItem[]) => {
    menuItems.forEach((item) => {
      result[item.menuId] = item;
      if (item.children?.length) {
        traverse(item.children);
      }
    });
  };

  traverse(items);
  return result;
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
      state.flattenedMap = flattenMenuItems(action.payload);
    },
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
    setMobileOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileOpen = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const {
  setMenuItems,
  toggleCollapsed,
  setMobileOpen,
  setLoading,
  setError,
} = navigationSlice.actions;
export default navigationSlice.reducer;
