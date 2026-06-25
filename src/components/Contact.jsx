import React, { useState } from "react";
import { Phone, X, MessageCircle } from "lucide-react";

// Centre contact details — single source of truth.
export const CENTRE = {
  phones: [
    { display: "+20 10 70879401", tel: "+201070879401", wa: "201070879401" },
    { display: "+20 10 32678576", tel: "+201032678576", wa: "201032678576" },
  ],
  addressAr: "شارع السد العالي أمام الشعلة للايس كريم بجوار مدرسة التحرير",
  hours: "1:00 PM – 8:00 PM",
};

// Action sheet: for each secretary number, choose Call or WhatsApp.
export function SecretaryContactModal({ open, onClose }) {
  if (!open) return null;
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(11,32,27,.55)", backdropFilter: "blur(6px)", zIndex: 400, display: "flex", alignItems: "flex-end", justifyContent: "center", padding: 0 }} className="fade">
      <div onClick={(e) => e.stopPropagation()} className="contact-sheet pop" style={{ background: "var(--paper)", width: "100%", maxWidth: 460, borderRadius: "22px 22px 0 0", boxShadow: "var(--shadow-lg)", overflow: "hidden" }}>
        <div style={{ padding: "18px 22px", borderBottom: "1px solid var(--line)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <h3 style={{ fontSize: 21, color: "var(--green)" }}>Contact the secretary</h3>
            <p style={{ fontSize: 13, color: "var(--muted)", margin: "2px 0 0" }}>Pick a number, then call or message on WhatsApp.</p>
          </div>
          <button onClick={onClose} style={{ background: "var(--ivory-2)", border: "none", borderRadius: 9, width: 36, height: 36, display: "grid", placeItems: "center", flexShrink: 0 }}><X size={18} color="var(--muted)" /></button>
        </div>
        <div style={{ padding: 18, display: "grid", gap: 16 }}>
          {CENTRE.phones.map((p, i) => (
            <div key={p.tel} style={{ border: "1px solid var(--line)", borderRadius: 16, overflow: "hidden" }}>
              <div style={{ padding: "12px 16px", background: "var(--ivory)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: "var(--green)", display: "grid", placeItems: "center" }}><Phone size={16} color="#E4D2A8" /></div>
                  <div>
                    <div style={{ fontSize: 11.5, color: "var(--muted)", fontWeight: 600 }}>Secretary {i + 1}</div>
                    <div className="mono" style={{ fontSize: 15, fontWeight: 600, color: "var(--green)", direction: "ltr" }}>{p.display}</div>
                  </div>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 1, background: "var(--line)" }}>
                <a href={`tel:${p.tel}`} style={sheetBtn("var(--green)", "#FBF9F4")}>
                  <Phone size={17} /> Call secretary
                </a>
                <a href={`https://wa.me/${p.wa}`} target="_blank" rel="noopener noreferrer" style={sheetBtn("#1FA855", "#FBF9F4")}>
                  <MessageCircle size={17} /> WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="safe-b" style={{ padding: "4px 18px 18px" }}>
          <button onClick={onClose} style={{ width: "100%", padding: "13px", borderRadius: 12, border: "1px solid var(--line)", background: "var(--paper)", color: "var(--muted)", fontWeight: 600, fontSize: 14.5 }}>Close</button>
        </div>
      </div>
    </div>
  );
}

const sheetBtn = (bg, fg) => ({
  display: "flex", alignItems: "center", justifyContent: "center", gap: 9,
  padding: "15px 12px", background: bg, color: fg, fontWeight: 700, fontSize: 14.5,
  textDecoration: "none", border: "none", cursor: "pointer",
});
