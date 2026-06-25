import React, { useEffect, useRef } from "react";
import QRCode from "qrcode";

export function QR({ value, size = 160, dark = "#0B3D2E", light = "#FBF9F4" }) {
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    QRCode.toCanvas(ref.current, value || " ", {
      width: size, margin: 1, color: { dark, light },
      errorCorrectionLevel: "M",
    }).catch(() => {});
  }, [value, size, dark, light]);
  return <canvas ref={ref} style={{ width: size, height: size, borderRadius: 10, display: "block" }} />;
}
