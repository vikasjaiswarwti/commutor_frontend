// src/shared/constants/app.constants.ts
export const APP_NAME = "Admin Dashboard";

export const APP_VERSION = "1.0.0";

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  UNAUTHORIZED: "/unauthorized",
  NOT_FOUND: "/404",
} as const;

export const LOCAL_STORAGE_KEYS = {
  THEME: "theme",
  TOKEN: "token",
  USER: "user",
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;
