// src/shared/types/api-error.types.ts
// ─────────────────────────────────────────────────────────────────────────────
// Fix: SerializedError is NOT exported from "@reduxjs/toolkit/query".
//      It lives in "@reduxjs/toolkit" and is re-exported here so all
//      other files import it from this single place.
// ─────────────────────────────────────────────────────────────────────────────

import type { SerializedError } from "@reduxjs/toolkit"; // ← correct package

export type { SerializedError };

export type AppErrorKind =
  | "network"
  | "timeout"
  | "auth"
  | "forbidden"
  | "not_found"
  | "validation"
  | "server"
  | "unknown";

export interface FieldError {
  field: string;
  message: string;
}

export interface AppError {
  kind: AppErrorKind;
  message: string;
  status?: number;
  fieldErrors?: FieldError[];
  raw?: unknown;
}

export const DEFAULT_ERROR_MESSAGES: Record<AppErrorKind, string> = {
  network: "No internet connection. Please check your network.",
  timeout: "Request timed out. Please try again.",
  auth: "Your session has expired. Please log in again.",
  forbidden: "You don't have permission to perform this action.",
  not_found: "The requested resource was not found.",
  validation: "Please fix the highlighted fields.",
  server: "Something went wrong on our end. Please try again.",
  unknown: "An unexpected error occurred.",
};

export const isAppError = (value: unknown): value is AppError =>
  typeof value === "object" &&
  value !== null &&
  "kind" in value &&
  "message" in value;
