// src/features/user-management/constants/userConstants.ts
// ─────────────────────────────────────────────────────────────────────────────
// All static lookup data for the user feature.
// Import from here — never redefine in page or component files.
// ─────────────────────────────────────────────────────────────────────────────

// ── Status badge map ──────────────────────────────────────────────────────────

export const USER_STATUS_MAP = {
  active: { label: "Active", color: "success" },
  inactive: { label: "Inactive", color: "default" },
  banned: { label: "Banned", color: "error" },
  pending: { label: "Pending", color: "warning" },
} as const;

export type UserStatus = keyof typeof USER_STATUS_MAP;

// ── Role options (used in form select + table render) ─────────────────────────

export const ROLE_OPTIONS = [
  { label: "Admin", value: "admin" },
  { label: "Manager", value: "manager" },
  { label: "Operator", value: "operator" },
  { label: "Viewer", value: "viewer" },
] as const;

export type UserRole = (typeof ROLE_OPTIONS)[number]["value"];

export const ROLE_LABEL: Record<UserRole, string> = Object.fromEntries(
  ROLE_OPTIONS.map((o) => [o.value, o.label]),
) as Record<UserRole, string>;

// ── Status options for the form select ───────────────────────────────────────

export const USER_STATUS_OPTIONS = [
  { label: "Active", value: "active" },
  { label: "Inactive", value: "inactive" },
] as const;
