function Enviando({ go }) {
  const phone   = window.__phone || "o número informado";
  const duration = 3200;
  const [pct, setPct] = useState(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (document.getElementById("enviando-kf")) return;
    const s = document.createElement("style");
    s.id = "enviando-kf";
    s.textContent = `
      @keyframes env-float {
        0%,100% { transform: translateY(0)   scale(1);    }
        50%     { transform: translateY(-10px) scale(1.06); }
      }
      @keyframes wpp-pulse {
        0%,100% { box-shadow: 0 8px 36px rgba(37,211,102,.5); }
        50%     { box-shadow: 0 8px 60px rgba(37,211,102,.85), 0 0 0 14px rgba(37,211,102,.12); }
      }
    `;
    document.head.appendChild(s);
  }, []);

  useEffect(() => {
    const start = performance.now();
    const tick = (now) => {
      const t    = Math.min((now - start) / duration, 1);
      const ease = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setPct(ease);
      if (t < 1) rafRef.current = requestAnimationFrame(tick);
      else setTimeout(() => go("qrcode"), 100);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const pctInt = Math.round(pct * 100);

  return (
    <div className="screen screen-bg-dark fadein" data-screen-label="Enviando">
      <Logo/><Susep/>

      <div style={{
        position: "absolute", inset: 0,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
        gap: "3.2vh", padding: "0 8vw",
      }}>

        {/* ícone WhatsApp flutuando */}
        <div style={{
          width: "20vw", height: "20vw", borderRadius: "50%",
          background: "linear-gradient(135deg,#25d366 0%,#128c7e 100%)",
          display: "flex", alignItems: "center", justifyContent: "center",
          animation: "env-float 2.2s ease-in-out infinite, wpp-pulse 2.2s ease-in-out infinite",
        }}>
          <svg width="11vw" height="11vw" viewBox="0 0 24 24" fill="#fff">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.113.549 4.1 1.508 5.83L0 24l6.335-1.483A11.94 11.94 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.797 9.797 0 0 1-5.031-1.388l-.36-.214-3.762.88.916-3.667-.235-.376A9.786 9.786 0 0 1 2.182 12C2.182 6.57 6.57 2.182 12 2.182S21.818 6.57 21.818 12 17.43 21.818 12 21.818z"/>
          </svg>
        </div>

        <div style={{ textAlign: "center" }}>
          <div style={{
            fontFamily: "Montserrat", fontWeight: 800,
            fontSize: "4.7vw", letterSpacing: ".02em",
          }}>
            Enviando confirmação...
          </div>
          <div style={{
            fontFamily: "Poppins", fontWeight: 500,
            fontSize: "3.1vw", opacity: .75, marginTop: "1.2vh", lineHeight: 1.6,
          }}>
            Sua confirmação de compra está sendo<br/>enviada via <strong style={{ color:"#25d366" }}>WhatsApp</strong> para
          </div>
          <div style={{
            fontFamily: "Nunito", fontWeight: 900,
            fontSize: "4.2vw", color: "#25d366", marginTop: ".6vh",
            letterSpacing: ".04em",
          }}>
            {phone}
          </div>
        </div>

        {/* barra de progresso */}
        <div style={{
          width: "100%", height: "1.3vh",
          background: "rgba(255,255,255,.1)",
          borderRadius: 99, overflow: "hidden", marginTop: "1vh",
        }}>
          <div style={{
            height: "100%",
            width: `${pctInt}%`,
            borderRadius: 99,
            background: "linear-gradient(90deg,#25d366,#00e676)",
            boxShadow: "0 0 14px rgba(37,211,102,.8)",
            transition: "width .04s linear",
          }}/>
        </div>

        <div style={{
          fontFamily: "Nunito", fontWeight: 900,
          fontSize: "4.8vw", color: "#25d366",
          marginTop: "-.4vh",
        }}>
          {pctInt}%
        </div>

      </div>
    </div>
  );
}
