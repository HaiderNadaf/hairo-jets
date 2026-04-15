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
          background: "linear-gradient(135deg, #050505 0%, #131313 100%)",
          color: "white",
          padding: "72px",
          alignItems: "flex-end",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div>
          <div style={{ fontSize: 24, letterSpacing: "0.35em", textTransform: "uppercase", color: "rgba(255,255,255,0.68)" }}>
            Hairo Jets
          </div>
          <div style={{ fontSize: 70, lineHeight: 1, fontWeight: 600, marginTop: 20, letterSpacing: "-0.05em" }}>
            Private aviation, reimagined.
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.35, marginTop: 28, color: "rgba(255,255,255,0.76)" }}>
            Cinematic presentation with global reach.
          </div>
        </div>
      </div>
    ),
    size,
  );
}
