// src/features/user-management/hooks/useUserTable.ts
// ─────────────────────────────────────────────────────────────────────────────
// Owns:
//   • Column definitions (built once, stable reference)
//   • Table state (pagination, sort, URL sync)
//   • Search state
//
// The page imports this hook — it never builds columns inline.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useMemo } from "react";
import {
  col,
  buildColumns,
} from "../../../shared/components/AppTable/AppTable";
import {
  useTableState,
  tableStateToQueryArgs,
} from "../../../shared/hooks/useTableState";

import { USER_STATUS_MAP, ROLE_LABEL } from "../constants/userConstants";

import type { User } from "../../../shared/types/user.types";

interface UseUserTableOptions {
  onEdit: (user: User) => void;
  onDelete: (id: string) => void;
}

export function useUserTable({ onEdit, onDelete }: UseUserTableOptions) {
  // ── URL-synced pagination / sort ──────────────────────────────────────────
  const [tableState, setTableState] = useTableState({
    syncUrl: true,
    defaultPageSize: 20,
  });

  // ── Search — separate from tableState so it resets page correctly ─────────
  const [search, setSearch] = useState("");

  const handleSearch = (value: string) => {
    setSearch(value);
    setTableState({ page: 1 }); // always reset to page 1 on new search
  };

  // ── Query args derived from table state + search ──────────────────────────
  const queryArgs = tableStateToQueryArgs(tableState, { search });

  // ── Column definitions — stable via useMemo ───────────────────────────────
  // Depends on callbacks only — rebuilds only when onEdit/onDelete change.
  const columns = useMemo(
    () =>
      buildColumns<User>([
        col.text("firstName", "Name", {
          sortable: true,
          render: (_, row) => `${row.firstName} ${row.lastName}`,
        }),
        col.text("email", "Email", { sortable: true }),
        col.status("status", "Status", { map: USER_STATUS_MAP }),
        col.text("role", "Role", {
          render: (val) =>
            ROLE_LABEL[val as keyof typeof ROLE_LABEL] ?? String(val),
        }),
        col.dateTime("createdAt", "Joined", { sortable: true }),
        col.actions<User>([
          {
            label: "Edit",
            onClick: onEdit,
          },
          {
            label: "Delete",
            danger: true,
            confirm: true,
            confirmTitle: "Delete this user? This cannot be undone.",
            onClick: (row) => onDelete(row.id),
          },
        ]),
      ]),
    [onEdit, onDelete],
  );

  return {
    columns,
    tableState,
    setTableState,
    search,
    handleSearch,
    queryArgs,
  };
}
