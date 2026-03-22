// src/features/user-management/hooks/useUserMutations.ts
// ─────────────────────────────────────────────────────────────────────────────
// Owns all create / update / delete mutations for the user feature.
// Returns stable mutate functions + loading/error state.
// Page imports this — zero mutation logic in the page file.
// ─────────────────────────────────────────────────────────────────────────────

import {
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../services/userApi";
import { useApiMutation } from "../../../shared/hooks/useApiMutation";

interface UseUserMutationsOptions {
  onCreateSuccess: () => void;
  onUpdateSuccess: () => void;
}

export function useUserMutations({
  onCreateSuccess,
  onUpdateSuccess,
}: UseUserMutationsOptions) {
  const {
    mutate: createUser,
    isLoading: isCreating,
    error: createError,
  } = useApiMutation(useCreateUserMutation, {
    successMessage: "User created successfully",
    onSuccess: onCreateSuccess,
  });

  const {
    mutate: updateUser,
    isLoading: isUpdating,
    error: updateError,
  } = useApiMutation(useUpdateUserMutation, {
    successMessage: "User updated successfully",
    onSuccess: onUpdateSuccess,
  });

  const { mutate: deleteUser } = useApiMutation(useDeleteUserMutation, {
    successMessage: "User deleted",
  });

  return {
    createUser,
    updateUser,
    deleteUser,
    isCreating,
    isUpdating,
    createError,
    updateError,
  };
}
