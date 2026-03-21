// src/features/navigation/hooks/useNavigation.ts
// Aligned with navigationSlice (toggleCollapsed, setCollapsed, setMobileOpen)
// and menuApi (useGetMenuQuery). Single source of truth for navigation state.

import { useCallback } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetMenuQuery } from "../services/menuApi";
import {
  toggleCollapsed,
  setCollapsed,
  setMobileOpen,
  selectMenuItems,
  selectCollapsed,
  selectMobileOpen,
} from "../slices/navigationSlice";
import { useAppDispatch } from "../../../app/store";
import { findMenuItemByPath } from "../utils/menuHelpers";

export const useNavigation = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  // RTK Query owns the API call — result is also written to Redux in App.tsx
  const { isLoading, error } = useGetMenuQuery();

  // Read from Redux state (populated by App.tsx setMenuItems after query resolves)
  const menuItems = useSelector(selectMenuItems);
  const collapsed = useSelector(selectCollapsed);
  const mobileOpen = useSelector(selectMobileOpen);

  const toggleSidebar = useCallback(() => {
    dispatch(toggleCollapsed());
  }, [dispatch]);

  const setSidebarCollapsed = useCallback(
    (value: boolean) => {
      dispatch(setCollapsed(value));
    },
    [dispatch],
  );

  const openMobileSidebar = useCallback(() => {
    dispatch(setMobileOpen(true));
  }, [dispatch]);

  const closeMobileSidebar = useCallback(() => {
    dispatch(setMobileOpen(false));
  }, [dispatch]);

  const navigateTo = useCallback(
    (routeUrl: string) => {
      const item = findMenuItemByPath(menuItems, routeUrl);
      if (item?.isAssigned) navigate(routeUrl);
    },
    [menuItems, navigate],
  );

  return {
    menuItems,
    collapsed,
    mobileOpen,
    isLoading,
    error,
    toggleSidebar,
    setSidebarCollapsed,
    openMobileSidebar,
    closeMobileSidebar,
    navigateTo,
  };
};
