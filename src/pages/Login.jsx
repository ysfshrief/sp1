import React, { useState } from "react";
import { ArrowRight, Eye, EyeOff, AlertCircle, GraduationCap, ShieldCheck } from "lucide-react";
import { useStore } from "../context/store.jsx";
import { Button, Wordmark, Seal, TeacherPhoto, Input } from "../components/ui.jsx";

export function Login() {
  const { go, login } = useStore();
  const [role, setRole] = useState("student");
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [err, setErr] = useState("");
  const [remember, setRemember] = useState(true);

  const fill = (r) => { setRole(r); setEmail(r === "admin" ? "secretary@special1.com" : "student@special1.com"); setPw("123456"); setErr(""); };
  const submit = (e) => { e.preventDefault(); if (!login(role, email.trim(), pw)) setErr("Those details don't match an account. Use a demo login below to enter."); };

  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr" }} className="login-grid">
      {/* brand side */}
      <div style={{ background: "var(--green)", color: "#FBF9F4", padding: 48, display: "flex", flexDirection: "column", justifyContent: "space-between", position: "relative", overflow: "hidden" }} className="login-brand seal-grain">
        <div onClick={() => go("landing")} style={{ cursor: "pointer", position: "relative", zIndex: 2 }}><Wordmark light size={46} /></div>
        <div style={{ position: "relative", zIndex: 2 }}>
          <Seal size={64} light />
          <h1 style={{ fontSize: 44, marginTop: 22, marginBottom: 16, lineHeight: 1.06 }}>Welcome back to<br />the centre.</h1>
          <p style={{ fontSize: 16.5, color: "#C7D6CC", lineHeight: 1.62, maxWidth: 380 }}>
            Sign in to see this week's homework, recitation, exams, your grades and your attendance — all kept up to date by the secretary after every lesson.
          </p>
        </div>
        <TeacherPhoto variant="filled" rounded={18} style={{ position: "absolute", right: -40, bottom: -20, width: 280, height: 360, opacity: .96, transform: "rotate(-3deg)", boxShadow: "var(--shadow-lg)" }} />
        <div style={{ position: "relative", zIndex: 2, fontSize: 13, color: "#8FA89B" }}>Designed & developed by Youssef Shrief</div>
      </div>

      {/* form side */}
      <div style={{ display: "grid", placeItems: "center", padding: "40px 24px", background: "var(--ivory)" }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div className="login-mobile-brand" style={{ display: "none", justifyContent: "center", marginBottom: 28 }}><Wordmark size={46} /></div>
          <h2 style={{ fontSize: 33, color: "var(--green)", marginBottom: 6 }}>Sign in</h2>
          <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 26 }}>Choose who you are to continue.</p>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, background: "var(--ivory-2)", padding: 5, borderRadius: 13, marginBottom: 24 }}>
            {[["student", "Student", GraduationCap], ["admin", "Secretary", ShieldCheck]].map(([r, label, Ic]) => (
              <button key={r} onClick={() => setRole(r)} style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 12, borderRadius: 10, border: "none", fontWeight: 700, fontSize: 14.5, background: role === r ? "var(--paper)" : "transparent", color: role === r ? "var(--green)" : "var(--muted)", boxShadow: role === r ? "var(--shadow-sm)" : "none" }}>
                <Ic size={17} /> {label}
              </button>
            ))}
          </div>

          <form onSubmit={submit}>
            <label style={{ display: "block", marginBottom: 14 }}>
              <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--green)", marginBottom: 7 }}>Email</span>
              <Input type="email" value={email} placeholder="you@special1.com" onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label style={{ display: "block", marginBottom: 12 }}>
              <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--green)", marginBottom: 7 }}>Password</span>
              <div style={{ position: "relative" }}>
                <Input type={show ? "text" : "password"} value={pw} placeholder="••••••" onChange={(e) => setPw(e.target.value)} style={{ paddingRight: 44 }} />
                <button type="button" onClick={() => setShow(!show)} style={{ position: "absolute", right: 8, top: 9, background: "none", border: "none", padding: 4 }}>{show ? <EyeOff size={18} color="var(--muted)" /> : <Eye size={18} color="var(--muted)" />}</button>
              </div>
            </label>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13.5, color: "var(--green)" }}>
                <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} style={{ accentColor: "var(--green)", width: 16, height: 16 }} /> Keep me signed in
              </label>
              <span style={{ fontSize: 13.5, color: "var(--brass)", fontWeight: 700, cursor: "pointer" }}>Forgot password?</span>
            </div>
            {err && <div style={{ background: "var(--red-soft)", color: "var(--red)", padding: "11px 14px", borderRadius: 11, fontSize: 13.5, marginBottom: 16, display: "flex", gap: 8, alignItems: "center" }}><AlertCircle size={17} /> {err}</div>}
            <Button type="submit" full size="lg" icon={ArrowRight}>Enter the portal</Button>
          </form>

          <div style={{ marginTop: 22, padding: 16, background: "var(--paper)", borderRadius: 14, border: "1px dashed var(--brass-soft)" }}>
            <div style={{ fontSize: 11.5, fontWeight: 700, color: "var(--brass)", letterSpacing: 1, marginBottom: 10 }}>DEMO LOGINS — TAP TO FILL</div>
            <div style={{ display: "grid", gap: 8 }}>
              <button onClick={() => fill("admin")} style={{ textAlign: "left", background: "var(--ivory)", border: "1px solid var(--line)", borderRadius: 9, padding: "10px 12px", fontSize: 13, color: "var(--green)" }}><strong>Secretary</strong> · secretary@special1.com · 123456</button>
              <button onClick={() => fill("student")} style={{ textAlign: "left", background: "var(--ivory)", border: "1px solid var(--line)", borderRadius: 9, padding: "10px 12px", fontSize: 13, color: "var(--green)" }}><strong>Student</strong> · student@special1.com · 123456</button>
            </div>
          </div>
          <div style={{ textAlign: "center", marginTop: 20 }}><span onClick={() => go("landing")} style={{ fontSize: 14, color: "var(--muted)", cursor: "pointer" }}>← Back to home</span></div>
        </div>
      </div>
    </div>
  );
}
