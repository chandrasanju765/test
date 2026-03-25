import { lerp, clamp, ease, RX, RY } from "./ScrollHero";

export default function Card({ card, progress }) {
  const rad = (card.angle * Math.PI) / 180;

  // Position on horizontal oval
  const ox = Math.cos(rad) * RX;   // vw from center
  const oy = -Math.sin(rad) * RY;  // vh from center (CSS Y inverted)

  // Exit: radially outward, way off-screen
  const mag = Math.sqrt(ox * ox + oy * oy) || 1;
  const EX = (ox / mag) * 130;
  const EY = (oy / mag) * 130;

  // Movement: starts at 35% scroll, done at 90%
  const t = ease(clamp((progress - 0.35) / 0.55, 0, 1));

  const tx      = lerp(ox, EX, t);
  const ty      = lerp(oy, EY, t);
  const opacity = lerp(1, 0, clamp((progress - 0.65) / 0.3, 0, 1));

  return (
    <div style={{
      position: "absolute",
      left: `calc(50% + ${tx}vw)`,
      top: `calc(50% + ${ty}vh)`,
      transform: `translate(-50%, -50%) rotate(${card.rotate}deg)`,
      opacity,
      zIndex: card.z,
      willChange: "transform, opacity",
      pointerEvents: "none",
    }}>
      <div style={{
        background: "white",
        borderRadius: 20,
        width: 160,           /* ← bigger than before (was 128px) */
        paddingTop: 10,
        paddingBottom: 16,
        paddingLeft: 16,
        paddingRight: 16,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 9,
        boxShadow: "0 12px 40px rgba(0,0,0,0.26), 0 2px 8px rgba(0,0,0,0.10)",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Colored top accent bar */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0,
          height: 5, background: card.accent,
          borderRadius: "20px 20px 0 0",
        }} />

        {/* Icon box */}
        <div style={{
          width: 68, height: 68,
          background: "#f5f3ff",
          borderRadius: 14,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 32,
          marginTop: 6,
        }}>
          {card.emoji}
        </div>

        {/* Skeleton lines */}
        <div style={{ width: 96, height: 7, borderRadius: 4, background: "#e2e8f0" }} />
        <div style={{ width: 72, height: 7, borderRadius: 4, background: "#ede9fe" }} />
        <div style={{ width: 56, height: 7, borderRadius: 4, background: "#f1f5f9" }} />

        {/* Label */}
        <span style={{
          fontSize: 11, fontWeight: 800, color: card.accent,
          letterSpacing: 0.8, textTransform: "uppercase", marginTop: 2,
        }}>
          {card.label}
        </span>
      </div>
    </div>
  );
}
