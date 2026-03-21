// src/features/navigation/components/Header/Header.tsx
// Design spec from Home_Dashboard.png:
//   • White background, 64px height, sticky top z-99
//   • Left:  "ASND Tech." org name (bold, ~16px)
//   • Right: "Play Sound" label + No/Yes toggle switch
//            Bell icon with green dot badge
//            Avatar circle (initials) + org name + chevron dropdown
//   • NO sidebar toggle in header — toggle lives inside the Sidebar component
//   • Pure inline styles — zero Tailwind/AntD class conflicts

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../auth/hooks/useAuth";
import { useUILibrary } from "../../../../shared/lib/ui-lib/ui-library-context";

const GREEN = "#00A86B";
const HEADER_H = 64;

export const Header: React.FC = () => {
    const { user, logout } = useAuth();

    // const { Dropdown, Switch } = useUILibrary();

    const navigate = useNavigate();
    const [playSoundEnabled, setPlaySoundEnabled] = useState(false);

    const initials = [user?.firstName?.[0], user?.lastName?.[0]]
        .filter(Boolean).join("").toUpperCase() || "AM";

    const orgName = (user as any)?.organizationName || "ASND Tech.";

    const dropdownItems = {
        items: [
            { key: "profile", label: "Profile", onClick: () => navigate("/profile") },
            { key: "settings", label: "Settings", onClick: () => navigate("/settings") },
            { type: "divider" as const },
            { key: "logout", label: "Log out", danger: true, onClick: logout },
        ],
    };

    return (
        <header style={s.header}>
            {/* ── Left: org name ───────────────────────────────────── */}
            <span style={s.orgName}>{orgName}</span>

            {/* ── Right: controls ──────────────────────────────────── */}
            <div style={s.rightGroup}>

                {/* Play Sound toggle */}
                <div style={s.playSoundWrap}>
                    <span style={s.playSoundLabel}>Play Sound</span>
                    <span style={{ ...s.toggleLabel, color: !playSoundEnabled ? "#111827" : "#9CA3AF" }}>No</span>
                    {/* <Switch
                        size="small"
                        checked={playSoundEnabled}
                        onChange={setPlaySoundEnabled}
                        style={{ backgroundColor: playSoundEnabled ? GREEN : undefined }}
                    /> */}
                    <span style={{ ...s.toggleLabel, color: playSoundEnabled ? GREEN : "#9CA3AF" }}>Yes</span>
                </div>

                {/* Bell */}
                <button style={s.iconBtn} aria-label="Notifications">
                    <BellIcon />
                    <span style={s.badge} />
                </button>

                {/* Avatar + name + chevron — opens dropdown */}
                {/* <Dropdown menu={dropdownItems} trigger={["click"]} placement="bottomRight">
                    <button style={s.avatarBtn}>
                        <div style={s.avatar}>{initials}</div>
                        <ChevronDownIcon />
                    </button>
                </Dropdown> */}
            </div>
        </header>
    );
};

const s: Record<string, React.CSSProperties> = {
    header: {
        position: "sticky",
        top: 0,
        zIndex: 99,
        height: HEADER_H,
        background: "#ffffff",
        borderBottom: "1px solid #f0f0f0",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 24px",
        boxSizing: "border-box",
        width: "100%",
        flexShrink: 0,
    },
    orgName: {
        fontSize: 16,
        fontWeight: 700,
        color: "#111827",
        letterSpacing: "-0.01em",
    },
    rightGroup: {
        display: "flex",
        alignItems: "center",
        gap: 20,
    },
    playSoundWrap: {
        display: "flex",
        alignItems: "center",
        gap: 6,
    },
    playSoundLabel: {
        fontSize: 13,
        color: "#6B7280",
        marginRight: 4,
    },
    toggleLabel: {
        fontSize: 12,
        fontWeight: 600,
        minWidth: 16,
        textAlign: "center" as const,
    },
    iconBtn: {
        position: "relative",
        background: "none",
        border: "none",
        padding: 6,
        cursor: "pointer",
        color: "#6B7280",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 8,
    },
    badge: {
        position: "absolute",
        top: 6,
        right: 6,
        width: 8,
        height: 8,
        background: GREEN,
        borderRadius: "50%",
        border: "2px solid #fff",
    },
    avatarBtn: {
        background: "none",
        border: "none",
        padding: "4px 6px",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        gap: 8,
        borderRadius: 8,
    },
    avatar: {
        width: 32,
        height: 32,
        borderRadius: "50%",
        background: GREEN,
        color: "#fff",
        fontSize: 12,
        fontWeight: 700,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
    },
};

const BellIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
        <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
);

const ChevronDownIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#9CA3AF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);