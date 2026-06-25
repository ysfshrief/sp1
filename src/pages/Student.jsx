import React, { useState } from "react";
import {
  ClipboardCheck, Mic2, FileWarning, StickyNote, CalendarDays, Download, Eye, FileText, Bell, Phone, ChevronRight, BadgeCheck, TrendingUp, MapPin, LogOut,
} from "lucide-react";
import { useStore } from "../context/store.jsx";
import { StudentShell } from "../components/StudentShell.jsx";
import { Card, Chip, Button, Avatar, Empty, Seal } from "../components/ui.jsx";
import { QR } from "../components/QR.jsx";
import { fmtTime } from "../data/seed.js";

function PdfRow({ name, kind = "PDF" }) {
  const { } = useStore();
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 12, padding: "12px 14px", background: "var(--ivory)", borderRadius: 12, border: "1px solid var(--line)" }}>
      <div style={{ width: 38, height: 38, borderRadius: 9, background: "var(--red-soft)", display: "grid", placeItems: "center", flexShrink: 0 }}><FileText size={18} color="var(--red)" /></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: "var(--green)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{name}</div>
        <div style={{ fontSize: 11.5, color: "var(--muted)" }}>{kind}</div>
      </div>
      <button title="Preview" style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--line)", background: "var(--paper)", display: "grid", placeItems: "center" }}><Eye size={15} color="var(--green)" /></button>
      <button title="Download" style={{ width: 34, height: 34, borderRadius: 8, border: "1px solid var(--line)", background: "var(--paper)", display: "grid", placeItems: "center" }}><Download size={15} color="var(--green)" /></button>
    </div>
  );
}

export function StudentHome() {
  const { currentStudent, groupById, lessonsByGroup, attendanceRate, grades, go } = useStore();
  const s = currentStudent;
  const group = groupById(s?.groupId);
  const latest = lessonsByGroup(s?.groupId)[0];
  const rate = attendanceRate(s?.id);
  const myGrades = grades.filter((g) => g.studentId === s?.id).slice(-3).reverse();

  return (
    <StudentShell title={`Hello, ${s?.name.split(" ")[0]} 👋`}>
      {/* this-week priority stack */}
      <div style={{ display: "grid", gap: 14 }}>
        {/* Homework */}
        <Card pad={0} style={{ overflow: "hidden", border: "1px solid var(--line)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "14px 18px", background: "var(--green)", color: "#FBF9F4" }}>
            <ClipboardCheck size={19} color="#E4D2A8" /><span style={{ fontWeight: 700, fontSize: 15 }}>This week's homework</span>
            {latest && <span style={{ marginLeft: "auto" }}><Chip tone="brass" dot>Due next lesson</Chip></span>}
          </div>
          <div style={{ padding: 18 }}>
            {latest ? <>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 19, color: "var(--green)", marginBottom: 6 }}>{latest.title}</div>
              <p style={{ fontSize: 14.5, color: "var(--ink)", opacity: .82, lineHeight: 1.6, margin: "0 0 14px" }}>{latest.homework}</p>
              {latest.homeworkPdf && <PdfRow name={latest.homeworkPdf} kind="Homework PDF" />}
            </> : <Empty icon={ClipboardCheck} title="Nothing set yet" body="When your next lesson is published, the homework lands right here." />}
          </div>
        </Card>

        {/* Recitation + Exam side by side */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="s-2col">
          <Card pad={18}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: "var(--sage-soft)", display: "grid", placeItems: "center" }}><Mic2 size={18} color="var(--green)" /></div>
              <span style={{ fontWeight: 700, fontSize: 14.5, color: "var(--green)" }}>Recitation</span>
            </div>
            <p style={{ fontSize: 13.5, color: "var(--muted)", lineHeight: 1.55, margin: 0 }}>{latest?.recitation || "No recitation set."}</p>
          </Card>
          <Card pad={18} style={{ background: latest?.examNext ? "var(--red-soft)" : undefined, borderColor: latest?.examNext ? "#EBC9C0" : undefined }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 9, background: latest?.examNext ? "#F0CFC6" : "var(--ivory-2)", display: "grid", placeItems: "center" }}><FileWarning size={18} color={latest?.examNext ? "var(--red)" : "var(--muted)"} /></div>
              <span style={{ fontWeight: 700, fontSize: 14.5, color: latest?.examNext ? "var(--red)" : "var(--green)" }}>Next exam</span>
            </div>
            <p style={{ fontSize: 13.5, color: latest?.examNext ? "var(--red)" : "var(--muted)", lineHeight: 1.55, margin: 0 }}>
              {latest?.examNext ? latest.examDetails : "No exam next lesson."}
            </p>
          </Card>
        </div>

        {/* Teacher note */}
        {latest?.notes && (
          <Card pad={18} style={{ background: "var(--amber-soft)", borderColor: "#EAD9AE" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
              <StickyNote size={18} color="var(--amber)" /><span style={{ fontWeight: 700, fontSize: 14.5, color: "var(--amber)" }}>Note from Mr. Hady</span>
            </div>
            <p style={{ fontSize: 14, color: "#6B4E12", lineHeight: 1.6, margin: 0, fontStyle: "italic" }}>"{latest.notes}"</p>
          </Card>
        )}

        {/* Schedule + attendance */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="s-2col">
          <Card pad={18} onClick={() => go("s-schedule")} hover>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
              <CalendarDays size={18} color="var(--green)" /><span style={{ fontWeight: 700, fontSize: 14.5, color: "var(--green)" }}>Your group</span>
              <ChevronRight size={16} color="var(--muted)" style={{ marginLeft: "auto" }} />
            </div>
            <div style={{ fontSize: 14, fontWeight: 700, color: "var(--green)" }}>{group?.stage}</div>
            <div style={{ fontSize: 13, color: "var(--muted)", marginTop: 2 }}>{group?.label}</div>
            <div style={{ fontSize: 13, color: "var(--green)", marginTop: 8, fontWeight: 600 }}>{group?.days.join(" & ")} · {fmtTime(group?.time || "00:00")}</div>
          </Card>
          <Card pad={18}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
              <BadgeCheck size={18} color="var(--green)" /><span style={{ fontWeight: 700, fontSize: 14.5, color: "var(--green)" }}>Attendance</span>
            </div>
            <div style={{ fontFamily: "'Fraunces',serif", fontSize: 32, fontWeight: 600, color: rate === null ? "var(--muted)" : (rate >= 75 ? "#0F7B3E" : "var(--red)") }}>
              {rate === null ? "—" : rate + "%"}
            </div>
            <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 4 }}>{rate === null ? "No sessions recorded yet" : "of sessions attended"}</div>
          </Card>
        </div>

        {/* recent results */}
        <Card pad={18}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 12 }}>
            <TrendingUp size={18} color="var(--green)" /><span style={{ fontWeight: 700, fontSize: 14.5, color: "var(--green)" }}>Recent results</span>
          </div>
          {myGrades.length ? myGrades.map((g) => (
            <div key={g.id} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: "1px solid var(--line)" }}>
              <span style={{ fontSize: 14, color: "var(--ink)" }}>{g.label}</span>
              <span style={{ fontWeight: 700, color: g.score / g.max >= 0.6 ? "#0F7B3E" : "var(--red)" }}>{g.score}/{g.max}</span>
            </div>
          )) : <p style={{ fontSize: 13.5, color: "var(--muted)" }}>No marks recorded yet.</p>}
        </Card>
      </div>
    </StudentShell>
  );
}

export function StudentWork() {
  const { currentStudent, lessonsByGroup } = useStore();
  const lessons = lessonsByGroup(currentStudent?.groupId);
  const [tab, setTab] = useState("all");
  return (
    <StudentShell title="Homework & PDFs">
      <div style={{ display: "flex", gap: 8, marginBottom: 18, overflowX: "auto" }}>
        {[["all", "Everything"], ["hw", "Homework"], ["rec", "Recitation"], ["pdf", "PDFs"]].map(([k, l]) => (
          <button key={k} onClick={() => setTab(k)} style={{ padding: "8px 16px", borderRadius: 99, border: `1px solid ${tab === k ? "var(--green)" : "var(--line)"}`, background: tab === k ? "var(--green)" : "var(--paper)", color: tab === k ? "#FBF9F4" : "var(--green)", fontWeight: 600, fontSize: 13.5, whiteSpace: "nowrap" }}>{l}</button>
        ))}
      </div>
      {lessons.length === 0 && <Empty icon={ClipboardCheck} title="No lessons published yet" body="Your homework and recitation will appear here after each lesson." />}
      <div style={{ display: "grid", gap: 16 }}>
        {lessons.map((l) => (
          <Card key={l.id} pad={20}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <span className="mono" style={{ fontSize: 12, color: "var(--muted)" }}>{new Date(l.date).toLocaleDateString("en-GB", { day: "numeric", month: "long" })}</span>
              {l.examNext && <Chip tone="red" dot>Exam next lesson</Chip>}
            </div>
            <h3 style={{ fontSize: 20, color: "var(--green)", marginBottom: 12 }}>{l.title}</h3>
            {(tab === "all" || tab === "hw") && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--brass)", letterSpacing: .5, marginBottom: 5 }}>HOMEWORK</div>
                <p style={{ fontSize: 14, color: "var(--ink)", opacity: .82, lineHeight: 1.55, margin: "0 0 8px" }}>{l.homework}</p>
                {l.homeworkPdf && <PdfRow name={l.homeworkPdf} kind="Homework PDF" />}
              </div>
            )}
            {(tab === "all" || tab === "rec") && l.recitation && (
              <div style={{ marginBottom: 12 }}>
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--brass)", letterSpacing: .5, marginBottom: 5 }}>RECITATION</div>
                <p style={{ fontSize: 14, color: "var(--ink)", opacity: .82, lineHeight: 1.55, margin: "0 0 8px" }}>{l.recitation}</p>
                {l.recitationPdf && <PdfRow name={l.recitationPdf} kind="Recitation PDF" />}
              </div>
            )}
          </Card>
        ))}
      </div>
    </StudentShell>
  );
}

export function StudentPass() {
  const { currentStudent, groupById } = useStore();
  const s = currentStudent;
  const group = groupById(s?.groupId);
  return (
    <StudentShell title="My QR pass">
      <Card pad={0} style={{ overflow: "hidden", maxWidth: 380, margin: "0 auto" }}>
        <div style={{ background: "var(--green)", color: "#FBF9F4", padding: "22px 22px 18px", textAlign: "center", position: "relative" }} className="seal-grain">
          <div style={{ position: "absolute", top: 14, left: 14 }}><Seal size={40} light /></div>
          <div style={{ fontSize: 12, letterSpacing: 2, color: "#E4D2A8", fontWeight: 700, marginTop: 6 }}>STUDENT PASS</div>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 24, marginTop: 4 }}>{s?.name}</div>
          <div style={{ fontSize: 13, color: "#C7D6CC", marginTop: 2 }}>{group?.stage} · {group?.label}</div>
        </div>
        <div style={{ padding: 26, textAlign: "center" }}>
          <div style={{ display: "inline-block", padding: 14, background: "var(--paper)", border: "1px solid var(--line)", borderRadius: 16, boxShadow: "var(--shadow-sm)" }}>
            <QR value={s?.code || "S0000"} size={196} />
          </div>
          <div className="mono" style={{ marginTop: 16, fontSize: 18, fontWeight: 600, color: "var(--green)", letterSpacing: 2 }}>{s?.code}</div>
          <p style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 10, lineHeight: 1.55 }}>
            Show this at the door. The secretary scans it to mark you present — keep your screen bright.
          </p>
        </div>
      </Card>
    </StudentShell>
  );
}

export function StudentSchedule() {
  const { currentStudent, groupById, lessonsByGroup } = useStore();
  const group = groupById(currentStudent?.groupId);
  const lessons = lessonsByGroup(currentStudent?.groupId);
  return (
    <StudentShell title="Schedule">
      <Card pad={22} style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 16 }}>
          <div style={{ width: 50, height: 50, borderRadius: 13, background: "var(--green)", display: "grid", placeItems: "center" }}><CalendarDays size={24} color="#E4D2A8" /></div>
          <div><div style={{ fontFamily: "'Fraunces',serif", fontSize: 22, color: "var(--green)" }}>{group?.stage}</div><div style={{ fontSize: 13.5, color: "var(--muted)" }}>{group?.label}</div></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          {group?.days.map((d) => (
            <div key={d} style={{ background: "var(--ivory)", borderRadius: 12, padding: "14px 16px", border: "1px solid var(--line)" }}>
              <div style={{ fontSize: 13, color: "var(--muted)" }}>{d}</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: "var(--green)", marginTop: 2 }}>{fmtTime(group.time)}</div>
              <div style={{ fontSize: 12.5, color: "var(--brass)", fontWeight: 600, marginTop: 2, display: "flex", alignItems: "center", gap: 4 }}><MapPin size={12} /> {group.hall}</div>
            </div>
          ))}
        </div>
      </Card>
      <h3 style={{ fontSize: 19, color: "var(--green)", margin: "20px 0 12px" }}>Recent lessons</h3>
      <div style={{ display: "grid", gap: 10 }}>
        {lessons.map((l) => (
          <Card key={l.id} pad={16}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div><div style={{ fontSize: 15, fontWeight: 700, color: "var(--green)" }}>{l.title}</div><div className="mono" style={{ fontSize: 12, color: "var(--muted)", marginTop: 2 }}>{new Date(l.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}</div></div>
              {l.examNext && <Chip tone="red">Exam set</Chip>}
            </div>
          </Card>
        ))}
      </div>
    </StudentShell>
  );
}

export function StudentProfile() {
  const { currentStudent, groupById, logout, attendanceRate } = useStore();
  const s = currentStudent;
  const group = groupById(s?.groupId);
  const rate = attendanceRate(s?.id);
  const rows = [["Student ID", s?.code], ["Stage", s?.stage], ["Group", group?.label], ["Phone", s?.phone], ["Guardian", s?.guardianPhone], ["Subscription", s?.balance === "Paid" ? "Paid this month" : "Payment due"]];
  return (
    <StudentShell title="My profile">
      <Card pad={26} style={{ textAlign: "center", marginBottom: 16 }}>
        <Avatar name={s?.name} size={92} />
        <h2 style={{ fontSize: 25, color: "var(--green)", marginTop: 14 }}>{s?.name}</h2>
        <div style={{ fontSize: 14, color: "var(--muted)", marginTop: 4 }}>{group?.stage} · {group?.label}</div>
        <div style={{ marginTop: 12, display: "inline-flex", gap: 8 }}>
          <Chip tone={s?.status === "Active" ? "green" : "red"} dot>{s?.status}</Chip>
          <Chip tone={s?.balance === "Paid" ? "green" : "brass"} dot>{s?.balance === "Paid" ? "Paid" : "Due"}</Chip>
          {rate !== null && <Chip tone={rate >= 75 ? "green" : "red"}>{rate}% attendance</Chip>}
        </div>
      </Card>
      <Card pad={8}>
        {rows.map(([k, v], i) => (
          <div key={k} style={{ display: "flex", justifyContent: "space-between", padding: "14px 14px", borderBottom: i < rows.length - 1 ? "1px solid var(--line)" : "none" }}>
            <span style={{ fontSize: 14, color: "var(--muted)" }}>{k}</span>
            <span style={{ fontSize: 14, fontWeight: 600, color: "var(--green)" }}>{v}</span>
          </div>
        ))}
      </Card>
      <div style={{ marginTop: 18 }}><Button full variant="danger" icon={LogOut} onClick={logout}>Sign out</Button></div>
    </StudentShell>
  );
}

export function StudentNotifications() {
  const { announcements, currentStudent } = useStore();
  return (
    <StudentShell title="Notifications">
      <div style={{ display: "grid", gap: 12 }}>
        {announcements.map((a) => (
          <Card key={a.id} pad={18}>
            <div style={{ display: "flex", gap: 14 }}>
              <div style={{ width: 42, height: 42, borderRadius: 11, background: "var(--sage-soft)", display: "grid", placeItems: "center", flexShrink: 0 }}><Bell size={19} color="var(--green)" /></div>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, marginBottom: 4 }}>
                  <Chip tone="brass">{a.scope}</Chip>
                  <span className="mono" style={{ fontSize: 11.5, color: "var(--muted)" }}>{new Date(a.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</span>
                </div>
                <div style={{ fontFamily: "'Fraunces',serif", fontSize: 18, color: "var(--green)", marginBottom: 4 }}>{a.title}</div>
                <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.55, margin: 0 }}>{a.body}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </StudentShell>
  );
}
