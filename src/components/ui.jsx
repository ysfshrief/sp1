import React, { createContext, useContext, useState, useCallback } from "react";
import { Check, X, AlertTriangle, Info } from "lucide-react";

/* ---------- Brand seal: the signature stamp motif ---------- */
export function Seal({ size = 56, light = false }) {
  const ring = light ? "#E4D2A8" : "#B8893A";
  const bg = light ? "rgba(255,255,255,.08)" : "#0B3D2E";
  const fg = light ? "#FBF9F4" : "#FBF9F4";
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" aria-hidden="true" style={{ flexShrink: 0 }}>
      <defs>
        <path id="sealArc" d="M 50 50 m -34 0 a 34 34 0 1 1 68 0 a 34 34 0 1 1 -68 0" />
      </defs>
      <circle cx="50" cy="50" r="47" fill="none" stroke={ring} strokeWidth="1.4" strokeDasharray="2 3" opacity=".8" />
      <circle cx="50" cy="50" r="41" fill={bg} stroke={ring} strokeWidth="2" />
      <text fontFamily="'IBM Plex Mono',monospace" fontSize="7.4" fontWeight="600" fill={ring} letterSpacing="2.1">
        <textPath href="#sealArc" startOffset="0%">SPECIAL&nbsp;1 · HADY&nbsp;ATTIA · ENGLISH&nbsp;·&nbsp;</textPath>
      </text>
      <text x="50" y="46" textAnchor="middle" fontFamily="'Fraunces',serif" fontWeight="600" fontSize="30" fill={fg}>S1</text>
      <text x="50" y="62" textAnchor="middle" fontFamily="'IBM Plex Mono',monospace" fontSize="6.5" fill={ring} letterSpacing="2">EST · 2014</text>
    </svg>
  );
}

export function Wordmark({ light = false, size = 44, showSub = true }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 13 }}>
      <Seal size={size} light={light} />
      <div style={{ lineHeight: 1.04 }}>
        <div style={{ fontFamily: "'Fraunces',serif", fontWeight: 600, fontSize: size * 0.46, color: light ? "#FBF9F4" : "var(--green)" }}>
          Special&nbsp;1
        </div>
        {showSub && (
          <div style={{ fontSize: size * 0.2, letterSpacing: 3, textTransform: "uppercase", fontWeight: 700, color: light ? "#E4D2A8" : "var(--brass)" }}>
            Hady Attia · English
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------- Teacher photo: background-removed portrait at /public/hady.webp ---------- */
export function TeacherPhoto({ style, rounded = 24, eager = false, tag = "Mr. Hady Attia", variant = "cutout", align = "bottom" }) {
  const [err, setErr] = useState(false);
  // variant: "cutout" = transparent portrait floating on a branded green panel (hero/login)
  //          "filled" = the square composite that already sits on brand green (about)
  const src = variant === "filled" ? "/hady-square.webp" : "/hady.webp";

  if (err) {
    return (
      <div style={{
        background: "linear-gradient(160deg,var(--green),var(--green-3))", borderRadius: rounded,
        display: "grid", placeItems: "center", color: "#FBF9F4", position: "relative", overflow: "hidden", ...style,
      }} className="seal-grain">
        <div style={{ textAlign: "center", padding: 24 }}>
          <Seal size={72} light />
          <div style={{ marginTop: 14, fontFamily: "'Fraunces',serif", fontSize: 22 }}>{tag}</div>
          <div style={{ marginTop: 8, fontSize: 12.5, color: "#C7D6CC", maxWidth: 220, lineHeight: 1.5 }}>
            Photo unavailable — add <span className="mono" style={{ color: "#E4D2A8" }}>/public/hady.webp</span>.
          </div>
        </div>
      </div>
    );
  }

  if (variant === "filled") {
    return (
      <img src={src} alt={tag} loading={eager ? "eager" : "lazy"} onError={() => setErr(true)}
        style={{ objectFit: "cover", borderRadius: rounded, display: "block", background: "linear-gradient(160deg,var(--green),var(--green-3))", ...style }} />
    );
  }

  // cut-out portrait on a branded panel: subject anchored to the bottom
  return (
    <div className="seal-grain" style={{ position: "relative", borderRadius: rounded, overflow: "hidden", background: "linear-gradient(165deg,var(--green) 0%,var(--green-3) 70%,#072017 100%)", ...style }}>
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(120% 80% at 50% 0%, rgba(228,210,168,.14), transparent 60%)" }} />
      <img src={src} alt={tag} loading={eager ? "eager" : "lazy"} onError={() => setErr(true)}
        style={{ position: "absolute", left: "50%", bottom: 0, transform: "translateX(-50%)", height: align === "bottom" ? "100%" : "104%", maxWidth: "none", objectFit: "contain", filter: "drop-shadow(0 12px 28px rgba(0,0,0,.4))", display: "block" }} />
    </div>
  );
}

/* ---------- Buttons ---------- */
export function Button({ children, onClick, variant = "primary", size = "md", icon: Icon, full, type = "button", disabled, style }) {
  const sizes = {
    sm: { padding: "8px 14px", fontSize: 13.5, gap: 7, icon: 16 },
    md: { padding: "12px 20px", fontSize: 15, gap: 9, icon: 18 },
    lg: { padding: "15px 26px", fontSize: 16.5, gap: 10, icon: 20 },
  };
  const variants = {
    primary: { background: "var(--green)", color: "#FBF9F4", border: "1px solid var(--green)" },
    brass: { background: "linear-gradient(135deg,var(--brass),#A0742C)", color: "#1C1407", border: "1px solid #9A7029" },
    ghost: { background: "var(--paper)", color: "var(--green)", border: "1px solid var(--line)" },
    soft: { background: "var(--sage-soft)", color: "var(--green)", border: "1px solid transparent" },
    dark: { background: "rgba(255,255,255,.1)", color: "#FBF9F4", border: "1px solid rgba(255,255,255,.28)" },
    danger: { background: "var(--red-soft)", color: "var(--red)", border: "1px solid #EBC9C0" },
    plain: { background: "transparent", color: "var(--muted)", border: "1px solid transparent" },
  };
  const s = sizes[size];
  return (
    <button type={type} onClick={onClick} disabled={disabled}
      style={{
        display: "inline-flex", alignItems: "center", justifyContent: "center", gap: s.gap,
        padding: s.padding, fontSize: s.fontSize, fontWeight: 600, borderRadius: 11,
        width: full ? "100%" : undefined, transition: "transform .14s ease, filter .14s ease, box-shadow .14s",
        opacity: disabled ? 0.5 : 1, ...variants[variant], ...style,
      }}
      onMouseEnter={(e) => { if (!disabled) { e.currentTarget.style.transform = "translateY(-1.5px)"; e.currentTarget.style.filter = "brightness(1.04)"; } }}
      onMouseLeave={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.filter = "none"; }}>
      {Icon && <Icon size={s.icon} />}{children}
    </button>
  );
}

/* ---------- Card ---------- */
export function Card({ children, style, pad = 22, onClick, hover }) {
  return (
    <div onClick={onClick} style={{
      background: "var(--paper)", border: "1px solid var(--line)", borderRadius: "var(--r)",
      padding: pad, boxShadow: "var(--shadow-sm)", cursor: onClick ? "pointer" : undefined,
      transition: "transform .2s ease, box-shadow .2s ease", ...style,
    }}
      onMouseEnter={hover ? (e) => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = "var(--shadow-lg)"; } : undefined}
      onMouseLeave={hover ? (e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "var(--shadow-sm)"; } : undefined}>
      {children}
    </div>
  );
}

/* ---------- Status chip ---------- */
export function Chip({ tone = "sage", children, dot }) {
  const map = {
    sage: ["var(--sage)", "var(--sage-soft)"],
    brass: ["var(--amber)", "var(--amber-soft)"],
    red: ["var(--red)", "var(--red-soft)"],
    green: ["#0F7B3E", "#DEF1E5"],
    blue: ["var(--blue)", "#DCE9F2"],
    ink: ["var(--ink)", "var(--ivory-2)"],
  };
  const [fg, bg] = map[tone] || map.sage;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: bg, color: fg, fontSize: 12, fontWeight: 700, padding: "4px 10px", borderRadius: 99, letterSpacing: .2, whiteSpace: "nowrap" }}>
      {dot && <span style={{ width: 6, height: 6, borderRadius: 99, background: fg }} />}
      {children}
    </span>
  );
}

/* ---------- Eyebrow ---------- */
export function Eyebrow({ children, center, light }) {
  return (
    <div style={{ display: "inline-flex", alignItems: "center", gap: 10, justifyContent: center ? "center" : undefined }}>
      <span style={{ width: 22, height: 1.5, background: "var(--brass)" }} />
      <span style={{ fontSize: 12.5, letterSpacing: 3, fontWeight: 700, textTransform: "uppercase", color: light ? "#E4D2A8" : "var(--brass)" }}>{children}</span>
    </div>
  );
}

/* ---------- Modal ---------- */
export function Modal({ open, onClose, title, children, wide }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(11,32,27,.5)", backdropFilter: "blur(5px)", zIndex: 300, display: "grid", placeItems: "center", padding: 16 }} className="fade">
      <div onClick={(e) => e.stopPropagation()} className="pop" style={{ background: "var(--paper)", borderRadius: 22, width: "100%", maxWidth: wide ? 720 : 520, maxHeight: "92vh", overflow: "auto", boxShadow: "var(--shadow-lg)" }}>
        <div style={{ position: "sticky", top: 0, background: "var(--paper)", display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px", borderBottom: "1px solid var(--line)", zIndex: 2 }}>
          <h3 style={{ fontSize: 23, color: "var(--green)" }}>{title}</h3>
          <button onClick={onClose} style={{ background: "var(--ivory-2)", border: "none", borderRadius: 9, width: 36, height: 36, display: "grid", placeItems: "center" }}><X size={18} color="var(--muted)" /></button>
        </div>
        <div style={{ padding: 24 }}>{children}</div>
      </div>
    </div>
  );
}

/* ---------- Form field ---------- */
export function Field({ label, hint, children }) {
  return (
    <label style={{ display: "block", marginBottom: 16 }}>
      <span style={{ display: "block", fontSize: 13, fontWeight: 700, color: "var(--green)", marginBottom: 7 }}>{label}</span>
      {children}
      {hint && <span style={{ display: "block", fontSize: 12, color: "var(--muted)", marginTop: 5 }}>{hint}</span>}
    </label>
  );
}
const inputStyle = { width: "100%", padding: "12px 14px", borderRadius: 11, border: "1px solid var(--line)", fontSize: 15, background: "var(--ivory)", outline: "none", boxSizing: "border-box", color: "var(--ink)" };
export function Input(props) { return <input {...props} style={{ ...inputStyle, ...props.style }} />; }
export function Select({ children, ...props }) { return <select {...props} style={{ ...inputStyle, cursor: "pointer", appearance: "none", backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='14' height='14' viewBox='0 0 24 24' fill='none' stroke='%236B7B72' stroke-width='2'><path d='M6 9l6 6 6-6'/></svg>\")", backgroundRepeat: "no-repeat", backgroundPosition: "right 12px center", paddingRight: 36, ...props.style }}>{children}</select>; }
export function Textarea(props) { return <textarea {...props} style={{ ...inputStyle, resize: "vertical", minHeight: 90, ...props.style }} />; }

/* ---------- Avatar ---------- */
export function Avatar({ name, size = 40, src, tone }) {
  const initials = name ? name.split(" ").map((x) => x[0]).slice(0, 2).join("") : "?";
  if (src) return <img src={src} alt={name} style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover" }} />;
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", background: tone || "linear-gradient(140deg,var(--green),var(--sage))", color: "#FBF9F4", display: "grid", placeItems: "center", fontWeight: 700, fontSize: size * 0.36, flexShrink: 0, fontFamily: "'Plus Jakarta Sans',sans-serif" }}>
      {initials}
    </div>
  );
}

/* ---------- Toast system ---------- */
const ToastCtx = createContext(null);
export const useToast = () => useContext(ToastCtx);
export function ToastHost({ children }) {
  const [toasts, setToasts] = useState([]);
  const push = useCallback((msg, tone = "green") => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg, tone }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 3200);
  }, []);
  const icons = { green: Check, red: AlertTriangle, brass: Info, sage: Info };
  const colors = { green: "#0F7B3E", red: "var(--red)", brass: "var(--brass)", sage: "var(--green)" };
  return (
    <ToastCtx.Provider value={push}>
      {children}
      <div style={{ position: "fixed", bottom: 24, left: "50%", transform: "translateX(-50%)", zIndex: 500, display: "flex", flexDirection: "column", gap: 10, alignItems: "center", pointerEvents: "none" }}>
        {toasts.map((t) => {
          const Ic = icons[t.tone] || Check;
          return (
            <div key={t.id} style={{ animation: "toastIn .3s ease both", display: "flex", alignItems: "center", gap: 11, background: "var(--green)", color: "#FBF9F4", padding: "13px 18px", borderRadius: 13, boxShadow: "var(--shadow-lg)", fontSize: 14.5, fontWeight: 600, maxWidth: "90vw" }}>
              <span style={{ width: 22, height: 22, borderRadius: 99, background: colors[t.tone], display: "grid", placeItems: "center", flexShrink: 0 }}><Ic size={14} color="#fff" /></span>
              {t.msg}
            </div>
          );
        })}
      </div>
    </ToastCtx.Provider>
  );
}

/* ---------- Stat tile ---------- */
export function Stat({ label, value, icon: Icon, tone = "var(--green)", sub, onClick }) {
  return (
    <Card pad={20} hover={!!onClick} onClick={onClick}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <div style={{ fontSize: 13, color: "var(--muted)", fontWeight: 600, marginBottom: 8 }}>{label}</div>
          <div style={{ fontFamily: "'Fraunces',serif", fontSize: 34, fontWeight: 600, color: "var(--green)", lineHeight: 1 }}>{value}</div>
          {sub && <div style={{ fontSize: 12.5, color: "var(--muted)", marginTop: 7 }}>{sub}</div>}
        </div>
        {Icon && <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--ivory-2)", display: "grid", placeItems: "center" }}><Icon size={21} color={tone} /></div>}
      </div>
    </Card>
  );
}

/* ---------- Empty state ---------- */
export function Empty({ icon: Icon, title, body, action }) {
  return (
    <div style={{ textAlign: "center", padding: "48px 24px", color: "var(--muted)" }}>
      {Icon && <div style={{ width: 60, height: 60, borderRadius: 16, background: "var(--ivory-2)", display: "grid", placeItems: "center", margin: "0 auto 16px" }}><Icon size={28} color="var(--sage)" /></div>}
      <h3 style={{ fontSize: 20, color: "var(--green)", marginBottom: 6 }}>{title}</h3>
      <p style={{ fontSize: 14.5, maxWidth: 360, margin: "0 auto 18px", lineHeight: 1.6 }}>{body}</p>
      {action}
    </div>
  );
}
