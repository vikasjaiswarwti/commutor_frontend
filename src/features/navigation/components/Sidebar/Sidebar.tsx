// // src/features/navigation/components/Sidebar/Sidebar.tsx
// // Design spec:
// //   Expanded  (260px): COMMUTR logo mark + wordmark top-left, "<<" button top-right
// //   Collapsed  (64px): NO logo — only ">>" expand arrow at top, then icon-only menu
// //   Both states: bottom has v1.0.0 label when expanded
// //   Active item background: dark green #00875A (NOT #00A86B — see design)

// import React from "react";
// import { useNavigation } from "../../hooks/useNavigation";
// import { SidebarMenu } from "./SidebarMenu";
// import { useUILibrary } from "../../../../shared/lib/ui-lib/ui-library-context";
// import CommutrLogoSrc from "../../../../assets/Commutor-Logo.png";

// const EXPANDED_W = 260;
// const COLLAPSED_W = 64;

// export const Sidebar: React.FC = () => {
//     const { menuItems, collapsed, toggleSidebar, isLoading } = useNavigation();

//     const { Sider, Tooltip } = useUILibrary();

//     return (
//         <Sider
//             width={EXPANDED_W}
//             collapsedWidth={COLLAPSED_W}
//             collapsed={collapsed}
//             collapsible={false}
//             theme="light"
//             style={{
//                 height: "100vh",
//                 position: "fixed",
//                 left: 0,
//                 top: 0,
//                 bottom: 0,
//                 overflowX: "hidden",
//                 overflowY: "hidden",
//                 zIndex: 100,
//                 background: "#ffffff",
//                 borderRight: "1px solid #f0f0f0",
//                 boxShadow: "2px 0 8px rgba(0,0,0,0.05)",
//                 transition: "width 0.2s ease",
//             }}
//         >
//             <div style={shell}>
//                 {/* ── Top bar ─────────────────────────────────────────── */}
//                 {collapsed ? (
//                     /* Collapsed: NO logo — only expand arrow */
//                     <div style={topBarCollapsed}>
//                         <button
//                             onClick={toggleSidebar}
//                             style={iconBtnStyle}
//                             aria-label="Expand sidebar"
//                             title="Expand sidebar"
//                         >
//                             <ChevronsRightIcon />
//                         </button>
//                     </div>
//                 ) : (
//                     /* Expanded: logo + collapse button */
//                     <div style={topBarExpanded}>
//                         <div style={logoWrap}>
//                             <LogoMark />
//                             <img
//                                 src={CommutrLogoSrc}
//                                 alt="COMMUTR"
//                                 style={logoImg}
//                                 onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
//                             />
//                         </div>
//                         <button
//                             onClick={toggleSidebar}
//                             style={iconBtnStyle}
//                             aria-label="Collapse sidebar"
//                             title="Collapse sidebar"
//                         >
//                             <ChevronsLeftIcon />
//                         </button>
//                     </div>
//                 )}

//                 {/* ── Menu ─────────────────────────────────────────────── */}
//                 <nav style={navStyle} className="scrollbar-thin">
//                     {isLoading ? (
//                         <div style={loadingWrap}>
//                             <div style={spinnerStyle} />
//                         </div>
//                     ) : (
//                         <SidebarMenu
//                             items={menuItems}
//                             depth={0}
//                             collapsed={collapsed}
//                             Tooltip={Tooltip}
//                         />
//                     )}
//                 </nav>

//                 {/* ── Version footer (expanded only) ───────────────────── */}
//                 {!collapsed && (
//                     <div style={footer}>
//                         <span style={footerText}>v1.0.0</span>
//                     </div>
//                 )}
//             </div>
//         </Sider>
//     );
// };

// /* ── Styles ──────────────────────────────────────────────────────────────── */
// const shell: React.CSSProperties = {
//     display: "flex",
//     flexDirection: "column",
//     height: "100%",
// };
// const topBarExpanded: React.CSSProperties = {
//     height: 64,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "space-between",
//     padding: "0 12px 0 20px",
//     borderBottom: "1px solid #f0f0f0",
//     flexShrink: 0,
// };
// const topBarCollapsed: React.CSSProperties = {
//     height: 64,
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     borderBottom: "1px solid #f0f0f0",
//     flexShrink: 0,
// };
// const logoWrap: React.CSSProperties = {
//     display: "flex",
//     alignItems: "center",
//     gap: 8,
//     overflow: "hidden",
//     minWidth: 0,
// };
// const logoImg: React.CSSProperties = {
//     height: 22,
//     width: "auto",
//     objectFit: "contain",
//     flexShrink: 0,
// };
// const iconBtnStyle: React.CSSProperties = {
//     background: "none",
//     border: "none",
//     padding: 6,
//     cursor: "pointer",
//     color: "#9CA3AF",
//     display: "flex",
//     alignItems: "center",
//     justifyContent: "center",
//     borderRadius: 6,
//     flexShrink: 0,
// };
// const navStyle: React.CSSProperties = {
//     flex: 1,
//     overflowY: "auto",
//     overflowX: "hidden",
//     padding: "8px 0",
// };
// const loadingWrap: React.CSSProperties = {
//     display: "flex",
//     justifyContent: "center",
//     paddingTop: 32,
// };
// const spinnerStyle: React.CSSProperties = {
//     width: 22,
//     height: 22,
//     borderRadius: "50%",
//     border: "2.5px solid #E5E7EB",
//     borderTopColor: "#00A86B",
//     animation: "spin 0.8s linear infinite",
// };
// const footer: React.CSSProperties = {
//     padding: "12px 16px",
//     borderTop: "1px solid #f0f0f0",
//     flexShrink: 0,
// };
// const footerText: React.CSSProperties = {
//     fontSize: 11,
//     color: "#9CA3AF",
//     display: "block",
//     textAlign: "center",
// };

// /* ── SVG icons ────────────────────────────────────────────────────────────── */
// const LogoMark = () => (
//     <svg width="32" height="13" viewBox="0 0 36 14" fill="none" aria-hidden style={{ flexShrink: 0 }}>
//         <circle cx="4" cy="7" r="4" fill="#00A86B" />
//         <line x1="10" y1="7" x2="24" y2="7" stroke="#00A86B" strokeWidth="2" strokeLinecap="round" />
//         <circle cx="32" cy="7" r="3.5" stroke="#00A86B" strokeWidth="1.5" fill="none" />
//     </svg>
// );

// const ChevronsLeftIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" />
//     </svg>
// );

// const ChevronsRightIcon = () => (
//     <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
//         <polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" />
//     </svg>
// );



// src/features/navigation/components/Sidebar/Sidebar.tsx
// Key fix: replaced AntD <Sider> with a plain <div>.
//
// Why: AntD Sider sets `overflow: hidden` on the root element which hard-clips
// content the instant the width starts animating, making the collapse look
// like a sudden cut instead of a smooth slide.
// A plain div with `overflow: hidden` + CSS `transition: width` animates
// the container width while the inner content fades with `opacity` + `width`
// transitions of their own — giving a truly smooth feel.
//
// Collapse behaviour:
//   Expanded (260px): logo mark + wordmark, "<<" chevron top-right
//   Collapsed (64px): NO logo, ">>" chevron top-center, icon-only menu

import React from "react";
import { useNavigation } from "../../hooks/useNavigation";
import { SidebarMenu } from "./SidebarMenu";
import { useUILibrary } from "../../../../shared/lib/ui-lib/ui-library-context";
import CommutrLogoSrc from "../../../../assets/Commutor-Logo.png";

const EXPANDED_W = 260;
const COLLAPSED_W = 64;

export const Sidebar: React.FC = () => {
    const { menuItems, collapsed, toggleSidebar, isLoading } = useNavigation();
    
    const { Tooltip } = useUILibrary();

    const width = collapsed ? COLLAPSED_W : EXPANDED_W;

    return (
        <>
            {/* ── Sidebar shell ───────────────────────────────────────── */}
            <div
                style={{
                    position: "fixed",
                    left: 0,
                    top: 0,
                    bottom: 0,
                    width,
                    // Smooth width transition — controls the overall slide
                    transition: "width 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
                    zIndex: 100,
                    background: "#ffffff",
                    borderRight: "1px solid #f0f0f0",
                    boxShadow: "2px 0 12px rgba(0,0,0,0.06)",
                    display: "flex",
                    flexDirection: "column",
                    overflow: "hidden",   // clips content as width shrinks
                }}
            >
                {/* ── Top bar ─────────────────────────────────────────── */}
                <div style={{
                    height: 64,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: collapsed ? "center" : "space-between",
                    padding: collapsed ? "0 14px" : "0 12px 0 20px",
                    borderBottom: "1px solid #f0f0f0",
                    flexShrink: 0,
                    // Fade transition so logo doesn't abruptly snap
                    transition: "padding 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
                }}>
                    {/* Logo — fades out when collapsed */}
                    <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        overflow: "hidden",
                        // Collapsed: shrink to zero width + fade out
                        width: collapsed ? 0 : "auto",
                        opacity: collapsed ? 0 : 1,
                        transition: "opacity 0.18s ease, width 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
                        pointerEvents: collapsed ? "none" : "auto",
                        flexShrink: 0,
                        whiteSpace: "nowrap",
                    }}>
                        <LogoMark />
                        <img
                            src={CommutrLogoSrc}
                            alt="COMMUTR"
                            style={{ height: 22, width: "auto", objectFit: "contain", flexShrink: 0 }}
                            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
                        />
                    </div>

                    {/* Collapse / Expand toggle */}
                    <CollapseButton collapsed={collapsed} onClick={toggleSidebar} />
                </div>

                {/* ── Menu ─────────────────────────────────────────────── */}
                <nav
                    className="scrollbar-thin"
                    style={{ flex: 1, overflowY: "auto", overflowX: "hidden", padding: "8px 0" }}
                >
                    {isLoading ? (
                        <div style={{ display: "flex", justifyContent: "center", paddingTop: 32 }}>
                            <div style={{
                                width: 22, height: 22,
                                borderRadius: "50%",
                                border: "2.5px solid #E5E7EB",
                                borderTopColor: "#00A86B",
                                animation: "spin 0.8s linear infinite",
                            }} />
                        </div>
                    ) : (
                        <SidebarMenu
                            items={menuItems}
                            depth={0}
                            collapsed={collapsed}
                            Tooltip={Tooltip}
                        />
                    )}
                </nav>

                {/* ── Version footer ────────────────────────────────────── */}
                <div style={{
                    borderTop: "1px solid #f0f0f0",
                    padding: "10px 0",
                    flexShrink: 0,
                    opacity: collapsed ? 0 : 1,
                    transition: "opacity 0.15s ease",
                }}>
                    <span style={{ display: "block", textAlign: "center", fontSize: 11, color: "#9CA3AF" }}>
                        v1.0.0
                    </span>
                </div>
            </div>

            {/* ── Keyframe injection (once) ──────────────────────────── */}
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </>
    );
};

/* ── Sub-components ────────────────────────────────────────────────────────── */

const CollapseButton: React.FC<{ collapsed: boolean; onClick: () => void }> = ({ collapsed, onClick }) => (
    <button
        onClick={onClick}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        style={{
            background: "none",
            border: "none",
            padding: 6,
            cursor: "pointer",
            color: "#9CA3AF",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 6,
            flexShrink: 0,
            transition: "color 0.15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = "#374151")}
        onMouseLeave={e => (e.currentTarget.style.color = "#9CA3AF")}
    >
        {collapsed ? <ChevronsRightIcon /> : <ChevronsLeftIcon />}
    </button>
);

const LogoMark = () => (
    <svg width="32" height="13" viewBox="0 0 36 14" fill="none" aria-hidden style={{ flexShrink: 0 }}>
        <circle cx="4" cy="7" r="4" fill="#00A86B" />
        <line x1="10" y1="7" x2="24" y2="7" stroke="#00A86B" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="7" r="3.5" stroke="#00A86B" strokeWidth="1.5" fill="none" />
    </svg>
);

const ChevronsLeftIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="11 17 6 12 11 7" /><polyline points="18 17 13 12 18 7" />
    </svg>
);

const ChevronsRightIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="13 17 18 12 13 7" /><polyline points="6 17 11 12 6 7" />
    </svg>
);