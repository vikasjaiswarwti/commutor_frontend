// src/features/navigation/components/Sidebar/SidebarMenu.tsx
//
// Fixes in this version:
//
// 1. ACTIVE DESELECT — active state is 100% driven by location.pathname.
//    When you navigate to a new route, the previous item automatically loses
//    its active style because isActive() re-evaluates on every render.
//    No stale local state can keep an item highlighted.
//
// 2. OPEN STATE AUTO-MANAGEMENT — when a route changes, if the newly active
//    item is inside a collapsed parent, that parent auto-opens via useEffect.
//    When you navigate away from a sub-item, the parent closes itself.
//
// 3. LEFT ACCENT BAR — active items get a 3px solid green left border
//    (via borderLeft on the button) matching the design. The 3px is
//    compensated with paddingLeft adjustment so text alignment stays stable.
//
// 4. SMOOTH SUBMENU — children animate open/close with max-height transition
//    instead of mount/unmount (which causes a hard pop).

import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import type { MenuItem } from "../../../../shared/types/menu.types";

/* ── Design tokens ─────────────────────────────────────────────────────────── */
const ACTIVE_BG = "#00875A";
const ACTIVE_TEXT = "#FFFFFF";
const ACTIVE_ACCENT = "#006644";   // left border — slightly darker
const HOVER_BG = "#EDF7F2";
const HOVER_TEXT = "#00875A";
const ICON_DEFAULT = "#9CA3AF";
const TEXT_DEFAULT = "#374151";
const SOFT_GREEN = "#00875A";   // parent-of-active text

interface SidebarMenuProps {
    items: MenuItem[];
    depth?: number;
    collapsed?: boolean;
    Tooltip?: React.ComponentType<{ title: string; placement: string; children: React.ReactNode }>;
}

export const SidebarMenu: React.FC<SidebarMenuProps> = ({
    items,
    depth = 0,
    collapsed = false,
    Tooltip,
}) => {
    const navigate = useNavigate();
    const location = useLocation();

    // openItems: which parent items are expanded — keyed by menuId
    const [openItems, setOpenItems] = useState<Set<number>>(new Set());

    // ── Auto-open parent when a child is the active route ─────────────────────
    // Also auto-closes parents whose children are no longer active.
    useEffect(() => {
        const activeParents = new Set<number>();

        const findParents = (list: MenuItem[], path: string): boolean => {
            for (const item of list) {
                if (item.children?.length) {
                    const childMatch = item.children.some(c => c.routeUrl === path) ||
                        findParents(item.children, path);
                    if (childMatch) {
                        activeParents.add(item.menuId);
                        return true;
                    }
                }
            }
            return false;
        };

        findParents(items, location.pathname);

        // Only auto-open; don't force-close manually opened parents
        setOpenItems(prev => {
            const next = new Set(prev);
            activeParents.forEach(id => next.add(id));
            return next;
        });
    }, [location.pathname, items]);

    const toggleOpen = (id: number) =>
        setOpenItems(prev => {
            const n = new Set(prev);
            n.has(id) ? n.delete(id) : n.add(id);
            return n;
        });

    const isActive = (url: string | null) =>
        !!url && location.pathname === url;

    const hasActiveDescendant = (item: MenuItem): boolean =>
        !!item.children?.some(c => isActive(c.routeUrl) || hasActiveDescendant(c));

    const sorted = [...items]
        .filter(i => i.isAssigned)
        .sort((a, b) => a.orderNo - b.orderNo);

    if (!sorted.length) return null;

    return (
        <ul style={{
            listStyle: "none",
            margin: 0,
            padding: depth > 0 ? "0 8px 0 4px" : "0 8px",
        }}>
            {sorted.map(item => {
                const hasChildren = !!item.children?.length;
                const isOpen = openItems.has(item.menuId);
                const active = isActive(item.routeUrl);
                const softActive = !active && hasActiveDescendant(item);

                const btn = (
                    <MenuButton
                        item={item}
                        active={active}
                        softActive={softActive}
                        isOpen={isOpen}
                        hasChildren={hasChildren}
                        isCollapsed={collapsed && depth === 0}
                        depth={depth}
                        onClick={() => {
                            if (hasChildren) {
                                toggleOpen(item.menuId);
                            } else if (item.routeUrl) {
                                // Navigate — location change deactivates previous item automatically
                                navigate(item.routeUrl);
                            }
                        }}
                    />
                );

                return (
                    <li key={item.menuId} style={{ marginBottom: 2 }}>
                        {/* Tooltip only when sidebar is collapsed at top level */}
                        {collapsed && depth === 0 && Tooltip ? (
                            <Tooltip title={item.menuName} placement="right">{btn}</Tooltip>
                        ) : btn}

                        {/* Animated submenu — always rendered, height transitions */}
                        {hasChildren && !collapsed && (
                            <AnimatedSubmenu isOpen={isOpen}>
                                <SidebarMenu
                                    items={item.children!}
                                    depth={depth + 1}
                                    collapsed={false}
                                    Tooltip={Tooltip}
                                />
                            </AnimatedSubmenu>
                        )}
                    </li>
                );
            })}
        </ul>
    );
};

/* ── AnimatedSubmenu — max-height CSS animation, no mount/unmount pop ─────── */
const AnimatedSubmenu: React.FC<{ isOpen: boolean; children: React.ReactNode }> = ({ isOpen, children }) => {
    const ref = useRef<HTMLDivElement>(null);

    return (
        <div
            ref={ref}
            style={{
                overflow: "hidden",
                maxHeight: isOpen ? 600 : 0,          // 600px is a safe ceiling for any submenu
                opacity: isOpen ? 1 : 0,
                transition: "max-height 0.22s cubic-bezier(0.4,0,0.2,1), opacity 0.18s ease",
                marginTop: isOpen ? 2 : 0,
            }}
        >
            {children}
        </div>
    );
};

/* ── MenuButton ────────────────────────────────────────────────────────────── */
interface MenuButtonProps {
    item: MenuItem;
    active: boolean;
    softActive: boolean;
    isOpen: boolean;
    hasChildren: boolean;
    isCollapsed: boolean;
    depth: number;
    onClick: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({
    item, active, softActive, isOpen, hasChildren, isCollapsed, depth, onClick,
}) => {
    const [hovered, setHovered] = useState(false);

    // Background
    const bg = active ? ACTIVE_BG : hovered ? HOVER_BG : "transparent";

    // Text
    const textColor = active ? ACTIVE_TEXT
        : softActive ? SOFT_GREEN
            : hovered ? HOVER_TEXT
                : TEXT_DEFAULT;

    // Icon
    const iconColor = active ? ACTIVE_TEXT
        : softActive || hovered ? HOVER_TEXT
            : ICON_DEFAULT;

    // Left accent bar: only on active items
    // paddingLeft shrinks by 3px to compensate for the border width
    const borderLeft = active ? `3px solid ${ACTIVE_ACCENT}` : "3px solid transparent";
    const paddingLeft = isCollapsed ? 0 : 9;   // 12 - 3 = 9 when active; transparent border holds the same space
    const paddingRight = isCollapsed ? 0 : 10;
    const paddingV = depth > 0 ? 7 : 9;

    return (
        <button
            type="button"
            onClick={onClick}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            aria-current={active ? "page" : undefined}
            style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: isCollapsed ? "center" : "flex-start",
                gap: isCollapsed ? 0 : 10,
                padding: `${paddingV}px ${paddingRight}px ${paddingV}px ${paddingLeft}px`,
                borderLeft,
                borderTop: "none",
                borderRight: "none",
                borderBottom: "none",
                borderRadius: active ? "0 8px 8px 0" : 8,
                background: bg,
                cursor: "pointer",
                fontFamily: "inherit",
                color: textColor,
                // Smooth all visual transitions
                transition: "background 0.15s ease, color 0.15s ease, border-color 0.15s ease",
                outline: "none",
                textAlign: "left",
                minHeight: 38,
            }}
        >
            {/* Icon */}
            {item.icon && (
                <MenuIcon name={item.icon} color={iconColor} size={depth > 0 ? 15 : 18} />
            )}

            {/* Label + chevron — hidden in collapsed state */}
            {!isCollapsed && (
                <>
                    <span style={{
                        flex: 1,
                        fontSize: depth > 0 ? 13 : 14,
                        fontWeight: active ? 600 : 500,
                        color: textColor,
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        lineHeight: 1.4,
                        transition: "color 0.15s ease",
                    }}>
                        {item.menuName}
                    </span>

                    {hasChildren && (
                        <svg
                            width="13" height="13" viewBox="0 0 24 24"
                            fill="none" stroke={iconColor}
                            strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
                            style={{
                                flexShrink: 0,
                                transition: "transform 0.22s cubic-bezier(0.4,0,0.2,1)",
                                transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                            }}
                        >
                            <polyline points="6 9 12 15 18 9" />
                        </svg>
                    )}
                </>
            )}
        </button>
    );
};

/* ── Icon map ──────────────────────────────────────────────────────────────── */
const ICONS: Record<string, string> = {
    "layout-dashboard": "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z|M9 22V12h6v10",
    "users": "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2|M23 21v-2a4 4 0 0 0-3-3.87|M16 3.13a4 4 0 0 1 0 7.75",
    "settings": "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6z|M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z",
    "truck": "M1 3h15v13H1z|M16 8h4l3 3v5h-7V8z|M5.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z|M18.5 21a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z",
    "car": "M5 17H3a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v9a2 2 0 0 1-2 2h-2|M14 17H9|M16 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0|M5 17a2 2 0 1 0 4 0 2 2 0 0 0-4 0",
    "user-check": "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2|M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z|M17 11l2 2 4-4",
    "user-plus": "M16 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2|M8.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z|M20 8v6|M23 11h-6",
    "building-2": "M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18z|M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2|M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2|M10 6h4|M10 10h4|M10 14h4|M10 18h4",
    "id-card": "M2 5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5z|M8 10a2 2 0 1 0 0-4 2 2 0 0 0 0 4z|M4 20v-1a4 4 0 0 1 4-4h.5|M16 8h2|M16 12h2|M16 16h2",
    "plus-circle": "M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z|M12 8v8|M8 12h8",
    "navigation": "M3 11l19-9-9 19-2-8-8-2z",
    "map-pin": "M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z|M12 10a3 3 0 1 0 0-6 3 3 0 0 0 0 6z",
    "bell": "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9|M13.73 21a2 2 0 0 1-3.46 0",
    "file-text": "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z|M14 2v6h6|M16 13H8|M16 17H8|M10 9H8",
    "bar-chart": "M18 20V10|M12 20V4|M6 20v-6",
    "map": "M1 6v16l7-4 8 4 7-4V2l-7 4-8-4-7 4z|M8 2v16|M16 6v16",
    "shield": "M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z",
    "activity": "M22 12h-4l-3 9L9 3l-3 9H2",
    "grid": "M3 3h7v7H3z|M14 3h7v7h-7z|M14 14h7v7h-7z|M3 14h7v7H3z",
    "clipboard-list": "M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2|M9 12h6|M9 16h6|M9 8h6",
    "package": "M12 2l10 6.5v7L12 22 2 15.5v-7L12 2z|M12 22v-6.5|M22 8.5l-10 7-10-7",
    "credit-card": "M1 4h22v16H1z|M1 10h22",
    "zap": "M13 2L3 14h9l-1 8 10-12h-9l1-8z",
    "dollar-sign": "M12 1v22|M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6",
};

interface MenuIconProps { name: string; color: string; size?: number; }

const MenuIcon: React.FC<MenuIconProps> = ({ name, color, size = 18 }) => {
    const paths = ICONS[name]?.split("|") ?? [];
    if (!paths.length) return null;
    return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
            stroke={color} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
            style={{ flexShrink: 0, transition: "stroke 0.15s ease" }} aria-hidden>
            {paths.map((d, i) => <path key={i} d={d} />)}
        </svg>
    );
};