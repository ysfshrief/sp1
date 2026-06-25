import React, { useEffect, useRef, useState } from "react";
import {
  Camera, CameraOff,
} from "lucide-react";

/*
  Wraps html5-qrcode for live camera scanning.
  Because a demo / desktop without a camera still needs to work, this component
  degrades gracefully: if the camera can't start, the parent shows manual entry,
  and a "simulate a scan" affordance is provided for presentations.
*/
export function Scanner({ onScan, active }) {
  const elId = useRef("qr-" + Math.random().toString(36).slice(2));
  const scannerRef = useRef(null);
  const [status, setStatus] = useState("idle"); // idle | running | error
  const lastRef = useRef({ code: null, t: 0 });

  useEffect(() => {
    let cancelled = false;
    async function start() {
      if (!active) return;
      try {
        const mod = await import("html5-qrcode");
        const { Html5Qrcode } = mod;
        if (cancelled) return;
        const inst = new Html5Qrcode(elId.current, { verbose: false });
        scannerRef.current = inst;
        await inst.start(
          { facingMode: "environment" },
          { fps: 12, qrbox: { width: 230, height: 230 } },
          (decoded) => {
            const now = Date.now();
            if (lastRef.current.code === decoded && now - lastRef.current.t < 2500) return;
            lastRef.current = { code: decoded, t: now };
            onScan(decoded);
          },
          () => {}
        );
        if (!cancelled) setStatus("running");
      } catch (e) {
        if (!cancelled) setStatus("error");
      }
    }
    start();
    return () => {
      cancelled = true;
      const inst = scannerRef.current;
      if (inst) { inst.stop().then(() => inst.clear()).catch(() => {}); scannerRef.current = null; }
    };
  }, [active, onScan]);

  return (
    <div style={{ position: "relative", borderRadius: 18, overflow: "hidden", background: "#0A1410", aspectRatio: "1", maxWidth: 360, margin: "0 auto", border: "1px solid var(--line)" }}>
      <div id={elId.current} style={{ width: "100%", height: "100%" }} />
      {/* frame guides */}
      {status === "running" && (
        <>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {[["top","left"],["top","right"],["bottom","left"],["bottom","right"]].map(([v,h],i)=>(
              <span key={i} style={{ position:"absolute", [v]:18, [h]:18, width:34, height:34, border:"3px solid var(--brass)", borderTopWidth: v==="top"?3:0, borderBottomWidth: v==="bottom"?3:0, borderLeftWidth: h==="left"?3:0, borderRightWidth: h==="right"?3:0, borderRadius:6 }} />
            ))}
            <span style={{ position: "absolute", left: "8%", right: "8%", height: 2, background: "linear-gradient(90deg,transparent,var(--brass),transparent)", animation: "scanline 2.4s ease-in-out infinite" }} />
          </div>
        </>
      )}
      {status !== "running" && (
        <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", color: "#C7D6CC", textAlign: "center", padding: 24 }}>
          <div>
            {status === "error" ? <CameraOff size={40} color="#E4D2A8" /> : <Camera size={40} color="#E4D2A8" />}
            <div style={{ marginTop: 12, fontSize: 14.5, fontWeight: 600 }}>
              {status === "error" ? "Camera unavailable" : "Starting camera…"}
            </div>
            <div style={{ marginTop: 6, fontSize: 12.5, color: "#90A89B", maxWidth: 240 }}>
              {status === "error" ? "Grant camera access, or record attendance by code below." : "Point the student's QR at the frame."}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
