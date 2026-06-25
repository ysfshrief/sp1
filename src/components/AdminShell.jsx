import React, { useState } from "react";
import {
  LayoutGrid, Users, CalendarDays, ScanLine, ClipboardCheck, FileText, Megaphone, LogOut, Menu,
} from "lucide-react";
import { useStore } from "../context/store.jsx";
import { Wordmark, Avatar } from "../components/ui.jsx";

const NAV = [
  ["a-overview", "Overview", LayoutGrid],
  ["a-attendance", "Attendance", ScanLine],
  ["a-groups", "Groups", CalendarDays],
  ["a-students", "Students", Users],
  ["a-publish", "Publish lesson", ClipboardCheck],
  ["a-library", "PDF library", FileText],
  ["a-announce", "Announcements", Megaphone],
];

export function AdminShell({ children, title, subtitle, action }) {
  const { go, route, logout } = useStore();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "var(--ivory)" }}>
      <aside className={open ? "admin-side admin-side-open" : "admin-side"} style={{ width: 256, background: "var(--green)", color: "#FBF9F4", position: "sticky", top: 0, height: "100vh", display: "flex", flexDirection: "column", flexShrink: 0 }}>
        <div style={{ padding: "20px 18px", borderBottom: "1px solid rgba(255,255,255,.1)" }}>
          <div onClick={() => go("landing")} style={{ cursor: "pointer" }}><Wordmark light size={40} /></div>
        </div>
        <div style={{ flex: 1, overflow: "auto", padding: "16px 12px" }}>
          <div style={{ fontSize: 11, letterSpacing: 2, color: "#7E988B", fontWeight: 700, padding: "0 10px 10px" }}>OPERATIONS</div>
          {NAV.map(([r, label, Ic]) => {
            const active = route.name === r;
            return (
              <button key={r} onClick={() => { go(r); setOpen(false); }} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "11px 12px", marginBottom: 4, borderRadius: 11, border: "none", textAlign: "left", fontSize: 14.5, fontWeight: 600, color: active ? "#FBF9F4" : "#B4C7BC", background: active ? "rgba(228,210,168,.14)" : "transparent", boxShadow: active ? "inset 3px 0 0 var(--brass)" : "none" }}>
                <Ic size={18} color={active ? "#E4D2A8" : "#B4C7BC"} /> {label}
              </button>
            );
          })}
        </div>
        <div style={{ padding: 12, borderTop: "1px solid rgba(255,255,255,.1)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "8px 8px 12px" }}>
            <Avatar name="Secretary Desk" size={38} tone="linear-gradient(140deg,var(--brass),#8A6420)" />
            <div><div style={{ fontSize: 14, fontWeight: 700 }}>Front desk</div><div style={{ fontSize: 12, color: "#7E988B" }}>Secretary</div></div>
          </div>
          <button onClick={logout} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", padding: "10px 12px", borderRadius: 11, border: "1px solid rgba(255,255,255,.16)", background: "rgba(255,255,255,.06)", color: "#D5E2DA", fontSize: 13.5, fontWeight: 600 }}><LogOut size={16} /> Sign out</button>
        </div>
      </aside>
      {open && <div onClick={() => setOpen(false)} className="admin-scrim" style={{ position: "fixed", inset: 0, background: "rgba(11,32,27,.45)", zIndex: 40 }} />}

      <main style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <header style={{ position: "sticky", top: 0, zIndex: 30, background: "rgba(251,249,244,.88)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--line)", padding: "16px 26px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0 }}>
            <button onClick={() => setOpen(true)} className="admin-burger" style={{ display: "none", background: "var(--ivory-2)", border: "none", borderRadius: 9, width: 40, height: 40 }}><Menu size={20} color="var(--green)" /></button>
            <div style={{ minWidth: 0 }}>
              <h1 style={{ fontSize: 25, color: "var(--green)", lineHeight: 1.1, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{title}</h1>
              {subtitle && <p style={{ fontSize: 13.5, color: "var(--muted)", margin: "2px 0 0" }}>{subtitle}</p>}
            </div>
          </div>
          {action}
        </header>
        <div style={{ padding: "24px 26px", flex: 1 }} className="admin-pad">{children}</div>
        <footer style={{ borderTop: "1px solid var(--line)", padding: "16px 26px", background: "var(--paper)", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          <span style={{ fontSize: 13, color: "var(--green)", fontWeight: 600 }}>Special 1 — Hady Attia</span>
          <span style={{ fontSize: 12.5, color: "var(--muted)" }}>Designed & developed by Youssef Shrief</span>
        </footer>
      </main>
    </div>
  );
}
