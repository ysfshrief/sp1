import React, { useState } from "react";
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react";
import { Wordmark } from "./ui.jsx";
import { SecretaryContactModal, CENTRE } from "./Contact.jsx";

/* The processed logo lives at /public/designer-logo.webp */
function DesignerLogo() {
  const [err, setErr] = useState(false);
  if (err) {
    return (
      <div style={{ width: 44, height: 44, borderRadius: 10, border: "1.5px dashed rgba(228,210,168,.5)", display: "grid", placeItems: "center", flexShrink: 0 }}>
        <span className="mono" style={{ fontSize: 9, color: "#E4D2A8", textAlign: "center", lineHeight: 1.1 }}>logo</span>
      </div>
    );
  }
  return <img src="/designer-logo.webp" alt="Joe Industries" onError={() => setErr(true)} style={{ height: 32, width: "auto", maxWidth: "100%", objectFit: "contain", flexShrink: 1, minWidth: 0 }} />;
}

export function Footer() {
  const [contact, setContact] = useState(false);
  return (
    <footer style={{ background: "var(--green-3)", color: "#C7D6CC" }}>
      <div className="wrap" style={{ padding: "56px 24px 30px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1.4fr", gap: 40 }} className="footer-grid">
          {/* brand + hours */}
          <div>
            <Wordmark light size={46} />
            <p style={{ fontSize: 14.5, lineHeight: 1.66, marginTop: 18, maxWidth: 330, color: "#A9BEB2" }}>
              The English centre of Mr. Hady Attia. Homework, recitation, exams, grades and attendance — for every group, in one place.
            </p>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 9, marginTop: 18, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 12, padding: "10px 14px" }}>
              <Clock size={17} color="#E4D2A8" />
              <span style={{ fontSize: 13.5 }}><span style={{ color: "#8FA89B" }}>Working hours </span><strong style={{ color: "#FBF9F4" }}>{CENTRE.hours}</strong></span>
            </div>
          </div>

          {/* platform links */}
          <div>
            <div style={{ fontSize: 12.5, letterSpacing: 2, textTransform: "uppercase", color: "#E4D2A8", fontWeight: 700, marginBottom: 14 }}>Platform</div>
            {["Student portal", "Group schedules", "Attendance", "PDF library", "Grades & notes"].map((t) => (
              <div key={t} style={{ fontSize: 14.5, padding: "5px 0", color: "#A9BEB2" }}>{t}</div>
            ))}
          </div>

          {/* contact */}
          <div>
            <div style={{ fontSize: 12.5, letterSpacing: 2, textTransform: "uppercase", color: "#E4D2A8", fontWeight: 700, marginBottom: 14 }}>Contact the centre</div>

            {/* phones */}
            <div style={{ display: "grid", gap: 8, marginBottom: 14 }}>
              {CENTRE.phones.map((p) => (
                <div key={p.tel} style={{ display: "flex", alignItems: "center", gap: 10, justifyContent: "space-between", flexWrap: "wrap" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                    <Phone size={15} color="#E4D2A8" />
                    <a href={`tel:${p.tel}`} className="mono" style={{ fontSize: 14, color: "#FBF9F4", direction: "ltr" }}>{p.display}</a>
                  </div>
                  <a href={`https://wa.me/${p.wa}`} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 12, fontWeight: 700, color: "#7BD89A" }}>
                    <MessageCircle size={13} /> WhatsApp
                  </a>
                </div>
              ))}
            </div>

            {/* address */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: 9, marginBottom: 14 }}>
              <MapPin size={15} color="#E4D2A8" style={{ marginTop: 3, flexShrink: 0 }} />
              <span dir="rtl" style={{ fontSize: 13.5, lineHeight: 1.55, color: "#C7D6CC", textAlign: "right" }}>{CENTRE.addressAr}</span>
            </div>

            <button onClick={() => setContact(true)} style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(228,210,168,.14)", border: "1px solid rgba(228,210,168,.3)", borderRadius: 11, padding: "10px 16px", color: "#E4D2A8", fontWeight: 700, fontSize: 13.5, cursor: "pointer" }}>
              <Phone size={15} /> Contact the secretary
            </button>
          </div>
        </div>

        {/* Designer credit band */}
        <div style={{ marginTop: 44, paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.1)", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 18 }}>
          <div style={{ fontSize: 13, color: "#8FA89B" }}>© {new Date().getFullYear()} Special 1 — Hady Attia. All rights reserved.</div>
          <div className="credit-card" style={{ display: "flex", alignItems: "center", gap: 14, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 14, padding: "10px 16px", maxWidth: "100%", minWidth: 0, flexWrap: "wrap" }}>
            <DesignerLogo />
            <span className="credit-divider" style={{ width: 1, height: 34, background: "rgba(255,255,255,.14)" }} />
            <div style={{ lineHeight: 1.3, minWidth: 0 }}>
              <div style={{ fontSize: 11, letterSpacing: 1.5, textTransform: "uppercase", color: "#8FA89B" }}>Designed & developed by</div>
              <div style={{ fontFamily: "'Fraunces',serif", fontSize: 18, color: "#FBF9F4", fontWeight: 600 }}>Youssef Shrief</div>
              <div style={{ fontSize: 11.5, color: "#E4D2A8", fontWeight: 600 }}>Web Development</div>
            </div>
          </div>
        </div>
      </div>
      <SecretaryContactModal open={contact} onClose={() => setContact(false)} />
    </footer>
  );
}
