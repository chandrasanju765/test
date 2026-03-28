const NAV = ["Industries","Usecases","Platforms","Resources","About Us","Self-Serve"];

export default function Navbar() {
  return (
    <nav style={{
      position:"fixed",top:0,left:0,right:0,zIndex:1000,
      background:"rgba(255,255,255,0.97)",backdropFilter:"blur(10px)",
      borderBottom:"1px solid rgba(0,0,0,0.08)",
      height:64,padding:"0 40px",
      display:"flex",alignItems:"center",justifyContent:"space-between",
    }}>
      <div style={{display:"flex",alignItems:"center"}}>
        <img src="/assets/logo.png" alt="IDfy" style={{height:44,width:"auto",objectFit:"contain"}}/>
      </div>
      <div style={{display:"flex",alignItems:"center",gap:24}}>
        {NAV.map(l=>(
          <a key={l} href="#" style={{
            textDecoration:"none",color:"#374151",fontSize:14,fontWeight:500,
            display:"flex",alignItems:"center",gap:4,
          }}
            onMouseEnter={e=>e.currentTarget.style.color="#e53e3e"}
            onMouseLeave={e=>e.currentTarget.style.color="#374151"}>
            {l}
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
              <path d="M1 1l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        ))}
      </div>
      <div style={{display:"flex",alignItems:"center",gap:12}}>
        <button style={{
          background:"transparent",color:"#1a1a1a",border:"1.5px solid #d1d5db",
          padding:"8px 24px",borderRadius:6,fontSize:14,fontWeight:600,cursor:"pointer",
        }}>Login</button>
        <button style={{
          background:"#e53e3e",color:"white",border:"none",
          padding:"8px 24px",borderRadius:6,fontSize:14,fontWeight:600,cursor:"pointer",
        }}>Book a Demo</button>
        <div style={{
          display:"flex",alignItems:"center",gap:6,
          border:"1px solid #d1d5db",borderRadius:6,padding:"8px 12px",cursor:"pointer",
        }}>
          <img
            src="https://flagcdn.com/w20/in.png"
            alt="IN"
            style={{width:20,height:14,objectFit:"cover",borderRadius:2}}
          />
          <span style={{fontSize:13,fontWeight:500,color:"#374151"}}>IND</span>
          <svg width="10" height="6" viewBox="0 0 10 6" fill="none">
            <path d="M1 1l4 4 4-4" stroke="#374151" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </nav>
  );
}