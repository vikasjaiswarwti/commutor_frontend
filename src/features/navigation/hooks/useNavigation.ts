// src/features/navigation/hooks/useNavigation.ts
import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useGetMenuQuery } from "../services/menuApi";
import {
  setMenuItems,
  setLoading,
  setError,
  toggleCollapsed,
  setMobileOpen,
} from "../slices/navigationSlice";

import {
  filterAssignedMenu,
  sortMenuByOrder,
  findMenuItemByPath,
} from "../utils/menuHelpers";

export const useNavigation = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: menuData, isLoading, error } = useGetMenuQuery();

  const { items, collapsed, mobileOpen } = useSelector(
    (state: any) => state.navigation,
  );

  useEffect(() => {
    if (menuData) {
      const filtered = filterAssignedMenu(menuData);
      const sorted = sortMenuByOrder(filtered);
      dispatch(setMenuItems(sorted));
    }
  }, [dispatch, menuData]);

  useEffect(() => {
    dispatch(setLoading(isLoading));
  }, [dispatch, isLoading]);

  useEffect(() => {
    if (error) {
      dispatch(setError(error.toString()));
    }
  }, [dispatch, error]);

  const navigateTo = useCallback(
    (routeUrl: string) => {
      const menuItem = findMenuItemByPath(items, routeUrl);
      if (menuItem?.isAssigned) {
        navigate(routeUrl);
      }
    },
    [items, navigate],
  );

  const toggleSidebar = useCallback(() => {
    dispatch(toggleCollapsed());
  }, [dispatch]);

  const openMobileSidebar = useCallback(() => {
    dispatch(setMobileOpen(true));
  }, [dispatch]);

  const closeMobileSidebar = useCallback(() => {
    dispatch(setMobileOpen(false));
  }, [dispatch]);

  return {
    menuItems: items,
    collapsed,
    mobileOpen,
    isLoading,
    error,
    navigateTo,
    toggleSidebar,
    openMobileSidebar,
    closeMobileSidebar,
  };
};
