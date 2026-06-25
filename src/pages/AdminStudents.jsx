import React, { useState, useMemo } from "react";
import {
  Plus, Pencil, Trash2, Search, QrCode, ArrowRightLeft,
} from "lucide-react";
import { useStore } from "../context/store.jsx";
import { AdminShell } from "../components/AdminShell.jsx";
import { Card, Button, Chip, Modal, Field, Input, Select, Avatar, useToast, Empty } from "../components/ui.jsx";
import { QR } from "../components/QR.jsx";
import { STAGES } from "../data/seed.js";

export function AdminStudents() {
  const { students, groups, groupById, saveStudent, deleteStudent, moveStudent, route } = useStore();
  const toast = useToast();
  const [q, setQ] = useState("");
  const [groupFilter, setGroupFilter] = useState(route.params.groupId || "all");
  const [stageFilter, setStageFilter] = useState("all");
  const [edit, setEdit] = useState(null);
  const [form, setForm] = useState({});
  const [qrFor, setQrFor] = useState(null);
  const [moveFor, setMoveFor] = useState(null);

  const filtered = useMemo(() => students.filter((s) => {
    const mq = s.name.toLowerCase().includes(q.toLowerCase()) || s.code.toLowerCase().includes(q.toLowerCase());
    const mg = groupFilter === "all" || s.groupId === groupFilter;
    const ms = stageFilter === "all" || s.stage === stageFilter;
    return mq && mg && ms;
  }), [students, q, groupFilter, stageFilter]);

  const openNew = () => { setForm({ name: "", phone: "", guardianPhone: "", stage: STAGES[0], groupId: groups[0]?.id, status: "Active", balance: "Paid" }); setEdit("new"); };
  const openEdit = (s) => { setForm({ ...s }); setEdit("edit"); };
  const save = () => { if (!form.name) { toast("Add a name", "red"); return; } saveStudent(form); setEdit(null); toast(form.id ? "Student updated" : "Student added", "green"); };
  const remove = (s) => { deleteStudent(s.id); toast("Student removed", "brass"); };

  return (
    <AdminShell title="Students" subtitle={`${students.length} enrolled`} action={<Button icon={Plus} onClick={openNew}>Add student</Button>}>
      <Card pad={16} style={{ marginBottom: 18 }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div style={{ position: "relative", flex: 1, minWidth: 200 }}>
            <Search size={17} color="var(--muted)" style={{ position: "absolute", left: 13, top: 13 }} />
            <Input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search name or ID…" style={{ paddingLeft: 40 }} />
          </div>
          <Select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)} style={{ maxWidth: 200 }}>
            <option value="all">All stages</option>{STAGES.map((s) => <option key={s}>{s}</option>)}
          </Select>
          <Select value={groupFilter} onChange={(e) => setGroupFilter(e.target.value)} style={{ maxWidth: 220 }}>
            <option value="all">All groups</option>{groups.map((g) => <option key={g.id} value={g.id}>{g.code} — {g.label}</option>)}
          </Select>
        </div>
      </Card>

      <Card pad={0} style={{ overflow: "hidden" }}>
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 720 }}>
            <thead><tr style={{ background: "var(--ivory)" }}>
              {["Student", "Group", "Guardian", "Status", "Fees", "Actions"].map((h) => <th key={h} style={{ textAlign: "left", padding: "13px 18px", fontSize: 11.5, letterSpacing: .5, color: "var(--muted)", fontWeight: 700, textTransform: "uppercase", borderBottom: "1px solid var(--line)" }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {filtered.map((s) => {
                const g = groupById(s.groupId);
                return (
                  <tr key={s.id} style={{ borderBottom: "1px solid var(--line)" }}>
                    <td style={{ padding: "12px 18px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
                        <Avatar name={s.name} size={36} />
                        <div><div style={{ fontWeight: 600, color: "var(--green)", fontSize: 14 }}>{s.name}</div><div className="mono" style={{ fontSize: 11.5, color: "var(--muted)" }}>{s.code}</div></div>
                      </div>
                    </td>
                    <td style={{ padding: "12px 18px" }}>{g ? <div><div style={{ fontSize: 13.5, color: "var(--green)", fontWeight: 600 }}>{g.code}</div><div style={{ fontSize: 12, color: "var(--muted)" }}>{g.label}</div></div> : <Chip tone="red">No group</Chip>}</td>
                    <td style={{ padding: "12px 18px", fontSize: 13, color: "var(--muted)" }}>{s.guardianPhone}</td>
                    <td style={{ padding: "12px 18px" }}><Chip tone={s.status === "Active" ? "green" : "red"} dot>{s.status}</Chip></td>
                    <td style={{ padding: "12px 18px" }}><Chip tone={s.balance === "Paid" ? "green" : "brass"}>{s.balance}</Chip></td>
                    <td style={{ padding: "12px 18px" }}>
                      <div style={{ display: "flex", gap: 6 }}>
                        <button title="QR pass" onClick={() => setQrFor(s)} style={iconBtn}><QrCode size={15} color="var(--green)" /></button>
                        <button title="Move group" onClick={() => { setMoveFor(s); }} style={iconBtn}><ArrowRightLeft size={15} color="var(--green)" /></button>
                        <button title="Edit" onClick={() => openEdit(s)} style={iconBtn}><Pencil size={15} color="var(--green)" /></button>
                        <button title="Remove" onClick={() => remove(s)} style={{ ...iconBtn, borderColor: "#EBC9C0", background: "var(--red-soft)" }}><Trash2 size={15} color="var(--red)" /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && <tr><td colSpan={6}><Empty icon={Search} title="No students match" body="Try a different name, stage or group." /></td></tr>}
            </tbody>
          </table>
        </div>
      </Card>

      {/* edit/new modal */}
      <Modal open={!!edit} onClose={() => setEdit(null)} title={edit === "new" ? "Add student" : "Edit student"}>
        <Field label="Full name"><Input value={form.name || ""} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="e.g. Youssef Hassan" /></Field>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Field label="Student phone"><Input value={form.phone || ""} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+20 1…" /></Field>
          <Field label="Guardian phone"><Input value={form.guardianPhone || ""} onChange={(e) => setForm({ ...form, guardianPhone: e.target.value })} placeholder="+20 1…" /></Field>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Field label="Stage"><Select value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })}>{STAGES.map((s) => <option key={s}>{s}</option>)}</Select></Field>
          <Field label="Group"><Select value={form.groupId || ""} onChange={(e) => setForm({ ...form, groupId: e.target.value })}>{groups.map((g) => <option key={g.id} value={g.id}>{g.code} — {g.label}</option>)}</Select></Field>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
          <Field label="Status"><Select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}><option>Active</option><option>Inactive</option></Select></Field>
          <Field label="This month's fees"><Select value={form.balance} onChange={(e) => setForm({ ...form, balance: e.target.value })}><option>Paid</option><option>Due</option></Select></Field>
        </div>
        <div style={{ display: "flex", gap: 12, marginTop: 6 }}><Button full onClick={save}>{edit === "new" ? "Add student" : "Save changes"}</Button><Button variant="ghost" onClick={() => setEdit(null)}>Cancel</Button></div>
      </Modal>

      {/* QR modal */}
      <Modal open={!!qrFor} onClose={() => setQrFor(null)} title="Student QR pass">
        {qrFor && <div style={{ textAlign: "center" }}>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 22, color: "var(--green)" }}>{qrFor.name}</div>
          <div className="mono" style={{ fontSize: 13, color: "var(--muted)", marginBottom: 18 }}>{qrFor.code}</div>
          <div style={{ display: "inline-block", padding: 16, border: "1px solid var(--line)", borderRadius: 16, background: "var(--paper)" }}><QR value={qrFor.code} size={200} /></div>
          <p style={{ fontSize: 13, color: "var(--muted)", marginTop: 14, maxWidth: 280, marginInline: "auto" }}>Print this or send it to the student. It's scanned at the door to record attendance.</p>
        </div>}
      </Modal>

      {/* move modal */}
      <Modal open={!!moveFor} onClose={() => setMoveFor(null)} title="Move to another group">
        {moveFor && <>
          <p style={{ fontSize: 14.5, color: "var(--muted)", marginBottom: 16 }}>Move <strong style={{ color: "var(--green)" }}>{moveFor.name}</strong> to a different group.</p>
          <Field label="New group">
            <Select defaultValue={moveFor.groupId} onChange={(e) => moveFor._target = e.target.value}>
              {groups.map((g) => <option key={g.id} value={g.id}>{g.code} — {g.stage} · {g.label}</option>)}
            </Select>
          </Field>
          <Button full onClick={() => { moveStudent(moveFor.id, moveFor._target || moveFor.groupId); setMoveFor(null); toast("Student moved", "green"); }}>Move student</Button>
        </>}
      </Modal>
    </AdminShell>
  );
}

const iconBtn = { width: 34, height: 34, borderRadius: 9, border: "1px solid var(--line)", background: "var(--paper)", display: "grid", placeItems: "center", cursor: "pointer" };
