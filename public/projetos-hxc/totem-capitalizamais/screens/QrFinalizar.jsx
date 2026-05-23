function QrFinalizar({ go }) {
  const phone = window.__phone || "o número informado";

  useEffect(() => {
    if (document.getElementById("qrfin-kf")) return;
    const s = document.createElement("style");
    s.id = "qrfin-kf";
    s.textContent = `
      @keyframes qrfin-float {
        0%,100% { transform: translateY(0); }
        50%     { transform: translateY(-5px); }
      }
      @keyframes qrfin-glow {
        0%,100% { box-shadow: 0 8px 28px rgba(37,211,102,.45); }
        50%     { box-shadow: 0 8px 44px rgba(37,211,102,.8), 0 0 0 10px rgba(37,211,102,.1); }
      }
      @keyframes qrfin-tick {
        0%   { transform: scale(0) rotate(-90deg); opacity: 0; }
        100% { transform: scale(1) rotate(0);     opacity: 1; }
      }
    `;
    document.head.appendChild(s);
  }, []);

  // Bullets do que vem na mensagem — linguagem concreta para C/D
  const bullets = [
    {
      title: "Seus números da sorte",
      sub: "as mesmas dezenas que você acabou de ver",
      svg: (
        <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="#F39208" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="9"/>
          <path d="M9 9h.01M15 9h.01M8 14s1.5 2 4 2 4-2 4-2"/>
        </svg>
      ),
    },
    {
      title: "A data do próximo sorteio",
      sub: "para você ficar de olho no dia certo",
      svg: (
        <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="#F39208" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="4" width="18" height="18" rx="2"/>
          <line x1="16" y1="2" x2="16" y2="6"/>
          <line x1="8"  y1="2" x2="8"  y2="6"/>
          <line x1="3"  y1="10" x2="21" y2="10"/>
        </svg>
      ),
    },
    {
      title: "Onde ver se você ganhou",
      sub: "é só tocar e abrir no celular, sem app",
      svg: (
        <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="#F39208" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77 5.82 21.02 7 14.14 2 9.27l6.91-1.01L12 2z"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="screen screen-bg-dark fadein" data-screen-label="09 QR Finalizar">
      <Logo/><Susep/>
      <Progress step={6}/>

      <div style={{
        position: "absolute",
        top: "12.8vh", left: 0, right: 0, bottom: 0,
        display: "flex", flexDirection: "column",
        padding: "max(8px,1vh) 5vw max(10px,1.4vh)",
        gap: "max(8px,1vh)",
        overflowY: "hidden",
      }}>

        {/* ── Hero compacto ── */}
        <div style={{ flexShrink: 0, textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: "2vw",
            fontFamily: "Montserrat", fontWeight: 900,
            fontSize: "clamp(20px,4.6vw,30px)",
            color: "#A7C945", letterSpacing: ".04em", lineHeight: 1.1,
          }}>
            DEU CERTO
            <span style={{
              width: "clamp(22px,4.6vw,32px)", height: "clamp(22px,4.6vw,32px)",
              borderRadius: "50%", background: "#A7C945",
              display: "inline-flex", alignItems: "center", justifyContent: "center",
              animation: "qrfin-tick .55s cubic-bezier(.34,1.56,.64,1) both",
            }}>
              <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </span>
          </div>
        </div>

        {/* ── Card WhatsApp — caminho principal ── */}
        <div style={{
          flexShrink: 0,
          background: "linear-gradient(180deg, rgba(37,211,102,.16) 0%, rgba(37,211,102,.06) 100%)",
          border: "2px solid rgba(37,211,102,.55)",
          borderRadius: "3.6vw",
          padding: "max(10px,1.2vh) 4vw max(10px,1.2vh)",
          boxShadow: "0 8px 28px rgba(0,0,0,.35)",
        }}>

          {/* Header do card */}
          <div style={{ display: "flex", alignItems: "center", gap: "3vw" }}>
            <div style={{
              flexShrink: 0,
              width: "clamp(42px,9vw,58px)", height: "clamp(42px,9vw,58px)",
              borderRadius: "50%",
              background: "linear-gradient(135deg,#25d366 0%,#128c7e 100%)",
              display: "flex", alignItems: "center", justifyContent: "center",
              animation: "qrfin-glow 2.4s ease-in-out infinite, qrfin-float 3s ease-in-out infinite",
            }}>
              <svg width="55%" height="55%" viewBox="0 0 24 24" fill="#fff">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                <path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.549 4.1 1.508 5.83L0 24l6.335-1.483A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.797 9.797 0 0 1-5.031-1.388l-.36-.214-3.762.88.916-3.667-.235-.376A9.786 9.786 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
              </svg>
            </div>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{
                fontFamily: "Poppins", fontWeight: 700,
                fontSize: "clamp(10px,1.8vw,12px)",
                color: "#25d366", letterSpacing: ".05em", textTransform: "uppercase",
              }}>
                Em alguns segundos
              </div>
              <div style={{
                fontFamily: "Montserrat", fontWeight: 800,
                fontSize: "clamp(13px,2.6vw,17px)",
                color: "#fff", lineHeight: 1.25, marginTop: 1,
              }}>
                Vai chegar uma mensagem nossa<br/>
                no WhatsApp <strong style={{ color: "#25d366", letterSpacing: ".03em", whiteSpace: "nowrap" }}>{phone}</strong>
              </div>
            </div>
          </div>

          {/* Separador interno */}
          <div style={{
            margin: "max(8px,.9vh) 0 max(8px,.9vh)",
            height: 1, background: "rgba(37,211,102,.25)",
          }}/>

          {/* Subtítulo da lista */}
          <div style={{
            fontFamily: "Poppins", fontWeight: 700,
            fontSize: "clamp(10px,1.9vw,12px)",
            color: "#fff", opacity: .85, letterSpacing: ".02em",
            marginBottom: "max(6px,.6vh)",
          }}>
            Na mensagem você vai encontrar:
          </div>

          {/* Lista de itens — visual concreto */}
          <div style={{ display: "flex", flexDirection: "column", gap: "max(6px,.65vh)" }}>
            {bullets.map((b, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: "2.6vw" }}>
                <div style={{
                  flexShrink: 0,
                  width: "clamp(28px,6vw,36px)", height: "clamp(28px,6vw,36px)",
                  borderRadius: "50%",
                  background: "rgba(243,146,8,.12)",
                  border: "1.5px solid rgba(243,146,8,.45)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  {b.svg}
                </div>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{
                    fontFamily: "Poppins", fontWeight: 700,
                    fontSize: "clamp(11px,2.1vw,13px)",
                    color: "#fff", lineHeight: 1.2,
                  }}>
                    {b.title}
                  </div>
                  <div style={{
                    fontFamily: "Poppins", fontWeight: 500,
                    fontSize: "clamp(9px,1.7vw,11px)",
                    color: "rgba(255,255,255,.65)", lineHeight: 1.35, marginTop: 1,
                  }}>
                    {b.sub}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Microcopy tranquilizador */}
          <div style={{
            marginTop: "max(8px,.9vh)",
            background: "rgba(243,146,8,.1)",
            border: "1px solid rgba(243,146,8,.3)",
            borderRadius: 10,
            padding: "max(5px,.55vh) 2.4vw",
            fontFamily: "Poppins", fontWeight: 600,
            fontSize: "clamp(9px,1.7vw,11px)",
            color: "#F39208", lineHeight: 1.35,
            display: "flex", alignItems: "center", gap: "2vw",
          }}>
            <svg width="clamp(14px,3vw,18px)" height="clamp(14px,3vw,18px)" viewBox="0 0 24 24" fill="none" stroke="#F39208" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span>Guarde essa mensagem. Ela é o seu comprovante e você pode abrir quando quiser.</span>
          </div>
        </div>

        {/* ── Divisor "ou abra agora" ── */}
        <div style={{
          flexShrink: 0,
          display: "flex", alignItems: "center", gap: "2.6vw",
          color: "rgba(255,255,255,.5)",
        }}>
          <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,.18)" }}/>
          <span style={{
            fontFamily: "Poppins", fontWeight: 700,
            fontSize: "clamp(10px,1.7vw,12px)",
            letterSpacing: ".12em",
          }}>se quiser, abra agora pelo seu celular</span>
          <span style={{ flex: 1, height: 1, background: "rgba(255,255,255,.18)" }}/>
        </div>

        {/* ── QR + instrução concreta ── */}
        <div style={{
          flex: 1, minHeight: 0,
          display: "flex", alignItems: "center", justifyContent: "center",
          gap: "4vw",
        }}>
          <div style={{
            transform: "scale(.72)", transformOrigin: "center",
            margin: "-6vw",
            padding: "max(6px,.8vh)",
            background: "linear-gradient(135deg, rgba(243,146,8,.18) 0%, rgba(243,146,8,.04) 100%)",
            border: "1.5px solid rgba(243,146,8,.45)",
            borderRadius: "3.6vw",
            boxShadow: "0 10px 28px rgba(0,0,0,.4)",
            flexShrink: 0,
          }}>
            <FakeQR/>
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{
              fontFamily: "Montserrat", fontWeight: 800,
              fontSize: "clamp(12px,2.3vw,14px)",
              color: "#F39208", letterSpacing: ".02em", lineHeight: 1.2,
            }}>
              Aponte a câmera do seu celular aqui
            </div>
            <div style={{
              fontFamily: "Poppins", fontWeight: 500,
              fontSize: "clamp(10px,1.8vw,12px)",
              color: "rgba(255,255,255,.7)", lineHeight: 1.4,
              marginTop: "max(3px,.3vh)",
            }}>
              Abre direto no seu celular sem precisar baixar nada
            </div>
          </div>
        </div>

        {/* ── Botão + selos ── */}
        <div style={{ flexShrink: 0, display: "flex", flexDirection: "column", gap: "max(8px,.9vh)" }}>
          <button className="btn btn-success" onClick={() => go("intro")}>
            NOVA COMPRA
          </button>
          <div style={{
            display: "flex", justifyContent: "center", alignItems: "center", gap: "3vw",
          }}>
            <img src="assets/selo_l4web.png" alt="L4 Tech"
              style={{ height: "clamp(20px,3.6vh,36px)", objectFit: "contain" }}/>
            <img src="assets/seloideamaker.png" alt="Idea Maker"
              style={{ height: "clamp(20px,3.6vh,36px)", objectFit: "contain" }}/>
          </div>
        </div>

      </div>
    </div>
  );
}
