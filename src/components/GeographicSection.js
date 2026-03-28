import { useEffect, useRef, useState } from "react";
import { lerp, clamp, ease } from "./helpers";

const HOTSPOTS = [
  { label: "Gujarat",     pct: "6.63%", top: "28%", left: "22%", dotTop: "33%", dotLeft: "30%", anchor: "right" },
  { label: "Haryana",     pct: "4.92%", top: "18%", left: "68%", dotTop: "22%", dotLeft: "58%", anchor: "left"  },
  { label: "Maharashtra", pct: "7.75%", top: "52%", left: "16%", dotTop: "55%", dotLeft: "35%", anchor: "right" },
  { label: "Karnataka",   pct: "3.33%", top: "62%", left: "72%", dotTop: "64%", dotLeft: "52%", anchor: "left"  },
  { label: "Kerala",      pct: "8.42%", top: "78%", left: "38%", dotTop: "76%", dotLeft: "44%", anchor: "right" },
];

export default function GeographicSection() {
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

  const titleP  = ease(clamp(progress / 0.20, 0, 1));
  const leftP   = ease(clamp((progress - 0.20) / 0.25, 0, 1));
  const mapP    = ease(clamp((progress - 0.20) / 0.30, 0, 1));
  const dotsP   = ease(clamp((progress - 0.40) / 0.35, 0, 1));

  return (
    <div ref={sectionRef} style={{ height: "350vh", position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        background: `
          radial-gradient(ellipse 60% 60% at 0% 100%, rgba(28,67,185,0.5) 0%, transparent 65%),
          radial-gradient(ellipse 40% 40% at 100% 0%, rgba(28,67,185,0.25) 0%, transparent 60%),
          #0a0a12
        `,
        display: "flex", flexDirection: "column",
        alignItems: "center",
        padding: "72px 56px 40px",
      }}>

        {/* Title */}
        <div style={{
          textAlign: "center", marginBottom: 8,
          opacity: titleP, transform: `translateY(${lerp(24, 0, titleP)}px)`,
        }}>
          <h2 style={{
            fontFamily: "'Inter','Helvetica Neue',sans-serif",
            fontSize: "clamp(38px,5.5vw,82px)",
            fontWeight: 800, color: "white", margin: 0, lineHeight: 1.05,
          }}>
            Geographic Risk<br />Concentration
          </h2>
          <p style={{
            color: "rgba(255,255,255,0.5)", fontSize: "clamp(13px,1vw,16px)",
            margin: "12px 0 0", fontFamily: "'Inter',sans-serif",
          }}>
            A breakdown of states with the highest risk rates across India.
          </p>
        </div>

        {/* Body */}
        <div style={{
          display: "flex", alignItems: "flex-start", gap: 48,
          width: "100%", maxWidth: 1200, flex: 1, marginTop: 24,
        }}>

          {/* Left panel */}
          <div style={{
            width: 240, flexShrink: 0,
            opacity: leftP, transform: `translateX(${lerp(-24, 0, leftP)}px)`,
            display: "flex", flexDirection: "column", gap: 20, paddingTop: 8,
          }}>
            <p style={{
              color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.7,
              fontFamily: "'Inter',sans-serif", margin: 0,
              borderLeft: "2px solid rgba(28,67,185,0.8)", paddingLeft: 12,
            }}>
              Kerala records the highest risk rate in the country, with Maharashtra close behind,
              making them two of the highest risk concentration states across segments.
            </p>
            <p style={{
              color: "rgba(255,255,255,0.7)", fontSize: 13, lineHeight: 1.7,
              fontFamily: "'Inter',sans-serif", margin: 0,
              borderLeft: "2px solid rgba(28,67,185,0.8)", paddingLeft: 12,
            }}>
              Another contributing factor behind this surge could be stronger crime reporting
              mechanisms in southern and western states. For example, in Kerala, many challans
              are automatically generated through AI-enabled monitoring cameras at traffic junctions.
            </p>

            {/* Segment list */}
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 10 }}>
              {["Truck Drivers", "Dark Store Workers", "Delivery Partners"].map((s, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "center", gap: 10,
                  color: "white", fontSize: 13, fontWeight: 600,
                  fontFamily: "'Inter',sans-serif",
                }}>
                  <div style={{
                    width: 0, height: 0,
                    // borderTop: "5px solid transparent",
                    // borderBottom: "5px solid transparent",
                    // borderLeft: "8px solid white",
                  }} />
                  {s}
                </div>
              ))}
            </div>
          </div>

          {/* Map */}
          <div style={{
            flex: 1, position: "relative",
            opacity: mapP, transform: `scale(${lerp(0.94, 1, mapP)})`,
            height: "100%", maxHeight: 520,
          }}>
            {/* Blue border box */}
            <div style={{
              position: "absolute", inset: 0,
              borderRadius: 4, zIndex: 1, pointerEvents: "none",
            }} />

            {/* India map image */}
            <img
              src="/assets/india.png"
              alt="India map"
              style={{
                width: "100%", height: "100%",
                objectFit: "contain", objectPosition: "center",
                display: "block", filter: "brightness(0.9)",
              }}
            />

            {/* Hotspot dots + labels */}
            
          </div>
        </div>
      </div>
    </div>
  );
}