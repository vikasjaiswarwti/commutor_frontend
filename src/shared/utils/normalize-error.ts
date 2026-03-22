// src/shared/utils/normalizeError.ts
// ─────────────────────────────────────────────────────────────────────────────
// Fix: import SerializedError from our types barrel, not from "@reduxjs/toolkit/query"
// Fix: import FetchBaseQueryError from "@reduxjs/toolkit/query/react" (always available)
// ─────────────────────────────────────────────────────────────────────────────

import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
// SerializedError comes from the root package, re-exported via our types file:
import type {
  SerializedError,
  AppError,
  AppErrorKind,
  FieldError,
} from "../types/api-error.types";
import { DEFAULT_ERROR_MESSAGES } from "../types/api-error.types";

// ── Known server validation shapes ───────────────────────────────────────────

interface DotNetValidationError {
  errors?: Record<string, string[]>;
  title?: string;
  detail?: string;
}

interface GenericValidationError {
  message?: string;
  errors?: Array<{ field: string; message: string }> | Record<string, string[]>;
}

// ── Field error extractors ────────────────────────────────────────────────────

function extractFieldErrors(data: unknown): FieldError[] {
  if (!data || typeof data !== "object") return [];

  const d = data as DotNetValidationError & GenericValidationError;

  // .NET / Laravel: { errors: { "FieldName": ["msg1"] } }
  if (d.errors && typeof d.errors === "object" && !Array.isArray(d.errors)) {
    const map = d.errors as Record<string, string[] | string>;
    return Object.entries(map).flatMap(([field, msgs]) => {
      const messages = Array.isArray(msgs) ? msgs : [msgs];
      // PascalCase → camelCase (.NET ModelState sends "FirstName" not "firstName")
      const normalizedField = field.charAt(0).toLowerCase() + field.slice(1);
      return messages.map((message) => ({ field: normalizedField, message }));
    });
  }

  // Generic: { errors: [{ field, message }] }
  if (Array.isArray(d.errors)) {
    return (d.errors as Array<{ field: string; message: string }>)
      .filter((e) => e && typeof e === "object" && "field" in e)
      .map((e) => ({ field: e.field, message: e.message }));
  }

  return [];
}

// ── Status → kind ─────────────────────────────────────────────────────────────

function statusToKind(status: number | string): AppErrorKind {
  if (status === "FETCH_ERROR" || status === "PARSING_ERROR") return "network";
  if (status === "TIMEOUT_ERROR") return "timeout";
  if (status === 401) return "auth";
  if (status === 403) return "forbidden";
  if (status === 404) return "not_found";
  if (status === 400 || status === 422) return "validation";
  if (typeof status === "number" && status >= 500) return "server";
  return "unknown";
}

// ── Main normalizer ───────────────────────────────────────────────────────────

export function normalizeError(
  error: FetchBaseQueryError | SerializedError | AppError | Error | unknown,
): AppError {
  // Already normalised
  if (
    error &&
    typeof error === "object" &&
    "kind" in error &&
    "message" in error
  ) {
    return error as AppError;
  }

  // RTK Query FetchBaseQueryError
  if (error && typeof error === "object" && "status" in error) {
    const rtkError = error as FetchBaseQueryError;
    const status = rtkError.status;
    const kind = statusToKind(status);

    if (typeof status === "number" && "data" in rtkError) {
      const data = rtkError.data as GenericValidationError | undefined;
      const fieldErrors = kind === "validation" ? extractFieldErrors(data) : [];
      const message =
        (data as any)?.message ??
        (data as any)?.title ??
        DEFAULT_ERROR_MESSAGES[kind];

      return {
        kind,
        message,
        status,
        fieldErrors: fieldErrors.length ? fieldErrors : undefined,
        raw: rtkError,
      };
    }

    return {
      kind,
      message: DEFAULT_ERROR_MESSAGES[kind],
      raw: rtkError,
    };
  }

  // RTK SerializedError
  if (
    error &&
    typeof error === "object" &&
    "name" in error &&
    !("kind" in error)
  ) {
    const se = error as SerializedError;
    return {
      kind: "unknown",
      message: se.message ?? DEFAULT_ERROR_MESSAGES.unknown,
      raw: se,
    };
  }

  // Native Error
  if (error instanceof Error) {
    return {
      kind: error.name === "AbortError" ? "timeout" : "unknown",
      message: error.message || DEFAULT_ERROR_MESSAGES.unknown,
      raw: error,
    };
  }

  return {
    kind: "unknown",
    message: DEFAULT_ERROR_MESSAGES.unknown,
    raw: error,
  };
}
