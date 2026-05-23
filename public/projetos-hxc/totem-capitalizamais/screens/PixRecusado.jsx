function PixRecusado({ go, total }) {
  return (
    <div className="screen screen-bg-dark fadein" data-screen-label="Pix recusado">
      <Logo/><Susep/>
      {/* step=3 — mostra onde no fluxo a falha ocorreu (etapa de pagamento) */}
      <Progress step={3}/>
      <BackButton onClick={()=>go("resumo")} label="VOLTAR"/>

      {/* Layout flex centralizado */}
      <div style={{
        position: "absolute",
        top: "12.8vh", left: 0, right: 0, bottom: 0,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2.4vh 5vw 3.2vh",
        gap: "2.4vh",
      }}>

        {/* Ícone de erro */}
        <div style={{
          width: "16vw", height: "16vw",
          borderRadius: "50%", background: "#B26F9A",
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 8px 32px rgba(178,111,154,.45)",
          flexShrink: 0,
        }}>
          <svg width="8vw" height="8vw" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </div>

        {/* Mensagem de erro */}
        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "Montserrat", fontWeight: 900, fontSize: "5vw",
            color: "#B26F9A", lineHeight: 1.2,
          }}>
            PAGAMENTO NÃO<br/>IDENTIFICADO
          </div>
          <p style={{
            margin: "1.6vh auto 0", maxWidth: "72vw",
            fontFamily: "Poppins", fontWeight: 500, fontSize: "3vw",
            opacity: .88, lineHeight: 1.5, color: "#fff",
          }}>
            O PIX expirou ou não foi confirmado pelo banco.
          </p>
        </div>

        {/* Botões de ação */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "1.6vh", marginTop: "1.6vh" }}>
          <button className="btn btn-primary" onClick={()=>go("pix")}>
            TENTAR NOVAMENTE COM PIX <ArrowRight/>
          </button>
          <button className="btn btn-secondary" onClick={()=>go("resumo")}>
            TROCAR FORMA DE PAGAMENTO
          </button>
        </div>

      </div>
    </div>
  );
}
