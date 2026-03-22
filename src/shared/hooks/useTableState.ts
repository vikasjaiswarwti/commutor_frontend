// src/shared/hooks/useTableState.ts
// ─────────────────────────────────────────────────────────────────────────────
// Manages table pagination, sort, and filter state.
// Optional: syncs to URL search params so browser back/forward works correctly.
//
// Usage (URL-synced):
//   const [tableState, setTableState] = useTableState({ syncUrl: true });
//
// Usage (in-memory only):
//   const [tableState, setTableState] = useTableState();
//
// Pass tableState and setTableState directly to <AppTable />.
// ─────────────────────────────────────────────────────────────────────────────

import { useState, useCallback } from "react";
import { useSearchParams } from "react-router-dom";
import type { TableState } from "../components/AppTable/AppTable";
import { DEFAULT_TABLE_STATE } from "../components/AppTable/AppTable";

interface UseTableStateOptions {
  /** Persist page / pageSize / sort to URL query params */
  syncUrl?: boolean;
  /** Initial values — merged with defaults */
  initial?: Partial<TableState>;
  /** Default page size */
  defaultPageSize?: number;
}

type SetTableState = (
  update: Partial<TableState> | ((prev: TableState) => TableState),
) => void;

export function useTableState(
  options: UseTableStateOptions = {},
): [TableState, SetTableState] {
  const { syncUrl = false, initial = {}, defaultPageSize = 20 } = options;

  // URL sync
  const [searchParams, setSearchParams] = useSearchParams();

  const parseFromUrl = (): TableState => ({
    page: Number(searchParams.get("page") ?? 1),
    pageSize: Number(searchParams.get("pageSize") ?? defaultPageSize),
    sortField: searchParams.get("sortField") ?? undefined,
    sortOrder:
      (searchParams.get("sortOrder") as TableState["sortOrder"]) ?? null,
  });

  const [inMemoryState, setInMemoryState] = useState<TableState>(() => ({
    ...DEFAULT_TABLE_STATE,
    pageSize: defaultPageSize,
    ...initial,
  }));

  const setState: SetTableState = useCallback(
    (update) => {
      if (syncUrl) {
        const prev = parseFromUrl();
        const next =
          typeof update === "function" ? update(prev) : { ...prev, ...update };
        const params = new URLSearchParams(searchParams);
        params.set("page", String(next.page));
        params.set("pageSize", String(next.pageSize));
        if (next.sortField) params.set("sortField", next.sortField);
        else params.delete("sortField");
        if (next.sortOrder) params.set("sortOrder", next.sortOrder);
        else params.delete("sortOrder");
        setSearchParams(params, { replace: true });
      } else {
        setInMemoryState((prev) =>
          typeof update === "function" ? update(prev) : { ...prev, ...update },
        );
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [syncUrl, searchParams],
  );

  return [syncUrl ? parseFromUrl() : inMemoryState, setState];
}

// ── Convenience: derive RTK Query args from table state ───────────────────────
// Use this to build the query params object for your RTK Query endpoints.
//
// Example:
//   const [ts, setTs] = useTableState();
//   const queryArgs = tableStateToQueryArgs(ts, { search: searchTerm });
//   const { data } = useGetUsersQuery(queryArgs);

export interface PaginatedQueryArgs {
  page: number;
  pageSize: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  [key: string]: unknown;
}

export function tableStateToQueryArgs(
  state: TableState,
  extra?: Record<string, unknown>,
): PaginatedQueryArgs {
  return {
    page: state.page,
    pageSize: state.pageSize,
    sortBy: state.sortField,
    sortOrder:
      state.sortOrder === "ascend"
        ? "asc"
        : state.sortOrder === "descend"
          ? "desc"
          : undefined,
    ...extra,
  };
}
