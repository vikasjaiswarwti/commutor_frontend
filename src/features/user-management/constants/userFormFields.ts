// src/features/user-management/constants/userFormFields.ts
// ─────────────────────────────────────────────────────────────────────────────
// Form schema for create / edit user.
// Defined at module level — never inside a component (avoids recreating on render).
// ─────────────────────────────────────────────────────────────────────────────

import type { FormFieldDef } from "../../../shared/components/AppForm/AppForm";

import { ROLE_OPTIONS, USER_STATUS_OPTIONS } from "./userConstants";

export const USER_FORM_FIELDS: FormFieldDef[] = [
  {
    name: "firstName",
    label: "First name",
    type: "text",
    required: true,
    span: 12,
  },
  {
    name: "lastName",
    label: "Last name",
    type: "text",
    required: true,
    span: 12,
  },
  {
    name: "email",
    label: "Email address",
    type: "email",
    required: true,
    span: 12,
  },
  {
    name: "phone",
    label: "Phone number",
    type: "text",
    span: 12,
    placeholder: "+91 98765 43210",
  },
  {
    name: "role",
    label: "Role",
    type: "select",
    required: true,
    options: ROLE_OPTIONS as unknown as Array<{ label: string; value: string }>,
    span: 12,
  },
  {
    name: "status",
    label: "Status",
    type: "select",
    required: true,
    options: USER_STATUS_OPTIONS as unknown as Array<{
      label: string;
      value: string;
    }>,
    span: 12,
    // Hide status field on create — only show when editing (id is present in values)
    hidden: (values) => !values["id"],
  },
  {
    name: "notes",
    label: "Notes",
    type: "textarea",
    placeholder: "Optional internal notes...",
  },
];
