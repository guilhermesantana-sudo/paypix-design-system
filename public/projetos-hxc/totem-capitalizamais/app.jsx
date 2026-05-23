function App() {
  const [screen, setScreen] = useState("intro");
  const [layout, setLayout] = useState("op01");
  const [qty, setQty] = useState({hipercap:2, valecap:2});
  const [form, setForm] = useState({cel:"",terms:false});

  const go = (next, after) => {
    if (next === "loading") window.__nextScreen = after || "sucesso";
    setScreen(next);
  };

  const total = PRODUCTS.reduce((s,p) => s + p.price*qty[p.id], 0);

  let view;
  switch (screen) {
    case "intro":           view = <Intro go={go}/>; break;
    case "produtos":        view = <Produtos go={go} qty={qty} setQty={setQty} layout={layout} setLayout={setLayout}/>; break;
    case "resumo":          view = <Resumo go={go} qty={qty} form={form} setForm={setForm}/>; break;
    case "pix":             view = <Pix go={go} total={total}/>; break;
    case "pix_recusado":    view = <PixRecusado go={go} total={total}/>; break;
    case "cartao":          view = <Cartao go={go} total={total} status="aguarde"/>; break;
    case "cartao_paga":     view = <Cartao go={go} total={total} status="aprovado"/>; break;
    case "cartao_recusado": view = <Cartao go={go} total={total} status="recusado"/>; break;
    case "loading":         view = <Loading go={go} next={window.__nextScreen}/>; break;
    case "sucesso":         view = <Sucesso go={go} qty={qty} form={form}/>; break;
    case "enviando":        view = <Enviando go={go}/>; break;
    case "qrcode":          view = <QrFinalizar go={go} qty={qty}/>; break;
    default:                view = <Intro go={go}/>;
  }

  return (
    <div style={{position:"fixed",inset:0,overflow:"hidden"}}>
      {view}
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App/>);
