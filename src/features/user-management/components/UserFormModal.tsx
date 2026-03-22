// src/features/user-management/components/UserFormModal.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Renders the create / edit modal with the AppForm inside.
// Receives everything via props — no data fetching, no mutations here.
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { useUILibrary } from "../../../shared/lib/ui-lib/ui-library-context";
import { AppForm } from "../../../shared/components/AppForm/AppForm";

import { USER_FORM_FIELDS } from "../constants/userFormFields";

import type { FieldError } from "../../../shared/types/api-error.types";
import type { User } from "../../../shared/types/user.types";

interface UserFormModalProps {
  open: boolean;
  onClose: () => void;
  editingUser: User | null;
  onSubmit: (values: Record<string, unknown>) => Promise<void>;
  isSubmitting: boolean;
  serverErrors?: FieldError[] | null;
}

export const UserFormModal: React.FC<UserFormModalProps> = ({
  open,
  onClose,
  editingUser,
  onSubmit,
  isSubmitting,
  serverErrors,
}) => {
  const { Modal } = useUILibrary();

  return (
    <Modal
      open={open}
      onClose={onClose}
      title={editingUser ? "Edit user" : "Create user"}
      width={700}
      destroyOnClose
      footer={null}
    >
      <AppForm
        fields={USER_FORM_FIELDS}
        // Pass id in initialValues so the "status" field hidden() check works
        initialValues={editingUser ? { ...editingUser } : undefined}
        onSubmit={onSubmit}
        onCancel={onClose}
        serverErrors={serverErrors}
        isSubmitting={isSubmitting}
        submitLabel={editingUser ? "Save changes" : "Create user"}
        showCancel
        twoColumn
        resetOnSuccess
      />
    </Modal>
  );
};