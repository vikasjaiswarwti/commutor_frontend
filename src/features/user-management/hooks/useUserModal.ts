// src/features/user-management/hooks/useUserModal.ts
// ─────────────────────────────────────────────────────────────────────────────
// Owns modal open state and which user is being edited.
// Keeps the page component free of these three useState calls.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback } from "react";
import type { User } from "../../../shared/types/user.types";

export function useUserModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);

  const openCreate = useCallback(() => {
    setEditingUser(null);
    setIsOpen(true);
  }, []);

  const openEdit = useCallback((user: User) => {
    setEditingUser(user);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    setEditingUser(null);
  }, []);

  return { isOpen, editingUser, openCreate, openEdit, close };
}
