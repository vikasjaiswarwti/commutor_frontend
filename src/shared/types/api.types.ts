// src/shared/types/api.types.ts
export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  timestamp: string;
  errors?: ApiError[];
}

export interface ApiError {
  code: string;
  message: string;
  field?: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiRequestConfig {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  url: string;
  data?: unknown;
  params?: Record<string, string>;
  headers?: Record<string, string>;
}

// src/shared/types/user.types.ts
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  permissions: string[];
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// src/shared/types/menu.types.ts
export interface MenuItem {
  menuId: string;
  menuName: string;
  parentMenuId: string | null;
  orderNo: number;
  isAssigned: boolean;
  routeUrl: string | null;
  icon: string | null;
  children: MenuItem[];
}

export interface NavigationState {
  items: MenuItem[];
  flattenedMap: Record<string, MenuItem>;
  isLoading: boolean;
  error: string | null;
  collapsed: boolean;
  mobileOpen: boolean;
}