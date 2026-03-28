import { useEffect, useRef, useState } from "react";
import { clamp, ease } from "./helpers";

export default function TrustSection() {
  const sectionRef = useRef(null);
  const [p, setP] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const scrolled = -el.getBoundingClientRect().top;
      const total = el.offsetHeight - window.innerHeight;
      setP(Math.max(0, Math.min(1, scrolled / (total * 0.88))));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const lp = (start, end) => ease(clamp((p - start) / (end - start), 0, 1));

  // Only the ghost annotations animate — scroll windows
  const ghost1 = lp(0.15, 0.40); // left annotation slides in
  const ghost2 = lp(0.45, 0.70); // right annotation slides in

  const serif = "'Playfair Display','Georgia',serif";

  return (
    <div ref={sectionRef} style={{ height: "280vh", position: "relative", background: "#fff" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        overflow: "hidden",
        padding: "0 6vw",
      }}>

        {/* ── Static big text — always fully visible ─────────────────── */}
        <div style={{
          position: "relative",
          textAlign: "center",
          zIndex: 1,
          lineHeight: 1.08,
        }}>
          {/* Trust, */}
          <div>
            <span style={{
              fontFamily: serif,
              fontSize: "clamp(64px,11vw,140px)",
              fontWeight: 900, color: "#1a3a6b",
              display: "block", lineHeight: 1.0,
            }}>Trust,</span>
          </div>

          {/* however is fragile. — same line */}
          <div style={{
            display: "flex", alignItems: "baseline",
            justifyContent: "center", gap: "0.2em", flexWrap: "wrap",
          }}>
            <span style={{
              fontFamily: serif,
              fontSize: "clamp(48px,8vw,110px)",
              fontWeight: 400, color: "#aaa", lineHeight: 1.0,
            }}>however is</span>
            <span style={{
              fontFamily: serif,
              fontSize: "clamp(48px,8vw,110px)",
              fontWeight: 900, color: "#1a1a1a", lineHeight: 1.05,
            }}>fragile.</span>
          </div>

          {/* One news headline. */}
          <div>
            <span style={{ fontFamily: serif, fontSize: "clamp(40px,7vw,100px)", fontWeight: 900, color: "#e53e3e" }}>One </span>
            <span style={{ fontFamily: serif, fontSize: "clamp(40px,7vw,100px)", fontWeight: 400, color: "#999" }}>news headline.</span>
          </div>

          {/* One breach */}
          <div>
            <span style={{ fontFamily: serif, fontSize: "clamp(40px,7vw,100px)", fontWeight: 900, color: "#e53e3e" }}>One </span>
            <span style={{ fontFamily: serif, fontSize: "clamp(40px,7vw,100px)", fontWeight: 400, color: "#999" }}>breach</span>
          </div>

          {/* One bad experience. */}
          <div>
            <span style={{ fontFamily: serif, fontSize: "clamp(40px,7vw,100px)", fontWeight: 900, color: "#e53e3e" }}>One </span>
            <span style={{ fontFamily: serif, fontSize: "clamp(40px,7vw,100px)", fontWeight: 400, color: "#999" }}>bad experience.</span>
          </div>

          {/* Footer line */}
          <div style={{ marginTop: 28 }}>
            <p style={{ fontSize: "clamp(14px,1.2vw,20px)", color: "#555", lineHeight: 1.6, margin: 0 }}>
              is all it takes to undo years of hard-earned customer confidence.
            </p>
          </div>
        </div>

        {/* ── Ghost annotation 1 — slides UP from below as user scrolls ── */}
        <div style={{
          position: "absolute",
          left: "22%", top: "42%",
          zIndex: 10,
          pointerEvents: "none",
          background: "rgba(255,220,218,0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: 8,
          padding: "16px 22px",
          width: 340,
          opacity: ghost1,
          // Starts 120px below its final position, scrolls up into place
          transform: `translateY(${(1 - ghost1) * 120}px)`,
          transition: "none",
        }}>
          <p style={{
            fontSize: 14, color: "#222", lineHeight: 1.7,
            fontFamily: "'Inter',sans-serif", margin: 0,
          }}>
            When speed and scale take priority, due diligence
            slips and blind spots widen. That's exactly what is
            happening in the gig economy today.
          </p>
        </div>

        {/* ── Ghost annotation 2 — slides UP from below, offset timing ─── */}
        <div style={{
          position: "absolute",
          right: "8%", bottom: "22%",
          zIndex: 10,
          pointerEvents: "none",
          background: "rgba(220,225,240,0.65)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderRadius: 8,
          padding: "16px 22px",
          width: 360,
          opacity: ghost2,
          // Starts 120px below, scrolls up into place
          transform: `translateY(${(1 - ghost2) * 120}px)`,
          transition: "none",
        }}>
          <p style={{
            fontSize: 14, color: "#222", lineHeight: 1.7,
            fontFamily: "'Inter',sans-serif", margin: 0,
          }}>
            Identity swaps, impersonation, and hidden criminal
            histories do more than disrupt operations. They put
            safety, credibility, and customer trust at risk.
          </p>
        </div>

      </div>
    </div>
  );
}