import React, { useState, useCallback, useMemo } from "react";
import {
  ScanLine, Check, X, UserCheck, UserX, Percent, Hand,
} from "lucide-react";
import { useStore } from "../context/store.jsx";
import { AdminShell } from "../components/AdminShell.jsx";
import { Card, Button, Chip, Select, Input, Avatar, Empty } from "../components/ui.jsx";
import { Scanner } from "../components/Scanner.jsx";
import { useToast } from "../components/ui.jsx";
import { fmtTime } from "../data/seed.js";

export function AdminAttendance() {
  const { groups, students, attendance, mark, unmark, route, todayISO } = useStore();
  const toast = useToast();
  const [groupId, setGroupId] = useState(route.params.groupId || groups[0]?.id);
  const [scanning, setScanning] = useState(false);
  const [manual, setManual] = useState("");
  const [lastScan, setLastScan] = useState(null);

  const date = todayISO();
  const dayLog = attendance[date] || {};
  const group = groups.find((g) => g.id === groupId);
  const roster = useMemo(() => students.filter((s) => s.groupId === groupId), [students, groupId]);
  const presentCount = roster.filter((s) => dayLog[s.id]).length;
  const pct = roster.length ? Math.round((presentCount / roster.length) * 100) : 0;

  const handleCode = useCallback((code) => {
    const clean = String(code).trim().toUpperCase();
    const student = students.find((s) => s.code.toUpperCase() === clean);
    if (!student) { setLastScan({ ok: false, text: `No student with code ${clean}` }); toast(`Unknown code ${clean}`, "red"); return; }
    if (student.groupId !== groupId) {
      const g = groups.find((x) => x.id === student.groupId);
      setLastScan({ ok: false, text: `${student.name} is in ${g?.code || "another group"}, not this one` });
      toast(`${student.name} belongs to another group`, "brass");
      return;
    }
    mark(student.id, "qr", date);
    setLastScan({ ok: true, text: `${student.name} marked present`, name: student.name });
    toast(`${student.name} — present`, "green");
  }, [students, groupId, groups, mark, date, toast]);

  const submitManual = () => { if (manual.trim()) { handleCode(manual); setManual(""); } };

  return (
    <AdminShell title="Attendance" subtitle={group ? `${group.stage} · ${group.label}` : "Pick a group"}
      action={<Select value={groupId} onChange={(e) => setGroupId(e.target.value)} style={{ maxWidth: 240 }}>
        {groups.map((g) => <option key={g.id} value={g.id}>{g.code} — {g.stage} {fmtTime(g.time)}</option>)}
      </Select>}>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 20 }} className="admin-2col">
        {/* Scan column */}
        <div>
          <Card pad={20} style={{ marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <h2 style={{ fontSize: 20, color: "var(--green)" }}>Scan to record</h2>
              <Button size="sm" variant={scanning ? "danger" : "primary"} icon={scanning ? X : ScanLine} onClick={() => setScanning(!scanning)}>
                {scanning ? "Stop" : "Start camera"}
              </Button>
            </div>
            {scanning ? <Scanner active={scanning} onScan={handleCode} /> :
              <div style={{ aspectRatio: "1", maxWidth: 360, margin: "0 auto", borderRadius: 18, border: "2px dashed var(--line)", display: "grid", placeItems: "center", background: "var(--ivory)", color: "var(--muted)", textAlign: "center", padding: 24 }}>
                <div>
                  <div style={{ width: 64, height: 64, borderRadius: 16, background: "var(--green)", display: "grid", placeItems: "center", margin: "0 auto 14px" }}><ScanLine size={30} color="#E4D2A8" /></div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "var(--green)" }}>Camera is off</div>
                  <div style={{ fontSize: 13, marginTop: 6, maxWidth: 230 }}>Press start, then point each student's QR at the frame. They appear on the roster instantly.</div>
                </div>
              </div>}

            {/* last scan banner */}
            {lastScan && (
              <div className="pop" style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 11, padding: "12px 14px", borderRadius: 12, background: lastScan.ok ? "#DEF1E5" : "var(--red-soft)", color: lastScan.ok ? "#0F7B3E" : "var(--red)" }}>
                <span style={{ width: 28, height: 28, borderRadius: 99, background: lastScan.ok ? "#0F7B3E" : "var(--red)", display: "grid", placeItems: "center", flexShrink: 0 }}>{lastScan.ok ? <Check size={16} color="#fff" /> : <X size={16} color="#fff" />}</span>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{lastScan.text}</span>
              </div>
            )}
          </Card>

          {/* manual entry */}
          <Card pad={20}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <Hand size={18} color="var(--brass)" /><h3 style={{ fontSize: 17, color: "var(--green)" }}>Scan failed? Enter by code</h3>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <Input value={manual} onChange={(e) => setManual(e.target.value)} placeholder="e.g. S1042" onKeyDown={(e) => e.key === "Enter" && submitManual()} style={{ textTransform: "uppercase" }} />
              <Button onClick={submitManual} icon={UserCheck}>Mark</Button>
            </div>
            <p style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 10 }}>Or tap any name in the roster to toggle them present.</p>
          </Card>
        </div>

        {/* Roster column */}
        <div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 16 }}>
            <Card pad={16}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><UserCheck size={18} color="#0F7B3E" /><div><div style={{ fontFamily: "'Fraunces',serif", fontSize: 24, color: "var(--green)", lineHeight: 1 }}>{presentCount}</div><div style={{ fontSize: 11.5, color: "var(--muted)" }}>present</div></div></div></Card>
            <Card pad={16}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><UserX size={18} color="var(--red)" /><div><div style={{ fontFamily: "'Fraunces',serif", fontSize: 24, color: "var(--green)", lineHeight: 1 }}>{roster.length - presentCount}</div><div style={{ fontSize: 11.5, color: "var(--muted)" }}>absent</div></div></div></Card>
            <Card pad={16}><div style={{ display: "flex", alignItems: "center", gap: 8 }}><Percent size={18} color="var(--brass)" /><div><div style={{ fontFamily: "'Fraunces',serif", fontSize: 24, color: "var(--green)", lineHeight: 1 }}>{pct}%</div><div style={{ fontSize: 11.5, color: "var(--muted)" }}>rate</div></div></div></Card>
          </div>

          <Card pad={0} style={{ overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <h3 style={{ fontSize: 17, color: "var(--green)" }}>Roster · {roster.length}</h3>
              <span className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>{new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
            </div>
            <div style={{ maxHeight: 460, overflow: "auto" }}>
              {roster.length === 0 ? <Empty icon={UserX} title="No students in this group" body="Add students to this group from the Students page." /> :
                roster.map((s) => {
                  const rec = dayLog[s.id];
                  return (
                    <div key={s.id} onClick={() => rec ? unmark(s.id, date) : mark(s.id, "manual", date)} style={{ display: "flex", alignItems: "center", gap: 12, padding: "11px 18px", borderBottom: "1px solid var(--line)", cursor: "pointer", background: rec ? "#F3FAF5" : "transparent" }}>
                      <Avatar name={s.name} size={36} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: 14.5, fontWeight: 600, color: "var(--green)" }}>{s.name}</div>
                        <div className="mono" style={{ fontSize: 11.5, color: "var(--muted)" }}>{s.code}</div>
                      </div>
                      {rec ? (
                        <span style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                          <Chip tone={rec.method === "qr" ? "green" : "blue"}>{rec.method === "qr" ? "QR" : "Manual"} · {rec.at}</Chip>
                        </span>
                      ) : <Chip tone="ink">Tap to mark</Chip>}
                    </div>
                  );
                })}
            </div>
          </Card>
        </div>
      </div>
    </AdminShell>
  );
}
