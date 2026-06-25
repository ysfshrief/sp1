import React, { useState, useMemo } from "react";
import {
  FileText, Upload, Search, Eye, Download, Trash2, FolderOpen,
} from "lucide-react";
import { useStore } from "../context/store.jsx";
import { AdminShell } from "../components/AdminShell.jsx";
import { Card, Button, Chip, Field, Input, Select, Modal, useToast, Empty } from "../components/ui.jsx";

const CATEGORIES = ["Homework", "Recitation", "Worksheets", "Booklets", "Revision files", "Exams"];

// Seed library, derived from published lessons + a few standing files.
const seedLibrary = [
  { id: "f1", name: "reported-speech-hw.pdf", category: "Homework", stage: "Third Secondary", size: "240 KB", date: "2026-06-23" },
  { id: "f2", name: "reporting-verbs-list.pdf", category: "Recitation", stage: "Third Secondary", size: "120 KB", date: "2026-06-23" },
  { id: "f3", name: "crime-society-vocab.pdf", category: "Worksheets", stage: "Third Secondary", size: "180 KB", date: "2026-06-20" },
  { id: "f4", name: "grammar-booklet-term2.pdf", category: "Booklets", stage: "First Secondary", size: "3.1 MB", date: "2026-06-10" },
  { id: "f5", name: "prep3-revision-pack.pdf", category: "Revision files", stage: "Third Preparatory", size: "1.4 MB", date: "2026-06-15" },
  { id: "f6", name: "mock-exam-paper-1.pdf", category: "Exams", stage: "Third Secondary", size: "420 KB", date: "2026-06-18" },
  { id: "f7", name: "tenses-worksheet.pdf", category: "Worksheets", stage: "Second Preparatory", size: "210 KB", date: "2026-06-12" },
  { id: "f8", name: "listening-booklet.pdf", category: "Booklets", stage: "Second Secondary", size: "2.2 MB", date: "2026-06-08" },
];

const catTone = { Homework: "red", Recitation: "blue", Worksheets: "sage", Booklets: "brass", "Revision files": "green", Exams: "ink" };

export function AdminLibrary() {
  const toast = useToast();
  const [files, setFiles] = useState(seedLibrary);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("all");
  const [upOpen, setUpOpen] = useState(false);
  const [upForm, setUpForm] = useState({ name: "", category: CATEGORIES[0], stage: "Third Secondary" });

  const filtered = useMemo(() => files.filter((f) => {
    const mq = f.name.toLowerCase().includes(q.toLowerCase());
    const mc = cat === "all" || f.category === cat;
    return mq && mc;
  }), [files, q, cat]);

  const counts = CATEGORIES.map((c) => ({ c, n: files.filter((f) => f.category === c).length }));

  const doUpload = () => {
    if (!upForm.name.trim()) { toast("Pick a file or name it", "red"); return; }
    const name = upForm.name.endsWith(".pdf") ? upForm.name : upForm.name + ".pdf";
    setFiles((prev) => [{ id: "f" + Date.now(), name, category: upForm.category, stage: upForm.stage, size: "—", date: new Date().toISOString().slice(0, 10) }, ...prev]);
    setUpOpen(false); setUpForm({ name: "", category: CATEGORIES[0], stage: "Third Secondary" });
    toast("File added to the library", "green");
  };

  return (
    <AdminShell title="PDF library" subtitle={`${files.length} files`} action={<Button icon={Upload} onClick={() => setUpOpen(true)}>Upload PDF</Button>}>
      {/* category chips */}
      <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 18 }}>
        <button onClick={() => setCat("all")} style={chipBtn(cat === "all")}>All files · {files.length}</button>
        {counts.map(({ c, n }) => <button key={c} onClick={() => setCat(c)} style={chipBtn(cat === c)}>{c} · {n}</button>)}
      </div>

      <Card pad={16} style={{ marginBottom: 18 }}>
        <div style={{ position: "relative" }}>
          <Search size={17} color="var(--muted)" style={{ position: "absolute", left: 13, top: 13 }} />
          <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search files…" style={{ paddingLeft: 40 }} />
        </div>
      </Card>

      {filtered.length === 0 ? <Empty icon={FolderOpen} title="No files here yet" body="Upload a PDF or pick a different category." action={<Button icon={Upload} onClick={() => setUpOpen(true)}>Upload PDF</Button>} /> :
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
          {filtered.map((f) => (
            <Card key={f.id} pad={18} hover>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
                <div style={{ width: 46, height: 46, borderRadius: 12, background: "var(--red-soft)", display: "grid", placeItems: "center" }}><FileText size={22} color="var(--red)" /></div>
                <Chip tone={catTone[f.category] || "sage"}>{f.category}</Chip>
              </div>
              <div style={{ fontSize: 14.5, fontWeight: 700, color: "var(--green)", wordBreak: "break-word", marginBottom: 4 }}>{f.name}</div>
              <div style={{ fontSize: 12, color: "var(--muted)" }}>{f.stage} · {f.size} · {new Date(f.date).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}</div>
              <div style={{ display: "flex", gap: 7, marginTop: 14, borderTop: "1px solid var(--line)", paddingTop: 12 }}>
                <Button size="sm" variant="ghost" icon={Eye} onClick={() => toast("Preview opens the PDF for the secretary", "sage")}>Preview</Button>
                <Button size="sm" variant="ghost" icon={Download} onClick={() => toast("Download starts", "sage")}>Get</Button>
                <button onClick={() => { setFiles((p) => p.filter((x) => x.id !== f.id)); toast("File removed", "brass"); }} style={{ width: 34, height: 34, borderRadius: 9, border: "1px solid #EBC9C0", background: "var(--red-soft)", display: "grid", placeItems: "center", marginLeft: "auto" }}><Trash2 size={15} color="var(--red)" /></button>
              </div>
            </Card>
          ))}
        </div>}

      <Modal open={upOpen} onClose={() => setUpOpen(false)} title="Upload a PDF">
        <label style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, padding: "28px 20px", background: "var(--ivory)", borderRadius: 14, border: "1.5px dashed var(--line)", cursor: "pointer", marginBottom: 16 }}>
          <div style={{ width: 50, height: 50, borderRadius: 13, background: "var(--green)", display: "grid", placeItems: "center" }}><Upload size={24} color="#E4D2A8" /></div>
          <span style={{ fontSize: 14.5, fontWeight: 600, color: "var(--green)" }}>{upForm.name || "Choose a PDF to upload"}</span>
          <span style={{ fontSize: 12.5, color: "var(--muted)" }}>PDF up to 10 MB</span>
          <input type="file" accept="application/pdf" style={{ display: "none" }} onChange={(e) => setUpForm({ ...upForm, name: e.target.files?.[0]?.name || "" })} />
        </label>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Field label="Category"><Select value={upForm.category} onChange={(e) => setUpForm({ ...upForm, category: e.target.value })}>{CATEGORIES.map((c) => <option key={c}>{c}</option>)}</Select></Field>
          <Field label="Stage"><Select value={upForm.stage} onChange={(e) => setUpForm({ ...upForm, stage: e.target.value })}>{["First Preparatory", "Second Preparatory", "Third Preparatory", "First Secondary", "Second Secondary", "Third Secondary"].map((s) => <option key={s}>{s}</option>)}</Select></Field>
        </div>
        <Button full icon={Upload} onClick={doUpload}>Add to library</Button>
      </Modal>
    </AdminShell>
  );
}

const chipBtn = (active) => ({ padding: "9px 15px", borderRadius: 99, border: `1px solid ${active ? "var(--green)" : "var(--line)"}`, background: active ? "var(--green)" : "var(--paper)", color: active ? "#FBF9F4" : "var(--green)", fontWeight: 600, fontSize: 13.5, cursor: "pointer", whiteSpace: "nowrap" });
