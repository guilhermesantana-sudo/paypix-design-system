/* ── Op01 card ── botões hollow sobre painel azul ── */
function ProductCardOp01({ product, qty, onInc, onDec }) {
  return (
    <div className="product-card-01">
      <div className="pc01-img" style={{ backgroundImage: `url(${product.banner})` }}/>
      <div className="pc01-right">
        <button className="qty-btn" onClick={onInc} aria-label="aumentar">+</button>
        <span className="qty-num">{qty}</span>
        <button className="qty-btn" onClick={onDec} aria-label="diminuir">−</button>
      </div>
    </div>
  );
}

/* ── Op02 card ── thumb sem fundo branco, data quebrando linha ── */
function ProductCardOp02({ product, qty, onInc, onDec }) {
  return (
    <div className="product-card-02">
      <div className="pc02-left">
        <div className="pc02-title-row">
          <div className="pc02-thumb">
            <img src={product.thumb} alt={product.name}/>
          </div>
          <div style={{ minWidth: 0 }}>
            <div className="pc02-title">{product.name}</div>
            <div className="pc02-price">R$ {formatBRL(product.price)} <small>un.</small></div>
          </div>
        </div>
        <div className="pc02-divider"/>
        <div className="pc02-meta">
          {/* Próximo sorteio — data quebra linha */}
          <div className="pc02-meta-block">
            <div className="pc02-meta-icon">
              <svg width="3vw" height="3vw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2"/>
                <line x1="16" y1="2" x2="16" y2="6"/>
                <line x1="8" y1="2" x2="8" y2="6"/>
                <line x1="3" y1="10" x2="21" y2="10"/>
              </svg>
            </div>
            <div className="pc02-meta-text">
              <span className="label">Próximo Sorteio</span>
              <span className="value">{product.nextDraw}</span>
            </div>
          </div>
          <div style={{ width: 1, alignSelf: "stretch", background: "rgba(255,255,255,.18)", flexShrink: 0 }}/>
          {/* Prêmios */}
          <div className="pc02-meta-block">
            <div className="pc02-meta-icon">
              <svg width="3vw" height="3vw" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"/><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"/>
                <path d="M4 22h16"/>
                <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"/>
                <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"/>
                <path d="M18 2H6v7a6 6 0 0 0 12 0V2Z"/>
              </svg>
            </div>
            <div className="pc02-meta-text">
              <span className="label">PRÊMIOS DE ATÉ</span>
              <strong>{product.prizeUpTo}</strong>
            </div>
          </div>
        </div>
      </div>
      {/* Painel lateral direito — botões hollow */}
      <div className="pc02-right">
        <button className="qty-btn" onClick={onInc} aria-label="aumentar">+</button>
        <span className="qty-num">{qty}</span>
        <button className="qty-btn" onClick={onDec} aria-label="diminuir">−</button>
      </div>
    </div>
  );
}

/* ── Animação do prêmio total ── */
function usePrizeAnimation(target) {
  const [display, setDisplay] = useState(0);
  const fromRef = useRef(0);
  const rafRef  = useRef(null);

  useEffect(() => {
    const from = fromRef.current;
    const to   = target;
    fromRef.current = to;
    if (from === to) return;

    const duration  = 900;
    const startTime = performance.now();
    cancelAnimationFrame(rafRef.current);

    const tick = (now) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
      setDisplay(Math.round(from + (to - from) * eased));
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [target]);

  return display;
}

/* ── Seletor de quantidade de produtos (simulação e-commerce) ── */
const SIM_OPTIONS = [2, 3, 4, 6, 8, 10];

function SimSelector({ value, onChange }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: "1.2vw",
    }}>
      <span style={{
        fontFamily: "Poppins", fontWeight: 600,
        fontSize: "clamp(9px, 2.2vw, 14px)",
        color: "rgba(255,255,255,.55)",
        marginRight: ".4vw", whiteSpace: "nowrap",
      }}>
        Produtos:
      </span>
      {SIM_OPTIONS.map(n => (
        <button
          key={n}
          onClick={() => onChange(n)}
          style={{
            width: "clamp(28px, 7.6vw, 44px)",
            height: "clamp(28px, 7.6vw, 44px)",
            borderRadius: "50%",
            background: value === n ? "#F39208" : "rgba(255,255,255,.1)",
            border: value === n ? "none" : "1.5px solid rgba(255,255,255,.22)",
            color: value === n ? "#000" : "rgba(255,255,255,.75)",
            fontFamily: "Poppins", fontWeight: 700,
            fontSize: "clamp(9px, 2.2vw, 14px)",
            cursor: "pointer",
            transition: "background .15s, color .15s, transform .1s",
            flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
          }}
          onMouseEnter={e => { if (value !== n) e.currentTarget.style.background = "rgba(255,255,255,.2)"; }}
          onMouseLeave={e => { if (value !== n) e.currentTarget.style.background = "rgba(255,255,255,.1)"; }}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

/* ── Tela principal ── */
function Produtos({ go, qty, setQty, layout, setLayout }) {
  const [simCount, setSimCount] = useState(2);
  const [menuOpen, setMenuOpen] = useState(false);

  const total    = PRODUCTS.reduce((s, p) => s + p.price * qty[p.id], 0);
  const totalQty = PRODUCTS.reduce((s, p) => s + qty[p.id], 0);
  /* cada produto conta 1× no total de prêmios independente da quantidade */
  const prizeTotal = PRODUCTS.reduce((s, p) => qty[p.id] > 0 ? s + p.prizeValue : s, 0);
  const animPrize  = usePrizeAnimation(prizeTotal);

  /* animação pop ao alterar prêmio total */
  const [popping, setPopping] = useState(false);
  const mountedRef = useRef(false);
  useEffect(() => {
    if (!mountedRef.current) { mountedRef.current = true; return; }
    if (!document.getElementById("prize-kf")) {
      const s = document.createElement("style");
      s.id = "prize-kf";
      s.textContent = `
        @keyframes prize-idle {
          0%,100% { transform:scale(1);     box-shadow:0 6px 18px rgba(0,0,0,.25); }
          50%      { transform:scale(1.018); box-shadow:0 10px 32px rgba(243,146,8,.55),0 0 48px rgba(243,146,8,.2); }
        }
        @keyframes prize-pop {
          0%   { transform:scale(1); }
          28%  { transform:scale(1.07); box-shadow:0 0 0 8px rgba(243,146,8,.4),0 14px 44px rgba(243,146,8,.6); }
          60%  { transform:scale(0.97); }
          100% { transform:scale(1); }
        }
      `;
      document.head.appendChild(s);
    }
    setPopping(true);
    const t = setTimeout(() => setPopping(false), 560);
    return () => clearTimeout(t);
  }, [prizeTotal]);

  /* grid de simulação: repetir produtos reais para preencher simCount slots */
  const simProducts = Array.from({ length: simCount }, (_, i) => PRODUCTS[i % PRODUCTS.length]);
  /* Op02 sempre em coluna única — texto fica ilegível em layout estreito */
  const cols = (layout === "op01" && simCount > 2) ? 2 : 1;

  const Card = layout === "op01" ? ProductCardOp01 : ProductCardOp02;

  return (
    <div className="screen screen-bg-gradient fadein" data-screen-label={`02 Produtos · ${layout}`}>

      {/* ── Header fixo ── Logo + Susep + BackButton + Progress ── */}
      <Logo/><Susep/>
      <BackButton onClick={() => go("intro")}/>
      <Progress step={1}/>

      {/* ── Área rolável ── começa abaixo do header ── */}
      <div
        className="produtos-scroll"
        style={{
          position: "absolute",
          top: "12.8vh", left: 0, right: 0, bottom: 0,
          overflowY: "auto", overflowX: "hidden",
        }}
      >
        <div style={{
          padding: "2vh 5vw",
          paddingBottom: "22vh", /* espaço para a totalbar (mais padding = mais margem de segurança) */
          display: "flex", flexDirection: "column", gap: "2vh",
        }}>

          {/* Título + ícone de menu de quantidade */}
          <div style={{ position:"relative", textAlign:"center", paddingTop:".8vh" }}>
            <h1 style={{ margin:0, fontFamily:"Montserrat", fontWeight:800, fontSize:"5.6vw", color:"#F39208", letterSpacing:".01em" }}>
              ESCOLHA SEU TÍTULO
            </h1>
            <p style={{ margin:".8vh 0 0", fontFamily:"Montserrat", fontWeight:500, fontSize:"3.2vw", color:"rgba(255,255,255,.88)" }}>
              Veja os sorteios e prêmios de cada um
            </p>

            {/* Ícone de grade — canto direito na altura do título */}
            <div style={{ position:"absolute", right:0, top:".8vh" }}>
              <button
                onClick={() => setMenuOpen(o => !o)}
                style={{
                  width:40, height:40, borderRadius:10, cursor:"pointer",
                  background: menuOpen ? "rgba(243,146,8,.2)" : "rgba(255,255,255,.1)",
                  border: menuOpen ? "1.5px solid rgba(243,146,8,.7)" : "1.5px solid rgba(255,255,255,.2)",
                  display:"flex", alignItems:"center", justifyContent:"center",
                  transition:"background .2s, border-color .2s",
                }}
                onMouseEnter={e=>{ if(!menuOpen){ e.currentTarget.style.background="rgba(255,255,255,.18)"; }}}
                onMouseLeave={e=>{ if(!menuOpen){ e.currentTarget.style.background="rgba(255,255,255,.1)"; }}}
                title="Quantidade de produtos"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="3" width="7" height="7" rx="1.5" fill={menuOpen ? "#F39208" : "rgba(255,255,255,.8)"}/>
                  <rect x="14" y="3" width="7" height="7" rx="1.5" fill={menuOpen ? "#F39208" : "rgba(255,255,255,.8)"}/>
                  <rect x="3" y="14" width="7" height="7" rx="1.5" fill={menuOpen ? "#F39208" : "rgba(255,255,255,.8)"}/>
                  <rect x="14" y="14" width="7" height="7" rx="1.5" fill={menuOpen ? "#F39208" : "rgba(255,255,255,.8)"}/>
                </svg>
              </button>

              {/* Dropdown */}
              {menuOpen && (
                <>
                  <div onClick={() => setMenuOpen(false)} style={{ position:"fixed", inset:0, zIndex:9 }}/>
                  <div style={{
                    position:"absolute", right:0, top:"calc(100% + 8px)", zIndex:10,
                    background:"rgba(10,20,46,.97)", border:"1px solid rgba(255,255,255,.15)",
                    borderRadius:12, padding:8, minWidth:160,
                    boxShadow:"0 8px 32px rgba(0,0,0,.55)",
                    backdropFilter:"blur(12px)",
                  }}>
                    <div style={{ fontFamily:"Poppins", fontWeight:600, fontSize:10, color:"rgba(255,255,255,.45)", letterSpacing:".08em", textTransform:"uppercase", padding:"4px 10px 8px" }}>
                      Produtos por tela
                    </div>
                    {SIM_OPTIONS.map(n => (
                      <button
                        key={n}
                        onClick={() => { setSimCount(n); setMenuOpen(false); }}
                        style={{
                          display:"flex", alignItems:"center", justifyContent:"space-between",
                          width:"100%", padding:"9px 12px", borderRadius:8, cursor:"pointer",
                          background: simCount === n ? "rgba(243,146,8,.15)" : "transparent",
                          border:"none",
                          fontFamily:"Poppins", fontWeight: simCount === n ? 700 : 500,
                          fontSize:13, color: simCount === n ? "#F39208" : "rgba(255,255,255,.85)",
                          transition:"background .15s",
                        }}
                        onMouseEnter={e=>{ if(simCount!==n) e.currentTarget.style.background="rgba(255,255,255,.07)"; }}
                        onMouseLeave={e=>{ if(simCount!==n) e.currentTarget.style.background="transparent"; }}
                      >
                        <span>{n} produtos</span>
                        {simCount === n && (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#F39208" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="20 6 9 17 4 12"/>
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── Banner de prêmios redesenhado ──
              [🏆] | Total de Prêmios | R$ VALOR GRANDE
                     a Concorrer
          */}
          <div style={{
            borderRadius: "3.2vw", background: "#F39208",
            display: "flex", alignItems: "center",
            padding: "1.6vh 2.4vw 1.6vh 1.6vw",
            gap: "2.4vw",
            animation: popping ? "prize-pop .56s ease" : "prize-idle 2.4s ease-in-out infinite",
          }}>
            {/* Troféu — colado na borda esquerda */}
            <div style={{
              width: "clamp(36px, 10vw, 72px)",
              height: "clamp(36px, 10vw, 72px)",
              borderRadius: "50%", background: "#F8AF4F",
              display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0,
            }}>
              <img
                src="assets/trofeu.png" alt=""
                style={{ width: "75%", height: "75%", objectFit: "contain" }}
              />
            </div>

            {/* Texto descritivo — quebra linha para caber */}
            <div style={{
              fontFamily: "Nunito", fontWeight: 700,
              fontSize: "clamp(9px, 2.4vw, 18px)",
              color: "#000", lineHeight: 1.35, flexShrink: 0,
            }}>
              Total de<br/>Prêmios<br/>a Concorrer
            </div>

            {/* Valor — grande, ocupa o espaço restante à direita */}
            <div style={{ flex: 1, textAlign: "right", lineHeight: 1, paddingRight: ".8vw" }}>
              <div style={{
                fontFamily: "Nunito", fontWeight: 900,
                fontSize: "clamp(22px, 7.6vw, 64px)",
                color: "#000", lineHeight: 1,
              }}>
                <span style={{
                  fontSize: "clamp(13px, 3.5vw, 28px)",
                  verticalAlign: "top", lineHeight: 1.8,
                }}>R$</span>
                {formatBRL(animPrize)}
              </div>
            </div>
          </div>

          {/* ── Grid de produtos ── 1 col para ≤2, 2 cols para ≥3 ── */}
          <div style={{
            display: "grid",
            gridTemplateColumns: cols === 1 ? "1fr" : "1fr 1fr",
            gap: cols === 1 ? "2.4vh" : "2.4vh 3vw",
          }}>
            {simProducts.map((p, i) => (
              <Card
                key={`${p.id}-${i}`}
                product={p}
                qty={qty[p.id]}
                onInc={() => setQty({ ...qty, [p.id]: qty[p.id] + 1 })}
                onDec={() => setQty({ ...qty, [p.id]: Math.max(0, qty[p.id] - 1) })}
              />
            ))}
          </div>

          {/* ── Toggle de layout — abaixo dos cards ── */}
          <div style={{ display: "flex", justifyContent: "center", paddingTop: ".8vh" }}>
            <div style={{
              display: "flex",
              background: "rgba(0,0,0,.5)",
              border: "1px solid rgba(243,146,8,.4)",
              borderRadius: 99, padding: 4,
              backdropFilter: "blur(10px)",
            }}>
              {["op01", "op02"].map((opt, i) => (
                <button
                  key={opt}
                  onClick={() => setLayout(opt)}
                  style={{
                    fontFamily: "'Space Grotesk',sans-serif", fontWeight: 600,
                    fontSize: "clamp(10px, 1.8vw, 14px)",
                    letterSpacing: ".08em", textTransform: "uppercase",
                    padding: ".7vh 2.4vw", borderRadius: 99,
                    background: layout === opt ? "#F39208" : "transparent",
                    color: layout === opt ? "#000" : "#fff",
                    opacity: layout === opt ? 1 : .55,
                    transition: "background .2s, opacity .2s, color .2s",
                    cursor: "pointer",
                  }}
                >
                  {`Opção 0${i + 1}`}
                </button>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* ── Totalbar fixa no rodapé ── */}
      <div className="totalbar">
        <div className="totalbar-row">
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div className="totalbar-label">Qtd. selecionada</div>
            <div className="totalbar-value">{String(totalQty).padStart(2, "0")}</div>
          </div>
          <div style={{ textAlign: "right", display: "flex", flexDirection: "column" }}>
            <div className="totalbar-label">Total a Pagar</div>
            <div className="totalbar-total">R$ {formatBRL(total)}</div>
          </div>
        </div>
        <div className="btn-row">
          <button
            className="btn btn-primary"
            onClick={() => totalQty > 0 && go("resumo")}
            style={{ opacity: totalQty > 0 ? 1 : .45, pointerEvents: totalQty > 0 ? "auto" : "none" }}
            aria-disabled={totalQty === 0}
          >
            CONTINUAR <ArrowRight/>
          </button>
        </div>
      </div>

    </div>
  );
}
