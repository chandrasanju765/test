import { useEffect, useRef, useState } from "react";
import Card from "./Card";

// ─── Helpers ──────────────────────────────────────────────────────────────────
export const lerp = (a, b, t) => a + (b - a) * t;
export const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));
export const ease = (t) =>
  t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

// ─── Oval radii ───────────────────────────────────────────────────────────────
// Tighter oval so big cards naturally overlap and fill the viewport
export const RX = 34; // vw  (horizontal radius)
export const RY = 27; // vh  (vertical radius)

// ─── 16 cards — evenly spaced at 22.5° around the oval ───────────────────────
// More cards + bigger size = dense overlapping ring that fills the screen
export const CARDS = [
  { id: 1,  label: "AI Model",   emoji: "🧠", angle: 180,   rotate: -14, accent: "#7c3aed", z: 6  },
  { id: 2,  label: "Face ID",    emoji: "📷", angle: 157.5, rotate:  10, accent: "#6d28d9", z: 7  },
  { id: 3,  label: "KYC",        emoji: "🪪", angle: 135,   rotate:  -6, accent: "#f59e0b", z: 8  },
  { id: 4,  label: "Verified",   emoji: "✅", angle: 112.5, rotate:   4, accent: "#10b981", z: 9  },
  { id: 5,  label: "Mobile",     emoji: "📱", angle:  90,   rotate:  -9, accent: "#6d28d9", z: 9  },
  { id: 6,  label: "Selfie",     emoji: "🤳", angle:  67.5, rotate:  12, accent: "#0891b2", z: 8  },
  { id: 7,  label: "Email",      emoji: "📧", angle:  45,   rotate:  16, accent: "#b45309", z: 7  },
  { id: 8,  label: "Docs",       emoji: "📄", angle:  22.5, rotate:  -7, accent: "#2563eb", z: 6  },
  { id: 9,  label: "Fraud",      emoji: "🛡️", angle:   0,   rotate:  -5, accent: "#dc2626", z: 7  },
  { id: 10, label: "Bank",       emoji: "🏦", angle: 337.5, rotate:  11, accent: "#15803d", z: 8  },
  { id: 11, label: "Score",      emoji: "📊", angle: 315,   rotate:  -5, accent: "#d97706", z: 9  },
  { id: 12, label: "Scan Doc",   emoji: "🔍", angle: 292.5, rotate:   6, accent: "#7c3aed", z: 9  },
  { id: 13, label: "Fingerprint",emoji: "🫆", angle: 270,   rotate: -10, accent: "#6d28d9", z: 8  },
  { id: 14, label: "Map",        emoji: "🗺️", angle: 247.5, rotate:  -9, accent: "#0891b2", z: 7  },
  { id: 15, label: "Address",    emoji: "📍", angle: 225,   rotate:   9, accent: "#dc2626", z: 8  },
  { id: 16, label: "Credit",     emoji: "💳", angle: 202.5, rotate: -12, accent: "#4f46e5", z: 7  },
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function ScrollHero() {
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const p = clamp(
        -el.getBoundingClientRect().top / (el.offsetHeight * 0.62),
        0, 1
      );
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Animation values ──────────────────────────────────────────────────────
  const headingScale = lerp(0.44, 1, ease(clamp(progress / 0.75, 0, 1)));

  const colorT = ease(clamp((progress - 0.3) / 0.5, 0, 1));
  const headingColor = `rgb(${Math.round(lerp(255, 170, colorT))}, 255, ${Math.round(lerp(255, 0, colorT))})`;

  const subP  = ease(clamp((progress - 0.62) / 0.28, 0, 1));
  const btnP  = ease(clamp((progress - 0.74) / 0.26, 0, 1));

  return (
    <>
      {/* ── 300 vh scroll driver ── */}
      <div ref={sectionRef} style={{ height: "300vh", position: "relative" }}>
        <div style={{
          position: "sticky", top: 0, height: "100vh",
          overflow: "hidden", background: "#5b21b6",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>

          {/* Grid */}
          <div style={{
            position: "absolute", inset: 0,
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)," +
              "linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }} />

          {/* Cards */}
          {CARDS.map((card) => (
            <Card key={card.id} card={card} progress={progress} />
          ))}

          {/* Central text */}
          <div style={{
            position: "relative", zIndex: 20, textAlign: "center",
            transform: `scale(${headingScale})`,
            willChange: "transform", padding: "0 20px", maxWidth: 960,
          }}>
            <h1 style={{
              fontFamily: "'Impact','Arial Black','Haettenschweiler',sans-serif",
              fontSize: "clamp(56px, 9.5vw, 148px)",
              fontWeight: 900, color: headingColor,
              margin: 0, lineHeight: 0.95,
              textTransform: "uppercase", willChange: "color",
            }}>
              Going Beyond
            </h1>

            <h2 style={{
              fontFamily: "'Georgia',serif",
              fontSize: "clamp(18px, 2.5vw, 36px)",
              fontWeight: 700, color: "white",
              margin: "16px 0 10px",
              opacity: subP,
              transform: `translateY(${lerp(22, 0, subP)}px)`,
            }}>
              Financial Score
            </h2>

            <p style={{
              color: "rgba(255,255,255,0.85)",
              fontSize: "clamp(13px, 1.05vw, 17px)",
              opacity: subP,
              transform: `translateY(${lerp(16, 0, subP)}px)`,
              maxWidth: 500, margin: "0 auto 30px", lineHeight: 1.7,
            }}>
              The easiest way to verify emails, identities, and detect forged
              documents: all in real time.
            </p>

            <div style={{
              display: "flex", gap: 14, justifyContent: "center",
              flexWrap: "wrap",
              opacity: btnP,
              transform: `translateY(${lerp(26, 0, btnP)}px)`,
            }}>
              <button
                style={{
                  background: "#aaff00", color: "#111", border: "none",
                  padding: "14px 40px", borderRadius: 999,
                  fontSize: 16, fontWeight: 800, cursor: "pointer",
                  boxShadow: "0 4px 24px rgba(170,255,0,0.45)",
                  fontFamily: "inherit", letterSpacing: 0.3,
                  transition: "transform 0.15s",
                }}
                onMouseEnter={e => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
              >
                Try For Free
              </button>
              <button
                style={{
                  background: "rgba(255,255,255,0.10)", color: "white",
                  border: "2px solid rgba(255,255,255,0.38)",
                  padding: "14px 40px", borderRadius: 999,
                  fontSize: 16, fontWeight: 700, cursor: "pointer",
                  backdropFilter: "blur(12px)",
                  fontFamily: "inherit", letterSpacing: 0.3,
                  transition: "background 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.22)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.10)"}
              >
                Explore the Suite
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Section below ── */}
      <div style={{ padding: "100px 40px", textAlign: "center", background: "#f5f3ff" }}>
        <h3 style={{ fontSize: 28, color: "#5b21b6", fontFamily: "'Georgia',serif", marginBottom: 14 }}>
          Beyond Financial Score
        </h3>
        <p style={{ color: "#64748b", maxWidth: 520, margin: "0 auto", lineHeight: 1.75, fontSize: 16, fontFamily: "system-ui,sans-serif" }}>
          Real-time identity verification, document fraud detection, and credit intelligence — all in one platform.
        </p>
        <button style={{
          marginTop: 32, background: "#7c3aed", color: "white", border: "none",
          padding: "14px 36px", borderRadius: 999, fontSize: 15, fontWeight: 700,
          cursor: "pointer", fontFamily: "system-ui,sans-serif",
        }}>
          ↑ Scroll back up to replay
        </button>
      </div>
    </>
  );
}
