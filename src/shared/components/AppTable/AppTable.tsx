// src/shared/components/AppTable/AppTable.tsx
// ─────────────────────────────────────────────────────────────────────────────
// The ONLY table primitive you ever use in this app.
// Built on the AntD adapter — swappable, no direct antd imports.
//
// Features:
//   • Column builder with type-aware rendering (text, status, date, money, actions)
//   • Server-side pagination (sends page/pageSize to parent via onTableChange)
//   • URL-synced state (optional) via useTableState hook
//   • Inline row actions with confirmation
//   • Sticky header + horizontal scroll
//   • Export-ready (columns exposed for CSV generation)
//   • Atlassian-style density: compact | default | comfortable
//
// Usage (minimal):
//   const columns = buildColumns<User>([
//     col.text("name", "Full name", { sortable: true }),
//     col.status("status", "Status", { map: USER_STATUS_MAP }),
//     col.date("createdAt", "Joined"),
//     col.actions([
//       { label: "Edit", onClick: (row) => navigate(`/users/${row.id}/edit`) },
//       { label: "Delete", onClick: (row) => deleteUser(row.id), confirm: true, danger: true },
//     ]),
//   ]);
//
//   <AppTable
//     columns={columns}
//     dataSource={users}
//     total={total}
//     tableState={tableState}
//     onTableChange={setTableState}
//     rowKey="id"
//   />
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import { useUILibrary } from "../../lib/ui-lib/ui-library-context";
import type { TableColumn } from "../../lib/ui-lib/types";

// ── Column builder types ──────────────────────────────────────────────────────

/** Options shared by all column types */
interface BaseColOptions {
    width?: number | string;
    sortable?: boolean;
    fixed?: "left" | "right";
    ellipsis?: boolean;
    align?: "left" | "center" | "right";
}

/** Status badge configuration */
export interface StatusConfig {
    label: string;
    color: "success" | "warning" | "error" | "default" | "processing" | string;
}

type StatusMap<T extends string | number = string> = Record<T, StatusConfig>;

/** Action button definition */
export interface RowAction<T = unknown> {
    label: string;
    onClick: (row: T) => void;
    /** Show popconfirm before firing onClick */
    confirm?: boolean;
    confirmTitle?: string;
    danger?: boolean;
    icon?: React.ReactNode;
    /** Hide this action conditionally */
    hidden?: (row: T) => boolean;
    /** Disable this action conditionally */
    disabled?: (row: T) => boolean;
}

// ── Column builder helpers ────────────────────────────────────────────────────

/** Formats currency — customise locale/currency to your region */
const formatMoney = (value: number, currency = "INR") =>
    new Intl.NumberFormat("en-IN", { style: "currency", currency, maximumFractionDigits: 2 }).format(value);

/** Formats dates — ISO strings and Date objects both work */
const formatDate = (value: string | Date | null | undefined) => {
    if (!value) return "—";
    const d = typeof value === "string" ? new Date(value) : value;
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
};

const formatDateTime = (value: string | Date | null | undefined) => {
    if (!value) return "—";
    const d = typeof value === "string" ? new Date(value) : value;
    if (isNaN(d.getTime())) return "—";
    return d.toLocaleString("en-IN", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" });
};

// Status badge colors → Ant Design Tag colors
const STATUS_COLOR_MAP: Record<string, string> = {
    success: "green",
    warning: "orange",
    error: "red",
    default: "default",
    processing: "blue",
};

/**
 * buildColumns — type-safe column definition builder.
 * Each helper returns an AntD-compatible column descriptor.
 */
export function buildColumns<T extends object>(
    definitions: TableColumn<T>[]
): TableColumn<T>[] {
    return definitions;
}

/** Column helper factory — use these to build columns */
export const col = {
    /** Plain text. Renders value as string. */
    text<T extends object>(
        dataIndex: keyof T,
        title: string,
        options: BaseColOptions & { render?: (val: unknown, row: T) => React.ReactNode } = {}
    ): TableColumn<T> {
        const { sortable, render, ...rest } = options;
        return {
            key: String(dataIndex),
            dataIndex: String(dataIndex) as any,
            title,
            sorter: sortable,
            render: render as any,
            ellipsis: options.ellipsis ?? true,
            ...rest,
        };
    },

    /** Status badge. Maps raw value → { label, color } via statusMap. */
    status<T extends object, K extends string | number = string>(
        dataIndex: keyof T,
        title: string,
        options: BaseColOptions & { map: StatusMap<K> }
    ): TableColumn<T> {
        return {
            key: String(dataIndex),
            dataIndex: String(dataIndex) as any,
            title,
            align: options.align ?? "center",
            width: options.width ?? 130,
            fixed: options.fixed,
            render: (value: K) => {
                const config = options.map[value] ?? { label: String(value ?? "—"), color: "default" };
                const antColor = STATUS_COLOR_MAP[config.color] ?? config.color;
                return (
                    <span style={{
                        display: "inline-block",
                        padding: "2px 10px",
                        borderRadius: 20,
                        fontSize: 12,
                        fontWeight: 500,
                        background: antColor === "green" ? "#D1FAE5"
                            : antColor === "orange" ? "#FEF3C7"
                                : antColor === "red" ? "#FEE2E2"
                                    : antColor === "blue" ? "#DBEAFE"
                                        : "var(--color-background-secondary)",
                        color: antColor === "green" ? "#065F46"
                            : antColor === "orange" ? "#92400E"
                                : antColor === "red" ? "#991B1B"
                                    : antColor === "blue" ? "#1E40AF"
                                        : "var(--color-text-secondary)",
                    }}>
                        {config.label}
                    </span>
                );
            },
        };
    },

    /** Date only (no time). */
    date<T extends object>(
        dataIndex: keyof T,
        title: string,
        options: BaseColOptions = {}
    ): TableColumn<T> {
        return {
            key: String(dataIndex),
            dataIndex: String(dataIndex) as any,
            title,
            width: options.width ?? 140,
            sorter: options.sortable,
            render: (val: string | Date) => formatDate(val),
            ...options,
        };
    },

    /** Date + time. */
    dateTime<T extends object>(
        dataIndex: keyof T,
        title: string,
        options: BaseColOptions = {}
    ): TableColumn<T> {
        return {
            key: String(dataIndex),
            dataIndex: String(dataIndex) as any,
            title,
            width: options.width ?? 180,
            sorter: options.sortable,
            render: (val: string | Date) => formatDateTime(val),
            ...options,
        };
    },

    /** Currency amount. */
    money<T extends object>(
        dataIndex: keyof T,
        title: string,
        options: BaseColOptions & { currency?: string } = {}
    ): TableColumn<T> {
        return {
            key: String(dataIndex),
            dataIndex: String(dataIndex) as any,
            title,
            align: "right",
            width: options.width ?? 140,
            sorter: options.sortable,
            render: (val: number) => (
                <span style={{ fontVariantNumeric: "tabular-nums", fontFamily: "monospace" }}>
                    {formatMoney(val, options.currency)}
                </span>
            ),
            ...options,
        };
    },

    /** Boolean tick/cross. */
    bool<T extends object>(
        dataIndex: keyof T,
        title: string,
        options: BaseColOptions & { trueLabel?: string; falseLabel?: string } = {}
    ): TableColumn<T> {
        return {
            key: String(dataIndex),
            dataIndex: String(dataIndex) as any,
            title,
            align: "center",
            width: options.width ?? 90,
            render: (val: boolean) => (
                <span style={{ color: val ? "#059669" : "#DC2626", fontWeight: 500 }}>
                    {val ? (options.trueLabel ?? "✓") : (options.falseLabel ?? "✗")}
                </span>
            ),
            ...options,
        };
    },

    /** Inline row actions (edit, delete, view, custom). */
    actions<T extends object>(
        actions: RowAction<T>[],
        options: { fixed?: "left" | "right"; width?: number } = {}
    ): TableColumn<T> {
        return {
            key: "__actions__",
            title: "Actions",
            fixed: options.fixed ?? "right",
            width: options.width ?? (actions.length <= 2 ? 100 : 140),
            align: "center",
            render: (_: unknown, row: T) => (
                <ActionCell actions={actions} row={row} />
            ),
        };
    },
};

// ── ActionCell ────────────────────────────────────────────────────────────────

interface ActionCellProps<T> {
    actions: RowAction<T>[];
    row: T;
}

function ActionCell<T>({ actions, row }: ActionCellProps<T>) {
    const { Popconfirm, Button } = useUILibrary();
    const visible = actions.filter((a) => !a.hidden?.(row));

    return (
        <div style={{ display: "flex", gap: 4, justifyContent: "center", flexWrap: "nowrap" }}>
            {visible.map((action, i) => {
                const isDisabled = action.disabled?.(row) ?? false;

                const btn = (
                    <Button
                        key={i}
                        variant={action.danger ? "danger" : "ghost"}
                        size="small"
                        disabled={isDisabled}
                        onClick={action.confirm ? undefined : () => action.onClick(row)}
                        style={{ padding: "0 8px", fontSize: 12 }}
                    >
                        {action.label}
                    </Button>
                );

                if (action.confirm) {
                    return (
                        <Popconfirm
                            key={i}
                            title={action.confirmTitle ?? `Confirm ${action.label.toLowerCase()}?`}
                            onConfirm={() => action.onClick(row)}
                            okText="Yes"
                            cancelText="No"
                            disabled={isDisabled}
                        >
                            {btn}
                        </Popconfirm>
                    );
                }

                return btn;
            })}
        </div>
    );
}

// ── Table state type (used with useTableState hook) ───────────────────────────

export interface TableState {
    page: number;
    pageSize: number;
    sortField?: string;
    sortOrder?: "ascend" | "descend" | null;
    filters?: Record<string, unknown>;
}

export const DEFAULT_TABLE_STATE: TableState = {
    page: 1,
    pageSize: 20,
};

// ── AppTable props ─────────────────────────────────────────────────────────────

export interface AppTableProps<T extends object> {
    /** Column definitions — built with col.* helpers */
    columns: TableColumn<T>[];
    dataSource: T[];
    rowKey: keyof T | ((row: T) => string);
    /** Server-reported total count — used for pagination */
    total?: number;
    /** Pass the state from useTableState */
    tableState?: TableState;
    /** Called when user changes page, pageSize, sort, or filters */
    onTableChange?: (state: TableState) => void;
    loading?: boolean;
    /** Visual density */
    size?: "small" | "middle" | "large";
    /** Horizontal scroll — default true */
    scroll?: { x?: number | true; y?: number };
    /** Row selection (pass AntD rowSelection config) */
    rowSelection?: any;
    /** Sticky header — default true */
    sticky?: boolean;
    /** Custom empty message */
    emptyText?: string;
    /** Additional class */
    className?: string;
    style?: React.CSSProperties;
    /** Expose row click */
    onRowClick?: (row: T) => void;
}

// ── AppTable ──────────────────────────────────────────────────────────────────

export function AppTable<T extends object>({
    columns,
    dataSource,
    rowKey,
    total,
    tableState = DEFAULT_TABLE_STATE,
    onTableChange,
    loading = false,
    size = "middle",
    scroll,
    rowSelection,
    sticky = true,
    emptyText,
    className,
    style,
    onRowClick,
}: AppTableProps<T>) {
    const { Table } = useUILibrary();

    const handleChange = (pagination: any, _filters: any, sorter: any) => {
        if (!onTableChange) return;
        onTableChange({
            page: pagination.current ?? 1,
            pageSize: pagination.pageSize ?? tableState.pageSize,
            sortField: sorter?.field ?? undefined,
            sortOrder: sorter?.order ?? null,
        });
    };

    const rowKeyFn =
        typeof rowKey === "function"
            ? rowKey
            : (row: T) => String(row[rowKey]);

    return (
        <Table
            columns={columns as any}
            dataSource={dataSource}
            rowKey={rowKeyFn as any}
            loading={loading}
            size={size}
            sticky={sticky}
            scroll={scroll ?? { x: true }}
            className={className}
            style={style}
            rowSelection={rowSelection}
            locale={{ emptyText: emptyText ?? "No data" }}
            onRow={onRowClick ? (row: T) => ({ onClick: () => onRowClick(row), style: { cursor: "pointer" } }) : undefined}
            onChange={handleChange}
            pagination={
                total !== undefined
                    ? {
                        current: tableState.page,
                        pageSize: tableState.pageSize,
                        total,
                        showTotal: (t: number, range: [number, number]) =>
                            `${range[0]}–${range[1]} of ${t} items`,
                        showSizeChanger: true,
                        pageSizeOptions: ["10", "20", "50", "100"],

                    }
                    : false
            }
        />
    );
}