// src/shared/constants/app.constants.ts
export const APP_NAME = "Admin Dashboard";

export const APP_VERSION = "1.0.0";

// export const API_BASE_URL = "http://192.168.1.60:83/"

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "";

export const ROUTES = {
  LOGIN: "/login",
  DASHBOARD: "/dashboard",
  UNAUTHORIZED: "/unauthorized",
  NOT_FOUND: "/404",
  Test: "/user",
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
