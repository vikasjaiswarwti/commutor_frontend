// src/shared/components/ApiState/ApiStateWrapper.tsx
// ─────────────────────────────────────────────────────────────────────────────
// Fix: FetchBaseQueryError  → "@reduxjs/toolkit/query/react"
// Fix: SerializedError      → our types barrel (which re-exports from "@reduxjs/toolkit")
// ─────────────────────────────────────────────────────────────────────────────

import React from "react";
import type { FetchBaseQueryError } from "@reduxjs/toolkit/query/react";
import type { SerializedError } from "../../../shared/types/api-error.types";

import { normalizeError } from "../../utils/normalize-error";

import type { AppError } from "../../types/api-error.types";

// ── Skeleton ──────────────────────────────────────────────────────────────────

interface SkeletonProps {
    rows?: number;
    variant?: "table" | "card" | "form";
}

const shimmerStyle = `
  .sk { background: var(--color-background-secondary); border-radius: 4px; }
  .sk { background-image: linear-gradient(90deg, var(--color-background-secondary) 0%, var(--color-background-tertiary) 50%, var(--color-background-secondary) 100%); }
  .sk { background-size: 400px 100%; animation: sk-shimmer 1.4s ease-in-out infinite; }
  @keyframes sk-shimmer { 0% { background-position: -400px 0; } 100% { background-position: 400px 0; } }
`;

const Skeleton: React.FC<SkeletonProps> = ({ rows = 4, variant = "table" }) => {
    if (variant === "form") {
        return (
            <>
                <style>{shimmerStyle}</style>
                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {Array.from({ length: rows }).map((_, i) => (
                        <div key={i}>
                            <div className="sk" style={{ width: 120, height: 14, marginBottom: 8 }} />
                            <div className="sk" style={{ width: "100%", height: 36 }} />
                        </div>
                    ))}
                </div>
            </>
        );
    }

    if (variant === "card") {
        return (
            <>
                <style>{shimmerStyle}</style>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 16 }}>
                    {Array.from({ length: rows }).map((_, i) => (
                        <div key={i} style={{ padding: 20, borderRadius: 12, background: "var(--color-background-secondary)" }}>
                            <div className="sk" style={{ width: "60%", height: 18, marginBottom: 12 }} />
                            <div className="sk" style={{ width: "90%", height: 14, marginBottom: 8 }} />
                            <div className="sk" style={{ width: "75%", height: 14 }} />
                        </div>
                    ))}
                </div>
            </>
        );
    }

    // Table default
    return (
        <>
            <style>{shimmerStyle}</style>
            <div style={{ width: "100%" }}>
                <div style={{ display: "flex", gap: 16, padding: "12px 16px", marginBottom: 4, background: "var(--color-background-secondary)", borderRadius: 8 }}>
                    {[25, 20, 20, 15, 20].map((w, i) => (
                        <div key={i} className="sk" style={{ width: `${w}%`, height: 14 }} />
                    ))}
                </div>
                {Array.from({ length: rows }).map((_, i) => (
                    <div key={i} style={{ display: "flex", gap: 16, padding: "14px 16px", borderBottom: "1px solid var(--color-border-tertiary)" }}>
                        {[25, 20, 20, 15, 20].map((w, j) => (
                            <div key={j} className="sk" style={{ width: `${w}%`, height: 14, opacity: Math.max(0.3, 1 - i * 0.12) }} />
                        ))}
                    </div>
                ))}
            </div>
        </>
    );
};

// ── Error view ────────────────────────────────────────────────────────────────

const RETRYABLE_KINDS = new Set(["network", "timeout", "server", "unknown"]);

const ERROR_ICONS: Record<string, string> = {
    network: "📡",
    timeout: "⏱",
    auth: "🔐",
    forbidden: "🚫",
    not_found: "🔍",
    validation: "⚠️",
    server: "🛠",
    unknown: "⚠️",
};

interface ErrorViewProps {
    error: AppError;
    onRetry?: () => void;
    compact?: boolean;
}

const ErrorView: React.FC<ErrorViewProps> = ({ error, onRetry, compact }) => {
    const canRetry = RETRYABLE_KINDS.has(error.kind);

    if (compact) {
        return (
            <div style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 14px",
                background: "var(--color-background-danger)",
                border: "1px solid var(--color-border-danger)",
                borderRadius: 8,
                fontSize: 13,
                color: "var(--color-text-danger)",
            }}>
                <span>{ERROR_ICONS[error.kind]}</span>
                <span style={{ flex: 1 }}>{error.message}</span>
                {canRetry && onRetry && (
                    <button
                        onClick={onRetry}
                        style={{
                            background: "none",
                            border: "1px solid var(--color-border-danger)",
                            borderRadius: 6, padding: "2px 10px",
                            fontSize: 12, cursor: "pointer",
                            color: "var(--color-text-danger)",
                        }}
                    >
                        Retry
                    </button>
                )}
            </div>
        );
    }

    return (
        <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", padding: "48px 24px", textAlign: "center", gap: 12,
        }}>
            <span style={{ fontSize: 36 }}>{ERROR_ICONS[error.kind]}</span>
            <p style={{ margin: 0, fontSize: 15, fontWeight: 500, color: "var(--color-text-primary)" }}>
                {error.message}
            </p>
            {error.fieldErrors && error.fieldErrors.length > 0 && (
                <ul style={{ margin: 0, padding: 0, listStyle: "none", fontSize: 13, color: "var(--color-text-danger)" }}>
                    {error.fieldErrors.map((fe, i) => (
                        <li key={i}>{fe.field}: {fe.message}</li>
                    ))}
                </ul>
            )}
            {canRetry && onRetry && (
                <button
                    onClick={onRetry}
                    style={{
                        marginTop: 8, padding: "8px 24px",
                        background: "#00A86B", color: "#fff",
                        border: "none", borderRadius: 8,
                        fontSize: 14, fontWeight: 500, cursor: "pointer",
                    }}
                >
                    Try again
                </button>
            )}
        </div>
    );
};

// ── Empty view ────────────────────────────────────────────────────────────────

interface EmptyViewProps {
    message?: string;
    action?: React.ReactNode;
}

const EmptyView: React.FC<EmptyViewProps> = ({ message = "No data found", action }) => (
    <div style={{
        display: "flex", flexDirection: "column", alignItems: "center",
        padding: "48px 24px", gap: 12, color: "var(--color-text-secondary)",
    }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <rect x="4" y="4" width="40" height="40" rx="8" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 3" opacity="0.4" />
            <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.3" />
        </svg>
        <p style={{ margin: 0, fontSize: 14 }}>{message}</p>
        {action}
    </div>
);

// ── Main wrapper ──────────────────────────────────────────────────────────────

export interface ApiStateWrapperProps {
    isLoading?: boolean;
    error?: FetchBaseQueryError | SerializedError | AppError | null | undefined;
    isEmpty?: boolean;
    onRetry?: () => void;
    children: React.ReactNode;
    skeletonVariant?: "table" | "card" | "form";
    skeletonRows?: number;
    emptyMessage?: string;
    emptyAction?: React.ReactNode;
    compactError?: boolean;
}

export const ApiStateWrapper: React.FC<ApiStateWrapperProps> = ({
    isLoading,
    error,
    isEmpty,
    onRetry,
    children,
    skeletonVariant = "table",
    skeletonRows = 5,
    emptyMessage,
    emptyAction,
    compactError = false,
}) => {
    if (isLoading) {
        return <Skeleton rows={skeletonRows} variant={skeletonVariant} />;
    }

    if (error) {
        const appError = normalizeError(error);
        return <ErrorView error={appError} onRetry={onRetry} compact={compactError} />;
    }

    if (isEmpty) {
        return <EmptyView message={emptyMessage} action={emptyAction} />;
    }

    return <>{children}</>;
};

export { Skeleton, ErrorView, EmptyView };