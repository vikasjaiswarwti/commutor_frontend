import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MenuItem } from "../../../shared/types/menu.types";
import { mockMenuData } from "../services/mockMenuData";

interface NavigationState {
  items: MenuItem[];
  isLoading: boolean;
  error: string | null;

  // UI state
  collapsed: boolean;
  mobileOpen: boolean;
}

const initialState: NavigationState = {
  items: mockMenuData,
  isLoading: false,
  error: null,

  collapsed: false,
  mobileOpen: false,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.items = action.payload;
      state.error = null;
    },

    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },

    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.isLoading = false;
    },

    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },

    setMobileOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileOpen = action.payload;
    },
  },
});

export const {
  setMenuItems,
  setLoading,
  setError,
  toggleCollapsed,
  setMobileOpen,
} = navigationSlice.actions;

export default navigationSlice.reducer;
