function Intro({ go }) {
  const videoRef = React.useRef(null);

  React.useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.play().catch(() => {
      v.muted = true;
      v.play();
    });
  }, []);

  return (
    <div
      className="screen fadein"
      data-screen-label="01 Intro"
      style={{ position: "relative", overflow: "hidden", background: "#000" }}
    >
      <video
        ref={videoRef}
        src="assets/intro.mp4"
        loop
        playsInline
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <button
        className="btn btn-primary"
        style={{ position: "absolute", left: "5vw", bottom: "5.6vh", width: "90vw", zIndex: 10 }}
        onClick={() => go("produtos")}
      >
        TOQUE PARA CONTINUAR <ArrowRight/>
      </button>
    </div>
  );
}
