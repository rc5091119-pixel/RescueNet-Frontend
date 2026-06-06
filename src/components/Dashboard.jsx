import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ─── colour tokens ────────────────────────────────────────────────────────────
const C = {
    bg: "#0a0f0d",
    bg2: "#111916",
    bg3: "#141f18",
    border: "rgba(255,255,255,0.08)",
    borderG: "rgba(34,197,94,0.18)",
    green: "#22c55e",
    greenDim: "rgba(34,197,94,0.12)",
    red: "#ef4444",
    redDim: "rgba(239,68,68,0.15)",
    amber: "#f59e0b",
    amberDim: "rgba(245,158,11,0.15)",
    blue: "#3b82f6",
    blueDim: "rgba(59,130,246,0.15)",
    text: "#f1f5f9",
    muted: "#64748b",
    muted2: "#94a3b8",
};

// ─── tiny shared components ───────────────────────────────────────────────────
const Icon = ({ bg, children, size = 40 }) => (
    <div style={{
        width: size, height: size, borderRadius: 10,
        background: bg, display: "grid", placeItems: "center",
        fontSize: size * 0.42, flexShrink: 0,
    }}>{children}</div>
);

const Badge = ({ color, children }) => (
    <span style={{
        fontSize: 11, fontWeight: 600, padding: "2px 9px",
        borderRadius: 20, color,
        background: color === C.green ? C.greenDim : C.redDim,
    }}>{children}</span>
);

const Btn = ({ label, color = C.green, onClick, full }) => (
    <button onClick={onClick} style={{
        padding: "9px 18px", borderRadius: 8,
        border: `1px solid ${color === C.red ? C.red : C.green}`,
        background: color === C.red ? C.red : "transparent",
        color: color === C.red ? "#fff" : C.green,
        fontSize: 13, fontWeight: 700, cursor: "pointer",
        width: full ? "100%" : "auto",
        letterSpacing: 0.3,
        transition: "opacity 0.15s",
    }}
        onMouseOver={e => e.currentTarget.style.opacity = "0.82"}
        onMouseOut={e => e.currentTarget.style.opacity = "1"}
    >{label}</button>
);

// ─── Navbar ───────────────────────────────────────────────────────────────────
function Navbar({ userName, notifCount, onSOS }) {

    const navigate = useNavigate();
    const tabs = ["Home", "Dashboard", "Location", "SOS", "Notifications", "Groups"];
    const [active, setActive] = useState("Dashboard");
    const [showMenu, setShowMenu] = useState(false);

    return (
        <nav style={{
            position: "sticky", top: 0, zIndex: 100,
            background: "rgba(10,15,13,0.96)",
            borderBottom: `1px solid ${C.border}`,
            backdropFilter: "blur(14px)",
            display: "flex", alignItems: "center",
            padding: "0 28px", height: 56, gap: 32,
        }}>
            {/* Logo */}
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginRight: 12 }}>
                <div style={{
                    width: 30, height: 30, background: C.green,
                    borderRadius: 8, display: "grid", placeItems: "center", fontSize: 15,
                }}>🛡</div>
                <span style={{ fontWeight: 800, fontSize: 16, color: C.text, letterSpacing: -0.5 }}>
                    Rescue<span style={{ color: C.green }}>Net</span>
                </span>
            </div>

            {/* Tabs */}
            {tabs.map((t) => (
                <button
                    key={t}
                    onClick={() => {
                        setActive(t);
                        if (t === "Home")
                            navigate("/");

                        if (t === "Dashboard")
                            navigate("/dashboard");

                        if (t === "Location")
                            navigate("/location");

                        if (t === "SOS")
                            navigate("/create-alert");

                        if (t === "Notifications")
                            navigate("/notifications");

                        if (t === "Groups")
                            navigate("/rooms");
                    }}
                    style={{
                        background: "none", border: "none", cursor: "pointer",
                        color: active === t ? C.green : C.muted2,
                        fontSize: 14, fontWeight: active === t ? 700 : 400,
                        borderBottom: active === t ? `2px solid ${C.green}` : "2px solid transparent",
                        padding: "0 2px", paddingBottom: 2,
                    }}>{t}</button>
            ))}

            <div style={{ flex: 1 }} />
            {/* Bell */}
            <div style={{ position: "relative", cursor: "pointer" }}>
                <span style={{ fontSize: 20 }}>🔔</span>
                {notifCount > 0 && (
                    <span style={{
                        position: "absolute", top: -4, right: -6,
                        background: C.red, color: "#fff",
                        fontSize: 9, fontWeight: 700,
                        width: 16, height: 16, borderRadius: "50%",
                        display: "grid", placeItems: "center",
                    }}>{notifCount}</span>
                )}
            </div>

            <div style={{ position: "relative" }}>
                <div
                    onClick={() => setShowMenu(!showMenu)}
                    style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 9,
                        cursor: "pointer",
                    }}
                >
                    <div
                        style={{
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            background: C.bg3,
                            border: `1px solid ${C.borderG}`,
                            display: "grid",
                            placeItems: "center",
                            fontWeight: 700,
                            color: C.green,
                        }}
                    >
                        {userName[0]?.toUpperCase()}
                    </div>

                    <span style={{ color: C.text }}>
                        {userName}
                    </span>

                    <span style={{ color: C.muted }}>
                        ▼
                    </span>
                </div>

                {showMenu && (
                    <div
                        style={{
                            position: "absolute",
                            top: 45,
                            right: 0,
                            width: 180,
                            background: C.bg2,
                            border: `1px solid ${C.border}`,
                            borderRadius: 10,
                            overflow: "hidden",
                        }}
                    >
                        <div
                            onClick={() => navigate("/profile")}
                            style={{
                                padding: "12px",
                                cursor: "pointer",
                            }}
                        >
                            👤 My Profile
                        </div>

                        <div
                            onClick={() => {
                                localStorage.clear();
                                navigate("/login");
                            }}
                            style={{
                                padding: "12px",
                                cursor: "pointer",
                                color: "#ef4444",
                            }}
                        >
                            🚪 Logout
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}

// ─── Top Action Cards ─────────────────────────────────────────────────────────
function ActionCards({ onSOS }) {
    const navigate = useNavigate();

    const cards = [
        {
            icon: <div style={{ width: 46, height: 46, borderRadius: 12, background: C.redDim, border: `1px solid ${C.red}`, display: "grid", placeItems: "center", fontSize: 20, fontWeight: 800, color: C.red }}>SOS</div>,
            title: "Create Emergency Alert",
            text: "Need immediate help? Send an alert to nearby volunteers instantly.",
            action: <Btn label="⚠ SOS ALERT" color={C.red} full onClick={onSOS} />,
        },
        {
            icon: <Icon bg={C.greenDim} size={46}>📍</Icon>,
            title: "Current Location",
            sub: "Chattogram Division, Bangladesh",
            action: <Btn label="⊕ UPDATE LOCATION" onClick={() => navigate("/location")} full />,
        },
        {
            icon: <div style={{ position: "relative" }}>
                <Icon bg={C.greenDim} size={46}>🔔</Icon>
                <span style={{ position: "absolute", top: -4, right: -4, background: C.green, color: "#000", fontSize: 9, fontWeight: 800, width: 15, height: 15, borderRadius: "50%", display: "grid", placeItems: "center" }}>3</span>
            </div>,
            title: "Notifications",
            text: "You have 3 unread notifications",
            action: <Btn label="VIEW ALL" onClick={() => navigate("/notifications")} full />,
        },
        {
            icon: <Icon bg={C.greenDim} size={46}>👥</Icon>,
            title: "Active Groups",
            text: "You are in 2 active rescue groups",
            action: <Btn label="VIEW GROUPS" onClick={() => navigate("/rooms")} full />,
        },
    ];

    return (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 24 }}>
            {cards.map((c, i) => (
                <div key={i} style={{
                    background: C.bg2, border: `1px solid ${C.borderG}`,
                    borderRadius: 14, padding: "20px 18px",
                    display: "flex", flexDirection: "column", gap: 12,
                }}>
                    {c.icon}
                    <div>
                        <div style={{ fontWeight: 700, fontSize: 14, color: C.text, marginBottom: 4 }}>{c.title}</div>
                        {c.sub && <div style={{ fontSize: 14, color: C.text, fontWeight: 600 }}>{c.sub}</div>}
                        {c.text && <div style={{ fontSize: 12, color: C.muted2 }}>{c.text}</div>}
                    </div>
                    <div style={{ marginTop: "auto" }}>{c.action}</div>
                </div>
            ))}
        </div>
    );
}

// ─── Recent Activity ──────────────────────────────────────────────────────────
function RecentActivity() {
    const navigate = useNavigate();
    const items = [
        { icon: "🚨", iconBg: C.redDim, title: "New alert created by User123", sub: "Medical Emergency · Tatarpur, Chattogram", time: "2 min ago" },
        { icon: "👥", iconBg: C.greenDim, title: 'You joined the group "Medical Emergency - Tatarpur"', sub: "", time: "10 min ago" },
        { icon: "📍", iconBg: C.greenDim, title: "Location updated", sub: "Chattogram Division, Bangladesh", time: "15 min ago" },
        { icon: "🔔", iconBg: C.blueDim, title: "Alert accepted by 4 volunteers", sub: "Fire Accident · Halishahar", time: "25 min ago" },
    ];

    return (
        <div style={{ background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: C.text }}>Recent Activity</span>
                <button onClick={() => navigate("/notifications")} style={{ background: "none", border: "none", color: C.green, fontSize: 13, cursor: "pointer", fontWeight: 600 }}>View All</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {items.map((it, i) => (
                    <div key={i} style={{
                        display: "flex", alignItems: "center", gap: 12,
                        padding: "12px 10px", borderRadius: 9,
                        transition: "background 0.15s", cursor: "pointer",
                    }}
                        onMouseOver={e => e.currentTarget.style.background = C.bg3}
                        onMouseOut={e => e.currentTarget.style.background = "transparent"}
                    >
                        <Icon bg={it.iconBg} size={36}>{it.icon}</Icon>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontSize: 13, color: C.text, fontWeight: 500 }}>{it.title}</div>
                            {it.sub && <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{it.sub}</div>}
                        </div>
                        <span style={{ fontSize: 11, color: C.muted, whiteSpace: "nowrap" }}>{it.time}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Active Rescue Operations ─────────────────────────────────────────────────
function ActiveRescues() {
    const navigate = useNavigate();
    const ops = [
        { icon: "➕", iconBg: C.redDim, title: "Medical Emergency", loc: "Tatarpur, Chattogram", responders: 4, time: "5 min ago" },
        { icon: "🔥", iconBg: C.amberDim, title: "Fire Accident", loc: "Halishahar, Chattogram", responders: 6, time: "18 min ago" },
        { icon: "🌊", iconBg: C.blueDim, title: "Flood Situation", loc: "Panchlaish, Chattogram", responders: 3, time: "45 min ago" },
    ];

    return (
        <div style={{ background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                <span style={{ fontWeight: 700, fontSize: 15, color: C.text }}>Active Rescue Operations</span>
                <button onClick={() => navigate("/rooms")} style={{ background: "none", border: "none", color: C.green, fontSize: 13, cursor: "pointer", fontWeight: 600 }}>View All</button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {ops.map((op, i) => (
                    <div key={i} style={{
                        display: "flex", alignItems: "center", gap: 14,
                        padding: "14px 14px", background: C.bg3,
                        border: `1px solid ${C.border}`, borderRadius: 10,
                    }}>
                        <Icon bg={op.iconBg} size={42}>{op.icon}</Icon>
                        <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: 700, fontSize: 13, color: C.text }}>{op.title}</div>
                            <div style={{ fontSize: 11, color: C.muted, marginTop: 2 }}>{op.loc}</div>
                            <div style={{ fontSize: 11, color: C.green, marginTop: 4, fontWeight: 600 }}>
                                {op.responders} Responders · Created {op.time}
                            </div>
                        </div>
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
                            <Badge color={C.green}>Active</Badge>
                            <Btn label="OPEN CHAT" onClick={() => navigate("/rooms")} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Live Map placeholder ─────────────────────────────────────────────────────
function LiveMap() {
    const pins = [
        { top: "38%", left: "30%", type: "sos" },
        { top: "55%", left: "52%", type: "fire" },
        { top: "25%", left: "20%", type: "vol" },
        { top: "68%", left: "38%", type: "vol" },
        { top: "42%", left: "68%", type: "vol" },
        { top: "20%", left: "55%", type: "flood" },
        { top: "75%", left: "62%", type: "vol" },
    ];
    const pinStyle = (t) => ({
        sos: { bg: C.red, icon: "➕" },
        fire: { bg: C.amber, icon: "🔥" },
        vol: { bg: C.green, icon: "👤" },
        flood: { bg: C.blue, icon: "🌊" },
    }[t]);

    return (
        <div style={{ background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 14, overflow: "hidden" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 20px", borderBottom: `1px solid ${C.border}` }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 700, fontSize: 15, color: C.text }}>Live Map</span>
                    <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: C.green }}>
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: C.green, display: "inline-block", animation: "blink 1s infinite" }}></span>
                        Live
                    </span>
                </div>
                <button style={{ background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 7, padding: "6px 13px", color: C.text, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>
                    View Full Map ⤢
                </button>
            </div>
            {/* Map canvas */}
            <div style={{ position: "relative", height: 240, background: "linear-gradient(145deg,#0a1a12,#091420,#0a1810)", overflow: "hidden" }}>
                {/* grid lines */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.08 }}>
                    {[...Array(10)].map((_, i) => <line key={"h" + i} x1="0" y1={`${i * 10}%`} x2="100%" y2={`${i * 10}%`} stroke="#4ade80" strokeWidth="0.5" />)}
                    {[...Array(14)].map((_, i) => <line key={"v" + i} x1={`${i * 8}%`} y1="0" x2={`${i * 8}%`} y2="100%" stroke="#4ade80" strokeWidth="0.5" />)}
                </svg>
                {/* river-like path */}
                <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", opacity: 0.18 }}>
                    <path d="M 0 100 Q 150 80 250 120 T 500 110 T 750 130 T 900 120" stroke="#3b82f6" strokeWidth="8" fill="none" />
                </svg>
                {/* Chattogram label */}
                <div style={{ position: "absolute", top: "44%", left: "36%", color: "rgba(255,255,255,0.35)", fontSize: 13, fontWeight: 700, letterSpacing: 1 }}>Chattogram</div>
                {/* zoom btns */}
                <div style={{ position: "absolute", top: 12, left: 12, display: "flex", flexDirection: "column", gap: 3 }}>
                    {["+", "−", "⊙"].map(s => (
                        <button key={s} style={{ width: 28, height: 28, background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 6, color: C.text, fontSize: 16, cursor: "pointer", display: "grid", placeItems: "center" }}>{s}</button>
                    ))}
                </div>
                {/* pins */}
                {pins.map((p, i) => {
                    const ps = pinStyle(p.type);
                    return (
                        <div key={i} style={{
                            position: "absolute", top: p.top, left: p.left,
                            transform: "translate(-50%,-50%)",
                            width: 28, height: 28, borderRadius: "50%",
                            background: ps.bg, display: "grid", placeItems: "center",
                            fontSize: 12, boxShadow: `0 0 10px ${ps.bg}88`,
                            border: "2px solid rgba(255,255,255,0.25)",
                        }}>{ps.icon}</div>
                    );
                })}
            </div>
        </div>
    );
}

// ─── Community Impact ─────────────────────────────────────────────────────────
function CommunityImpact() {
    const stats = [
        { icon: "👥", value: "128", label: "Active Volunteers", color: C.green },
        { icon: "🚨", value: "24", label: "Alerts This Month", color: C.red },
        { icon: "👥", value: "16", label: "Rescue Operations", color: C.green },
        { icon: "✅", value: "98%", label: "Response Rate", color: C.green },
    ];

    return (
        <div style={{ background: C.bg2, border: `1px solid ${C.border}`, borderRadius: 14, padding: "20px 22px" }}>
            <div style={{ fontWeight: 700, fontSize: 15, color: C.text, marginBottom: 18 }}>Community Impact</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                {stats.map((s, i) => (
                    <div key={i} style={{ background: C.bg3, border: `1px solid ${C.border}`, borderRadius: 10, padding: "16px 14px", display: "flex", alignItems: "center", gap: 12 }}>
                        <span style={{ fontSize: 22 }}>{s.icon}</span>
                        <div>
                            <div style={{ fontSize: 22, fontWeight: 800, color: s.color, letterSpacing: -0.8 }}>{s.value}</div>
                            <div style={{ fontSize: 11, color: C.muted, marginTop: 1 }}>{s.label}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

// ─── Status Banner ────────────────────────────────────────────────────────────
function StatusBanner() {
    return (
        <div style={{
            background: C.greenDim, border: `1px solid ${C.borderG}`,
            borderRadius: 12, padding: "12px 18px",
            display: "flex", alignItems: "center", gap: 10,
            marginBottom: 24,
        }}>
            <span style={{ width: 10, height: 10, borderRadius: "50%", background: C.green, flexShrink: 0, boxShadow: `0 0 8px ${C.green}` }}></span>
            <span style={{ fontSize: 13, color: C.green, fontWeight: 700 }}>You are Active</span>
            <span style={{ fontSize: 12, color: C.muted2 }}>Ready to help and receive alerts</span>
        </div>
    );
}

// ─── Dashboard (main) ─────────────────────────────────────────────────────────
function Dashboard() {
    const navigate = useNavigate();
    const userName = localStorage.getItem("user_name") || "Arpit";

    const handleSOS = () => navigate("/create-alert");

    return (
        <>
            <style>{`
        @keyframes sosGlow { 0%,100%{box-shadow:0 0 18px rgba(239,68,68,0.35);} 50%{box-shadow:0 0 30px rgba(239,68,68,0.65);} }
        @keyframes blink   { 0%,100%{opacity:1;} 50%{opacity:0.25;} }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #0a0f0d; }
      `}</style>

            <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Inter',sans-serif" }}>
                <Navbar userName={userName} notifCount={3} onSOS={handleSOS} />

                <main style={{ maxWidth: 1240, margin: "0 auto", padding: "28px 28px" }}>

                    {/* Welcome */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 22 }}>
                        <div>
                            <h1 style={{ color: C.text, fontSize: 28, fontWeight: 800, letterSpacing: -0.8, marginBottom: 6 }}>
                                Welcome back, {userName}! 👋
                            </h1>
                            <p style={{ color: C.muted2, fontSize: 14 }}>Every second counts. Together we can save more lives.</p>
                        </div>
                        <StatusBanner />
                    </div>

                    {/* Action cards row */}
                    <ActionCards onSOS={handleSOS} />

                    {/* Middle row: Recent Activity + Active Rescues */}
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
                        <RecentActivity />
                        <ActiveRescues />
                    </div>

                    {/* Bottom row: Live Map + Community Impact */}
                    <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: 16 }}>
                        <LiveMap />
                        <CommunityImpact />
                    </div>

                </main>
            </div>
        </>
    );
}

export default Dashboard;