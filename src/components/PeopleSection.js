import { useState, useEffect, useRef } from "react";

const MILES = [
  {
    id: "first", label: "First Mile",
    items: [
      { num: 1, title: "Warehouse pickers",    desc: "Responsible for sorting goods at origin warehouses before dispatch." },
      { num: 2, title: "Dark-store associates", desc: "Operate out of high-density storage units in residential clusters." },
    ],
  },
  {
    id: "middle", label: "Middle Mile",
    items: [
      { num: 1, title: "Truck drivers",   desc: "Transport goods between warehouses, hubs, and cities." },
      { num: 2, title: "Fleet operators", desc: "Manage movement from aggregation hubs to local distribution points." },
    ],
  },
  {
    id: "last", label: "Last Mile",
    items: [
      { num: 1, title: "Delivery partners", desc: "Handle final doorstep delivery — food, groceries, and parcels." },
      { num: 2, title: "Hyperlocal riders",  desc: "High attrition, constant churn, frequent relocation, and flexible partner-based models increase verification complexity and compliance risk across these segments." },
    ],
  },
];

const ANIM_MS = 500;
const EASE    = "cubic-bezier(0.4, 0, 0.2, 1)";

function MileContent({ mile }) {
  return (
    <div style={{ display: "flex", gap: 80, alignItems: "flex-start", width: "100%" }}>
      {/* Image — wider */}
      <div style={{
        flexShrink: 0,
        width: 380, height: 380,
        borderRadius: 10,
        overflow: "hidden",
        background: "#f0eeeb",
        border: "1px solid #e5e5e5",
      }}>
        <img
          src="/assets/Mile.png"
          alt={mile.label}
          style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
        />
      </div>

      {/* Text */}
      <div style={{ flex: 1, paddingTop: 4 }}>
        {mile.items.map((item, i) => (
          <div key={i} style={{ marginBottom: 44 }}>
            <h3 style={{
              fontFamily: "'Playfair Display','Georgia',serif",
              fontSize: "clamp(19px,1.6vw,26px)",
              fontWeight: 700, color: "#1a3a6b",
              marginBottom: 12, lineHeight: 1.3,
            }}>
              {item.num}.&nbsp;{item.title}
            </h3>
            <p style={{
              fontSize: "clamp(15px,1.05vw,18px)",
              color: "#444", lineHeight: 1.85,
              fontFamily: "'Inter',sans-serif", margin: 0,
            }}>{item.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function PeopleSection() {
  const [active,    setActive]    = useState(0);
  const [animState, setAnimState] = useState(null);
  const timerRef = useRef(null);

  const go = (idx) => {
    if (idx === active || animState !== null) return;
    const dir = idx > active ? "left" : "right";
    setAnimState({ from: active, to: idx, dir });
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => { setActive(idx); setAnimState(null); }, ANIM_MS);
  };
  useEffect(() => () => clearTimeout(timerRef.current), []);

  const isAnim  = animState !== null;
  const fromIdx = animState?.from;
  const toIdx   = animState?.to ?? active;
  const dir     = animState?.dir ?? "left";
  const exitKF  = dir === "left" ? "pexit-left"   : "pexit-right";
  const enterKF = dir === "left" ? "penter-right"  : "penter-left";

  // Dot positions along the line: at 20%, 50%, 80%
  const DOT_POSITIONS = ["20%", "50%", "80%"];

  return (
    <section style={{ background: "#fff", padding: "100px 0 130px" }}>
      <style>{`
        @keyframes pexit-left   { from{transform:translateX(0);opacity:1}   to{transform:translateX(-105%);opacity:0} }
        @keyframes pexit-right  { from{transform:translateX(0);opacity:1}   to{transform:translateX(105%);opacity:0}  }
        @keyframes penter-right { from{transform:translateX(105%);opacity:0} to{transform:translateX(0);opacity:1}    }
        @keyframes penter-left  { from{transform:translateX(-105%);opacity:0} to{transform:translateX(0);opacity:1}  }
        @keyframes ppulse {
          0%  { transform:translate(-50%,-50%) scale(1);   opacity:.8; }
          100%{ transform:translate(-50%,-50%) scale(2.2); opacity:0;  }
        }
      `}</style>

      {/* Heading */}
      <div style={{ textAlign: "center", padding: "0 7vw", marginBottom: 56 }}>
        <h2 style={{
          fontFamily: "'Playfair Display','Georgia',serif",
          fontSize: "clamp(42px,7.5vw,100px)",
          fontWeight: 900, color: "#1a1a1a",
          lineHeight: 1.03, margin: "0 0 24px",
        }}>
          The people who<br />powered this evolution
        </h2>
        <p style={{
          fontSize: "clamp(16px,1.2vw,20px)",
          color: "#555", lineHeight: 1.7,
          maxWidth: 680, margin: "0 auto",
          fontFamily: "'Inter',sans-serif",
        }}>
          The gig workforce spans the entire supply chain, from first-mile
          operations to last-mile delivery.
        </p>
      </div>

      {/* Shared container for timeline + content */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 5vw" }}>

        {/* ── Timeline ── */}
        <div style={{ marginBottom: 52 }}>

          {/* Labels row — positioned above dots */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: "0 10%",
            marginBottom: 10,
          }}>
            {MILES.map((mile, i) => (
              <button
                key={mile.id}
                onClick={() => go(i)}
                style={{
                  background: "none", border: "none",
                  cursor: animState ? "default" : "pointer",
                  padding: 0, width: 0, display: "flex",
                  flexDirection: "column", alignItems: "center",
                  overflow: "visible",
                }}
              >
                <span style={{
                  fontFamily: "'Inter',sans-serif",
                  fontSize: 16, fontWeight: 700, color: "#e53e3e",
                  opacity: active === i ? 1 : 0.5,
                  transition: "opacity 0.3s",
                  whiteSpace: "nowrap",
                }}>{mile.label}</span>
              </button>
            ))}
          </div>

          {/* Line + dots — dots sit exactly ON the line */}
          <div style={{ position: "relative", height: 28 }}>

            {/* Red horizontal line — vertically centred in the 28px row */}
            <div style={{
              position: "absolute",
              top: "50%", left: 0, right: 0,
              height: 2, background: "#e53e3e",
              transform: "translateY(-50%)",
            }}/>

            {/* Dots — one per mile, at 20% / 50% / 80% */}
            {MILES.map((mile, i) => {
              const isActive = active === i;
              return (
                <button
                  key={mile.id}
                  onClick={() => go(i)}
                  style={{
                    position: "absolute",
                    left: DOT_POSITIONS[i],
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                    background: "none", border: "none",
                    cursor: animState ? "default" : "pointer",
                    padding: 0,
                    width: isActive ? 28 : 16,
                    height: isActive ? 28 : 16,
                    transition: "width 0.3s, height 0.3s",
                  }}
                >
                  <div style={{
                    width: "100%", height: "100%",
                    borderRadius: "50%",
                    background: "#e53e3e",
                    border: isActive ? "3px solid #fff" : "none",
                    boxShadow: isActive ? "0 0 0 3px #e53e3e" : "none",
                    transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                    position: "relative",
                  }}>
                    {isActive && (
                      <span style={{
                        position: "absolute",
                        top: "50%", left: "50%",
                        width: "100%", height: "100%",
                        borderRadius: "50%",
                        border: "2px solid rgba(229,62,62,0.4)",
                        animation: "ppulse 1.5s ease-out infinite",
                      }}/>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Active label */}
        <p style={{
          fontSize: 11, fontWeight: 800, color: "#e53e3e",
          letterSpacing: 2, textTransform: "uppercase",
          marginBottom: 32, fontFamily: "'Inter',sans-serif",
        }}>{MILES[active].label}</p>

        {/* Slide content */}
        <div style={{ position: "relative", overflow: "hidden", minHeight: 400 }}>
          {isAnim && (
            <div style={{
              position: "absolute", top: 0, left: 0, right: 0,
              animation: `${exitKF} ${ANIM_MS}ms ${EASE} forwards`,
            }}>
              <MileContent mile={MILES[fromIdx]} />
            </div>
          )}
          <div style={{ animation: isAnim ? `${enterKF} ${ANIM_MS}ms ${EASE} forwards` : "none" }}>
            <MileContent mile={MILES[toIdx]} />
          </div>
        </div>
      </div>
    </section>
  );
}