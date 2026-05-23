/* ── Máscara de celular ── */
const _maskCel = v => {
  const d = v.replace(/\D/g, "").slice(0, 11);
  if (d.length === 0)  return "";
  if (d.length <= 2)   return `(${d}`;
  if (d.length <= 7)   return `(${d.slice(0,2)}) ${d.slice(2)}`;
  return `(${d.slice(0,2)}) ${d.slice(2,7)}-${d.slice(7)}`;
};

/* ── Campo com máscara, ícone e estado de validação ── */
function FieldInput({ label, hint, value, onChange, placeholder, maskFn, inputMode, type, isValid, icon }) {
  const [focused, setFocused] = useState(false);

  const borderColor = focused ? "#F39208" : isValid ? "#A7C945" : "rgba(255,255,255,.0)";
  const shadowColor = focused ? "0 0 0 3px rgba(243,146,8,.18)" : isValid ? "0 0 0 3px rgba(167,201,69,.14)" : "none";

  return (
    <div>
      {/* Label */}
      <div style={{
        display:"flex", alignItems:"center", gap:7, marginBottom:8,
        fontFamily:"Poppins", fontWeight:600,
        fontSize:"clamp(11px,2.6vw,15px)",
        color: isValid ? "#A7C945" : focused ? "#F39208" : "rgba(255,255,255,.88)",
        transition:"color .2s",
      }}>
        <span style={{ color: isValid ? "#A7C945" : focused ? "#F39208" : "rgba(255,255,255,.6)", display:"flex", flexShrink:0 }}>
          {icon}
        </span>
        {label}
        {hint && (
          <span style={{ fontWeight:400, opacity:.6, fontSize:"clamp(9px,2vw,12px)", marginLeft:2 }}>
            {hint}
          </span>
        )}
        {isValid && (
          <span style={{ marginLeft:"auto", display:"flex", alignItems:"center" }}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#A7C945" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </span>
        )}
      </div>

      {/* Input wrapper */}
      <div style={{ position:"relative" }}>
        <input
          value={value}
          onChange={e => onChange(maskFn ? maskFn(e.target.value) : e.target.value)}
          placeholder={placeholder}
          type={type || "text"}
          inputMode={inputMode || "text"}
          pattern={inputMode==="numeric"||inputMode==="tel" ? "[0-9]*" : undefined}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
          spellCheck="false"
          style={{
            width:"100%",
            height:"clamp(44px,6.4vh,58px)",
            borderRadius:12,
            padding:"0 44px 0 16px",
            fontSize:"clamp(14px,3.6vw,20px)",
            fontFamily:"Poppins", fontWeight:500,
            letterSpacing:".06em",
            color:"#111",
            background:"#fff",
            border:`2.5px solid ${borderColor}`,
            outline:"none",
            boxSizing:"border-box",
            transition:"border-color .2s, box-shadow .2s",
            boxShadow: shadowColor,
          }}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        {isValid && !focused && (
          <div style={{
            position:"absolute", right:12, top:"50%", transform:"translateY(-50%)",
            width:24, height:24, borderRadius:"50%", background:"#A7C945",
            display:"flex", alignItems:"center", justifyContent:"center",
            boxShadow:"0 2px 8px rgba(167,201,69,.4)",
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          </div>
        )}
      </div>
    </div>
  );
}
