import { useInView } from "./helpers";

export default function ReferralRingSection() {
  const [leftRef, leftVisible] = useInView(0.2);
  const [rightRef, rightVisible] = useInView(0.2);
  const [tlRef, tlVisible] = useInView(0.15);
  const [savingsRef, savingsVisible] = useInView(0.2);

  const TIMELINE_EVENTS = [
    {
      label: "Week 0",
      pos: "above",
      desc: null,
      subDesc: "3 agents profiles flagged for tampering at the time of onboarding.",
    },
    {
      label: "Week 2, Day 1",
      pos: "below",
      desc: "2 weeks and 104 tampered documents later, we noticed something was off.",
      subDesc: null,
    },
    {
      label: "Week 2, Day 2",
      pos: "above",
      desc: null,
      subDesc: "Upon digging deeper, we noticed a pattern with all the profiles referred by Vishal.\n• Every profile had a tampered ID\n• Every ID had the same PIN code\n• Every single profile came through Vishal's reference.",
    },
    {
      label: "Week 2, Day 3",
      pos: "below",
      desc: "The entire fake-account ring was flagged, traced and wiped out.",
      subDesc: null,
    },
  ];

  return (
    <section style={{
      background: "linear-gradient(160deg, #0a0a18 0%, #111827 100%)",
      padding: "80px 6vw 100px",
    }}>

      {/* Story columns */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        gap: 60, maxWidth: 1000, margin: "0 auto 100px",
      }}>
        {/* Left */}
        <div ref={leftRef} style={{
          opacity: leftVisible ? 1 : 0,
          transform: leftVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.7s, transform 0.7s",
        }}>
          <p style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "clamp(16px,1.3vw,20px)",
            color: "rgba(255,255,255,0.80)",
            lineHeight: 1.75, marginBottom: 32,
          }}>
            Vishal was a delivery agent with Zap Logistics, which was running a generous referral scheme
          </p>
          <div style={{ display: "flex", alignItems: "baseline", gap: 4, marginBottom: 8 }}>
            <span style={{
              fontFamily: "'Inter',sans-serif",
              fontSize: "clamp(48px,6vw,80px)",
              fontWeight: 900, color: "#e53e3e", lineHeight: 1,
            }}>₹3000</span>
          </div>
          <p style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "clamp(14px,1.1vw,17px)",
            color: "rgba(255,255,255,0.65)",
            lineHeight: 1.65,
          }}>
            for every delivery agent referred.<br />Vishal spotted an opportunity.
          </p>
        </div>

        {/* Right */}
        <div ref={rightRef} style={{
          opacity: rightVisible ? 1 : 0,
          transform: rightVisible ? "translateY(0)" : "translateY(30px)",
          transition: "opacity 0.7s 0.15s, transform 0.7s 0.15s",
        }}>
          <p style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "clamp(16px,1.3vw,20px)",
            color: "rgba(255,255,255,0.80)",
            lineHeight: 1.75, marginBottom: 20,
          }}>
            He and his friends found a loophole to bypass the verification process and fabricated{" "}
            <span style={{ color: "#e53e3e", fontWeight: 700 }}>107 fake IDs</span>{" "}
            to pocket the referral bonuses.
          </p>
          <p style={{
            fontFamily: "'Inter',sans-serif",
            fontSize: "clamp(16px,1.3vw,20px)",
            color: "rgba(255,255,255,0.80)",
            lineHeight: 1.75,
          }}>
            The entire scheme collapsed during onboarding, when every ID linked to his referrals was{" "}
            <span style={{ color: "#e53e3e", fontWeight: 700 }}>flagged for fraud.</span>
          </p>
        </div>
      </div>

      {/* Timeline of events */}
      <div ref={tlRef} style={{
        maxWidth: 1000, margin: "0 auto 100px",
        opacity: tlVisible ? 1 : 0,
        transform: tlVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.7s, transform 0.7s",
      }}>
        <h2 style={{
          fontFamily: "'Playfair Display','Georgia',serif",
          fontSize: "clamp(40px,6vw,80px)",
          fontWeight: 900, color: "white",
          textAlign: "center", marginBottom: 60,
        }}>
          Timeline of events
        </h2>

        {/* Above-line labels */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", marginBottom: 0 }}>
          {TIMELINE_EVENTS.map((ev, i) => (
            <div key={i} style={{
              textAlign: "center", padding: "0 8px",
              minHeight: 80,
              display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "center",
            }}>
              {ev.pos === "above" && ev.desc && (
                <p style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 13, color: "rgba(255,255,255,0.60)",
                  lineHeight: 1.6, margin: "0 0 10px",
                }}>{ev.desc}</p>
              )}
            </div>
          ))}
        </div>

        {/* The horizontal line + dots */}
        <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
          {/* Line */}
          <div style={{
            position: "absolute", left: "12.5%", right: "12.5%",
            height: 2, background: "rgba(255,255,255,0.25)",
          }} />
          {/* Dots + labels */}
          <div style={{
            display: "grid", gridTemplateColumns: "repeat(4,1fr)",
            width: "100%",
          }}>
            {TIMELINE_EVENTS.map((ev, i) => (
              <div key={i} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
              }}>
                {/* Dot */}
                <div style={{
                  width: 18, height: 18, borderRadius: "50%",
                  background: "#e53e3e",
                  border: "3px solid #e53e3e",
                  boxShadow: "0 0 12px rgba(229,62,62,0.5)",
                  zIndex: 2, position: "relative",
                  flexShrink: 0,
                }} />
                {/* Tick line */}
                <div style={{
                  width: 2, height: 20,
                  background: "rgba(255,255,255,0.25)",
                }} />
                {/* Label */}
                <p style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 13, fontWeight: 700,
                  color: "#e53e3e",
                  margin: "4px 0 0", textAlign: "center",
                }}>{ev.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Below-line descriptions */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", marginTop: 12 }}>
          {TIMELINE_EVENTS.map((ev, i) => (
            <div key={i} style={{ padding: "0 8px", textAlign: "center" }}>
              {ev.pos === "above" && ev.subDesc && (
                <p style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 12, color: "rgba(255,255,255,0.60)",
                  lineHeight: 1.65, margin: "8px 0 0",
                  textAlign: "left",
                  whiteSpace: "pre-line",
                }}>{ev.subDesc}</p>
              )}
              {ev.pos === "below" && ev.desc && (
                <p style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 12, color: "rgba(255,255,255,0.60)",
                  lineHeight: 1.65, margin: "8px 0 0",
                }}>{ev.desc}</p>
              )}
              {ev.pos === "below" && ev.subDesc && (
                <p style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 12, color: "rgba(255,255,255,0.60)",
                  lineHeight: 1.65, margin: "8px 0 0",
                  textAlign: "left",
                  whiteSpace: "pre-line",
                }}>{ev.subDesc}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Savings impact */}
      <div ref={savingsRef} style={{
        maxWidth: 900, margin: "0 auto",
        textAlign: "center",
        opacity: savingsVisible ? 1 : 0,
        transform: savingsVisible ? "translateY(0)" : "translateY(30px)",
        transition: "opacity 0.7s, transform 0.7s",
      }}>
        <p style={{
          fontFamily: "'Playfair Display','Georgia',serif",
          fontSize: "clamp(22px,2.5vw,36px)",
          color: "rgba(255,255,255,0.80)",
          fontWeight: 400, lineHeight: 1.5, marginBottom: 16,
        }}>
          This single catch saved{" "}
          <span style={{ color: "#e53e3e", fontWeight: 700 }}>Zap Logistics</span>{" "}
          nearly
        </p>
        <h2 style={{
          fontFamily: "'Playfair Display','Georgia',serif",
          fontSize: "clamp(52px,8vw,110px)",
          fontWeight: 900, color: "white",
          lineHeight: 1.0, margin: "0 0 24px",
        }}>
          <span style={{ color: "#e53e3e" }}>₹</span>16 lakh in potential<br />theft and fraud
        </h2>
        <p style={{
          fontFamily: "'Inter',sans-serif",
          fontSize: "clamp(14px,1.2vw,18px)",
          color: "rgba(255,255,255,0.60)",
          lineHeight: 1.75, maxWidth: 700, margin: "0 auto",
        }}>
          More importantly, it stopped countless bad actors from entering customer homes
          under the mask of a 'verified' agent. The entire operation was shut down.
        </p>
      </div>
    </section>
  );
}