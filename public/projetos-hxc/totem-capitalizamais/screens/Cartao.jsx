const CardGlyphLg = () => (
  <svg width="22vw" height="15.6vw" viewBox="0 0 48 36" fill="none">
    <rect x="2" y="2" width="44" height="32" rx="4" fill="#f4c969" stroke="#5a3700" strokeWidth=".8"/>
    <rect x="2" y="8" width="44" height="6" fill="#1a1a1a"/>
    <path d="M6 22c2-1.6 3-1.6 5 0s3 1.6 5 0" stroke="#5a3700" strokeWidth=".8" fill="none"/>
    <rect x="34" y="20" width="8" height="5" rx="1" fill="#5a3700" opacity=".4"/>
  </svg>
);

function Cartao({ go, total, status="aguarde" }) {
  return (
    <div className="screen screen-bg-dark fadein" data-screen-label={`06 Cartão · ${status}`}>
      <Logo/><Susep/>
      <Progress step={status==="recusado" ? 0 : 3}/>
      {/* BackButton disponível em aguarde e recusado */}
      <BackButton onClick={()=>go("resumo")} label="CANCELAR"/>

      {/* Layout flex — robusto para totem e mobile */}
      <div style={{
        position: "absolute",
        top: "12.8vh", left: 0, right: 0, bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "2.4vh 5vw 3.2vh",
        gap: "1.6vh",
      }}>

        {/* Ícone do cartão */}
        <div style={{ flexShrink: 0, marginTop: "2.4vh" }}>
          <CardGlyphLg/>
        </div>

        {/* Título e subtítulo */}
        <div style={{ textAlign: "center", flexShrink: 0 }}>
          <h1 style={{ margin: 0, fontFamily: "Montserrat", fontWeight: 800, fontSize: "4.8vw" }}>
            Insira ou aproxime seu cartão
          </h1>
          <p style={{
            margin: "1.2vh 0 0",
            fontFamily: "Poppins", fontWeight: 500, fontSize: "3vw",
            color: "rgba(255,255,255,.9)", lineHeight: 1.5,
          }}>
            Na maquininha ao lado do totem.<br/>Aguarde a confirmação na tela.
          </p>
        </div>

        {/* Total */}
        <div style={{
          width: "100%",
          background: "rgba(255,255,255,.12)",
          border: "1px solid rgba(255,255,255,.16)",
          borderRadius: "2.4vw",
          padding: "1.6vh 4vw",
          textAlign: "center",
          flexShrink: 0,
        }}>
          <div style={{ fontFamily: "Poppins", fontWeight: 700, fontSize: "2.8vw", letterSpacing: ".05em", opacity: .8 }}>
            TOTAL A PAGAR
          </div>
          <div style={{ marginTop: ".4vh", fontFamily: "Nunito", fontWeight: 900, fontSize: "6.4vw", color: "#F39208" }}>
            R$ {formatBRL(total)}
          </div>
        </div>

        {/* Estado: aguarde / aprovado / recusado */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.6vh", flexShrink: 0 }}>

          {status === "aguarde" && (
            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "2.4vw" }}>
              <div className="spinner" style={{ width: "10vw", height: "10vw", borderWidth: ".8vw" }}/>
              <div style={{ fontFamily: "Poppins", fontWeight: 600, fontSize: "3.2vw" }}>
                Aguardando pagamento...
              </div>
            </div>
          )}

          {status === "aprovado" && (
            <button
              className="btn btn-success"
              style={{ fontSize: "4.4vw" }}
              onClick={()=>go("sucesso")}
            >
              <CheckBox checked={true} bg="#fff" color="#A7C945" size="3.6vw"/>
              PAGAMENTO APROVADO!
            </button>
          )}

          {status === "recusado" && (
            <>
              <div style={{
                borderRadius: "2.4vw", background: "#B26F9A",
                display: "flex", alignItems: "center", justifyContent: "center",
                gap: "1.6vw", height: "6.4vh",
                fontFamily: "Montserrat", fontWeight: 800, fontSize: "4vw",
              }}>
                <CheckBox checked={true} bg="#fff" color="#B26F9A" size="3.6vw"/>
                PAGAMENTO RECUSADO!
              </div>
              <div style={{
                textAlign: "center",
                fontFamily: "Poppins", fontWeight: 500, fontSize: "2.8vw",
                opacity: .8, lineHeight: 1.4,
              }}>
                Por favor, confira sua forma de pagamento
              </div>
              <button className="btn btn-primary" onClick={()=>go("resumo")}>
                TROCAR FORMA DE PAGAMENTO <ArrowRight/>
              </button>
            </>
          )}

        </div>

        {/* Botões de simulação — visíveis apenas em modo de teste */}
        {status === "aguarde" && (
          <div style={{ display: "flex", gap: "1.6vw", flexShrink: 0 }}>
            <button
              onClick={()=>go("cartao_paga")}
              style={{
                padding: ".8vh 2.4vw", borderRadius: 99,
                background: "rgba(167,201,69,.18)", border: "1px solid #A7C945",
                color: "#fff", fontFamily: "Space Grotesk", fontSize: "1.8vw",
                letterSpacing: ".08em", textTransform: "uppercase",
              }}
            >
              Simular aprovação
            </button>
            <button
              onClick={()=>go("cartao_recusado")}
              style={{
                padding: ".8vh 2.4vw", borderRadius: 99,
                background: "rgba(178,111,154,.18)", border: "1px solid #B26F9A",
                color: "#fff", fontFamily: "Space Grotesk", fontSize: "1.8vw",
                letterSpacing: ".08em", textTransform: "uppercase",
              }}
            >
              Simular recusa
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
