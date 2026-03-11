// src/shared/types/menu.types.ts

export interface MenuItem {
  menuId: number;
  menuName: string;
  parentMenuId: number | null;
  orderNo: number;
  isAssigned: boolean;
  routeUrl: string | null;
  icon: string | null; // Ant Design icon name as string
  children: MenuItem[] | null;
}

// API Response wrapper type (if needed)
export interface MenuApiResponse {
  data: MenuItem[];
  success: boolean;
  message?: string;
}

// For single menu item response
export interface MenuItemApiResponse {
  data: MenuItem;
  success: boolean;
  message?: string;
}
