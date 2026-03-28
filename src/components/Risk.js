import { useEffect, useRef, useState } from "react";
import { lerp, clamp, ease } from "./helpers";

const MONTHS = [
  { month: "January",   pct: "2.4%",  highlight: false },
  { month: "February",  pct: "2.81%", highlight: false },
  { month: "March",     pct: "2.94%", highlight: false },
  { month: "April",     pct: "3.17%", highlight: false },
  { month: "May",       pct: "2.81%", highlight: false },
  { month: "June",      pct: "2.75%", highlight: false },
  { month: "July",      pct: "3.2%",  highlight: false },
  { month: "August",    pct: "3.17%", highlight: false },
  { month: "September", pct: "3.36%", highlight: true  },
  { month: "October",   pct: "3.32%", highlight: true  },
  { month: "November",  pct: "3.48%", highlight: true  },
  { month: "December",  pct: "3.4%",  highlight: true  },
];

export default function StatsSection() {
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      const el = sectionRef.current; if (!el) return;
      const rect = el.getBoundingClientRect();
      const p = clamp(-rect.top / (el.offsetHeight - window.innerHeight), 0, 1);
      setProgress(p);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const title1P = ease(clamp(progress / 0.15, 0, 1));
  const hotP    = ease(clamp((progress - 0.10) / 0.18, 0, 1));
  const title2P = ease(clamp((progress - 0.28) / 0.15, 0, 1));
  const subP    = ease(clamp((progress - 0.35) / 0.15, 0, 1));

  return (
    <div ref={sectionRef} style={{ height: "520vh", position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        background: `
          radial-gradient(ellipse 55% 55% at 0% 100%, rgba(28,67,185,0.45) 0%, transparent 65%),
          radial-gradient(ellipse 45% 45% at 100% 0%, rgba(28,67,185,0.2) 0%, transparent 60%),
          #0a0a12
        `,
        display: "flex", flexDirection: "column",
        alignItems: "center",
        padding: "48px 64px 36px",
      }}>

        {/* Title 1 */}
        <h2 style={{
          fontFamily: "'Inter','Helvetica Neue',sans-serif",
          fontSize: "clamp(32px,4.8vw,72px)",
          fontWeight: 800, color: "white",
          margin: "0 0 28px", textAlign: "center", lineHeight: 1.08,
          maxWidth: 1000,
          opacity: title1P, transform: `translateY(${lerp(24, 0, title1P)}px)`,
        }}>
          E-commerce & Quick<br />Commerce Risk Hotspots
        </h2>

        {/* Hotspot Row */}
        <div style={{
          display: "flex", alignItems: "flex-start", justifyContent: "center",
          width: "100%", maxWidth: 1100, marginBottom: 44,
          opacity: hotP, transform: `translateY(${lerp(20, 0, hotP)}px)`,
        }}>
          {/* Delivery Partners */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src="/assets/delivery.png" alt="" style={{ width: 40, height: 40, objectFit: "contain" }} />
              <span style={{ color: "white", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", lineHeight: 1.3 }}>
                Delivery<br />Partners
              </span>
            </div>
            <div style={{ color: "#e53e3e", fontSize: 13, fontWeight: 600, fontFamily: "'Inter',sans-serif", marginTop: 4 }}>Karnataka</div>
            <div style={{ color: "white", fontSize: "clamp(30px,3.8vw,56px)", fontWeight: 800, fontFamily: "'Inter',sans-serif", lineHeight: 1 }}>6.91%</div>
          </div>

          {/* Center */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 6 }}>
            <div style={{ width:0, height:0, borderLeft:"6px solid transparent", borderRight:"6px solid transparent", borderBottom:"10px solid #e53e3e", marginBottom:6 }} />
            <span style={{ color:"white", fontSize:13, fontWeight:700, fontFamily:"'Inter',sans-serif", letterSpacing:0.3 }}>Quick commerce</span>
            <div style={{ width:0, height:0, borderLeft:"6px solid transparent", borderRight:"6px solid transparent", borderTop:"10px solid #e53e3e", marginTop:6 }} />
          </div>

          {/* Truck Drivers */}
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 6 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <img src="/assets/truck-driver.png" alt="" style={{ width: 40, height: 40, objectFit: "contain" }} />
              <span style={{ color: "white", fontSize: 14, fontWeight: 600, fontFamily: "'Inter',sans-serif", lineHeight: 1.3 }}>
                Truck<br />Drivers
              </span>
            </div>
            <div style={{ color: "#e53e3e", fontSize: 13, fontWeight: 600, fontFamily: "'Inter',sans-serif", marginTop: 4 }}>Maharashtra</div>
            <div style={{ color: "white", fontSize: "clamp(30px,3.8vw,56px)", fontWeight: 800, fontFamily: "'Inter',sans-serif", lineHeight: 1 }}>7.24%</div>
          </div>
        </div>

        {/* Title 2 */}
        <h2 style={{
          fontFamily: "'Inter','Helvetica Neue',sans-serif",
          fontSize: "clamp(28px,4vw,62px)",
          fontWeight: 800, color: "white",
          margin: "0 0 8px", textAlign: "center", lineHeight: 1.05,
          opacity: title2P, transform: `translateY(${lerp(20, 0, title2P)}px)`,
        }}>
          Seasonal Risk Spikes
        </h2>
        <p style={{
          color: "rgba(255,255,255,0.5)", fontSize: 13,
          margin: "0 0 24px", textAlign: "center",
          fontFamily: "'Inter',sans-serif",
          opacity: subP,
        }}>
          A cyclical view of how risk rates spike and decline throughout the year.
        </p>

        {/* Month Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: 16, width: "100%", maxWidth: 1100,
        }}>
          {MONTHS.map((m, i) => {
            const cp = ease(clamp((progress - 0.38 - i * 0.022) / 0.18, 0, 1));
            return (
              <div key={i} style={{
                borderRadius: 16,
                background: m.highlight
                  ? "linear-gradient(135deg,#7b1111 0%,#4a0000 100%)"
                  : "rgba(255,255,255,0.07)",
                border: `1px solid ${m.highlight ? "rgba(229,62,62,0.3)" : "rgba(255,255,255,0.1)"}`,
                padding: "18px 20px 20px",
                display: "flex", flexDirection: "column", alignItems: "flex-start",
                opacity: cp,
                transform: `translateY(${lerp(20, 0, cp)}px) scale(${lerp(0.95, 1, cp)})`,
              }}>
                {/* Calendar rings */}
                <div style={{ display: "flex", gap: 7, marginBottom: 12 }}>
                  {[0, 1].map(r => (
                    <div key={r} style={{
                      width: 10, height: 18, borderRadius: "0 0 5px 5px",
                      border: `2.5px solid ${m.highlight ? "rgba(255,255,255,0.5)" : "rgba(255,255,255,0.3)"}`,
                      borderTop: "none",
                    }} />
                  ))}
                </div>
                <div style={{
                  color: m.highlight ? "rgba(255,255,255,0.85)" : "rgba(255,255,255,0.6)",
                  fontSize: 13, fontFamily: "'Inter',sans-serif", marginBottom: 6,
                }}>{m.month}</div>
                <div style={{
                  color: "white", fontSize: "clamp(20px,2.2vw,32px)",
                  fontWeight: 800, fontFamily: "'Inter',sans-serif", lineHeight: 1,
                }}>{m.pct}</div>
              </div>
            );
          })}
        </div>

        {/* Footer note */}
        <p style={{
          textAlign: "center", marginTop: 28,
          fontFamily: "'Inter',sans-serif", fontSize: 13,
          color: "rgba(255,255,255,0.8)", fontWeight: 600,
          opacity: ease(clamp((progress - 0.75) / 0.15, 0, 1)),
          maxWidth: 700,
        }}>
          Risk rates remain consistent throughout the year for all segments,{" "}
          <span style={{ color: "#e53e3e" }}>except for September to December.</span>
        </p>
      </div>
    </div>
  );
}