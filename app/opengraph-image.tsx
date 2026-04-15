import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Hairo Jets private aviation experience";
export const size = {
  width: 1200,
  height: 630,
};

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          background:
            "radial-gradient(circle at top left, rgba(255,255,255,0.14), transparent 28%), linear-gradient(135deg, #080808 0%, #111111 58%, #030303 100%)",
          color: "white",
          padding: "72px",
          alignItems: "flex-end",
          justifyContent: "space-between",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ maxWidth: 760 }}>
          <div style={{ fontSize: 24, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.68)" }}>
            Hairo Jets
          </div>
          <div style={{ fontSize: 74, lineHeight: 1, fontWeight: 600, marginTop: 20, letterSpacing: "-0.05em" }}>
            Private aviation, reimagined.
          </div>
          <div style={{ fontSize: 30, lineHeight: 1.35, marginTop: 28, color: "rgba(255,255,255,0.76)" }}>
            Cinematic presentation, discreet coordination, and global reach.
          </div>
        </div>
        <div
          style={{
            width: 156,
            height: 156,
            borderRadius: 999,
            border: "1px solid rgba(255,255,255,0.14)",
            background: "rgba(255,255,255,0.04)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 44,
            fontWeight: 700,
            letterSpacing: "-0.08em",
          }}
        >
          HJ
        </div>
      </div>
    ),
    size,
  );
}
