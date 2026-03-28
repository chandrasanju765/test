import { useEffect, useRef, useState } from "react";
import HeroCard, { RX, RY } from "./HeroCard";
import { lerp, clamp, ease } from "./helpers";

const CARDS = [
  {id:1,  label:"Vehicle RC",      angle:180,   rotate:-14, z:6},
  {id:2,  label:"DL Verification", angle:147.3, rotate:10,  z:7},
  {id:3,  label:"KYC Check",       angle:114.5, rotate:-6,  z:8},
  {id:4,  label:"Aadhaar",         angle:81.8,  rotate:5,   z:9},
  {id:5,  label:"Face Match",      angle:49.1,  rotate:-9,  z:9},
  {id:6,  label:"PAN Card",        angle:16.4,  rotate:12,  z:8},
  {id:7,  label:"Fraud Alert",     angle:343.6, rotate:-5,  z:7},
  {id:8,  label:"Bank Verify",     angle:310.9, rotate:11,  z:8},
  {id:9,  label:"Credit Score",    angle:278.2, rotate:-5,  z:9},
  {id:10, label:"Background Chk",  angle:245.5, rotate:-10, z:8},
  {id:11, label:"Employment",      angle:212.7, rotate:9,   z:7},
];

export default function HeroSection() {
  const [progress, setProgress] = useState(0);
  const sectionRef = useRef(null);

  useEffect(()=>{
    const onScroll = () => {
      const el = sectionRef.current; if(!el) return;
      const p = clamp(-el.getBoundingClientRect().top/(el.offsetHeight*0.62),0,1);
      setProgress(p);
    };
    window.addEventListener("scroll",onScroll,{passive:true});
    onScroll();
    return ()=>window.removeEventListener("scroll",onScroll);
  },[]);

  const headingScale = lerp(0.44,1,ease(clamp(progress/0.75,0,1)));
  const subP = ease(clamp((progress-0.60)/0.30,0,1));

  return (
    <div ref={sectionRef} style={{height:"300vh",position:"relative"}}>
      <div style={{
        position:"sticky",top:0,height:"100vh",overflow:"hidden",
        background:"radial-gradient(ellipse at 50% 110%,#c0392b 0%,#7b1111 35%,#1a0505 70%,#0d0000 100%)",
        display:"flex",alignItems:"center",justifyContent:"center",
      }}>
        <div style={{
          position:"absolute",inset:0,
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.03) 1px,transparent 1px),"+
            "linear-gradient(90deg,rgba(255,255,255,0.03) 1px,transparent 1px)",
          backgroundSize:"48px 48px",
        }}/>
        {CARDS.map(c=><HeroCard key={c.id} card={c} progress={progress}/>)}
        <div style={{
          position:"relative",zIndex:20,textAlign:"center",
          transform:`scale(${headingScale})`,willChange:"transform",
          padding:"0 20px",maxWidth:1100,
        }}>
          <h1 style={{
            fontFamily:"'Playfair Display','Georgia',serif",
            fontSize:"clamp(64px,9.5vw,148px)",
            fontWeight:900,color:"white",margin:0,lineHeight:1.05,
          }}>
            Deception from Click<br/>
            <span style={{fontStyle:"italic"}}>to the</span> Doorstep
          </h1>
          <p style={{
            color:"rgba(255,255,255,0.75)",
            fontSize:"clamp(13px,1.1vw,18px)",
            marginTop:20,lineHeight:1.7,maxWidth:540,
            marginLeft:"auto",marginRight:"auto",
            opacity:subP,transform:`translateY(${lerp(20,0,subP)}px)`,
          }}>
            Uncover the risks facing India's gig workforce
          </p>
        </div>
      </div>
    </div>
  );
}