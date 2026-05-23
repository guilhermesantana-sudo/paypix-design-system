const PixGlyph = () => (
  <img src="assets/PIX.png" alt="PIX" style={{ width:"5.7vw", height:"5.7vw", objectFit:"contain" }}/>
);

function PaymentOption({ icon, title, subtitle, onClick, disabled }) {
  return (
    <button onClick={onClick} disabled={disabled} style={{
      display:"flex", alignItems:"center", gap:"3.2vw",
      background:"rgba(255,255,255,.14)", border:"1px solid rgba(255,255,255,.22)",
      borderRadius:"2.3vw", padding:"2vh 4vw",
      textAlign:"left", cursor: disabled ? "not-allowed" : "pointer",
      transition:"background .2s, border-color .2s, opacity .2s",
      width:"100%",
      opacity: disabled ? .45 : 1,
      pointerEvents: disabled ? "none" : "auto",
    }}
      onMouseEnter={e=>{ if(disabled) return; e.currentTarget.style.background="rgba(255,255,255,.22)"; e.currentTarget.style.borderColor="rgba(255,255,255,.45)"; }}
      onMouseLeave={e=>{ if(disabled) return; e.currentTarget.style.background="rgba(255,255,255,.14)"; e.currentTarget.style.borderColor="rgba(255,255,255,.22)"; }}
    >
      <div style={{
        width:"10.4vw", height:"10.4vw", borderRadius:"1.8vw",
        background:"rgba(255,255,255,.1)",
        display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
      }}>
        <PixGlyph/>
      </div>
      <div style={{ flex:1 }}>
        <div style={{ fontFamily:"Montserrat", fontWeight:800, fontSize:"3.9vw", color:"#fff", letterSpacing:".02em" }}>{title}</div>
        <div style={{ fontFamily:"Poppins", fontWeight:600, fontSize:"2.3vw", color:"#fff", opacity:.8, marginTop:"0.4vh" }}>{subtitle}</div>
      </div>
      <ArrowRight color="#fff"/>
    </button>
  );
}

function Resumo({ go, qty, form, setForm }) {
  const items = PRODUCTS.map(p => ({ ...p, qty: qty[p.id], line: p.price * qty[p.id] })).filter(i => i.qty > 0);
  const total = items.reduce((s, i) => s + i.line, 0);

  const celOk = form.cel.replace(/\D/g, "").length === 11;
  const valid = celOk && form.terms;

  return (
    <div className="screen screen-bg-gradient fadein" data-screen-label="03 Resumo">
      <Logo/><Susep/>
      <Progress step={2}/>
      <BackButton onClick={() => go("produtos")}/>

      <div style={{
        position: "absolute",
        left: "5vw", right: "5vw",
        top: "13%", bottom: "3.2vh",
        display: "flex",
        flexDirection: "column",
        gap: "3.6vh",
        overflowY: "auto",
      }}>

        {/* ── Bloco 1: Resumo da compra ── */}
        <div style={{
          background: "rgba(255,255,255,.1)",
          border: "1px solid rgba(255,255,255,.16)",
          borderRadius: "3.2vw",
          padding: "2vh 4vw",
          display: "flex",
          flexDirection: "column",
          gap: ".8vh",
        }}>
          <div style={{
            fontFamily: "Poppins", fontWeight: 700, fontSize: "2.8vw",
            letterSpacing: ".06em", color: "rgba(255,255,255,.65)",
            marginBottom: ".4vh",
          }}>
            RESUMO DA COMPRA
          </div>

          {items.map(i => (
            <div key={i.id} style={{
              display: "flex", justifyContent: "space-between", alignItems: "center",
              fontFamily: "Poppins", fontWeight: 600, fontSize: "3.2vw", color: "#fff",
              padding: ".4vh 0",
            }}>
              <span style={{ display:"flex", alignItems:"center", gap:"2vw" }}>
                <span style={{width:"3.6vw",height:"3.6vw",minWidth:18,minHeight:18,borderRadius:"50%",background:"#A7C945",boxShadow:"0 0 0 3px rgba(167,201,69,.22)",display:"inline-flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                  <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                </span>
                {i.name} <span style={{opacity:.7,fontSize:"2.8vw",marginLeft:".4vw"}}>{i.qty}×</span>
              </span>
              <span style={{ color:"#F39208", fontFamily:"Nunito", fontWeight:800, fontSize:"3.6vw" }}>
                R$ {formatBRL(i.line)}
              </span>
            </div>
          ))}

          <div style={{ height:1, background:"rgba(255,255,255,.18)", margin:".4vh 0" }}/>

          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontFamily:"Poppins", fontWeight:700, fontSize:"3.2vw", letterSpacing:".04em" }}>TOTAL</span>
            <span style={{ fontFamily:"Nunito", fontWeight:900, fontSize:"6.4vw", color:"#F39208" }}>
              R$ {formatBRL(total)}
            </span>
          </div>
        </div>

        {/* ── Bloco 2: Seus dados (título + celular + termos) ── */}
        <div style={{ display:"flex", flexDirection:"column", gap:"2vh" }}>
          <div>
            <div style={{
              fontFamily:"Montserrat", fontWeight:800, fontSize:"4.4vw",
              color:"#F39208", letterSpacing:".02em", lineHeight:1.1,
            }}>
              Seus dados
            </div>
            <div style={{
              fontFamily:"Poppins", fontWeight:500, fontSize:"2.8vw",
              color:"rgba(255,255,255,.7)", marginTop:".6vh",
            }}>
              Informe seu celular e aceite os termos para continuar.
            </div>
          </div>

          <FieldInput
            label="Celular"
            hint=" · para receber os cupons"
            value={form.cel}
            onChange={v => setForm({ ...form, cel: v })}
            placeholder="(00) 00000-0000"
            maskFn={_maskCel}
            type="tel"
            inputMode="tel"
            isValid={celOk}
            icon={
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 11 19.79 19.79 0 0 1 1.63 2.48 2 2 0 0 1 3.6.5h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 8.1a16 16 0 0 0 6 6l.91-.91a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 15.48z"/>
              </svg>
            }
          />

          <label
            onClick={() => setForm({ ...form, terms: !form.terms })}
            style={{
              display:"flex", alignItems:"center", gap:"2.4vw",
              fontFamily:"Poppins", fontWeight:500, fontSize:"3.2vw",
              color:"#fff", cursor:"pointer",
              background: form.terms ? "rgba(167,201,69,.08)" : "rgba(255,255,255,.07)",
              border: `1.5px solid ${form.terms ? "rgba(167,201,69,.4)" : "rgba(255,255,255,.12)"}`,
              borderRadius:12, padding:"14px 16px",
              transition:"background .25s, border-color .25s",
            }}
          >
            <span style={{
              width:"4.8vw", height:"4.8vw", minWidth:22, minHeight:22,
              borderRadius:"50%",
              background: form.terms ? "#A7C945" : "#fff",
              border: form.terms ? "none" : "2.5px solid rgba(0,0,0,.15)",
              display:"flex", alignItems:"center", justifyContent:"center",
              flexShrink:0, transition:"background .2s",
              boxShadow: form.terms ? "0 0 0 3px rgba(167,201,69,.25)" : "none",
            }}>
              {form.terms && (
                <svg width="60%" height="60%" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="20 6 9 17 4 12"/>
                </svg>
              )}
            </span>
            Eu aceito os&nbsp;<strong style={{ color:"#F39208" }}>termos de uso.</strong>
          </label>
        </div>

        {/* ── Bloco 3: Forma de pagamento ── */}
        <div style={{ display:"flex", flexDirection:"column", gap:"1.6vh" }}>
          <div style={{
            fontFamily: "Montserrat", fontWeight: 800, fontSize: "4.4vw",
            color: "#F39208", letterSpacing: ".02em", lineHeight:1.1,
          }}>
            Como você quer pagar?
          </div>

          <PaymentOption
            icon="pix"
            title="PAGAR COM PIX"
            subtitle={valid ? "Rápido, seguro e sem taxas" : "Preencha celular e aceite os termos"}
            onClick={() => go("pix")}
            disabled={!valid}
          />
        </div>

      </div>
    </div>
  );
}
