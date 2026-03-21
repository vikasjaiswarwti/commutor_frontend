// src/features/navigation/utils/menuHelpers.ts
// Pure utility functions — no Redux or React imports. Easy to unit test.

import type { MenuItem } from "../../../shared/types/menu.types";

/** Flatten nested menu tree into a flat id→item map */
export const flattenMenu = (items: MenuItem[]): Record<number, MenuItem> => {
  const result: Record<number, MenuItem> = {};
  const traverse = (list: MenuItem[]) => {
    list.forEach((item) => {
      result[item.menuId] = item;
      if (item.children?.length) traverse(item.children);
    });
  };
  traverse(items);
  return result;
};

/** Filter to only assigned items, recursively */
export const filterAssignedMenu = (items: MenuItem[]): MenuItem[] =>
  items
    .filter((item) => item.isAssigned)
    .map((item) => ({
      ...item,
      children: item.children ? filterAssignedMenu(item.children) : [],
    }));

/** Sort items by orderNo, recursively */
export const sortMenuByOrder = (items: MenuItem[]): MenuItem[] =>
  [...items]
    .sort((a, b) => a.orderNo - b.orderNo)
    .map((item) => ({
      ...item,
      children: item.children ? sortMenuByOrder(item.children) : [],
    }));

/** Find a menu item by its routeUrl (returns null if not found) */
export const findMenuItemByPath = (
  items: MenuItem[],
  path: string,
): MenuItem | null => {
  for (const item of items) {
    if (item.routeUrl === path) return item;
    if (item.children) {
      const found = findMenuItemByPath(item.children, path);
      if (found) return found;
    }
  }
  return null;
};

/** Get breadcrumb trail for a given path */
export const getBreadcrumb = (
  items: MenuItem[],
  path: string,
  trail: MenuItem[] = [],
): MenuItem[] => {
  for (const item of items) {
    const current = [...trail, item];
    if (item.routeUrl === path) return current;
    if (item.children) {
      const found = getBreadcrumb(item.children, path, current);
      if (found.length) return found;
    }
  }
  return [];
};
