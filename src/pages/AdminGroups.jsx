import React, { useState } from "react";
import {
  Plus, Pencil, Trash2, Users, MapPin, Clock, Merge, GitMerge, CalendarDays,
} from "lucide-react";
import { useStore } from "../context/store.jsx";
import { AdminShell } from "../components/AdminShell.jsx";
import { Card, Button, Chip, Modal, Field, Input, Select, useToast, Empty } from "../components/ui.jsx";
import { STAGES, HALLS, DAYS, fmtTime } from "../data/seed.js";

const blank = { code: "", stage: STAGES[0], label: "", days: [], time: "17:30", hall: HALLS[0], capacity: 30 };

export function AdminGroups() {
  const { groups, studentsByGroup, saveGroup, deleteGroup, mergeGroups, go } = useStore();
  const toast = useToast();
  const [modal, setModal] = useState(null); // 'edit' | 'merge' | null
  const [form, setForm] = useState(blank);
  const [mergeFrom, setMergeFrom] = useState(null);
  const [mergeInto, setMergeInto] = useState("");

  const openNew = () => { setForm(blank); setModal("edit"); };
  const openEdit = (g) => { setForm({ ...g }); setModal("edit"); };
  const toggleDay = (d) => setForm((f) => ({ ...f, days: f.days.includes(d) ? f.days.filter((x) => x !== d) : [...f.days, d] }));
  const save = () => {
    if (!form.label || form.days.length === 0) { toast("Add a name and at least one day", "red"); return; }
    saveGroup(form); setModal(null);
    toast(form.id ? "Group updated" : "Group created", "green");
  };
  const remove = (g) => { deleteGroup(g.id); toast("Group cancelled", "brass"); };
  const openMerge = (g) => { setMergeFrom(g); setMergeInto(""); setModal("merge"); };
  const doMerge = () => { if (!mergeInto) return; mergeGroups(mergeFrom.id, mergeInto); setModal(null); toast("Groups merged", "green"); };

  const byStage = STAGES.map((st) => ({ stage: st, items: groups.filter((g) => g.stage === st) })).filter((x) => x.items.length);

  return (
    <AdminShell title="Groups" subtitle={`${groups.length} groups running`} action={<Button icon={Plus} onClick={openNew}>New group</Button>}>
      {groups.length === 0 && <Empty icon={CalendarDays} title="No groups yet" body="Create your first group to start enrolling students and taking attendance." action={<Button icon={Plus} onClick={openNew}>New group</Button>} />}
      {byStage.map(({ stage, items }) => (
        <div key={stage} style={{ marginBottom: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <h2 style={{ fontSize: 20, color: "var(--green)" }}>{stage}</h2>
            <span style={{ flex: 1, height: 1, background: "var(--line)" }} />
            <Chip tone="sage">{items.length} {items.length === 1 ? "group" : "groups"}</Chip>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(280px,1fr))", gap: 16 }}>
            {items.map((g) => {
              const count = studentsByGroup(g.id).length;
              const full = count >= g.capacity;
              return (
                <Card key={g.id} pad={20} hover>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
                    <div>
                      <span className="mono" style={{ fontSize: 12, color: "var(--brass)", fontWeight: 600 }}>{g.code}</span>
                      <div style={{ fontFamily: "'Fraunces',serif", fontSize: 19, color: "var(--green)", marginTop: 2 }}>{g.label}</div>
                    </div>
                    <Chip tone={full ? "red" : "green"}>{count}/{g.capacity}</Chip>
                  </div>
                  <div style={{ display: "grid", gap: 7, marginBottom: 14 }}>
                    <div style={{ fontSize: 13.5, color: "var(--ink)", display: "flex", alignItems: "center", gap: 8 }}><CalendarDays size={15} color="var(--sage)" /> {g.days.join(" & ")}</div>
                    <div style={{ fontSize: 13.5, color: "var(--ink)", display: "flex", alignItems: "center", gap: 8 }}><Clock size={15} color="var(--sage)" /> {fmtTime(g.time)}</div>
                    <div style={{ fontSize: 13.5, color: "var(--ink)", display: "flex", alignItems: "center", gap: 8 }}><MapPin size={15} color="var(--sage)" /> {g.hall}</div>
                  </div>
                  <div style={{ display: "flex", gap: 7, borderTop: "1px solid var(--line)", paddingTop: 12 }}>
                    <Button size="sm" variant="ghost" icon={Users} onClick={() => go("a-students", { groupId: g.id })}>Roster</Button>
                    <Button size="sm" variant="ghost" icon={Pencil} onClick={() => openEdit(g)}>Edit</Button>
                    <button title="Merge into another group" onClick={() => openMerge(g)} style={{ width: 34, height: 34, borderRadius: 9, border: "1px solid var(--line)", background: "var(--paper)", display: "grid", placeItems: "center" }}><GitMerge size={15} color="var(--green)" /></button>
                    <button title="Cancel group" onClick={() => remove(g)} style={{ width: 34, height: 34, borderRadius: 9, border: "1px solid #EBC9C0", background: "var(--red-soft)", display: "grid", placeItems: "center", marginLeft: "auto" }}><Trash2 size={15} color="var(--red)" /></button>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      ))}

      {/* edit modal */}
      <Modal open={modal === "edit"} onClose={() => setModal(null)} title={form.id ? "Edit group" : "New group"} wide>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Field label="Stage"><Select value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })}>{STAGES.map((s) => <option key={s}>{s}</option>)}</Select></Field>
          <Field label="Group code" hint="Short code shown on rosters, e.g. 3S-A"><Input value={form.code} onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })} placeholder="3S-A" /></Field>
        </div>
        <Field label="Group name" hint="What students recognise it by"><Input value={form.label} onChange={(e) => setForm({ ...form, label: e.target.value })} placeholder="e.g. Experimental — Boys / Group A" /></Field>
        <Field label="Lesson days" hint="Pick the two days this group meets">
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {DAYS.map((d) => (
              <button key={d} onClick={() => toggleDay(d)} type="button" style={{ padding: "8px 13px", borderRadius: 99, border: `1px solid ${form.days.includes(d) ? "var(--green)" : "var(--line)"}`, background: form.days.includes(d) ? "var(--green)" : "var(--paper)", color: form.days.includes(d) ? "#FBF9F4" : "var(--green)", fontSize: 13, fontWeight: 600 }}>{d.slice(0, 3)}</button>
            ))}
          </div>
        </Field>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 14 }}>
          <Field label="Time"><Input type="time" value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })} /></Field>
          <Field label="Hall"><Select value={form.hall} onChange={(e) => setForm({ ...form, hall: e.target.value })}>{HALLS.map((h) => <option key={h}>{h}</option>)}</Select></Field>
          <Field label="Capacity"><Input type="number" value={form.capacity} onChange={(e) => setForm({ ...form, capacity: +e.target.value })} /></Field>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
          <Button full onClick={save}>{form.id ? "Save changes" : "Create group"}</Button>
          <Button variant="ghost" onClick={() => setModal(null)}>Cancel</Button>
        </div>
      </Modal>

      {/* merge modal */}
      <Modal open={modal === "merge"} onClose={() => setModal(null)} title="Merge group">
        <p style={{ fontSize: 14.5, color: "var(--muted)", lineHeight: 1.6, marginBottom: 18 }}>
          Move every student from <strong style={{ color: "var(--green)" }}>{mergeFrom?.label}</strong> into another group, then cancel the empty one. This is handy when combining small groups for revision.
        </p>
        <Field label="Move students into">
          <Select value={mergeInto} onChange={(e) => setMergeInto(e.target.value)}>
            <option value="">Choose a group…</option>
            {groups.filter((g) => g.id !== mergeFrom?.id).map((g) => <option key={g.id} value={g.id}>{g.code} — {g.stage} · {g.label}</option>)}
          </Select>
        </Field>
        <div style={{ display: "flex", gap: 12, marginTop: 6 }}>
          <Button full icon={Merge} onClick={doMerge} disabled={!mergeInto}>Merge & cancel original</Button>
          <Button variant="ghost" onClick={() => setModal(null)}>Cancel</Button>
        </div>
      </Modal>
    </AdminShell>
  );
}
