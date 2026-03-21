// src/features/navigation/slices/navigationSlice.ts
// ─────────────────────────────────────────────────────────────────────────────
// Fixes:
//   1. Removed fetchMenuItems async thunk — RTK Query (menuApi) owns fetching.
//      Having BOTH a thunk AND RTK Query was a dual-source-of-truth bug.
//   2. Renamed toggleSidebar → toggleCollapsed (matches useNavigation hook)
//   3. Added mobileOpen for mobile drawer support
//   4. setMenuItems kept for App.tsx dev-mode mock injection
// ─────────────────────────────────────────────────────────────────────────────

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { MenuItem } from "../../../shared/types/menu.types";

interface NavigationState {
  menuItems: MenuItem[]; // populated by App.tsx (dev mock) or menuApi
  collapsed: boolean; // sidebar expanded/collapsed
  mobileOpen: boolean; // mobile drawer open/closed
}

const initialState: NavigationState = {
  menuItems: [],
  collapsed: false,
  mobileOpen: false,
};

const navigationSlice = createSlice({
  name: "navigation",
  initialState,
  reducers: {
    /** Set menu items — called by App.tsx after menuApi resolves */
    setMenuItems: (state, action: PayloadAction<MenuItem[]>) => {
      state.menuItems = action.payload;
    },

    /** Toggle sidebar expanded ↔ collapsed */
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },

    /** Force-set collapsed state (e.g. on breakpoint change) */
    setCollapsed: (state, action: PayloadAction<boolean>) => {
      state.collapsed = action.payload;
    },

    /** Mobile drawer open/close */
    setMobileOpen: (state, action: PayloadAction<boolean>) => {
      state.mobileOpen = action.payload;
    },
  },
});

export const { setMenuItems, toggleCollapsed, setCollapsed, setMobileOpen } =
  navigationSlice.actions;

export default navigationSlice.reducer;

// ── Selectors ─────────────────────────────────────────────────────────────────
export const selectMenuItems = (s: { navigation: NavigationState }) =>
  s.navigation.menuItems;
export const selectCollapsed = (s: { navigation: NavigationState }) =>
  s.navigation.collapsed;
export const selectMobileOpen = (s: { navigation: NavigationState }) =>
  s.navigation.mobileOpen;
