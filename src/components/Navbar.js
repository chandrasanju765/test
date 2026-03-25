export default function Navbar() {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: "rgba(255,255,255,0.96)", backdropFilter: "blur(12px)",
      borderBottom: "1px solid rgba(0,0,0,0.06)",
      padding: "0 40px", height: 64,
      display: "flex", alignItems: "center", justifyContent: "space-between",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div style={{
          width: 34, height: 34,
          background: "linear-gradient(135deg,#7c3aed,#5b21b6)",
          borderRadius: 8, display: "flex", alignItems: "center",
          justifyContent: "center", color: "white", fontWeight: 900, fontSize: 14,
        }}>B</div>
        <span style={{ fontFamily: "'Georgia',serif", fontWeight: 700, fontSize: 18, color: "#5b21b6" }}>
          BeFiSc
        </span>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 32, fontFamily: "system-ui,sans-serif" }}>
        {["Product", "Newsletter", "Blog"].map((item) => (
          <a key={item} href="#" style={{ textDecoration: "none", color: "#374151", fontSize: 15, fontWeight: 500 }}
            onMouseEnter={e => e.target.style.color = "#7c3aed"}
            onMouseLeave={e => e.target.style.color = "#374151"}>
            {item}
          </a>
        ))}
        <button style={{
          background: "#7c3aed", color: "white", border: "none",
          padding: "9px 22px", borderRadius: 999, fontSize: 14, fontWeight: 700, cursor: "pointer",
        }}>Book a Demo</button>
      </div>
    </nav>
  );
}

