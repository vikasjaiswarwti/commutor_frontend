import { MenuItem } from "@/shared/types/menu.types";

export const flattenMenu = (items: MenuItem[]): Record<string, MenuItem> => {
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

export const filterAssignedMenu = (items: MenuItem[]): MenuItem[] => {
  return items
    .filter((item) => item.isAssigned)
    .map((item) => ({
      ...item,
      children: item.children ? filterAssignedMenu(item.children) : [],
    }))
    .filter((item) => item.isAssigned || item.children.length > 0);
};

export const sortMenuByOrder = (items: MenuItem[]): MenuItem[] => {
  return [...items]
    .sort((a, b) => a.orderNo - b.orderNo)
    .map((item) => ({
      ...item,
      children: item.children ? sortMenuByOrder(item.children) : [],
    }));
};

export const findMenuItemByPath = (
  items: MenuItem[],
  path: string,
): MenuItem | null => {
  for (const item of items) {
    if (item.routeUrl === path) {
      return item;
    }
    if (item.children) {
      const found = findMenuItemByPath(item.children, path);
      if (found) return found;
    }
  }
  return null;
};
