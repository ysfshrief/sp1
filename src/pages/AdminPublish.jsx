import React, { useState } from "react";
import {
  ClipboardCheck, Upload, FileText, Check, X, Mic2, FileWarning, StickyNote, Send, Trash2,
} from "lucide-react";
import { useStore } from "../context/store.jsx";
import { AdminShell } from "../components/AdminShell.jsx";
import { Card, Button, Chip, Field, Input, Select, Textarea, useToast, Empty } from "../components/ui.jsx";
import { fmtTime } from "../data/seed.js";

const blank = (groupId) => ({
  groupId, date: new Date().toISOString().slice(0, 10), title: "",
  homework: "", homeworkPdf: "", recitation: "", recitationPdf: "",
  examNext: false, examDetails: "", notes: "",
});

// A lightweight "file picker" that just records a filename (no real upload backend in the demo).
function PdfPick({ value, onChange, label }) {
  return (
    <div>
      <div style={{ fontSize: 13, fontWeight: 700, color: "var(--green)", marginBottom: 7 }}>{label}</div>
      {value ? (
        <div style={{ display: "flex", alignItems: "center", gap: 11, padding: "11px 13px", background: "var(--ivory)", borderRadius: 11, border: "1px solid var(--line)" }}>
          <div style={{ width: 34, height: 34, borderRadius: 8, background: "var(--red-soft)", display: "grid", placeItems: "center" }}><FileText size={16} color="var(--red)" /></div>
          <span style={{ flex: 1, fontSize: 13.5, fontWeight: 600, color: "var(--green)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{value}</span>
          <button onClick={() => onChange("")} style={{ width: 30, height: 30, borderRadius: 8, border: "none", background: "var(--red-soft)", display: "grid", placeItems: "center" }}><X size={15} color="var(--red)" /></button>
        </div>
      ) : (
        <label style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 13px", background: "var(--paper)", borderRadius: 11, border: "1.5px dashed var(--line)", cursor: "pointer", color: "var(--muted)", fontSize: 13.5 }}>
          <Upload size={16} color="var(--sage)" /> Attach a PDF
          <input type="file" accept="application/pdf" style={{ display: "none" }} onChange={(e) => onChange(e.target.files?.[0]?.name || "")} />
        </label>
      )}
    </div>
  );
}

export function AdminPublish() {
  const { groups, lessons, publishLesson, deleteLesson, groupById } = useStore();
  const toast = useToast();
  const [form, setForm] = useState(blank(groups[0]?.id));
  const set = (k, v) => setForm((f) => ({ ...f, [k]: v }));

  const publish = () => {
    if (!form.title.trim()) { toast("Give the lesson a title", "red"); return; }
    if (!form.homework.trim()) { toast("Add the homework", "red"); return; }
    publishLesson({ ...form });
    toast("Published — students can see it now", "green");
    setForm(blank(form.groupId));
  };

  const recent = [...lessons].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);

  return (
    <AdminShell title="Publish lesson" subtitle="Fill this in after a lesson ends — it updates every student's dashboard">
      <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr", gap: 20 }} className="admin-2col">
        {/* form */}
        <Card pad={24}>
          <div style={{ display: "grid", gridTemplateColumns: "1.3fr 1fr", gap: 14 }}>
            <Field label="Group"><Select value={form.groupId} onChange={(e) => set("groupId", e.target.value)}>{groups.map((g) => <option key={g.id} value={g.id}>{g.code} — {g.stage} · {g.label}</option>)}</Select></Field>
            <Field label="Lesson date"><Input type="date" value={form.date} onChange={(e) => set("date", e.target.value)} /></Field>
          </div>
          <Field label="Lesson title" hint="What was covered today"><Input value={form.title} onChange={(e) => set("title", e.target.value)} placeholder="e.g. Reported Speech — Statements & Questions" /></Field>

          <div style={{ height: 1, background: "var(--line)", margin: "6px 0 18px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><ClipboardCheck size={18} color="var(--brass)" /><span style={{ fontWeight: 700, color: "var(--green)" }}>Homework</span></div>
          <Field label="Homework description"><Textarea value={form.homework} onChange={(e) => set("homework", e.target.value)} placeholder="What should students do before the next lesson?" /></Field>
          <div style={{ marginBottom: 18 }}><PdfPick label="Homework PDF" value={form.homeworkPdf} onChange={(v) => set("homeworkPdf", v)} /></div>

          <div style={{ height: 1, background: "var(--line)", margin: "6px 0 18px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><Mic2 size={18} color="var(--brass)" /><span style={{ fontWeight: 700, color: "var(--green)" }}>Recitation</span></div>
          <Field label="Recitation for next lesson"><Textarea value={form.recitation} onChange={(e) => set("recitation", e.target.value)} placeholder="What should students prepare to recite?" style={{ minHeight: 70 }} /></Field>
          <div style={{ marginBottom: 18 }}><PdfPick label="Recitation PDF" value={form.recitationPdf} onChange={(v) => set("recitationPdf", v)} /></div>

          <div style={{ height: 1, background: "var(--line)", margin: "6px 0 18px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><FileWarning size={18} color="var(--brass)" /><span style={{ fontWeight: 700, color: "var(--green)" }}>Exam next lesson?</span></div>
          <div style={{ display: "flex", gap: 10, marginBottom: form.examNext ? 14 : 18 }}>
            {[["No exam", false], ["Yes — exam next time", true]].map(([label, val]) => (
              <button key={label} onClick={() => set("examNext", val)} style={{ flex: 1, padding: "11px", borderRadius: 11, border: `1px solid ${form.examNext === val ? "var(--green)" : "var(--line)"}`, background: form.examNext === val ? "var(--green)" : "var(--paper)", color: form.examNext === val ? "#FBF9F4" : "var(--green)", fontWeight: 600, fontSize: 14 }}>{label}</button>
            ))}
          </div>
          {form.examNext && <Field label="Exam details"><Input value={form.examDetails} onChange={(e) => set("examDetails", e.target.value)} placeholder="e.g. 15-min quiz on reported speech" /></Field>}

          <div style={{ height: 1, background: "var(--line)", margin: "6px 0 18px" }} />
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}><StickyNote size={18} color="var(--brass)" /><span style={{ fontWeight: 700, color: "var(--green)" }}>Note from the teacher</span></div>
          <Field label="Notes (optional)"><Textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} placeholder="Anything students or parents should know" style={{ minHeight: 70 }} /></Field>

          <Button full size="lg" icon={Send} onClick={publish}>Publish to students</Button>
        </Card>

        {/* live preview + recent */}
        <div style={{ display: "grid", gap: 16, alignContent: "start" }}>
          <Card pad={0} style={{ overflow: "hidden", position: "sticky", top: 90 }}>
            <div style={{ padding: "12px 16px", background: "var(--green)", color: "#FBF9F4", display: "flex", alignItems: "center", gap: 8 }}><Check size={16} color="#E4D2A8" /><span style={{ fontWeight: 700, fontSize: 13.5 }}>Student preview</span></div>
            <div style={{ padding: 18 }}>
              <div className="mono" style={{ fontSize: 11.5, color: "var(--muted)" }}>{groupById(form.groupId)?.code} · {new Date(form.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 19, color: "var(--green)", margin: "4px 0 10px" }}>{form.title || "Lesson title…"}</div>
              <div style={{ fontSize: 12.5, fontWeight: 700, color: "var(--brass)", marginBottom: 4 }}>HOMEWORK</div>
              <p style={{ fontSize: 13.5, color: "var(--ink)", opacity: .8, margin: "0 0 12px", lineHeight: 1.5 }}>{form.homework || "Homework appears here…"}</p>
              {form.examNext && <Chip tone="red" dot>Exam next lesson</Chip>}
            </div>
          </Card>
        </div>
      </div>

      {/* recent publishes */}
      <h2 style={{ fontSize: 20, color: "var(--green)", margin: "28px 0 14px" }}>Recently published</h2>
      {recent.length === 0 ? <Empty icon={ClipboardCheck} title="Nothing published yet" body="Publish your first lesson and it'll show up here." /> :
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 14 }}>
          {recent.map((l) => (
            <Card key={l.id} pad={18}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
                <Chip tone="sage">{groupById(l.groupId)?.code || "—"}</Chip>
                <button onClick={() => { deleteLesson(l.id); toast("Lesson removed", "brass"); }} style={{ width: 30, height: 30, borderRadius: 8, border: "1px solid #EBC9C0", background: "var(--red-soft)", display: "grid", placeItems: "center" }}><Trash2 size={14} color="var(--red)" /></button>
              </div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 17, color: "var(--green)", marginBottom: 6 }}>{l.title}</div>
              <div className="mono" style={{ fontSize: 11.5, color: "var(--muted)" }}>{new Date(l.date).toLocaleDateString("en-GB", { weekday: "short", day: "numeric", month: "short" })}</div>
              <div style={{ display: "flex", gap: 6, marginTop: 10, flexWrap: "wrap" }}>
                {l.homeworkPdf && <Chip tone="red">HW PDF</Chip>}
                {l.recitationPdf && <Chip tone="blue">Recitation PDF</Chip>}
                {l.examNext && <Chip tone="brass">Exam set</Chip>}
              </div>
            </Card>
          ))}
        </div>}
    </AdminShell>
  );
}
