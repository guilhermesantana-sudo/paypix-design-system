/* ── Confetti ─────────────────────────────────────────── */
function Confetti() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width  = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    const ctx = canvas.getContext("2d");

    const colors = ["#F39208","#A7C945","#FFFFFF","#EF7E5A","#54BBAB","#F8AF4F","#9ED7EB","#B26F9A"];
    const particles = Array.from({ length: 160 }, (_, i) => ({
      x:      Math.random() * canvas.width,
      y:      -Math.random() * canvas.height * 0.6,
      w:      Math.random() * 11 + 5,
      h:      Math.random() * 5  + 3,
      color:  colors[i % colors.length],
      vy:     Math.random() * 3  + 1.5,
      vx:     (Math.random() - 0.5) * 2.5,
      rot:    Math.random() * 360,
      rotV:   (Math.random() - 0.5) * 7,
      wb:     Math.random() * 360,
      wbV:    Math.random() * 2  + 0.8,
      circle: i % 4 === 0,
    }));

    let alive = true, raf;
    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const p of particles) {
        p.y   += p.vy;
        p.wb  += p.wbV;
        p.x   += p.vx + Math.sin(p.wb * 0.0175) * 1.6;
        p.rot += p.rotV;
        if (p.y > canvas.height + 20) { p.y = -20; p.x = Math.random() * canvas.width; }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot * 0.0175);
        ctx.fillStyle = p.color;
        ctx.globalAlpha = 0.9;
        if (p.circle) { ctx.beginPath(); ctx.arc(0,0,p.w/2,0,Math.PI*2); ctx.fill(); }
        else          { ctx.fillRect(-p.w/2, -p.h/2, p.w, p.h); }
        ctx.restore();
      }
      if (alive) raf = requestAnimationFrame(tick);
    };
    tick();
    return () => { alive = false; cancelAnimationFrame(raf); };
  }, []);

  return (
    <canvas ref={canvasRef}
      style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", zIndex:20 }}
    />
  );
}

/* ── Animated check circle ────────────────────────────── */
function AnimatedCheck() {
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(1), 150);
    const t2 = setTimeout(() => setPhase(2), 680);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  return (
    <div style={{
      margin: "0 auto",
      width: "clamp(40px,8vw,64px)", height: "clamp(40px,8vw,64px)",
      borderRadius: "50%",
      background: "#A7C945",
      display: "flex", alignItems: "center", justifyContent: "center",
      transform:   phase >= 1 ? "scale(1)"   : "scale(0)",
      boxShadow:   phase >= 2
        ? "0 0 0 6px rgba(167,201,69,.3), 0 0 0 14px rgba(167,201,69,.12), 0 10px 32px rgba(167,201,69,.65)"
        : "0 8px 30px rgba(167,201,69,.3)",
      animation:   phase >= 2 ? "sucess-pulse 2s ease-out infinite" : "none",
      transition:  "transform .55s cubic-bezier(.175,.885,.32,1.275), box-shadow .6s ease",
    }}>
      <svg width="clamp(20px,4.4vw,34px)" height="clamp(20px,4.4vw,34px)" viewBox="0 0 24 24"
        fill="none" stroke="#fff" strokeWidth="3.2"
        strokeLinecap="round" strokeLinejoin="round"
        style={{
          strokeDasharray: 30,
          strokeDashoffset: phase >= 2 ? 0 : 30,
          transition: "stroke-dashoffset .45s ease .1s",
        }}>
        <polyline points="20 6 9 17 4 12"/>
      </svg>
    </div>
  );
}

/* ── LotteryBall — bolinha dourada estilo loteria ── */
function LotteryBall({ number, delay = 0 }) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    setShown(false);
    const t = setTimeout(() => setShown(true), delay);
    return () => clearTimeout(t);
  }, [number, delay]);

  return (
    <div style={{
      width: "clamp(28px,6vw,38px)",
      height: "clamp(28px,6vw,38px)",
      borderRadius: "50%",
      background: "radial-gradient(circle at 32% 28%, #F8AF4F 0%, #F39208 40%, #B85F00 80%, #5A2E00 100%)",
      boxShadow: "inset 0 -2px 5px rgba(90,46,0,.55), inset 0 2px 3px rgba(255,255,255,.5), 0 2px 6px rgba(0,0,0,.45), 0 0 14px rgba(243,146,8,.55)",
      display: "flex", alignItems: "center", justifyContent: "center",
      fontFamily: "Montserrat", fontWeight: 900,
      fontSize: "clamp(12px,2.6vw,16px)", color: "#fff",
      letterSpacing: "-.02em",
      flexShrink: 0,
      transform: shown ? "scale(1) rotate(0)" : "scale(0) rotate(-200deg)",
      opacity: shown ? 1 : 0,
      transition: "transform .55s cubic-bezier(.34,1.56,.64,1), opacity .25s ease",
    }}>
      {String(number).padStart(2, "0")}
    </div>
  );
}

/* ── NextDrawCard — próximo sorteio ao vivo ─────────────── */
function NextDrawCard({ weekday, date, time, channels }) {
  return (
    <div style={{
      background: "rgba(0,0,0,.35)",
      border: "1.5px solid rgba(243,146,8,.28)",
      borderRadius: "2.4vw",
      padding: "max(10px,1.2vh) max(12px,3vw)",
      display: "flex", alignItems: "center", gap: "3vw",
    }}>
      <div style={{
        flexShrink: 0,
        width: "clamp(34px,7vw,46px)", height: "clamp(34px,7vw,46px)",
        borderRadius: "1.4vw",
        background: "linear-gradient(135deg, rgba(243,146,8,.18), rgba(243,146,8,.06))",
        border: "1px solid rgba(243,146,8,.35)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "clamp(18px,3.6vw,24px)",
      }}>📺</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{
          fontFamily: "Poppins", fontWeight: 700,
          fontSize: "clamp(9px,1.6vw,11px)", color: "rgba(243,146,8,.85)",
          letterSpacing: ".18em", marginBottom: 2,
        }}>
          PRÓXIMO SORTEIO · AO VIVO
        </div>
        <div style={{
          fontFamily: "Poppins", fontWeight: 700,
          fontSize: "clamp(13px,2.6vw,16px)", color: "#fff", lineHeight: 1.15,
        }}>
          {weekday} · <strong>{date}</strong> · <strong>{time}</strong>
        </div>
        <div style={{
          fontFamily: "Poppins", fontWeight: 500,
          fontSize: "clamp(10px,1.8vw,12px)", color: "rgba(255,255,255,.7)",
          marginTop: 2,
        }}>
          {channels}
        </div>
      </div>
    </div>
  );
}

/* ── GloboCard — globo com 20 dezenas reveladas ────────── */
function GloboCard({ chanceIdx, numbers }) {
  return (
    <div style={{
      borderRadius: 14,
      border: "1.5px solid rgba(243,146,8,.45)",
      background: "rgba(0,0,0,.4)",
      boxShadow: "0 6px 20px rgba(0,0,0,.45), 0 0 0 1px rgba(243,146,8,.12)",
      padding: "max(10px,1vh) max(10px,2.4vw) max(12px,1.2vh)",
      display: "flex", flexDirection: "column", gap: "max(8px,1vh)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "2vw",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "2vw",
          fontFamily: "Poppins", fontWeight: 800,
          fontSize: "clamp(11px,2vw,14px)", color: "#F39208",
          letterSpacing: ".18em",
        }}>
          <span style={{
            width: "max(6px,1.2vw)", height: "max(6px,1.2vw)",
            borderRadius: "50%", background: "#F39208",
            boxShadow: "0 0 8px rgba(243,146,8,.7)",
          }}/>
          GLOBO · CHANCE {chanceIdx + 1}
        </div>
        <div style={{
          fontFamily: "Poppins", fontWeight: 600,
          fontSize: "clamp(9px,1.7vw,11px)", color: "rgba(255,255,255,.55)",
          letterSpacing: ".06em",
        }}>
          20 dezenas · 01-60
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(10, 1fr)",
        justifyItems: "center",
        gap: "max(6px,.9vh) max(2px,.4vw)",
      }}>
        {numbers.map((n, i) => (
          <LotteryBall key={`g${chanceIdx}-${i}`} number={n} delay={i * 28}/>
        ))}
      </div>
    </div>
  );
}

/* ── GiroDaSorteCard — número único de 7 dígitos ──────── */
function GiroDaSorteCard({ number }) {
  return (
    <div style={{
      borderRadius: 14,
      border: "1.5px solid rgba(243,146,8,.45)",
      background: "rgba(0,0,0,.4)",
      boxShadow: "0 6px 20px rgba(0,0,0,.45), 0 0 0 1px rgba(243,146,8,.12)",
      padding: "max(10px,1vh) max(12px,3vw) max(12px,1.2vh)",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        gap: "2vw", marginBottom: "max(6px,.8vh)",
      }}>
        <div style={{
          display: "flex", alignItems: "center", gap: "2vw",
          fontFamily: "Poppins", fontWeight: 800,
          fontSize: "clamp(11px,2vw,14px)", color: "#F39208",
          letterSpacing: ".14em",
        }}>
          <span style={{ fontSize: "clamp(14px,2.8vw,18px)" }}>🎰</span>
          GIRO DA SORTE
        </div>
        <div style={{
          fontFamily: "Poppins", fontWeight: 600,
          fontSize: "clamp(9px,1.7vw,11px)", color: "rgba(255,255,255,.55)",
          letterSpacing: ".06em",
        }}>
          7 dígitos · número único
        </div>
      </div>
      <div style={{
        textAlign: "center",
        fontFamily: "Nunito", fontWeight: 900,
        fontSize: "clamp(28px,7vw,44px)", color: "#F39208",
        letterSpacing: ".06em",
        textShadow: "0 0 24px rgba(243,146,8,.55)",
      }}>
        {number}
      </div>
    </div>
  );
}

/* ── PrizesCard — lista de prêmios concorrendo ─────────── */
const PRIZES = [
  { icon: "🏆", label: "4º SORTEIO · 20 ACERTOS",                  value: "R$ 1.000.000",       highlight: true },
  { icon: "🥈", label: "NA TRAVE DO MILHÃO · 2º MAIOR NO 4º SORTEIO", value: "R$ 60.000" },
  { icon: "🎯", label: "1º · 2º · 3º SORTEIO · 20 ACERTOS",         value: "R$ 30.000 cada" },
  { icon: "🥉", label: "NA TRAVE · 19 ACERTOS NOS 1º·2º·3º",        value: "R$ 15.000 cada" },
  { icon: "🎡", label: "HIPER GIRO · 30 NÚMEROS",                  value: "R$ 5.000 cada" },
];

function PrizesCard() {
  return (
    <div style={{
      borderRadius: 14,
      border: "1.5px solid rgba(243,146,8,.5)",
      background: "rgba(0,0,0,.42)",
      boxShadow: "0 6px 20px rgba(0,0,0,.45), 0 0 0 1px rgba(243,146,8,.14)",
      padding: "max(12px,1.4vh) max(12px,3vw)",
      display: "flex", flexDirection: "column", gap: "max(8px,1vh)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "3vw" }}>
        <div style={{
          flexShrink: 0,
          width: "clamp(34px,7vw,46px)", height: "clamp(34px,7vw,46px)",
          borderRadius: "1.4vw",
          background: "linear-gradient(135deg,#F39208 0%,#F39208 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: "clamp(18px,3.6vw,24px)",
          boxShadow: "0 4px 12px rgba(243,146,8,.35)",
        }}>🏆</div>
        <div style={{ flex: 1, minWidth: 0, textAlign: "center" }}>
          <div style={{
            fontFamily: "Montserrat", fontWeight: 800,
            fontSize: "clamp(13px,2.6vw,16px)", color: "#F39208",
            letterSpacing: ".02em", lineHeight: 1.15,
          }}>
            Você está concorrendo a tudo isso
          </div>
          <div style={{
            fontFamily: "Poppins", fontWeight: 500,
            fontSize: "clamp(10px,1.8vw,12px)", color: "rgba(255,255,255,.72)",
            marginTop: 2,
          }}>
            Confira os prêmios que seu título disputa no próximo sorteio.
          </div>
        </div>
      </div>

      <div style={{ height: 1, background: "rgba(243,146,8,.18)" }}/>

      <div style={{ display: "flex", flexDirection: "column", gap: "max(6px,.7vh)" }}>
        {PRIZES.map((p, i) => (
          <div key={i} style={{
            display: "flex", alignItems: "center", gap: "3vw",
            background: p.highlight ? "rgba(243,146,8,.14)" : "rgba(0,0,0,.25)",
            border: `1px solid ${p.highlight ? "rgba(243,146,8,.55)" : "rgba(243,146,8,.18)"}`,
            borderRadius: 10,
            padding: "max(8px,.9vh) max(10px,2.6vw)",
            boxShadow: p.highlight ? "0 0 18px rgba(243,146,8,.18)" : "none",
          }}>
            <div style={{
              flexShrink: 0,
              width: "clamp(26px,5.4vw,34px)", height: "clamp(26px,5.4vw,34px)",
              borderRadius: "50%",
              background: "rgba(243,146,8,.18)",
              border: "1px solid rgba(243,146,8,.4)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: "clamp(13px,2.6vw,16px)",
            }}>{p.icon}</div>
            <div style={{ flex: 1, textAlign: "center" }}>
              <div style={{
                fontFamily: "Poppins", fontWeight: 600,
                fontSize: "clamp(9px,1.7vw,11px)", color: "rgba(255,255,255,.7)",
                letterSpacing: ".08em", textTransform: "uppercase",
              }}>{p.label}</div>
              <div style={{
                fontFamily: "Nunito", fontWeight: 900,
                fontSize: p.highlight ? "clamp(16px,3.2vw,20px)" : "clamp(13px,2.6vw,16px)",
                color: "#F39208",
                letterSpacing: ".02em",
                textShadow: p.highlight ? "0 0 12px rgba(243,146,8,.5)" : "none",
                marginTop: 1,
              }}>{p.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── TicketInfoFooter — info do título ─────────────────── */
function TicketInfoFooter({ code, price, pdv }) {
  return (
    <div style={{
      borderRadius: 10,
      border: "1px dashed rgba(243,146,8,.45)",
      padding: "max(8px,.9vh) max(10px,2.6vw)",
      display: "grid", gridTemplateColumns: "1fr 1fr",
      gap: "2vw",
      background: "rgba(0,0,0,.2)",
    }}>
      <div>
        <div style={{
          fontFamily: "Poppins", fontWeight: 700,
          fontSize: "clamp(8px,1.5vw,10px)", color: "rgba(255,255,255,.55)",
          letterSpacing: ".18em", marginBottom: 2,
        }}>TÍTULO</div>
        <div style={{
          fontFamily: "Nunito", fontWeight: 800,
          fontSize: "clamp(11px,2vw,13px)", color: "#fff",
          letterSpacing: ".02em",
        }}>
          {code} <span style={{ color: "rgba(243,146,8,.85)" }}>· R$ {formatBRL(price)} · PIX</span>
        </div>
      </div>
      <div>
        <div style={{
          fontFamily: "Poppins", fontWeight: 700,
          fontSize: "clamp(8px,1.5vw,10px)", color: "rgba(255,255,255,.55)",
          letterSpacing: ".18em", marginBottom: 2,
        }}>PDV</div>
        <div style={{
          fontFamily: "Nunito", fontWeight: 800,
          fontSize: "clamp(11px,2vw,13px)", color: "#fff",
          letterSpacing: ".02em",
        }}>
          {pdv}
        </div>
      </div>
    </div>
  );
}

/* ── ProductTabs — alterna entre HiperCap e ValeCap ── */
function ProductTabs({ products, qty, active, onChange }) {
  return (
    <div style={{
      display: "flex", gap: "1vw",
      background: "rgba(0,0,0,.45)",
      border: "1.5px solid rgba(243,146,8,.3)",
      borderRadius: 99, padding: 4,
    }}>
      {products.map(p => {
        const on = active === p.id;
        return (
          <button key={p.id} onClick={() => onChange(p.id)} style={{
            flex: 1,
            height: "clamp(36px,5vh,46px)",
            borderRadius: 99,
            background: on ? "linear-gradient(135deg,#F39208 0%,#F39208 100%)" : "transparent",
            color: on ? "#000" : "#fff",
            fontFamily: "Montserrat", fontWeight: 800,
            fontSize: "clamp(11px,2.3vw,14px)",
            letterSpacing: ".04em",
            display: "flex", alignItems: "center", justifyContent: "center", gap: "1.4vw",
            cursor: "pointer",
            transition: "all .28s cubic-bezier(.4,0,.2,1)",
            boxShadow: on ? "0 4px 14px rgba(243,146,8,.45), inset 0 -2px 4px rgba(120,60,0,.25)" : "none",
            border: 0, padding: "0 max(8px,2vw)",
          }}>
            <span style={{
              flexShrink: 0,
              width: "clamp(20px,4.4vw,26px)", height: "clamp(20px,4.4vw,26px)",
              borderRadius: "50%",
              background: on ? "rgba(255,255,255,.95)" : "rgba(255,255,255,.08)",
              border: on ? "1px solid rgba(0,0,0,.1)" : "1px solid rgba(255,255,255,.18)",
              padding: 2,
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              overflow: "hidden",
            }}>
              <img src={p.thumb} alt=""
                style={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "50%" }}/>
            </span>
            <span style={{ whiteSpace: "nowrap" }}>{p.name}</span>
            <span style={{
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              minWidth: "clamp(20px,4.4vw,26px)", height: "clamp(20px,4.4vw,26px)",
              borderRadius: 99, padding: "0 1.4vw",
              background: on ? "rgba(0,0,0,.22)" : "rgba(243,146,8,.2)",
              color: on ? "#000" : "#F39208",
              fontFamily: "Nunito", fontWeight: 900,
              fontSize: "clamp(10px,2vw,12px)",
            }}>{qty[p.id]}</span>
          </button>
        );
      })}
    </div>
  );
}

/* ── Helpers ───────────────────────────────────────────── */
function genLuckyNumbers() {
  const set = new Set();
  while (set.size < 20) set.add(Math.floor(Math.random() * 60) + 1);
  return Array.from(set).sort((a, b) => a - b);
}
function genCode(prefix) {
  return `${prefix}-2026-${String(Math.floor(Math.random() * 9000) + 1000)}`;
}
function genGiro() {
  const n = Math.floor(Math.random() * 9_000_000) + 1_000_000;
  return n.toLocaleString("pt-BR");
}
function genPdv() {
  return `0237 · Banca Lopes`;
}
function nextSundayLabel() {
  const d = new Date();
  const day = d.getDay();
  const add = (7 - day) % 7 || 7;
  d.setDate(d.getDate() + add);
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const yy = d.getFullYear();
  return `${dd}/${mm}/${yy}`;
}

/* ── Main screen ──────────────────────────────────────── */
function Sucesso({ go, qty, form }) {
  const [titleIn, setTitleIn] = useState(false);

  const purchased = useMemo(
    () => PRODUCTS.filter(p => qty[p.id] > 0),
    [qty]
  );

  // Gera cartelas uma única vez.
  const tickets = useMemo(() => {
    const map = {};
    purchased.forEach(p => {
      const prefix = p.id === "hipercap" ? "HXC" : "VLC";
      map[p.id] = Array.from({ length: qty[p.id] }, () => ({
        code: genCode(prefix),
        chances: [genLuckyNumbers(), genLuckyNumbers()],
        giro: genGiro(),
        pdv: genPdv(),
      }));
    });
    return map;
  // eslint-disable-next-line
  }, []);

  const [activeTab, setActiveTab] = useState(purchased[0]?.id || null);

  useEffect(() => {
    if (document.getElementById("sucesso-kf")) return;
    const s = document.createElement("style");
    s.id = "sucesso-kf";
    s.textContent = `
      @keyframes sucess-pulse {
        0%   { box-shadow: 0 0 0 0   rgba(167,201,69,.55), 0 12px 40px rgba(167,201,69,.5); }
        70%  { box-shadow: 0 0 0 22px rgba(167,201,69,0),  0 12px 40px rgba(167,201,69,.3); }
        100% { box-shadow: 0 0 0 0   rgba(167,201,69,0),  0 12px 40px rgba(167,201,69,.3); }
      }
      @keyframes badge-float {
        0%,100% { transform: translateY(0);   }
        50%     { transform: translateY(-4px); }
      }
      @keyframes gold-shimmer {
        0%,100% { text-shadow: 0 0 24px rgba(243,146,8,.5); }
        50%     { text-shadow: 0 0 48px rgba(243,146,8,1), 0 0 90px rgba(243,146,8,.45); }
      }
    `;
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    const t = setTimeout(() => setTitleIn(true), 420);
    return () => clearTimeout(t);
  }, []);

  const activeProduct = purchased.find(p => p.id === activeTab);
  const activeTickets = activeTab ? tickets[activeTab] : [];

  return (
    <div className="screen screen-bg-success fadein" data-screen-label="08 Sucesso"
      style={{ position:"relative" }}>

      <Confetti/>
      <Logo/><Susep/>
      <Progress step={5}/>

      {/* Coluna principal: scrollável + footer fixo */}
      <div style={{
        position:"absolute", top:"12.8vh", left:0, right:0, bottom:0,
        display:"flex", flexDirection:"column",
        zIndex:1,
      }}>

        {/* ── Conteúdo rolável ── */}
        <div className="produtos-scroll" style={{
          flex:1, minHeight:0, overflowY:"auto",
          padding:"max(8px,1vh) 5vw max(8px,.8vh)",
          display:"flex", flexDirection:"column", gap:"max(10px,1.4vh)",
        }}>

          {/* Check + badge + título */}
          <div style={{ textAlign:"center" }}>
            <AnimatedCheck/>

            <div style={{
              marginTop:"max(6px,.6vh)",
              display:"inline-flex", alignItems:"center", gap:"1.4vw",
              background:"rgba(167,201,69,.15)", border:"1.5px solid rgba(167,201,69,.5)",
              borderRadius:99, padding:"max(4px,.35vh) 2.4vw",
              fontFamily:"Montserrat", fontWeight:800,
              fontSize:"clamp(10px,1.9vw,12px)",
              color:"#A7C945", letterSpacing:".05em",
              animation:"badge-float 2.5s ease-in-out infinite",
            }}>
              <CheckBox checked={true} bg="#A7C945" color="#fff" size="2.2vw"/>
              PAGAMENTO CONFIRMADO
            </div>

            <div style={{
              marginTop:"max(8px,1vh)",
              fontFamily:"Montserrat", fontWeight:900,
              fontSize:"clamp(18px,3.8vw,28px)",
              color:"#F39208", letterSpacing:".04em", lineHeight:1.1,
              transform:  titleIn ? "scale(1) translateY(0)" : "scale(.6) translateY(14px)",
              opacity:    titleIn ? 1 : 0,
              transition: "transform .55s cubic-bezier(.175,.885,.32,1.275), opacity .5s ease",
              animation:  titleIn ? "gold-shimmer 2.5s ease-in-out infinite" : "none",
            }}>
              SUAS DEZENAS E NÚMEROS<br/>DA SORTE FORAM REVELADOS!
            </div>
          </div>

          {/* Próximo Sorteio */}
          <NextDrawCard
            weekday="Domingo"
            date={nextSundayLabel()}
            time="21h30"
            channels="RedeTV! · Record News · YouTube"
          />

          {/* Tabs */}
          {purchased.length > 1 && (
            <ProductTabs
              products={purchased}
              qty={qty}
              active={activeTab}
              onChange={setActiveTab}
            />
          )}

          {/* Sub-rótulo */}
          <div style={{
            textAlign:"center",
            fontFamily:"Poppins", fontWeight:600,
            fontSize:"clamp(10px,1.8vw,12px)",
            color:"rgba(255,255,255,.65)",
            letterSpacing:".03em",
          }}>
            {activeTickets.length} {activeTickets.length > 1 ? "títulos gerados" : "título gerado"}
            {" "}· cada título concorre a todos os prêmios abaixo
          </div>

          {/* Lista de títulos (cada um com globo + giro + info) */}
          {activeTickets.map((t, i) => (
            <div key={`${activeTab}-${t.code}`} style={{
              display:"flex", flexDirection:"column", gap:"max(8px,1vh)",
              padding:"max(10px,1.2vh) max(10px,2.6vw)",
              borderRadius:14,
              background:"rgba(0,0,0,.25)",
              border:"1px solid rgba(243,146,8,.18)",
            }}>
              <div style={{
                display:"flex", alignItems:"center", gap:"2.4vw",
              }}>
                <div style={{
                  flexShrink:0,
                  width:"clamp(28px,6vw,38px)", height:"clamp(28px,6vw,38px)",
                  borderRadius:10,
                  background:"linear-gradient(135deg,#F39208 0%,#F39208 100%)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontFamily:"Montserrat", fontWeight:900,
                  fontSize:"clamp(12px,2.4vw,16px)", color:"#000",
                  boxShadow:"0 3px 8px rgba(0,0,0,.3)",
                }}>{String(i+1).padStart(2,"0")}</div>
                <div style={{ flex:1, minWidth:0 }}>
                  <div style={{
                    fontFamily:"Poppins", fontWeight:700,
                    fontSize:"clamp(12px,2.3vw,15px)", color:"#fff",
                    letterSpacing:".03em",
                  }}>
                    Título {String(i+1).padStart(2,"0")}
                  </div>
                  <div style={{
                    fontFamily:"Nunito", fontWeight:800,
                    fontSize:"clamp(10px,1.9vw,12px)", color:"#F39208",
                    letterSpacing:".06em", marginTop:1,
                  }}>{t.code}</div>
                </div>
              </div>

              {t.chances.map((nums, ci) => (
                <GloboCard key={ci} chanceIdx={ci} numbers={nums}/>
              ))}
              <GiroDaSorteCard number={t.giro}/>
              <TicketInfoFooter code={t.code} price={activeProduct?.price || 0} pdv={t.pdv}/>
            </div>
          ))}

          {/* Você está concorrendo a tudo isso */}
          <PrizesCard/>

          {/* Boa sorte */}
          <div style={{
            textAlign:"center",
            fontFamily:"Montserrat", fontWeight:900,
            fontSize:"clamp(14px,2.8vw,18px)", color:"#A7C945",
            letterSpacing:".05em",
            textShadow:"0 0 18px rgba(167,201,69,.5)",
          }}>
            🍀 BOA SORTE!
          </div>

          {/* Regulamento + disclaimer */}
          <div style={{ textAlign:"center" }}>
            <a href="#" onClick={e=>e.preventDefault()} style={{
              display:"inline-flex", alignItems:"center", gap:"1.4vw",
              fontFamily:"Poppins", fontWeight:600,
              fontSize:"clamp(10px,1.8vw,12px)",
              color:"#F39208", letterSpacing:".02em",
              textDecoration:"underline", textUnderlineOffset:3,
            }}>
              📄 Regulamento e condições de participação
            </a>
          </div>
          <div style={{
            textAlign:"center",
            fontFamily:"Poppins", fontWeight:500,
            fontSize:"clamp(9px,1.6vw,11px)", color:"rgba(255,255,255,.55)",
            lineHeight:1.5, padding:"0 2vw",
          }}>
            Título de capitalização emitido pela <strong style={{ color:"#fff" }}>CAIXA Capitalização</strong> · Autorização processo SUSEP em vigor.
            Ao adquirir o título você ajuda o <strong style={{ color:"#fff" }}>Hospital de Câncer de Barretos (Hospital de Amor)</strong> — Fundação Pio XII.
          </div>
        </div>

        {/* ── Footer fixo — WhatsApp + FINALIZAR ── */}
        <div style={{
          flexShrink:0,
          padding:"max(8px,1vh) 5vw max(12px,1.6vh)",
          display:"flex", flexDirection:"column", gap:"max(8px,.8vh)",
          background:"linear-gradient(180deg, rgba(12,22,40,0) 0%, rgba(12,22,40,.85) 30%, rgba(12,22,40,1) 100%)",
        }}>

          <div style={{
            display:"flex", alignItems:"center", gap:"3vw",
            background:"rgba(37,211,102,.1)", borderRadius:"2.4vw",
            padding:"max(8px,.9vh) 3.5vw", border:"1.5px solid rgba(37,211,102,.4)",
          }}>
            <div style={{
              flexShrink:0, width:"clamp(30px,6vw,44px)", height:"clamp(30px,6vw,44px)",
              borderRadius:"50%", background:"#25d366",
              display:"flex", alignItems:"center", justifyContent:"center",
              boxShadow:"0 4px 16px rgba(37,211,102,.4)",
            }}>
              <svg width="55%" height="55%" viewBox="0 0 24 24" fill="#fff">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.549 4.1 1.508 5.83L0 24l6.335-1.483A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.797 9.797 0 0 1-5.031-1.388l-.36-.214-3.762.88.916-3.667-.235-.376A9.786 9.786 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
            </div>
            <div>
              <div style={{ fontFamily:"Poppins", fontWeight:700, fontSize:"clamp(10px,1.9vw,12px)", color:"#25d366", letterSpacing:".02em" }}>
                CONFIRMAÇÃO VIA WHATSAPP
              </div>
              <div style={{ fontFamily:"Poppins", fontWeight:500, fontSize:"clamp(9px,1.7vw,11px)", opacity:.8, marginTop:"max(2px,.2vh)", lineHeight:1.4 }}>
                Enviaremos a confirmação para{" "}
                <strong style={{ color:"#fff", letterSpacing:".04em" }}>{form?.cel || "o número informado"}</strong>
              </div>
            </div>
          </div>

          <button className="btn btn-success" style={{ width:"100%" }} onClick={() => {
            window.__phone = form?.cel || "";
            go("enviando");
          }}>
            FINALIZAR <ArrowRight color="#fff"/>
          </button>

          {/* botão de simulação — apenas para prototipação */}
          <button onClick={() => go("pix_recusado")} style={{
            background: "none", border: "none", cursor: "pointer",
            fontFamily: "Poppins", fontSize: "clamp(11px,2vw,14px)",
            color: "#B26F9A", letterSpacing: ".04em",
            padding: "4px 0", alignSelf: "center",
          }}>
            Simulação Pix Recusado
          </button>
        </div>

      </div>
    </div>
  );
}
