import { useEffect, useRef, useState } from "react";
import { lerp, clamp, ease } from "./helpers";

export default function Question() {
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

  const title1P  = ease(clamp(progress / 0.15, 0, 1));
  const cards1P  = ease(clamp((progress - 0.08) / 0.20, 0, 1));
  const title2P  = ease(clamp((progress - 0.35) / 0.15, 0, 1));
  const cards2P  = ease(clamp((progress - 0.42) / 0.20, 0, 1));

  const questions = [
    { img: "/assets/question1.png", text: "Which segments are the most risk-prone?" },
    { img: "/assets/question2.png", text: "Where are the risk hotspots across the country?" },
    { img: "/assets/question3.png", text: "what correlations exist between risk rates and other factors?" },
  ];

  const people = [
    { label: "Truck drivers",      riskRate: "4.75%", meanAge: "30.90", img: "/assets/truck-driver.png" },
    { label: "Dark Store Workers",  riskRate: "2.36%", meanAge: "24.34", img: "/assets/store.png" },
    { label: "Delivery Partners",   riskRate: "3.04%", meanAge: "27.94", img: "/assets/delivery.png" },
  ];

  return (
    <div ref={sectionRef} style={{ height: "400vh", position: "relative" }}>
      <div style={{
        position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        background: `radial-gradient(ellipse 70% 80% at 100% 50%, rgba(28,67,185,0.55) 0%, transparent 65%), #0d0d0d`,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        padding: "48px 64px",
        gap: 40,
      }}>

        {/* ── Section 1: Questions ── */}
        <div style={{ width: "100%", maxWidth: 1300 }}>
          <h2 style={{
            fontFamily: "'Inter','Helvetica Neue',sans-serif",
            fontSize: "clamp(36px,5vw,76px)",
            fontWeight: 800, color: "white",
            margin: "0 0 32px", textAlign: "center", lineHeight: 1.08,
            opacity: title1P, transform: `translateY(${lerp(24, 0, title1P)}px)`,
          }}>
            This section{" "}
            <span style={{ fontWeight: 900 }}>answers questions like</span>
          </h2>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3,1fr)",
            gap: 20, width: "100%",
          }}>
            {questions.map((q, i) => {
              const cp = ease(clamp((cards1P * 1 - i * 0.15), 0, 1));
              return (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.12)",
                  borderRadius: 16, padding: "28px 24px",
                  display: "flex", alignItems: "center", gap: 20,
                  minHeight: 110,
                  opacity: cp,
                  transform: `translateY(${lerp(30, 0, cp)}px) scale(${lerp(0.96, 1, cp)})`,
                }}>
                  <div style={{
                    width: 78, height: 78, flexShrink: 0,
                    background: "rgba(255,255,255,0.08)",
                    borderRadius: 14,
                    display: "flex", alignItems: "center", justifyContent: "center",
                  }}>
                    <img src={q.img} alt="" style={{ width: 50, height: 50, objectFit: "contain" }} />
                  </div>
                  <p style={{
                    color: "white", fontSize: "clamp(13px,1.05vw,17px)",
                    fontWeight: 500, margin: 0, lineHeight: 1.5,
                    fontFamily: "'Inter',sans-serif",
                  }}>{q.text}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Divider */}
        <div style={{
          width: "100%", maxWidth: 1300,
          height: 1, background: "rgba(255,255,255,0.08)",
          opacity: title2P,
        }} />

        {/* ── Section 2: People ── */}
        <div style={{ width: "100%", maxWidth: 1100 }}>
          <h2 style={{
            fontFamily: "'Inter','Helvetica Neue',sans-serif",
            fontSize: "clamp(36px,5vw,76px)",
            fontWeight: 800, color: "white",
            margin: "0 0 32px", textAlign: "center", lineHeight: 1.05,
            opacity: title2P, transform: `translateY(${lerp(24, 0, title2P)}px)`,
          }}>
            People in focus
          </h2>

          <div style={{
            display: "grid", gridTemplateColumns: "repeat(3,1fr)",
            gap: 24, width: "100%",
          }}>
            {people.map((p, i) => {
              const cp = ease(clamp((cards2P * 1 - i * 0.15), 0, 1));
              return (
                <div key={i} style={{
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: 16,
                  padding: "28px 28px 0",
                  display: "flex", flexDirection: "column",
                  position: "relative", overflow: "hidden",
                  minHeight: 280,
                  opacity: cp,
                  transform: `translateY(${lerp(30, 0, cp)}px)`,
                }}>
                  <div style={{
                    color: "#e53e3e", fontSize: "clamp(13px,1vw,16px)",
                    fontWeight: 700, marginBottom: 16,
                    fontFamily: "'Inter',sans-serif",
                  }}>{p.label}</div>

                  <div style={{
                    color: "white", fontSize: "clamp(26px,2.8vw,42px)",
                    fontWeight: 800, lineHeight: 1, fontFamily: "'Inter',sans-serif",
                  }}>{p.riskRate}</div>
                  <div style={{
                    color: "rgba(255,255,255,0.6)", fontSize: 13,
                    marginTop: 6, marginBottom: 20,
                  }}>Risk Rate</div>

                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginBottom: 6 }}>Mean Age</div>
                  <div style={{
                    color: "white", fontSize: "clamp(22px,2.4vw,38px)",
                    fontWeight: 800, lineHeight: 1, fontFamily: "'Inter',sans-serif",
                  }}>{p.meanAge}</div>
                  <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 13, marginTop: 6 }}>years</div>

                  <img
                    src={p.img}
                    alt={p.label}
                    style={{
                      position: "absolute",
                      bottom: -10, right: -10,
                      width: "36%", maxWidth: 130,
                      objectFit: "contain",
                      objectPosition: "bottom right",
                      transform: "rotate(10deg)",
                      transformOrigin: "bottom right",
                      opacity: 0.88,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}