
// src/shared/components/layouts/MainLayout/MainLayout.tsx
// Layout contract:
//   • Sidebar: position fixed, left 0, full height — does NOT affect document flow
//   • Content wrapper: marginLeft = sidebar width, transitions with sidebar
//   • Header: sticky top:0 inside the content wrapper — scrolls away only the content
//   • Page bg: #F7F8FA

import React from "react";
import { Outlet } from "react-router-dom";
import { Sidebar } from "../../../../features/navigation/components/Sidebar/Sidebar";
import { Header } from "../../../../features/navigation/components/Header/Header";
import { useNavigation } from "../../../../features/navigation/hooks/useNavigation";



const EXPANDED_W = 260;
const COLLAPSED_W = 64;

export const MainLayout: React.FC = () => {
    const { collapsed } = useNavigation();
    const sidebarW = collapsed ? COLLAPSED_W : EXPANDED_W;

    return (
        <div style={{ minHeight: "100vh", background: "#F7F8FA" }}>
            {/* Fixed sidebar — outside document flow */}
            <Sidebar />

            {/* Main content — offset by sidebar width */}
            <div
                style={{
                    marginLeft: sidebarW,
                    transition: "margin-left 0.22s cubic-bezier(0.4, 0, 0.2, 1)",
                    minHeight: "100vh",
                    display: "flex",
                    flexDirection: "column",
                }}
            >
                {/* Sticky header — sticks to top of THIS column */}
                <Header />

                {/* Scrollable page content */}
                <main
                    style={{
                        flex: 1,
                        padding: "24px",
                        overflowY: "auto",
                        background: "#F7F8FA",
                    }}
                >
                    <Outlet />
                </main>
            </div>
        </div>
    );
};