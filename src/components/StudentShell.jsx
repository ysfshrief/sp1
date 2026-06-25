import React from "react";
import {
  Home, BookOpen, QrCode, CalendarDays, User, Bell,
} from "lucide-react";
import { useStore } from "../context/store.jsx";
import { Wordmark, Avatar } from "../components/ui.jsx";

export function StudentShell({ children, title }) {
  const { go, route, logout, currentStudent } = useStore();
  const tabs = [
    ["s-home", "Home", Home],
    ["s-work", "Work", BookOpen],
    ["s-pass", "My QR", QrCode],
    ["s-schedule", "Schedule", CalendarDays],
    ["s-profile", "Me", User],
  ];
  return (
    <div style={{ minHeight: "100vh", background: "var(--ivory)", paddingBottom: 78 }} className="safe-b">
      {/* top bar */}
      <header style={{ position: "sticky", top: 0, zIndex: 60, background: "rgba(251,249,244,.9)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--line)" }}>
        <div style={{ maxWidth: 760, margin: "0 auto", padding: "12px 18px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div onClick={() => go("s-home")} style={{ cursor: "pointer" }}><Wordmark size={36} showSub={false} /></div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button onClick={() => go("s-notifications")} style={{ position: "relative", background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 11, width: 40, height: 40, display: "grid", placeItems: "center" }}>
              <Bell size={18} color="var(--green)" />
              <span style={{ position: "absolute", top: 8, right: 9, width: 7, height: 7, borderRadius: 99, background: "var(--red)" }} />
            </button>
            <div onClick={() => go("s-profile")} style={{ cursor: "pointer" }}><Avatar name={currentStudent?.name} size={40} /></div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 760, margin: "0 auto", padding: "20px 18px 30px" }} className="rise">
        {title && <h1 style={{ fontSize: 30, color: "var(--green)", marginBottom: 18 }}>{title}</h1>}
        {children}
      </main>

      {/* bottom nav (mobile-first, persists on desktop too) */}
      <nav style={{ position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 60, background: "rgba(251,249,244,.94)", backdropFilter: "blur(14px)", borderTop: "1px solid var(--line)" }} className="safe-b">
        <div style={{ maxWidth: 760, margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(5,1fr)" }}>
          {tabs.map(([r, label, Ic]) => {
            const active = route.name === r;
            const isQR = r === "s-pass";
            return (
              <button key={r} onClick={() => go(r)} style={{ background: "none", border: "none", padding: "10px 4px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, color: active ? "var(--green)" : "var(--muted)" }}>
                <span style={{ width: isQR ? 46 : 28, height: isQR ? 46 : 28, marginTop: isQR ? -18 : 0, borderRadius: isQR ? 14 : 8, background: isQR ? "var(--green)" : "transparent", display: "grid", placeItems: "center", boxShadow: isQR ? "var(--shadow)" : "none", border: isQR ? "3px solid var(--ivory)" : "none" }}>
                  <Ic size={isQR ? 22 : 21} color={isQR ? "#E4D2A8" : (active ? "var(--green)" : "var(--muted)")} strokeWidth={active ? 2.4 : 2} />
                </span>
                <span style={{ fontSize: 11, fontWeight: active ? 700 : 600 }}>{label}</span>
              </button>
            );
          })}
        </div>
      </nav>
    </div>
  );
}
