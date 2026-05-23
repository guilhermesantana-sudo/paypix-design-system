/* ── PIX step indicator icons ── */
function _PixIcon0(c){ return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>);}
function _PixIcon1(c){ return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M9.5 4.5 4.5 9.5a3.535 3.535 0 0 0 0 5l5 5a3.535 3.535 0 0 0 5 0l5-5a3.535 3.535 0 0 0 0-5l-5-5a3.535 3.535 0 0 0-5 0Z"/><path d="M8.5 12h7M12 8.5v7"/></svg>);}
function _PixIcon2(c){ return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 7V5a2 2 0 0 1 2-2h2"/><path d="M17 3h2a2 2 0 0 1 2 2v2"/><path d="M21 17v2a2 2 0 0 1-2 2h-2"/><path d="M7 21H5a2 2 0 0 1-2-2v-2"/><rect x="7" y="7" width="3" height="3" rx=".5"/><rect x="14" y="7" width="3" height="3" rx=".5"/><rect x="7" y="14" width="3" height="3" rx=".5"/><path d="M14 14h3v3"/></svg>);}
function _PixIcon3(c){ return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><polyline points="9 12 11 14 15 10"/></svg>);}
function _PixIcon4(c){ return (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>);}

const _PIX_ICON_FNS  = [_PixIcon0, _PixIcon1, _PixIcon2, _PixIcon3, _PixIcon4];
const _PIX_LABELS    = ["Abra o app\ndo banco","Escolha\na opção PIX","Leia o\nQR Code","Confirme\no pagamento","Volte ao\nTotem"];

function PixStepIndicator() {
  const ACTIVE = 3;
  return (
    <div style={{display:"flex",alignItems:"flex-start",justifyContent:"center",width:"100%"}}>
      {_PIX_LABELS.map((label, i) => {
        const n = i+1, done = n < ACTIVE, active = n === ACTIVE;
        const iconColor = done ? "#fff" : active ? "#F39208" : "rgba(255,255,255,.28)";
        return (
          <React.Fragment key={i}>
            <div style={{display:"flex",flexDirection:"column",alignItems:"center",flex:1,gap:6}}>
              <div style={{
                width:40, height:40, borderRadius:"50%", flexShrink:0,
                background: done ? "#A7C945" : active ? "rgba(243,146,8,.12)" : "rgba(255,255,255,.08)",
                border: done ? "2px solid #A7C945" : active ? "2px solid #F39208" : "1.5px solid rgba(255,255,255,.2)",
                boxShadow: active ? "0 0 12px rgba(243,146,8,.38)" : "none",
                display:"flex", alignItems:"center", justifyContent:"center",
              }}>
                {done
                  ? <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  : _PIX_ICON_FNS[i](iconColor)
                }
              </div>
              <span style={{fontFamily:"Poppins",fontWeight:600,fontSize:10,textAlign:"center",lineHeight:1.3,whiteSpace:"pre-line",color:done?"rgba(255,255,255,.85)":active?"#F39208":"rgba(255,255,255,.28)"}}>
                {label}
              </span>
            </div>
            {i < _PIX_LABELS.length - 1 && (
              <div style={{width:16,height:2,background:done?"#A7C945":"rgba(255,255,255,.15)",alignSelf:"flex-start",marginTop:19,flexShrink:0,borderRadius:1}}/>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ── QR code ── */
function PixQR({ expired }) {
  const n = 21;
  const cells = useMemo(() => {
    const arr = Array.from({length:n*n},(_,i)=>((i*7919)^(i>>3))%5===0||((i*131)^(i*17))%7===0);
    const b=(cx,cy)=>{for(let y=cy;y<cy+7;y++)for(let x=cx;x<cx+7;x++)arr[y*n+x]=(y===cy||y===cy+6||x===cx||x===cx+6||(y>=cy+2&&y<=cy+4&&x>=cx+2&&x<=cx+4));};
    b(0,0);b(n-7,0);b(0,n-7);
    return arr;
  }, []);
  return (
    <div style={{width:"36vw",height:"36vw",maxWidth:260,maxHeight:260,background:"#fff",borderRadius:12,padding:10,boxShadow:"0 4px 20px rgba(0,0,0,.4)",flexShrink:0,opacity:expired?.35:1,transition:"opacity .5s"}}>
      <div style={{display:"grid",gridTemplateColumns:`repeat(${n},1fr)`,gap:0,width:"100%",height:"100%"}}>
        {cells.map((on,i)=><div key={i} style={{background:on?"#000":"#fff"}}/>)}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   Animações PIX — cada passo do tutorial tem um vídeo animado.
   O mockup PNG (assets/mockupflat_celular.png · 1536×1024)
   é sobreposto com área da tela transparente; a animação SVG
   fica exatamente atrás da abertura.
   Coordenadas medidas pixel a pixel:
     left 35.872% · top 12.598% · w 24.870% · h 69.043%
───────────────────────────────────────────────────────────── */
const _PG  = '#A7C945';   // pix green
const _PN  = '#1e3a5f';   // pix navy
const _PND = '#162a44';   // pix navy deep
const _PK  = '#1f2937';   // ink
const _PS  = '#e5e7eb';   // soft grey
const _PSV = '350 44 320 593'; // viewBox centrado em x=510

function _PhoneMockup({ children, bg }) {
  return (
    <>
      <style>{`@keyframes _pxIn{0%{transform:translateX(13%) scale(.97);opacity:0}55%{opacity:1}100%{transform:none;opacity:1}}`}</style>
      <div style={{position:'relative',width:'100%',height:'100%',animation:'_pxIn .82s cubic-bezier(.2,.8,.2,1) both'}}>
        <div style={{position:'absolute',left:'35.872%',top:'12.598%',width:'24.870%',height:'69.043%',background:bg,overflow:'hidden'}}>
          <svg viewBox={_PSV} style={{width:'100%',height:'100%',display:'block'}}>{children}</svg>
        </div>
        <img src="assets/mockupflat_celular.png" alt="" draggable="false"
          style={{position:'absolute',inset:0,width:'100%',height:'100%',display:'block',pointerEvents:'none'}}/>
      </div>
    </>
  );
}

/* Cena 1 — Splash do banco */
function _PxS1() {
  return (
    <>
      <style>{`
        @keyframes s1r{0%,15%{transform:translateY(-60px);opacity:0}30%,90%{transform:translateY(0);opacity:1}100%{transform:translateY(-60px);opacity:0}}
        @keyframes s1c{0%,30%{transform:scaleY(0);opacity:0}50%,90%{transform:scaleY(1);opacity:1}100%{transform:scaleY(0);opacity:0}}
        @keyframes s1b{0%,55%{transform:scaleX(0);opacity:0}70%,90%{transform:scaleX(1);opacity:1}100%{transform:scaleX(0);opacity:0}}
      `}</style>
      <_PhoneMockup bg={_PN}>
        <g transform="translate(510,340)">
          <g style={{transformOrigin:'0 0',animation:'s1r 4s ease-in-out infinite'}}>
            <polygon points="-90,-20 0,-70 90,-20" fill="#fff"/>
            <rect x="-95" y="-22" width="190" height="14" rx="2" fill="#e2e8f0"/>
            <circle cx="0" cy="-38" r="5" fill={_PN}/>
          </g>
          {[-65,-22,22,65].map((x,i)=>(
            <rect key={i} x={x-12} y={-8} width="24" height="86" fill="#fff"
              style={{transformOrigin:`${x}px -8px`,animation:'s1c 4s ease-out infinite',animationDelay:`${i*.05}s`}}/>
          ))}
          <g style={{transformOrigin:'0 80px',animation:'s1b 4s ease-out infinite'}}>
            <rect x="-100" y="78" width="200" height="14" rx="2" fill="#fff"/>
            <rect x="-110" y="92" width="220" height="10" rx="2" fill="#cbd5e1"/>
          </g>
        </g>
      </_PhoneMockup>
    </>
  );
}

/* Cena 2 — Logo PIX montando */
function _PxS2() {
  return (
    <>
      <style>{`
        @keyframes s2p{0%,15%{transform:scale(0) rotate(-180deg);opacity:0}35%,90%{transform:scale(1) rotate(0);opacity:1}100%{transform:scale(0) rotate(-180deg);opacity:0}}
        @keyframes s2c{0%,40%{transform:scale(0);opacity:0}55%,90%{transform:scale(1);opacity:1}100%{transform:scale(0);opacity:0}}
        @keyframes s2t{0%,55%{opacity:0;transform:translateY(8px)}70%,90%{opacity:1;transform:translateY(0)}100%{opacity:0;transform:translateY(8px)}}
        @keyframes s2b{0%,5%{opacity:0;transform:scale(.6)}20%,90%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.6)}}
      `}</style>
      <_PhoneMockup bg="#ffffff">
        <g stroke={_PG} strokeWidth="5" strokeLinecap="round" fill="none"
          style={{transformOrigin:'510px 270px',animation:'s2b 4s ease infinite'}}>
          <path d="M 410 230 L 410 200 L 440 200"/><path d="M 580 200 L 610 200 L 610 230"/>
          <path d="M 410 310 L 410 340 L 440 340"/><path d="M 580 340 L 610 340 L 610 310"/>
        </g>
        <g transform="translate(510,270)">
          {[{x:0,y:-38,d:0},{x:38,y:0,d:.08},{x:0,y:38,d:.16},{x:-38,y:0,d:.24}].map((p,i)=>(
            <rect key={i} x={p.x-14} y={p.y-14} width="28" height="28" rx="4" fill={_PG}
              transform={`rotate(45 ${p.x} ${p.y})`}
              style={{transformOrigin:`${p.x}px ${p.y}px`,animation:'s2p 4s ease-out infinite',animationDelay:`${p.d}s`}}/>
          ))}
          <circle cx="0" cy="0" r="9" fill={_PG} style={{transformOrigin:'center',animation:'s2c 4s ease-out infinite'}}/>
          <circle cx="0" cy="0" r="3.5" fill="#fff" style={{transformOrigin:'center',animation:'s2c 4s ease-out infinite'}}/>
        </g>
        <text x="510" y="400" textAnchor="middle" fontSize="44" fontWeight="800" fill={_PK}
          fontFamily="Inter,system-ui" letterSpacing="2" style={{animation:'s2t 4s ease-out infinite'}}>PIX</text>
        <g style={{transformOrigin:'510px 470px',animation:'s2t 4s ease infinite'}}>
          <circle cx="420" cy="465" r="6" fill={_PS}/>
          <rect x="435" y="461" width="120" height="8" rx="4" fill={_PS}/>
          <circle cx="420" cy="495" r="6" fill={_PS}/>
          <rect x="435" y="491" width="160" height="8" rx="4" fill={_PS}/>
        </g>
      </_PhoneMockup>
    </>
  );
}

/* Cena 3 — QR Code sendo escaneado */
function _PxS3() {
  const seed=(i,j)=>((i*7+j*13+i*j)%5<2);
  const cells=[];
  for(let i=0;i<14;i++) for(let j=0;j<14;j++){
    if((i<3&&j<3)||(i<3&&j>10)||(i>10&&j<3)) continue;
    if(seed(i,j)) cells.push({i,j});
  }
  return (
    <>
      <style>{`
        @keyframes s3s{0%,10%{transform:translateY(0);opacity:0}15%{opacity:1}70%{transform:translateY(160px);opacity:1}80%,100%{opacity:0;transform:translateY(0)}}
        @keyframes s3cl{0%,15%{opacity:0;transform:scale(.4)}50%,90%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(.4)}}
        @keyframes s3f{0%,5%{opacity:0;transform:scale(0)}20%,90%{opacity:1;transform:scale(1)}100%{opacity:0;transform:scale(0)}}
      `}</style>
      <_PhoneMockup bg="#ffffff">
        <g stroke={_PG} strokeWidth="6" strokeLinecap="round" fill="none">
          <path d="M 400 220 L 400 200 L 420 200"/><path d="M 600 200 L 620 200 L 620 220"/>
          <path d="M 400 380 L 400 400 L 420 400"/><path d="M 600 400 L 620 400 L 620 380"/>
        </g>
        <g transform="translate(420,220)">
          {[[0,0],[0,11],[11,0]].map(([fi,fj],k)=>(
            <g key={k} transform={`translate(${fj*12.85},${fi*12.85})`}
              style={{transformOrigin:`${fj*12.85+19}px ${fi*12.85+19}px`,animation:'s3f 4s ease-out infinite',animationDelay:`${.1*k}s`}}>
              <rect width="38.55" height="38.55" rx="3" fill="#000"/>
              <rect x="5" y="5" width="28.55" height="28.55" rx="2" fill="#fff"/>
              <rect x="11" y="11" width="16.55" height="16.55" rx="1" fill="#000"/>
            </g>
          ))}
          {cells.map(({i,j},idx)=>(
            <rect key={idx} x={j*12.85} y={i*12.85} width="11" height="11" rx="1.5" fill="#000"
              style={{transformOrigin:`${j*12.85+5.5}px ${i*12.85+5.5}px`,animation:'s3cl 4s ease-out infinite',animationDelay:`${(idx%30)*.015+.3}s`}}/>
          ))}
        </g>
        <g style={{animation:'s3s 4s ease-in-out infinite'}}>
          <line x1="410" y1="220" x2="610" y2="220" stroke={_PG} strokeWidth="3" strokeLinecap="round"/>
          <line x1="410" y1="220" x2="610" y2="220" stroke={_PG} strokeWidth="14" strokeLinecap="round" opacity=".25"/>
        </g>
      </_PhoneMockup>
    </>
  );
}

/* Cena 4 — Confirmando pagamento */
function _PxS4() {
  return (
    <>
      <style>{`
        @keyframes s4ti{0%,5%{opacity:0;transform:translateY(-12px)}20%,90%{opacity:1;transform:translateY(0)}100%{opacity:0}}
        @keyframes s4ci{0%,15%{transform:scale(0)}35%,90%{transform:scale(1)}100%{transform:scale(0)}}
        @keyframes s4ch{0%,30%{stroke-dashoffset:80}50%,90%{stroke-dashoffset:0}100%{stroke-dashoffset:80}}
        @keyframes s4ms{0%,40%{opacity:0;transform:translateY(8px)}55%,90%{opacity:1;transform:translateY(0)}100%{opacity:0}}
        @keyframes s4rw{0%,55%{opacity:0;transform:translateX(-10px)}70%,90%{opacity:1;transform:translateX(0)}100%{opacity:0}}
        @keyframes s4bt{0%,70%{opacity:0;transform:translateY(20px)}85%,95%{opacity:1;transform:translateY(0)}100%{opacity:0}}
      `}</style>
      <_PhoneMockup bg="#ffffff">
        <text x="510" y="120" textAnchor="middle" fontSize="22" fontWeight="700" fill={_PK}
          fontFamily="Inter,system-ui" style={{animation:'s4ti 4s ease-out infinite'}}>Pagamento PIX</text>
        <g transform="translate(510,220)">
          <circle r="46" fill={_PG} style={{transformOrigin:'center',animation:'s4ci 4s cubic-bezier(.5,1.6,.5,1) infinite'}}/>
          <path d="M -18 0 L -4 14 L 20 -12" stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"
            strokeDasharray="80" style={{animation:'s4ch 4s ease-out infinite'}}/>
        </g>
        <g style={{animation:'s4ms 4s ease-out infinite'}}>
          <text x="510" y="320" textAnchor="middle" fontSize="22" fontWeight="800" fill={_PG} fontFamily="Inter,system-ui">Pagamento</text>
          <text x="510" y="346" textAnchor="middle" fontSize="22" fontWeight="800" fill={_PG} fontFamily="Inter,system-ui">realizado!</text>
          <text x="510" y="380" textAnchor="middle" fontSize="13" fill={_PK} opacity=".7" fontFamily="Inter,system-ui">O pagamento foi</text>
          <text x="510" y="397" textAnchor="middle" fontSize="13" fill={_PK} opacity=".7" fontFamily="Inter,system-ui">realizado com sucesso.</text>
        </g>
        <g style={{animation:'s4rw 4s ease-out infinite'}}>
          <line x1="395" y1="430" x2="625" y2="430" stroke={_PS} strokeWidth="1"/>
          <text x="395" y="455" fontSize="12" fill="#6b7280" fontFamily="Inter,system-ui">Valor pago</text>
          <text x="625" y="455" textAnchor="end" fontSize="13" fontWeight="700" fill={_PG} fontFamily="Inter,system-ui">R$ 34,00</text>
          <line x1="395" y1="478" x2="625" y2="478" stroke={_PS} strokeWidth="1"/>
          <text x="395" y="503" fontSize="12" fill="#6b7280" fontFamily="Inter,system-ui">Data e hora</text>
          <text x="625" y="503" textAnchor="end" fontSize="12" fill={_PK} fontFamily="Inter,system-ui">24/04/2024 - 10:30</text>
          <line x1="395" y1="520" x2="625" y2="520" stroke={_PS} strokeWidth="1"/>
        </g>
        <g style={{animation:'s4bt 4s ease-out infinite'}}>
          <rect x="385" y="555" width="250" height="48" rx="8" fill={_PG}/>
          <text x="510" y="585" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily="Inter,system-ui">Concluir</text>
        </g>
      </_PhoneMockup>
    </>
  );
}

/* Cena 5 — Pagamento confirmado (escuro) */
function _PxS5() {
  return (
    <>
      <style>{`
        @keyframes s5pl{0%{transform:scale(1);opacity:.5}70%,100%{transform:scale(2.4);opacity:0}}
        @keyframes s5ci{0%,10%{transform:scale(0) rotate(-90deg)}35%,85%{transform:scale(1) rotate(0)}100%{transform:scale(0) rotate(-90deg)}}
        @keyframes s5ch{0%,25%{stroke-dashoffset:80}45%,85%{stroke-dashoffset:0}100%{stroke-dashoffset:80}}
        @keyframes s5tx{0%,40%{opacity:0;transform:translateY(10px);letter-spacing:4px}55%,85%{opacity:1;transform:translateY(0);letter-spacing:0}100%{opacity:0}}
      `}</style>
      <_PhoneMockup bg={_PND}>
        <g transform="translate(510,280)">
          <circle r="50" fill={_PG} opacity="0" style={{transformOrigin:'center',animation:'s5pl 2s ease-out infinite',animationDelay:'.4s'}}/>
          <circle r="50" fill={_PG} opacity="0" style={{transformOrigin:'center',animation:'s5pl 2s ease-out infinite',animationDelay:'1.2s'}}/>
          <circle r="50" fill={_PG} style={{transformOrigin:'center',animation:'s5ci 4s cubic-bezier(.5,1.6,.5,1) infinite'}}/>
          <path d="M -20 0 L -4 16 L 22 -14" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"
            strokeDasharray="80" style={{animation:'s5ch 4s ease-out infinite'}}/>
        </g>
        <g style={{animation:'s5tx 4s ease-out infinite'}}>
          <text x="510" y="400" textAnchor="middle" fontSize="26" fontWeight="700" fill="#fff" fontFamily="Inter,system-ui">Pagamento</text>
          <text x="510" y="432" textAnchor="middle" fontSize="26" fontWeight="700" fill="#fff" fontFamily="Inter,system-ui">realizado!</text>
        </g>
      </_PhoneMockup>
    </>
  );
}

/* Cena 6 — Totem com confetes (retorna ao kiosk) */
function _PxS6() {
  const confetti = useMemo(()=>{
    const items=[];
    const colors=['#facc15','#ef4444','#3b82f6','#a855f7','#22d3ee','#fb923c','#84cc16'];
    for(let i=0;i<36;i++) items.push({
      x:100+Math.random()*460,y:-20-Math.random()*100,rot:Math.random()*360,
      color:colors[i%colors.length],delay:Math.random()*2,dur:2.2+Math.random()*1.4,
      w:6+Math.random()*8,h:3+Math.random()*5,
    });
    return items;
  },[]);
  return (
    <>
      <style>{`
        @keyframes s6cu{0%,100%{opacity:.5}50%{opacity:1}}
        @keyframes s6ci{0%,10%{transform:scale(0)}30%,90%{transform:scale(1)}100%{transform:scale(0)}}
        @keyframes s6ch{0%,20%{stroke-dashoffset:80}40%,90%{stroke-dashoffset:0}100%{stroke-dashoffset:80}}
        @keyframes s6gl{0%,30%{opacity:0;transform:scale(.95)}45%,55%{opacity:1;transform:scale(1.05)}70%,90%{opacity:.85;transform:scale(1)}100%{opacity:0}}
        @keyframes s6po{0%,40%{opacity:0;transform:translateY(8px)}60%,90%{opacity:1;transform:translateY(0)}100%{opacity:0}}
        @keyframes s6cf{0%{transform:translate(0,0) rotate(0);opacity:0}10%{opacity:1}100%{transform:translate(var(--cx),700px) rotate(720deg);opacity:0}}
      `}</style>
      <svg viewBox="0 0 1000 720" style={{width:'100%',height:'100%',display:'block'}}>
        <defs>
          <clipPath id="ks-clip"><rect x="180" y="60" width="500" height="540" rx="12"/></clipPath>
          <linearGradient id="ks-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4b5563"/><stop offset="100%" stopColor="#374151"/>
          </linearGradient>
          <radialGradient id="ks-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#facc15" stopOpacity=".6"/>
            <stop offset="100%" stopColor="#facc15" stopOpacity="0"/>
          </radialGradient>
        </defs>
        <path d="M 140 40 L 720 40 L 740 60 L 740 620 L 720 640 L 140 640 L 120 620 L 120 60 Z" fill="url(#ks-body)"/>
        <rect x="170" y="50" width="520" height="560" rx="14" fill="#1a1a1f"/>
        <rect x="180" y="60" width="500" height="540" rx="12" fill="#14532d"/>
        <g clipPath="url(#ks-clip)">
          <text x="660" y="90" textAnchor="end" fontSize="11" fontWeight="600" fill="#fff" opacity=".85" fontFamily="Inter,system-ui">Autorizado</text>
          <text x="660" y="104" textAnchor="end" fontSize="11" fontWeight="600" fill="#fff" opacity=".85" fontFamily="Inter,system-ui">SUSEP</text>
          <g transform="translate(200,130)">
            {[0,1,2,3,4,5].map(i=>(
              <rect key={i} x={i*78} y={0} width="64" height="6" rx="3"
                fill={i===4?'#facc15':i<4?_PG:'#1f3d27'}
                style={i===4?{animation:'s6cu 1.4s ease-in-out infinite'}:{}}/>
            ))}
          </g>
          <g>{confetti.map((c,i)=>(
            <rect key={i} x={c.x} y={c.y} width={c.w} height={c.h} rx="1" fill={c.color}
              transform={`rotate(${c.rot} ${c.x+c.w/2} ${c.y+c.h/2})`}
              style={{animation:`s6cf ${c.dur}s linear ${c.delay}s infinite`,'--cx':`${(Math.random()-.5)*200}px`}}/>
          ))}</g>
          <g transform="translate(430,240)">
            <circle r="44" fill="#0f4023" opacity=".5"/>
            <circle r="40" fill={_PG} style={{transformOrigin:'center',animation:'s6ci 4s cubic-bezier(.5,1.6,.5,1) infinite'}}/>
            <path d="M -16 0 L -4 12 L 18 -12" stroke="#fff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
              strokeDasharray="80" style={{animation:'s6ch 4s ease-out infinite'}}/>
          </g>
          <g style={{animation:'s6gl 4s ease-out infinite',transformOrigin:'430px 360px'}}>
            <ellipse cx="430" cy="365" rx="160" ry="40" fill="url(#ks-glow)"/>
            <text x="430" y="378" textAnchor="middle" fontSize="44" fontWeight="900" fill="#facc15"
              fontFamily="Inter,system-ui" letterSpacing="1"
              style={{filter:'drop-shadow(0 0 12px rgba(250,204,21,.6))'}}>PARABÉNS!</text>
          </g>
          <text x="430" y="412" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff"
            fontFamily="Inter,system-ui" letterSpacing="1" style={{animation:'s6po 4s ease-out infinite'}}>SUA COMPRA FOI REALIZADA!</text>
          <g style={{animation:'s6po 4s ease-out infinite',animationDelay:'.1s'}}>
            <rect x="270" y="438" width="320" height="36" rx="18" fill="none" stroke={_PG} strokeWidth="1.5"/>
            <circle cx="290" cy="456" r="8" fill={_PG}/>
            <path d="M 286 456 L 289 459 L 295 453" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
            <text x="430" y="461" textAnchor="middle" fontSize="12" fontWeight="800" fill={_PG} fontFamily="Inter,system-ui" letterSpacing=".5">VOCÊ JÁ ESTÁ CONCORRENDO!</text>
          </g>
          <g style={{animation:'s6po 4s ease-out infinite',animationDelay:'.2s'}}>
            <text x="200" y="510" fontSize="16" fontWeight="800" fill="#fff" fontFamily="Inter,system-ui">Seus números da sorte</text>
            <text x="200" y="532" fontSize="12" fill="#fff" opacity=".7" fontFamily="Inter,system-ui">Data: dd/mm/aa às hh:mm:ss</text>
          </g>
        </g>
        <rect x="200" y="660" width="200" height="14" rx="3" fill="#1f2937"/>
        <rect x="490" y="640" width="160" height="120" rx="6" fill="#1f2937"/>
        <rect x="500" y="650" width="140" height="36" rx="4" fill="#0f172a"/>
        {[0,1,2,3].map(row=>(
          <g key={row}>{[0,1,2].map(col=>{
            const L=[['1','2','3'],['4','5','6'],['7','8','9'],['*','0','#']];
            return <g key={col}>
              <rect x={500+col*36} y={690+row*14} width="32" height="10" rx="2" fill="#374151"/>
              <text x={516+col*36} y={698+row*14} textAnchor="middle" fontSize="6" fill="#fff" fontFamily="monospace">{L[row][col]}</text>
            </g>;
          })}</g>
        ))}
        <rect x="500" y="746" width="40" height="10" rx="2" fill="#dc2626"/>
        <rect x="554" y="746" width="40" height="10" rx="2" fill="#facc15"/>
        <rect x="608" y="746" width="40" height="10" rx="2" fill="#A7C945"/>
        <path d="M 100 680 L 760 680 L 740 720 L 120 720 Z" fill="#374151"/>
      </svg>
    </>
  );
}

const _PIX_HOW_TO = [
  { number:1, title:"Abra o app\ndo seu banco",     desc:"No seu celular, abra o aplicativo do seu banco.",                Scene:_PxS1 },
  { number:2, title:"Escolha a\nopção PIX",         desc:"No menu do app, selecione a opção PIX.",                        Scene:_PxS2 },
  { number:3, title:"Escaneie o\nQR Code",          desc:"Aponte a câmera do seu celular para o QR Code da tela.",        Scene:_PxS3 },
  { number:4, title:"Confirme os\ndados e o valor", desc:"Confira os dados do pagamento e o valor na tela do seu app.",   Scene:_PxS4 },
  { number:5, title:"Pagamento\nrealizado!",        desc:"Pronto! É só aguardar a confirmação aqui no totem.",            Scene:_PxS5 },
  { number:6, title:"Volte ao\ntotem",              desc:"O pagamento já foi autorizado. Volte ao totem para finalizar.", Scene:_PxS6 },
];

/* Botão compacto para navegação do tutorial — não herda width:100% do .btn global */
function _TutBtn({ onClick, variant, children }) {
  const base = {
    display:"inline-flex", alignItems:"center", justifyContent:"center", gap:8,
    height:40, padding:"0 20px", borderRadius:99, cursor:"pointer",
    fontFamily:"Poppins", fontWeight:700, fontSize:13, letterSpacing:".03em",
    border:"none", transition:"filter .15s, transform .1s", whiteSpace:"nowrap",
  };
  const styles = {
    primary: { background:"linear-gradient(135deg,#F39208 0%,#F8AF4F 100%)", color:"#fff", boxShadow:"0 0 14px rgba(243,146,8,.5), 0 4px 14px rgba(243,146,8,.3)" },
    success: { background:"#A7C945", color:"#1A2F51", boxShadow:"0 0 14px rgba(167,201,69,.5), 0 4px 14px rgba(167,201,69,.3)" },
  };
  return (
    <button onClick={onClick} style={{...base,...styles[variant]}}
      onMouseEnter={e=>e.currentTarget.style.filter="brightness(1.07)"}
      onMouseLeave={e=>e.currentTarget.style.filter="brightness(1)"}
      onMouseDown={e=>e.currentTarget.style.transform="scale(.97)"}
      onMouseUp={e=>e.currentTarget.style.transform="scale(1)"}
    >
      {children}
    </button>
  );
}

function PixHowToCard({ onClose }) {
  const [idx, setIdx] = useState(0);
  const step = _PIX_HOW_TO[idx];
  const isLast = idx === _PIX_HOW_TO.length - 1;
  const isTerminal = idx === 5;
  const next = () => setIdx(i => Math.min(i + 1, _PIX_HOW_TO.length - 1));

  return (
    <div style={{width:"100%",height:"100%",background:"rgba(8,18,42,.92)",border:"1px solid rgba(255,255,255,.12)",borderRadius:16,overflow:"hidden",display:"flex",flexDirection:"column"}}>

      {/* Dot progress */}
      <div style={{display:"flex",justifyContent:"center",alignItems:"center",gap:8,padding:"12px 0 8px",flexShrink:0}}>
        {_PIX_HOW_TO.map((_,i)=>(
          <div key={i} style={{width:i===idx?20:8,height:8,borderRadius:99,background:i===idx?"#F39208":i<idx?"#A7C945":"rgba(255,255,255,.22)",transition:"all .28s ease"}}/>
        ))}
      </div>

      {/* Content: texto à esquerda · animação à direita */}
      <div key={idx} className="fadein" style={{
        display:"flex", alignItems:"stretch", gap:"clamp(12px,2.4vw,24px)",
        padding:"clamp(10px,2vh,18px) clamp(14px,3vw,24px) clamp(12px,2.2vh,20px)",
        flex:1, overflow:"hidden", minHeight:0,
      }}>

        {/* Esquerda — número, título, descrição */}
        <div style={{flex:1,display:"flex",flexDirection:"column",gap:"clamp(8px,1.4vh,14px)",minWidth:0,justifyContent:"center",overflow:"hidden"}}>
          <div style={{
            width:"clamp(32px,4.4vw,48px)", height:"clamp(32px,4.4vw,48px)",
            borderRadius:"50%", background:"#F39208", flexShrink:0,
            display:"flex", alignItems:"center", justifyContent:"center",
            fontFamily:"Montserrat", fontWeight:800,
            fontSize:"clamp(14px,2vw,20px)", color:"#000",
          }}>
            {step.number}
          </div>
          <div style={{
            fontFamily:"Montserrat", fontWeight:800,
            fontSize:"clamp(14px,2.6vw,22px)", lineHeight:1.22, whiteSpace:"pre-line",
          }}>
            {step.title}
          </div>
          <div style={{
            fontFamily:"Poppins", fontWeight:400,
            fontSize:"clamp(10px,1.6vw,14px)", lineHeight:1.6,
            color:"rgba(255,255,255,.68)",
          }}>
            {step.desc}
          </div>
        </div>

        {/* Direita — viewport da animação */}
        <div style={{
          position:"relative",
          flexShrink:0,
          width:"clamp(120px,40%,260px)",
          overflow:"hidden",
          borderRadius:isTerminal ? 8 : 0,
        }}>
          {isTerminal ? (
            <step.Scene/>
          ) : (
            /* Crop portrait: exibe apenas a região do telefone do PNG 3:2 */
            <div style={{
              position:"absolute",
              width:"250%",
              aspectRatio:"3/2",
              left:"-70.7%",
              top:"4%",
            }}>
              <step.Scene/>
            </div>
          )}
        </div>
      </div>

      {/* Bottom nav */}
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"10px 20px 14px",borderTop:"1px solid rgba(255,255,255,.08)",flexShrink:0}}>
        <button onClick={onClose} style={{background:"none",border:"none",color:"rgba(255,255,255,.45)",fontFamily:"Poppins",fontWeight:600,fontSize:12,cursor:"pointer",padding:"8px 4px",letterSpacing:".04em"}}>
          PULAR
        </button>
        {isLast
          ? <_TutBtn onClick={onClose} variant="success">ENTENDI</_TutBtn>
          : <_TutBtn onClick={next} variant="primary">PRÓXIMO <ArrowRight size="16px" color="#fff"/></_TutBtn>
        }
      </div>
    </div>
  );
}

/* ── Main PIX screen ── */
function Pix({ go, total }) {
  const [secs, setSecs] = useState(299);
  const [showHowTo, setShowHowTo] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSecs(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(secs / 60)).padStart(2, "0");
  const ss = String(secs % 60).padStart(2, "0");
  const expired = secs === 0;
  const timerColor = expired ? "#B26F9A" : secs < 60 ? "#ff9f43" : "#A7C945";

  return (
    <div className="screen screen-bg-dark fadein" data-screen-label="05 PIX">
      <Logo/><Susep/>
      <Progress step={3}/>
      <BackButton onClick={() => go("resumo")} label="CANCELAR"/>

      <div style={{
        position:"absolute", top:"12.8vh", left:0, right:0, bottom:0,
        display:"flex", flexDirection:"column", alignItems:"center",
        overflowY:"auto", padding:"12px 20px 16px", gap:12,
      }}>

        {/* Título */}
        <div style={{textAlign:"center",flexShrink:0,width:"100%"}}>
          <h1 style={{margin:0,fontFamily:"Montserrat",fontWeight:800,fontSize:"clamp(20px,4.4vw,30px)",lineHeight:1.2}}>
            Pagar com PIX
          </h1>
          <p style={{margin:"6px 0 0",fontFamily:"Poppins",fontWeight:500,fontSize:"clamp(11px,2.4vw,15px)",color:"rgba(255,255,255,.82)",lineHeight:1.4}}>
            Siga o passo a passo abaixo
          </p>
        </div>

        {/* Indicador de etapas */}
        <div style={{width:"100%",flexShrink:0,padding:"0 4px"}}>
          <PixStepIndicator/>
        </div>

        {/* Card principal — QR ou tutorial */}
        <div style={{width:"100%",flex:1,minHeight:0}}>
          {showHowTo ? (
            <PixHowToCard onClose={() => setShowHowTo(false)}/>
          ) : (
            <div style={{
              width:"100%", background:"rgba(8,18,42,.8)",
              border:"1px solid rgba(255,255,255,.1)", borderRadius:16,
              padding:"16px", display:"flex", gap:16, alignItems:"stretch",
            }}>

              {/* Esquerda: valor + timer + segurança */}
              <div style={{flex:"0 0 44%",display:"flex",flexDirection:"column",justifyContent:"space-between",gap:12}}>

                <div style={{display:"flex",flexDirection:"column",gap:12}}>
                  <div>
                    <div style={{fontFamily:"Poppins",fontWeight:700,fontSize:11,letterSpacing:".06em",opacity:.7,textTransform:"uppercase"}}>
                      Total a pagar
                    </div>
                    <div style={{fontFamily:"Nunito",fontWeight:900,fontSize:"clamp(22px,5.6vw,36px)",color:"#F39208",lineHeight:1.1,marginTop:4}}>
                      R$ {formatBRL(total)}
                    </div>
                  </div>

                  <div style={{height:1,background:"rgba(255,255,255,.12)"}}/>

                  <div>
                    <div style={{fontFamily:"Poppins",fontWeight:700,fontSize:11,letterSpacing:".06em",opacity:.65,textTransform:"uppercase"}}>
                      {expired ? "QR Code expirado" : "QR Code válido por"}
                    </div>
                    <div style={{fontFamily:"Nunito",fontWeight:900,fontSize:"clamp(20px,5.2vw,32px)",color:timerColor,transition:"color .5s",lineHeight:1.1,marginTop:4}}>
                      {expired ? "00:00" : `${mm}:${ss}`}
                    </div>
                  </div>
                </div>

                {/* Badge segurança — alinhado com o botão dúvida */}
                <div style={{background:"rgba(167,201,69,.07)",border:"1px solid rgba(167,201,69,.22)",borderRadius:10,padding:"10px 12px"}}>
                  <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:5}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#A7C945" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                      <polyline points="9 12 11 14 15 10"/>
                    </svg>
                    <span style={{fontFamily:"Poppins",fontWeight:700,fontSize:11,color:"#A7C945"}}>
                      Pagamento 100% seguro
                    </span>
                  </div>
                  <div style={{fontFamily:"Poppins",fontSize:10,color:"rgba(255,255,255,.55)",lineHeight:1.45}}>
                    Seu pagamento é processado com segurança e criptografia.
                  </div>
                </div>
              </div>

              {/* Direita: QR + dica + botão dúvida */}
              <div style={{flex:1,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"space-between",gap:10}}>
                <PixQR expired={expired}/>

                <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:8,width:"100%"}}>
                  <div style={{display:"flex",alignItems:"flex-start",gap:8,width:"100%",padding:"0 4px"}}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0,marginTop:1}}>
                      <rect x="5" y="2" width="14" height="20" rx="2"/><line x1="12" y1="18" x2="12.01" y2="18"/>
                    </svg>
                    <span style={{fontFamily:"Poppins",fontSize:11,color:"rgba(255,255,255,.5)",lineHeight:1.45}}>
                      Aponte a câmera do seu celular para o QR Code ao lado
                    </span>
                  </div>

                  {/* Botão dúvida — área de toque generosa para totem e mobile */}
                  <button
                    onClick={() => setShowHowTo(true)}
                    style={{
                      display:"flex", alignItems:"center", justifyContent:"center", gap:8,
                      background:"rgba(243,146,8,.09)", border:"2px solid rgba(243,146,8,.5)",
                      borderRadius:12, padding:"clamp(10px,1.4vh,14px) clamp(12px,2vw,18px)", cursor:"pointer",
                      fontFamily:"Poppins", fontWeight:700, fontSize:"clamp(13px,1.8vw,15px)",
                      color:"#F39208", letterSpacing:".02em", transition:"background .2s, border-color .2s",
                      width:"100%", minHeight:"clamp(46px,5.8vh,54px)",
                    }}
                    onMouseEnter={e=>{e.currentTarget.style.background="rgba(243,146,8,.2)";e.currentTarget.style.borderColor="rgba(243,146,8,.9)"}}
                    onMouseLeave={e=>{e.currentTarget.style.background="rgba(243,146,8,.09)";e.currentTarget.style.borderColor="rgba(243,146,8,.5)"}}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F39208" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{flexShrink:0}}>
                      <circle cx="12" cy="12" r="10"/>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                    Dúvida? Veja como pagar
                  </button>
                </div>
              </div>

            </div>
          )}
        </div>

        {/* Botão de ação principal */}
        <div style={{width:"100%",flexShrink:0}}>
          {!expired ? (
            <button className="btn btn-success" style={{width:"100%"}} onClick={() => go("loading","sucesso")}>
              JÁ PAGUEI <CheckBox checked={true} bg="#fff" color="#A7C945" size="3.4vw"/>
            </button>
          ) : (
            <button className="btn btn-primary" style={{width:"100%"}} onClick={() => go("pix_recusado")}>
              VER OPÇÕES DE PAGAMENTO <ArrowRight/>
            </button>
          )}
        </div>

      </div>
    </div>
  );
}
