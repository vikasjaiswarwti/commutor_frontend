// src/features/dashboard/pages/DashboardPage.tsx
// Dummy dashboard matching Home_Dashboard.png exactly:
//   1. Green banner — "Global Network Status / Total Vendors: 1,248 Active Partners"
//   2. Page title + filters row (Office, Period, Date Range, Export)
//   3. Admin Panel / User Dashboard tab strip + Add widget button
//   4. 4 stat cards — USERS / NO SHOW / TRIP / OTHER
//   5. Customer Segments card (left) + Activity by Day placeholder (right)
//   6. Total Profit chart placeholder (left) + Repeat Rate + AI Assistant (right)
//   7. Best Selling Products table
// Analytics charts are placeholders for now.

import React, { useState } from "react";

export const DashboardPage: React.FC = () => {
    const [activeTab, setActiveTab] = useState<"admin" | "user">("admin");

    return (
        <div style={s.page}>
            {/* ── 1. Green banner ─────────────────────────────────────── */}
            <div style={s.banner}>
                <div style={s.bannerLeft}>
                    <div style={s.bannerIconWrap}>
                        <GridIcon />
                    </div>
                    <div>
                        <div style={s.bannerSub}>Global Network Status</div>
                        <div style={s.bannerTitle}>Total Vendors: 1,248 Active Partners</div>
                    </div>
                </div>
                <button style={s.viewDirBtn}>View Directories</button>
            </div>

            {/* ── 2. Page title + filters ──────────────────────────────── */}
            <div style={s.titleRow}>
                <h1 style={s.pageTitle}>Dashboard</h1>
            </div>

            <div style={s.filtersRow}>
                <FilterChip label="OFFICE" value="All Global Offices" />
                <FilterChip label="PERIOD" value="Current Quarter" />
                <FilterChip label="DATE RANGE" value="Oct 12 - Nov 12" hasCalendar />
                <button style={s.exportBtn}>
                    <UploadIcon /> Export
                </button>
            </div>

            {/* ── 3. Tabs + Add widget ─────────────────────────────────── */}
            <div style={s.tabsRow}>
                <div style={s.tabs}>
                    <button
                        style={{ ...s.tab, ...(activeTab === "admin" ? s.tabActive : {}) }}
                        onClick={() => setActiveTab("admin")}
                    >Admin Panel</button>
                    <button
                        style={{ ...s.tab, ...(activeTab === "user" ? s.tabActive : {}) }}
                        onClick={() => setActiveTab("user")}
                    >User Dashboard</button>
                </div>
                <button style={s.addWidgetBtn}>+ Add widget</button>
            </div>

            {/* ── 4. Four stat cards ──────────────────────────────────── */}
            <div style={s.statGrid}>
                <StatCard title="USERS" registered={2884} joiners={1234} attritions={873} accent="#00A86B" />
                <StatCard title="NO SHOW" registered={2884} joiners={2884} attritions={2884} accent="#7C3AED" />
                <StatCard title="TRIP" registered={2884} joiners={2884} attritions={2884} accent="#00A86B" />
                <StatCard title="OTHER" registered={2884} joiners={2884} attritions={2884} accent="#7C3AED" />
            </div>

            {/* ── 5. Segments + Activity ───────────────────────────────── */}
            <div style={s.midRow}>
                <div style={{ ...s.card, flex: "1 1 0" }}>
                    <div style={s.cardTitle}>CUSTOMER SEGMENTS</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 24, marginTop: 16 }}>
                        <div style={{ flex: 1 }}>
                            <SegmentBar label="Retailers" value={2884} max={2884} color="#00A86B" />
                            <SegmentBar label="Distributors" value={1432} max={2884} color="#7C3AED" />
                            <SegmentBar label="Wholesalers" value={562} max={2884} color="#7C3AED" />
                        </div>
                        <DonutChart />
                    </div>
                </div>
                <div style={{ ...s.card, flex: "0 0 280px" }}>
                    <div style={s.cardTitleRow}>
                        <span style={s.cardTitle}>Activity by Day</span>
                        <span style={s.moreBtn}>•••</span>
                    </div>
                    <div style={s.chartPlaceholder}>
                        <div style={s.dayLabels}>
                            {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].map(d => (
                                <span key={d} style={{ ...s.dayLabel, color: d === "Tue" ? "#00A86B" : "#9CA3AF", fontWeight: d === "Tue" ? 600 : 400 }}>{d}</span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── 6. Profit chart + Right widgets ─────────────────────── */}
            <div style={s.midRow}>
                {/* Total Profit */}
                <div style={{ ...s.card, flex: "1 1 0", minWidth: 0 }}>
                    <div style={s.profitHeader}>
                        <div>
                            <div style={s.profitLabel}>Total Profit</div>
                            <div style={s.profitValue}>$446.7K <span style={s.profitBadge}>+24.4% vs last month</span></div>
                        </div>
                        <div style={s.legendRow}>
                            <LegendDot color="#00A86B" label="This Month" />
                            <LegendDot color="#D1D5DB" label="Last Month" />
                        </div>
                    </div>
                    <div style={s.chartArea}>
                        <PlaceholderChart />
                    </div>
                    <div style={s.xAxisLabels}>
                        {["JAN 1", "JAN 8", "JAN 15", "JAN 22", "JAN 29"].map(l => (
                            <span key={l} style={s.xLabel}>{l}</span>
                        ))}
                    </div>
                </div>

                {/* Right column */}
                <div style={{ flex: "0 0 280px", display: "flex", flexDirection: "column", gap: 16 }}>
                    {/* Repeat Rate */}
                    <div style={s.card}>
                        <div style={s.cardTitle}>Repeat Rate</div>
                        <div style={{ display: "flex", alignItems: "center", gap: 16, marginTop: 12 }}>
                            <RepeatRateDonut />
                            <div>
                                <div style={{ fontSize: 12, color: "#6B7280" }}>vs Average (54%)</div>
                                <div style={{ fontSize: 13, color: "#374151", marginTop: 4, lineHeight: 1.5 }}>
                                    Your customer loyalty is{" "}
                                    <span style={{ color: "#00A86B", fontWeight: 600 }}>14% higher</span> than the industry benchmark.
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* AI Assistant */}
                    <div style={s.card}>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                            <div style={s.aiIcon}><SparkleIcon /></div>
                            <span style={{ fontSize: 14, fontWeight: 600, color: "#111827" }}>AI Assistant</span>
                        </div>
                        <p style={{ margin: 0, fontSize: 13, color: "#374151", lineHeight: 1.6 }}>
                            "Your Xbox Controllers are trending. Should I increase the stock by 20%?"
                        </p>
                        <div style={s.aiInputRow}>
                            <span style={{ fontSize: 13, color: "#9CA3AF" }}>Ask me anything…</span>
                            <button style={s.sendBtn}><SendIcon /></button>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── 7. Best Selling Products table ──────────────────────── */}
            <div style={{ ...s.card, marginTop: 0 }}>
                <div style={s.tableHeader}>
                    <span style={s.tableTitle}>BEST SELLING PRODUCTS</span>
                    <button style={s.viewAllBtn}>View all catalog</button>
                </div>
                <table style={s.table}>
                    <thead>
                        <tr>
                            {["ID", "PRODUCT NAME", "SOLD", "REVENUE", "RATING", "ACTIONS"].map(h => (
                                <th key={h} style={s.th}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {PRODUCTS.map((p, i) => (
                            <tr key={i} style={s.tr}>
                                <td style={s.td}>{p.id}</td>
                                <td style={{ ...s.td, display: "flex", alignItems: "center", gap: 10 }}>
                                    <div style={{ ...s.productThumb, background: p.thumbBg }}>
                                        <img src={p.thumb} alt={p.name} style={s.thumbImg}
                                            onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                                    </div>
                                    <span style={s.productName}>{p.name}</span>
                                </td>
                                <td style={s.td}>{p.sold.toLocaleString()}</td>
                                <td style={s.td}>{p.revenue}</td>
                                <td style={s.td}>
                                    <span style={s.rating}>★ {p.rating}</span>
                                </td>
                                <td style={s.td}>
                                    <button style={s.actionBtn}>
                                        <ActionIcon />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default DashboardPage;

/* ── Sub-components ─────────────────────────────────────────────────────── */

const FilterChip: React.FC<{ label: string; value: string; hasCalendar?: boolean }> = ({ label, value, hasCalendar }) => (
    <div style={s.filterChip}>
        <span style={s.filterLabel}>{label}</span>
        <div style={s.filterValue}>
            {value}
            {hasCalendar && <span style={{ marginLeft: 4 }}>📅</span>}
            <ChevronDownSmIcon />
        </div>
    </div>
);

const StatCard: React.FC<{ title: string; registered: number; joiners: number; attritions: number; accent: string }> = ({
    title, registered, joiners, attritions, accent,
}) => (
    <div style={s.statCard}>
        <div style={s.statTitle}>{title}</div>
        <StatRow label="Registered users" value={registered} />
        <StatRow label="New joiners" value={joiners} />
        <StatRow label="Attritions" value={attritions} />
        <div style={{ ...s.statBar, background: accent }} />
    </div>
);

const StatRow: React.FC<{ label: string; value: number }> = ({ label, value }) => (
    <div style={s.statRow}>
        <span style={s.statRowLabel}>{label}</span>
        <span style={s.statRowValue}>{value.toLocaleString()}</span>
    </div>
);

const SegmentBar: React.FC<{ label: string; value: number; max: number; color: string }> = ({ label, value, max, color }) => (
    <div style={{ marginBottom: 14 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
            <span style={{ fontSize: 13, color: "#374151" }}>{label}</span>
            <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{value.toLocaleString()}</span>
        </div>
        <div style={{ height: 6, background: "#F3F4F6", borderRadius: 4, overflow: "hidden" }}>
            <div style={{ height: "100%", width: `${(value / max) * 100}%`, background: color, borderRadius: 4 }} />
        </div>
    </div>
);

const DonutChart: React.FC = () => (
    <div style={{ flexShrink: 0, textAlign: "center" as const }}>
        <svg width="88" height="88" viewBox="0 0 88 88">
            <circle cx="44" cy="44" r="34" fill="none" stroke="#E5E7EB" strokeWidth="12" />
            <circle cx="44" cy="44" r="34" fill="none" stroke="#7C3AED" strokeWidth="12"
                strokeDasharray="80 134" strokeDashoffset="25" strokeLinecap="round" />
            <circle cx="44" cy="44" r="34" fill="none" stroke="#00A86B" strokeWidth="12"
                strokeDasharray="134 80" strokeDashoffset="-55" strokeLinecap="round" />
        </svg>
        <div style={{ fontSize: 18, fontWeight: 700, color: "#111827", marginTop: -52, marginBottom: 36 }}>4,878</div>
        <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 16 }}>TOTAL</div>
    </div>
);

const RepeatRateDonut: React.FC = () => (
    <div style={{ position: "relative", flexShrink: 0 }}>
        <svg width="72" height="72" viewBox="0 0 72 72">
            <circle cx="36" cy="36" r="28" fill="none" stroke="#E5E7EB" strokeWidth="8" />
            <circle cx="36" cy="36" r="28" fill="none" stroke="#00A86B" strokeWidth="8"
                strokeDasharray="106 68" strokeDashoffset="25" strokeLinecap="round" />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#111827" }}>68%</div>
    </div>
);

const PlaceholderChart: React.FC = () => (
    <svg width="100%" height="140" viewBox="0 0 500 140" preserveAspectRatio="none">
        <defs>
            <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#00A86B" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#00A86B" stopOpacity="0" />
            </linearGradient>
        </defs>
        <path d="M0 120 C60 110 100 80 160 60 C220 40 280 30 340 20 C380 14 440 18 500 15" fill="none" stroke="#00A86B" strokeWidth="2.5" />
        <path d="M0 120 C60 110 100 80 160 60 C220 40 280 30 340 20 C380 14 440 18 500 15 L500 140 L0 140Z" fill="url(#chartGrad)" />
        <path d="M0 130 C80 125 160 128 240 122 C320 116 400 120 500 118" fill="none" stroke="#D1D5DB" strokeWidth="1.5" strokeDasharray="4 3" />
    </svg>
);

const LegendDot: React.FC<{ color: string; label: string }> = ({ color, label }) => (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
        <span style={{ fontSize: 12, color: "#6B7280" }}>{label}</span>
    </div>
);

/* ── Product data ──────────────────────────────────────────────────────────── */
const PRODUCTS = [
    { id: "#SH-9821", name: "Hybrid Active Noise Cancelling", sold: 1842, revenue: "$165,320", rating: 4.8, thumb: "", thumbBg: "#1F2937" },
    { id: "#SH-2245", name: "Casio G-Shock Digital", sold: 1204, revenue: "$84,280", rating: 4.9, thumb: "", thumbBg: "#374151" },
    { id: "#SH-7712", name: "SAMSUNG Galaxy S25 Ultra", sold: 982, revenue: "$1,227,500", rating: 4.7, thumb: "", thumbBg: "#4B5563" },
    { id: "#SH-1109", name: "Xbox Wireless Controller", sold: 845, revenue: "$54,925", rating: 4.8, thumb: "", thumbBg: "#111827" },
    { id: "#SH-4322", name: "Timex Men's Easy Reader", sold: 654, revenue: "$29,430", rating: 4.6, thumb: "", thumbBg: "#6B7280" },
];

/* ── Styles ─────────────────────────────────────────────────────────────── */
const s: Record<string, React.CSSProperties> = {
    page: { display: "flex", flexDirection: "column", gap: 20, fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" },
    banner: { background: "linear-gradient(135deg,#00875A 0%,#00A86B 60%,#00C47A 100%)", borderRadius: 12, padding: "20px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "relative", overflow: "hidden" },
    bannerLeft: { display: "flex", alignItems: "center", gap: 16 },
    bannerIconWrap: { width: 40, height: 40, background: "rgba(255,255,255,0.2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 },
    bannerSub: { fontSize: 12, color: "rgba(255,255,255,0.8)", marginBottom: 4 },
    bannerTitle: { fontSize: 18, fontWeight: 700, color: "#fff" },
    viewDirBtn: { background: "#fff", color: "#00875A", border: "none", borderRadius: 8, padding: "9px 18px", fontSize: 13, fontWeight: 600, cursor: "pointer" },
    titleRow: { marginBottom: -8 },
    pageTitle: { fontSize: 28, fontWeight: 700, color: "#111827", margin: 0 },
    filtersRow: { display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" as const },
    filterChip: { border: "1px solid #E5E7EB", borderRadius: 8, padding: "6px 12px", background: "#fff", display: "flex", flexDirection: "column" as const, gap: 2 },
    filterLabel: { fontSize: 10, fontWeight: 600, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: "0.06em" },
    filterValue: { fontSize: 13, color: "#374151", fontWeight: 500, display: "flex", alignItems: "center", gap: 6 },
    exportBtn: { marginLeft: "auto", display: "flex", alignItems: "center", gap: 6, background: "#fff", border: "1px solid #E5E7EB", borderRadius: 8, padding: "8px 14px", fontSize: 13, fontWeight: 600, color: "#374151", cursor: "pointer" },
    tabsRow: { display: "flex", alignItems: "center", justifyContent: "space-between" },
    tabs: { display: "flex", gap: 4 },
    tab: { background: "#F9FAFB", border: "1px solid #E5E7EB", borderRadius: 6, padding: "7px 16px", fontSize: 13, color: "#6B7280", cursor: "pointer", fontFamily: "inherit" },
    tabActive: { background: "#fff", color: "#111827", fontWeight: 600, borderColor: "#D1D5DB" },
    addWidgetBtn: { background: "#00875A", color: "#fff", border: "none", borderRadius: 8, padding: "9px 16px", fontSize: 13, fontWeight: 600, cursor: "pointer" },
    statGrid: { display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 },
    statCard: { background: "#fff", border: "1px solid #F0F0F0", borderRadius: 12, padding: "20px" },
    statTitle: { fontSize: 13, fontWeight: 700, color: "#374151", letterSpacing: "0.04em", marginBottom: 16 },
    statRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 },
    statRowLabel: { fontSize: 13, color: "#6B7280" },
    statRowValue: { fontSize: 13, fontWeight: 600, color: "#111827" },
    statBar: { height: 4, borderRadius: 2, marginTop: 12 },
    midRow: { display: "flex", gap: 16, alignItems: "flex-start" },
    card: { background: "#fff", border: "1px solid #F0F0F0", borderRadius: 12, padding: "20px" },
    cardTitle: { fontSize: 12, fontWeight: 700, color: "#374151", textTransform: "uppercase" as const, letterSpacing: "0.06em" },
    cardTitleRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
    moreBtn: { fontSize: 16, color: "#9CA3AF", cursor: "pointer", letterSpacing: "0.1em" },
    chartPlaceholder: { minHeight: 80 },
    dayLabels: { display: "flex", justifyContent: "space-between", marginTop: 60 },
    dayLabel: { fontSize: 11 },
    profitHeader: { display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 },
    profitLabel: { fontSize: 13, color: "#6B7280", marginBottom: 4 },
    profitValue: { fontSize: 26, fontWeight: 700, color: "#111827" },
    profitBadge: { fontSize: 12, color: "#00875A", fontWeight: 600 },
    legendRow: { display: "flex", flexDirection: "column" as const, gap: 6, alignItems: "flex-end" },
    chartArea: { margin: "8px 0 4px" },
    xAxisLabels: { display: "flex", justifyContent: "space-between" },
    xLabel: { fontSize: 11, color: "#9CA3AF" },
    aiIcon: { width: 32, height: 32, background: "linear-gradient(135deg,#6366F1,#8B5CF6)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" },
    aiInputRow: { display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 12, borderTop: "1px solid #F0F0F0", paddingTop: 10 },
    sendBtn: { background: "none", border: "none", cursor: "pointer", color: "#00A86B", display: "flex", padding: 0 },
    tableHeader: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 },
    tableTitle: { fontSize: 12, fontWeight: 700, color: "#374151", textTransform: "uppercase" as const, letterSpacing: "0.06em" },
    viewAllBtn: { background: "none", border: "none", fontSize: 13, color: "#00A86B", fontWeight: 600, cursor: "pointer" },
    table: { width: "100%", borderCollapse: "collapse" as const },
    th: { textAlign: "left" as const, fontSize: 11, fontWeight: 700, color: "#9CA3AF", textTransform: "uppercase" as const, letterSpacing: "0.06em", padding: "8px 12px", borderBottom: "1px solid #F0F0F0" },
    tr: { borderBottom: "1px solid #F9FAFB" },
    td: { padding: "14px 12px", fontSize: 13, color: "#374151", verticalAlign: "middle" as const },
    productThumb: { width: 36, height: 36, borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", overflow: "hidden", flexShrink: 0 },
    thumbImg: { width: "100%", height: "100%", objectFit: "cover" as const },
    productName: { fontSize: 13, color: "#111827", fontWeight: 500 },
    rating: { color: "#F59E0B", fontWeight: 600, fontSize: 13 },
    actionBtn: { background: "none", border: "none", cursor: "pointer", color: "#6B7280" },
};

/* ── Tiny inline icons ──────────────────────────────────────────────────── */
const GridIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" />
    </svg>
);
const ChevronDownSmIcon = () => (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="6 9 12 15 18 9" />
    </svg>
);
const UploadIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="17 8 12 3 7 8" /><line x1="12" y1="3" x2="12" y2="15" />
    </svg>
);
const SparkleIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
);
const SendIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
);
const ActionIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" /><line x1="8" y1="18" x2="21" y2="18" />
        <line x1="3" y1="6" x2="3.01" y2="6" /><line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
    </svg>
);