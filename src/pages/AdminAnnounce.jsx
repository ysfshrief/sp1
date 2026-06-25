import React, { useState } from "react";
import { Megaphone, Plus, Pencil, Trash2, Send } from "lucide-react";
import { useStore } from "../context/store.jsx";
import { AdminShell } from "../components/AdminShell.jsx";
import { Card, Button, Chip, Modal, Field, Input, Select, Textarea, useToast, Empty } from "../components/ui.jsx";
import { STAGES } from "../data/seed.js";

export function AdminAnnounce() {
  const { announcements, saveAnnouncement, deleteAnnouncement } = useStore();
  const toast = useToast();
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(null);

  const openNew = () => { setForm({ scope: "All groups", title: "", body: "", date: new Date().toISOString().slice(0, 10) }); setOpen(true); };
  const openEdit = (a) => { setForm({ ...a }); setOpen(true); };
  const save = () => {
    if (!form.title.trim() || !form.body.trim()) { toast("Add a title and a message", "red"); return; }
    saveAnnouncement(form); setOpen(false);
    toast(form.id ? "Announcement updated" : "Announcement posted", "green");
  };

  const scopes = ["All groups", ...STAGES];

  return (
    <AdminShell title="Announcements" subtitle="Notices shown to students in their notifications" action={<Button icon={Plus} onClick={openNew}>New announcement</Button>}>
      {announcements.length === 0 ? <Empty icon={Megaphone} title="No announcements yet" body="Post a notice and it lands in students' notifications instantly." action={<Button icon={Plus} onClick={openNew}>New announcement</Button>} /> :
        <div style={{ display: "grid", gap: 14, maxWidth: 760 }}>
          {announcements.map((a) => (
            <Card key={a.id} pad={20}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 14 }}>
                <div style={{ display: "flex", gap: 14 }}>
                  <div style={{ width: 44, height: 44, borderRadius: 11, background: "var(--sage-soft)", display: "grid", placeItems: "center", flexShrink: 0 }}><Megaphone size={20} color="var(--green)" /></div>
                  <div>
                    <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 5 }}>
                      <Chip tone="brass">{a.scope}</Chip>
                      <span className="mono" style={{ fontSize: 11.5, color: "var(--muted)" }}>{new Date(a.date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}</span>
                    </div>
                    <div style={{ fontFamily: "'Fraunces',serif", fontSize: 19, color: "var(--green)", marginBottom: 4 }}>{a.title}</div>
                    <p style={{ fontSize: 14, color: "var(--muted)", lineHeight: 1.55, margin: 0 }}>{a.body}</p>
                  </div>
                </div>
                <div style={{ display: "flex", gap: 6, flexShrink: 0 }}>
                  <button onClick={() => openEdit(a)} style={iconBtn}><Pencil size={15} color="var(--green)" /></button>
                  <button onClick={() => { deleteAnnouncement(a.id); toast("Announcement removed", "brass"); }} style={{ ...iconBtn, borderColor: "#EBC9C0", background: "var(--red-soft)" }}><Trash2 size={15} color="var(--red)" /></button>
                </div>
              </div>
            </Card>
          ))}
        </div>}

      <Modal open={open} onClose={() => setOpen(false)} title={form?.id ? "Edit announcement" : "New announcement"}>
        {form && <>
          <Field label="Who sees this?" hint="Send to everyone or just one stage">
            <Select value={form.scope} onChange={(e) => setForm({ ...form, scope: e.target.value })}>{scopes.map((s) => <option key={s}>{s}</option>)}</Select>
          </Field>
          <Field label="Title"><Input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="e.g. Centre closed on Friday" /></Field>
          <Field label="Message"><Textarea value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} placeholder="Write the notice students will read…" /></Field>
          <div style={{ display: "flex", gap: 12 }}><Button full icon={Send} onClick={save}>{form.id ? "Save changes" : "Post announcement"}</Button><Button variant="ghost" onClick={() => setOpen(false)}>Cancel</Button></div>
        </>}
      </Modal>
    </AdminShell>
  );
}

const iconBtn = { width: 34, height: 34, borderRadius: 9, border: "1px solid var(--line)", background: "var(--paper)", display: "grid", placeItems: "center", cursor: "pointer" };
