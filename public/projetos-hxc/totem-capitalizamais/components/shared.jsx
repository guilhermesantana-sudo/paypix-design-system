/* Shared globals, data, utilities and UI components */
const { useState, useEffect, useMemo, useRef } = React;

/* ─── data ────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id: "hipercap",
    name: "HiperCap Brasil",
    price: 2,
    banner: "../banners/Home_22.png",
    thumb: "assets/hipercap-mini.png",
    nextDraw: "dd/mm/aa às 00:00",
    prizeUpTo: "R$ 500.000,00",
    prizeValue: 500000,
  },
  {
    id: "valecap",
    name: "Vale Cap Regiões",
    price: 15,
    banner: "../banners/Home_22.png",
    thumb: "assets/valecap-mini.png",
    nextDraw: "dd/mm/aa às 00:00",
    prizeUpTo: "R$ 250.000,00",
    prizeValue: 250000,
  },
];

const SCREENS = [
  "intro", "produtos", "resumo", "pix",
  "cartao", "cartao_paga", "cartao_recusado",
  "pix_recusado", "loading", "sucesso", "qrcode",
];

/* ─── utility ─────────────────────────────────────────── */
const formatBRL = (n) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

/* ─── chrome bits ─────────────────────────────────────── */
const Logo = () => (
  <span style={{
    position:"absolute",left:"50%",top:"1.6vh",transform:"translateX(-50%)",
    height:"5.6vh",
    display:"flex",alignItems:"center",
    fontFamily:"'Space Grotesk',sans-serif",fontWeight:700,fontSize:"4.8vw",
    color:"#F39208",textShadow:"0 0 24px rgba(243,146,8,.55)",
    letterSpacing:".5px",whiteSpace:"nowrap",pointerEvents:"none",
    lineHeight:1,
  }}>Capitaliza+</span>
);

const Susep = () => (
  <div style={{
    position:"absolute",right:"4vw",top:"2vh",
    fontFamily:"'Montserrat',sans-serif",fontWeight:700,fontSize:"1.9vw",
    textAlign:"right",lineHeight:1.25,color:"#fff",opacity:.8,
    letterSpacing:".02em",
  }}>Autorizado<br/>SUSEP</div>
);

const Progress = ({ step, total = 6 }) => (
  <div style={{
    position:"absolute",left:"5vw",right:"5vw",top:"10.4vh",
    display:"flex",gap:"1.6vw",alignItems:"center",
  }}>
    {Array.from({ length: total }).map((_, i) => (
      <span key={i} style={{
        flex:1,height:"0.8vh",minHeight:4,borderRadius:99,
        background: i < step-1 ? "#A7C945" : i === step-1 ? "#F39208" : "rgba(255,255,255,.2)",
        boxShadow: i === step-1 ? "0 0 10px rgba(243,146,8,.6)" : "none",
        transition:"background .3s ease",
      }}/>
    ))}
  </div>
);

const ArrowRight = ({ size="3.6vw", color="#fff" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
  </svg>
);

const ArrowLeft = ({ size="3.6vw", color="#F39208" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/>
  </svg>
);

const BackButton = ({ onClick, label="VOLTAR" }) => (
  <button onClick={onClick} style={{
    position:"absolute", left:"4vw", top:"1.6vh", zIndex:10,
    display:"flex", alignItems:"center", gap:"1.6vw",
    background:"rgba(243,146,8,.1)", border:"2px solid rgba(243,146,8,.5)",
    borderRadius:99, padding:"0 4vw 0 3.2vw",
    height:"5.6vh", minHeight:36,
    fontFamily:"Poppins", fontWeight:700, fontSize:"3.2vw", color:"#F39208",
    cursor:"pointer", transition:"background .2s, border-color .2s",
    whiteSpace:"nowrap", letterSpacing:".02em",
  }}
    onMouseEnter={e=>{e.currentTarget.style.background="rgba(243,146,8,.22)";e.currentTarget.style.borderColor="rgba(243,146,8,.9)"}}
    onMouseLeave={e=>{e.currentTarget.style.background="rgba(243,146,8,.1)";e.currentTarget.style.borderColor="rgba(243,146,8,.5)"}}
  >
    <ArrowLeft size="3.2vw"/> {label}
  </button>
);

const CheckBox = ({ checked, size="2.3vw", color="#000", bg="#fff" }) => (
  <span style={{width:size,height:size,borderRadius:4,background:bg,display:"inline-flex",alignItems:"center",justifyContent:"center",border:checked?`0`:`1.5px solid #888`,flexShrink:0}}>
    {checked && <svg width="80%" height="80%" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>}
  </span>
);

function FakeQR() {
  const size = 21;
  const cells = useMemo(() => {
    const arr = Array.from({length:size*size}, (_,i) => ((i*7919) ^ (i>>3)) % 5 === 0 || ((i*131) ^ (i*17)) % 7 === 0);
    const setBlock = (cx, cy) => {
      for (let y=cy; y<cy+7; y++) for (let x=cx; x<cx+7; x++) {
        arr[y*size+x] = (y===cy||y===cy+6||x===cx||x===cx+6 || (y>=cy+2&&y<=cy+4&&x>=cx+2&&x<=cx+4));
      }
    };
    setBlock(0,0); setBlock(size-7,0); setBlock(0,size-7);
    return arr;
  }, []);
  return (
    <div style={{width:"44vw",height:"44vw",background:"#fff",borderRadius:"2.1vw",padding:"2.3vw",boxShadow:"0 6px 24px rgba(0,0,0,.4)"}}>
      <div style={{display:"grid",gridTemplateColumns:`repeat(${size},1fr)`,gap:0,width:"100%",height:"100%"}}>
        {cells.map((on,i) => <div key={i} style={{background:on?"#000":"#fff"}}/>)}
      </div>
    </div>
  );
}
