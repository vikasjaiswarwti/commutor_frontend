// src/features/auth/types/auth.types.ts
import type { User } from "../../../shared/types/user.types";

export interface LoginCredentials {
  userName: string; // API uses userName, not email
  password: string;
}

export interface LoginResponse {
  user: User;
  accessToken: string;
  roles: string[];
  // refreshToken comes via HttpOnly cookie — NOT in body
}

export interface AuthTokens {
  accessToken: string;
  // No refreshToken field — it lives in an HttpOnly cookie
}

export interface RefreshTokenResponse {
  accessToken: string;
  // New refreshToken rotation (if any) also arrives via Set-Cookie
}

// ── Unused / future ───────────────────────────────────────────────────────────

export interface RegisterCredentials {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export interface AuthState {
  user: User | null;
  accessToken: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<User>) => void;
}
