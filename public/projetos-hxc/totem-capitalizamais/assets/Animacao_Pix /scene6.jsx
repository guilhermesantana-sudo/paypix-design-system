// Cena 6: Terminal de autoatendimento — barra preenche + confetes

function Scene6() {
  const confetti = React.useMemo(() => {
    const items = [];
    const colors = ['#facc15', '#ef4444', '#3b82f6', '#a855f7', '#22d3ee', '#fb923c', '#84cc16'];
    for (let i = 0; i < 36; i++) {
      items.push({
        x: 100 + Math.random() * 460,
        y: -20 - Math.random() * 100,
        rot: Math.random() * 360,
        color: colors[i % colors.length],
        delay: Math.random() * 2,
        dur: 2.2 + Math.random() * 1.4,
        w: 6 + Math.random() * 8,
        h: 3 + Math.random() * 5,
      });
    }
    return items;
  }, []);

  return (
    <>
      <style>{`
        @keyframes s6-bar { 0% { stroke-dashoffset: 1000; } 100% { stroke-dashoffset: 0; } }
        @keyframes s6-current { 0%,100% { opacity: 0.5; } 50% { opacity: 1; } }
        @keyframes s6-circle { 0%,10% { transform: scale(0); } 30%,90% { transform: scale(1); } 100% { transform: scale(0); } }
        @keyframes s6-check { 0%,20% { stroke-dashoffset: 80; } 40%,90% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 80; } }
        @keyframes s6-glow { 0%,30% { opacity: 0; transform: scale(0.95); } 45%,55% { opacity: 1; transform: scale(1.05); } 70%,90% { opacity: 0.85; transform: scale(1); } 100% { opacity: 0; } }
        @keyframes s6-pop { 0%,40% { opacity: 0; transform: translateY(8px); } 60%,90% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; } }
        @keyframes s6-confetti { 0% { transform: translate(0,0) rotate(0); opacity: 0; } 10% { opacity: 1; } 100% { transform: translate(var(--cx), 700px) rotate(720deg); opacity: 0; } }
      `}</style>
      <svg viewBox="0 0 1000 720" style={{ width: '100%', height: '100%', display: 'block' }}>
        <defs>
          <clipPath id="kiosk-screen-clip">
            <rect x="180" y="60" width="500" height="540" rx="12" />
          </clipPath>
          <linearGradient id="kiosk-body" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#4b5563" />
            <stop offset="100%" stopColor="#374151" />
          </linearGradient>
          <radialGradient id="paraGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#facc15" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#facc15" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Carcaça do terminal */}
        <g>
          <path d="M 140 40 L 720 40 L 740 60 L 740 620 L 720 640 L 140 640 L 120 620 L 120 60 Z" fill="url(#kiosk-body)" />
          <rect x="170" y="50" width="520" height="560" rx="14" fill="#1a1a1f" />
          <rect x="180" y="60" width="500" height="540" rx="12" fill="#14532d" />

          <g clipPath="url(#kiosk-screen-clip)">
            <text x="660" y="90" textAnchor="end" fontSize="11" fontWeight="600" fill="#fff" opacity="0.85" fontFamily="Inter, system-ui">Autorizado</text>
            <text x="660" y="104" textAnchor="end" fontSize="11" fontWeight="600" fill="#fff" opacity="0.85" fontFamily="Inter, system-ui">SUSEP</text>

            <g transform="translate(200, 130)">
              {[0, 1, 2, 3, 4, 5].map((i) => {
                const isCurrent = i === 4;
                const isDone = i < 4;
                return (
                  <rect key={i} x={i * 78} y={0} width="64" height="6" rx="3"
                    fill={isCurrent ? '#facc15' : isDone ? PIX_GREEN : '#1f3d27'}
                    style={isCurrent ? { animation: 's6-current 1.4s ease-in-out infinite' } : {}}
                  />
                );
              })}
            </g>

            {/* Confetes */}
            <g>
              {confetti.map((c, i) => (
                <rect key={i}
                  x={c.x} y={c.y} width={c.w} height={c.h} rx="1"
                  fill={c.color}
                  transform={`rotate(${c.rot} ${c.x + c.w / 2} ${c.y + c.h / 2})`}
                  style={{
                    animation: `s6-confetti ${c.dur}s linear ${c.delay}s infinite`,
                    ['--cx']: `${(Math.random() - 0.5) * 200}px`,
                  }}
                />
              ))}
            </g>

            {/* Círculo de check */}
            <g transform="translate(430, 240)">
              <circle r="44" fill="#0f4023" opacity="0.5" />
              <circle r="40" fill={PIX_GREEN} style={{ transformOrigin: 'center', animation: 's6-circle 4s cubic-bezier(.5,1.6,.5,1) infinite' }} />
              <path d="M -16 0 L -4 12 L 18 -12"
                stroke="#fff" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" fill="none"
                strokeDasharray="80"
                style={{ animation: 's6-check 4s ease-out infinite' }}
              />
            </g>

            {/* PARABÉNS! com glow */}
            <g style={{ animation: 's6-glow 4s ease-out infinite', transformOrigin: '430px 360px' }}>
              <ellipse cx="430" cy="365" rx="160" ry="40" fill="url(#paraGlow)" />
              <text x="430" y="378" textAnchor="middle" fontSize="44" fontWeight="900" fill="#facc15"
                fontFamily="Inter, system-ui" letterSpacing="1"
                style={{ filter: 'drop-shadow(0 0 12px rgba(250, 204, 21, 0.6))' }}>PARABÉNS!</text>
            </g>

            <text x="430" y="412" textAnchor="middle" fontSize="14" fontWeight="800" fill="#fff"
              fontFamily="Inter, system-ui" letterSpacing="1"
              style={{ animation: 's6-pop 4s ease-out infinite' }}>SUA COMPRA FOI REALIZADA!</text>

            <g style={{ animation: 's6-pop 4s ease-out infinite', animationDelay: '0.1s' }}>
              <rect x="270" y="438" width="320" height="36" rx="18" fill="none" stroke={PIX_GREEN} strokeWidth="1.5" />
              <circle cx="290" cy="456" r="8" fill={PIX_GREEN} />
              <path d="M 286 456 L 289 459 L 295 453" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              <text x="430" y="461" textAnchor="middle" fontSize="12" fontWeight="800" fill={PIX_GREEN}
                fontFamily="Inter, system-ui" letterSpacing="0.5">VOCÊ JÁ ESTÁ CONCORRENDO!</text>
            </g>

            <g style={{ animation: 's6-pop 4s ease-out infinite', animationDelay: '0.2s' }}>
              <text x="200" y="510" fontSize="16" fontWeight="800" fill="#fff" fontFamily="Inter, system-ui">Seus números da sorte</text>
              <text x="200" y="532" fontSize="12" fill="#fff" opacity="0.7" fontFamily="Inter, system-ui">Data: dd/mm/aa às hh:mm:ss</text>
            </g>
          </g>

          {/* Slot de cupom */}
          <rect x="200" y="660" width="200" height="14" rx="3" fill="#1f2937" />
          {/* Pinpad */}
          <rect x="490" y="640" width="160" height="120" rx="6" fill="#1f2937" />
          <rect x="500" y="650" width="140" height="36" rx="4" fill="#0f172a" />
          {[0, 1, 2, 3].map((row) => (
            <g key={row}>
              {[0, 1, 2].map((col) => {
                const labels = [['1', '2', '3'], ['4', '5', '6'], ['7', '8', '9'], ['*', '0', '#']];
                return (
                  <g key={col}>
                    <rect x={500 + col * 36} y={690 + row * 14} width="32" height="10" rx="2" fill="#374151" />
                    <text x={516 + col * 36} y={698 + row * 14} textAnchor="middle" fontSize="6" fill="#fff" fontFamily="monospace">{labels[row][col]}</text>
                  </g>
                );
              })}
            </g>
          ))}
          <rect x="500" y="746" width="40" height="10" rx="2" fill="#dc2626" />
          <rect x="554" y="746" width="40" height="10" rx="2" fill="#facc15" />
          <rect x="608" y="746" width="40" height="10" rx="2" fill="#16a34a" />

          {/* Base */}
          <path d="M 100 680 L 760 680 L 740 720 L 120 720 Z" fill="#374151" />
        </g>
      </svg>
    </>
  );
}

window.Scene6 = Scene6;
