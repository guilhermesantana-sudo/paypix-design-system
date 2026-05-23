function Loading({ go, next }) {
  useEffect(() => {
    const t = setTimeout(() => go(next || "sucesso"), 1400);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="screen screen-bg-dark fadein" data-screen-label="07 Loading">
      <Logo/><Susep/>
      <div style={{position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",gap:"2.4vh"}}>
        <div className="spinner"/>
        <div style={{fontFamily:"Poppins",fontWeight:700,fontSize:"3.6vw",letterSpacing:".02em"}}>Processando…</div>
      </div>
    </div>
  );
}
