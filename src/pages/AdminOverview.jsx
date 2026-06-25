import React from "react";
import {
  Users, CalendarDays, ScanLine, ClipboardCheck, Megaphone, AlertTriangle, ChevronRight,
} from "lucide-react";
import { useStore } from "../context/store.jsx";
import { AdminShell } from "../components/AdminShell.jsx";
import { Card, Stat, Button, Chip, Avatar } from "../components/ui.jsx";
import { DAYS, fmtTime } from "../data/seed.js";

export function AdminOverview() {
  const { students, groups, lessons, attendance, go, todayISO } = useStore();
  const today = new Date().toLocaleDateString("en-GB", { weekday: "long" });
  const todaysGroups = groups.filter((g) => g.days.includes(today)).sort((a, b) => a.time.localeCompare(b.time));
  const presentToday = Object.keys(attendance[todayISO()] || {}).length;

  return (
    <AdminShell title="Front desk" subtitle={new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" })}
      action={<Button icon={ScanLine} onClick={() => go("a-attendance")}>Open attendance</Button>}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 22 }} className="admin-4">
        <Stat label="Students" value={students.length} icon={Users} onClick={() => go("a-students")} />
        <Stat label="Active groups" value={groups.length} icon={CalendarDays} onClick={() => go("a-groups")} />
        <Stat label="Present today" value={presentToday} icon={ScanLine} tone="var(--brass)" onClick={() => go("a-attendance")} sub="scanned in so far" />
        <Stat label="Lessons published" value={lessons.length} icon={ClipboardCheck} onClick={() => go("a-publish")} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 20 }} className="admin-2col">
        {/* Today's groups */}
        <Card pad={22}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
            <h2 style={{ fontSize: 22, color: "var(--green)" }}>Today's groups</h2>
            <Chip tone="sage">{today}</Chip>
          </div>
          {todaysGroups.length === 0 ? (
            <p style={{ color: "var(--muted)", fontSize: 14.5, padding: "20px 0" }}>No groups scheduled today. Enjoy the quiet.</p>
          ) : (
            <div style={{ display: "grid", gap: 10 }}>
              {todaysGroups.map((g) => (
                <div key={g.id} onClick={() => go("a-attendance", { groupId: g.id })} style={{ display: "flex", alignItems: "center", gap: 14, padding: "13px 14px", background: "var(--ivory)", borderRadius: 12, border: "1px solid var(--line)", cursor: "pointer" }}>
                  <div style={{ width: 52, textAlign: "center" }}>
                    <div style={{ fontFamily: "'Fraunces',serif", fontSize: 17, fontWeight: 600, color: "var(--green)" }}>{fmtTime(g.time).split(" ")[0]}</div>
                    <div style={{ fontSize: 10.5, color: "var(--muted)" }}>{fmtTime(g.time).split(" ")[1]}</div>
                  </div>
                  <div style={{ width: 1, height: 34, background: "var(--line)" }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--green)" }}>{g.stage}</div>
                    <div style={{ fontSize: 12.5, color: "var(--muted)" }}>{g.label} · <span className="mono">{g.code}</span> · {g.hall}</div>
                  </div>
                  <ChevronRight size={18} color="var(--muted)" />
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Quick actions + alerts */}
        <div style={{ display: "grid", gap: 16 }}>
          <Card pad={22}>
            <h2 style={{ fontSize: 20, color: "var(--green)", marginBottom: 14 }}>Quick actions</h2>
            <div style={{ display: "grid", gap: 10 }}>
              {[["Publish a lesson", "a-publish", ClipboardCheck], ["Add a student", "a-students", Users], ["New group", "a-groups", CalendarDays], ["Post announcement", "a-announce", Megaphone]].map(([t, to, Ic]) => (
                <button key={t} onClick={() => go(to)} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%", padding: "12px 14px", borderRadius: 12, border: "1px solid var(--line)", background: "var(--ivory)", textAlign: "left", fontSize: 14.5, fontWeight: 600, color: "var(--green)" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: "var(--green)", display: "grid", placeItems: "center", flexShrink: 0 }}><Ic size={16} color="#E4D2A8" /></div>
                  {t}<ChevronRight size={16} color="var(--muted)" style={{ marginLeft: "auto" }} />
                </button>
              ))}
            </div>
          </Card>
          <Card pad={22} style={{ background: "var(--amber-soft)", borderColor: "#EAD9AE" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
              <AlertTriangle size={18} color="var(--amber)" /><span style={{ fontWeight: 700, color: "var(--amber)", fontSize: 15 }}>Needs a look</span>
            </div>
            <p style={{ fontSize: 13.5, color: "#6B4E12", lineHeight: 1.55, margin: 0 }}>
              {students.filter((s) => s.balance === "Due").length} students have a payment due this month. Open Students and filter by “Due” to follow up.
            </p>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
