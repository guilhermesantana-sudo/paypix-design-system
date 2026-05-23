// Cena 3: QR code — linha de scan vertical + módulos pulsando

function Scene3() {
  const seed = (i, j) => ((i * 7 + j * 13 + i * j) % 5 < 2);
  const cells = [];
  for (let i = 0; i < 14; i++) {
    for (let j = 0; j < 14; j++) {
      const inFinder = (
        (i < 3 && j < 3) ||
        (i < 3 && j > 10) ||
        (i > 10 && j < 3)
      );
      if (inFinder) continue;
      if (seed(i, j)) cells.push({ i, j });
    }
  }

  return (
    <>
      <style>{`
        @keyframes s3-scan { 0%,10% { transform: translateY(0); opacity: 0; } 15% { opacity: 1; } 70% { transform: translateY(160px); opacity: 1; } 80%,100% { opacity: 0; transform: translateY(0); } }
        @keyframes s3-cell { 0%,15% { opacity: 0; transform: scale(0.4); } 50%,90% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(0.4); } }
        @keyframes s3-finder { 0%,5% { opacity: 0; transform: scale(0); } 20%,90% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(0); } }
      `}</style>
      <HandHoldingPhone screenBg="#ffffff">
        {/* Brackets verde */}
        <g stroke={PIX_GREEN} strokeWidth="6" strokeLinecap="round" fill="none">
          <path d="M 400 220 L 400 200 L 420 200" />
          <path d="M 600 200 L 620 200 L 620 220" />
          <path d="M 400 380 L 400 400 L 420 400" />
          <path d="M 600 400 L 620 400 L 620 380" />
        </g>

        {/* QR area: x 420..600, y 220..400 → 180x180, 14x14 cells, cell ~12.85px */}
        <g transform="translate(420, 220)">
          {/* Finder patterns */}
          {[[0, 0], [0, 11], [11, 0]].map(([fi, fj], k) => (
            <g key={k} transform={`translate(${fj * 12.85}, ${fi * 12.85})`}
              style={{ transformOrigin: `${fj * 12.85 + 19}px ${fi * 12.85 + 19}px`, animation: 's3-finder 4s ease-out infinite', animationDelay: `${0.1 * k}s` }}>
              <rect width="38.55" height="38.55" rx="3" fill="#000" />
              <rect x="5" y="5" width="28.55" height="28.55" rx="2" fill="#fff" />
              <rect x="11" y="11" width="16.55" height="16.55" rx="1" fill="#000" />
            </g>
          ))}
          {/* Cells */}
          {cells.map(({ i, j }, idx) => (
            <rect key={idx}
              x={j * 12.85} y={i * 12.85} width="11" height="11" rx="1.5"
              fill="#000"
              style={{
                transformOrigin: `${j * 12.85 + 5.5}px ${i * 12.85 + 5.5}px`,
                animation: 's3-cell 4s ease-out infinite',
                animationDelay: `${(idx % 30) * 0.015 + 0.3}s`,
              }}
            />
          ))}
        </g>

        {/* Linha de scan */}
        <g style={{ animation: 's3-scan 4s ease-in-out infinite' }}>
          <line x1="410" y1="220" x2="610" y2="220" stroke={PIX_GREEN} strokeWidth="3" strokeLinecap="round" />
          <line x1="410" y1="220" x2="610" y2="220" stroke={PIX_GREEN} strokeWidth="14" strokeLinecap="round" opacity="0.25" />
        </g>
      </HandHoldingPhone>
    </>
  );
}

window.Scene3 = Scene3;
