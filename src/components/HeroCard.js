import { lerp, clamp, ease } from "./helpers";
export const RX = 38;
export const RY = 28;

export default function HeroCard({ card, progress }) {
  const rad = (card.angle * Math.PI) / 180;
  const ox = Math.cos(rad) * RX;
  const oy = -Math.sin(rad) * RY;
  const mag = Math.sqrt(ox*ox+oy*oy)||1;
  const EX = (ox/mag)*140, EY = (oy/mag)*140;
  const t = ease(clamp((progress-0.35)/0.55,0,1));
  const tx = lerp(ox,EX,t), ty = lerp(oy,EY,t);
  const opacity = lerp(1,0,clamp((progress-0.65)/0.3,0,1));

  return (
    <div style={{
      position:"absolute",
      left:`calc(50% + ${tx}vw)`,top:`calc(50% + ${ty}vh)`,
      transform:`translate(-50%,-50%) rotate(${card.rotate}deg)`,
      opacity,zIndex:card.z,willChange:"transform,opacity",pointerEvents:"none",
    }}>
      <div style={{
        width:185,height:230,background:"#f0eeeb",borderRadius:16,
        overflow:"hidden",boxShadow:"0 12px 40px rgba(0,0,0,0.35), 0 2px 8px rgba(0,0,0,0.2)",
        display:"flex",flexDirection:"column",position:"relative",
      }}>
        <div style={{flex:1,position:"relative",overflow:"hidden"}}>
          <img
            src="/assets/Hero.png"
            alt=""
            style={{width:"100%",height:"100%",objectFit:"cover",display:"block"}}
          />
        </div>
        <div style={{padding:"9px 12px",background:"#f0eeeb",borderTop:"1px solid #ddd"}}>
          <div style={{width:"80%",height:5,borderRadius:3,background:"#ccc",marginBottom:5}}/>
          <div style={{width:"60%",height:5,borderRadius:3,background:"#ddd",marginBottom:4}}/>
          <div style={{fontSize:9,color:"#888",fontFamily:"monospace",letterSpacing:0.3}}>{card.label}</div>
        </div>
      </div>
    </div>
  );
}