// Cena 2: PIX logo — losango montando peça por peça

function Scene2() {
  return (
    <>
      <style>{`
        @keyframes s2-petal { 0%,15% { transform: scale(0) rotate(-180deg); opacity: 0; } 35%,90% { transform: scale(1) rotate(0); opacity: 1; } 100% { transform: scale(0) rotate(-180deg); opacity: 0; } }
        @keyframes s2-center { 0%,40% { transform: scale(0); opacity: 0; } 55%,90% { transform: scale(1); opacity: 1; } 100% { transform: scale(0); opacity: 0; } }
        @keyframes s2-text { 0%,55% { opacity: 0; transform: translateY(8px); } 70%,90% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(8px); } }
        @keyframes s2-line { 0%,70% { transform: scaleX(0); opacity: 0; } 80%,90% { transform: scaleX(1); opacity: 0.5; } 100% { transform: scaleX(0); opacity: 0; } }
        @keyframes s2-bracket { 0%,5% { opacity: 0; transform: scale(0.6); } 20%,90% { opacity: 1; transform: scale(1); } 100% { opacity: 0; transform: scale(0.6); } }
      `}</style>
      <HandHoldingPhone screenBg="#ffffff">
        {/* Brackets de scanner */}
        <g stroke={PIX_GREEN} strokeWidth="5" strokeLinecap="round" fill="none" style={{ transformOrigin: '510px 270px', animation: 's2-bracket 4s ease infinite' }}>
          <path d="M 410 230 L 410 200 L 440 200" />
          <path d="M 580 200 L 610 200 L 610 230" />
          <path d="M 410 310 L 410 340 L 440 340" />
          <path d="M 580 340 L 610 340 L 610 310" />
        </g>

        {/* Losango PIX (4 pétalas + centro) */}
        <g transform="translate(510, 270)">
          {[
            { x: 0, y: -38, delay: 0 },
            { x: 38, y: 0, delay: 0.08 },
            { x: 0, y: 38, delay: 0.16 },
            { x: -38, y: 0, delay: 0.24 },
          ].map((p, i) => (
            <rect
              key={i}
              x={p.x - 14}
              y={p.y - 14}
              width="28"
              height="28"
              rx="4"
              fill={PIX_GREEN}
              transform={`rotate(45 ${p.x} ${p.y})`}
              style={{
                transformOrigin: `${p.x}px ${p.y}px`,
                animation: 's2-petal 4s ease-out infinite',
                animationDelay: `${p.delay}s`,
              }}
            />
          ))}
          <circle cx="0" cy="0" r="9" fill={PIX_GREEN} style={{ transformOrigin: 'center', animation: 's2-center 4s ease-out infinite' }} />
          <circle cx="0" cy="0" r="3.5" fill="#fff" style={{ transformOrigin: 'center', animation: 's2-center 4s ease-out infinite' }} />
        </g>

        {/* Texto PIX */}
        <text x="510" y="400" textAnchor="middle" fontSize="44" fontWeight="800" fill={INK}
          fontFamily="Inter, system-ui" letterSpacing="2"
          style={{ animation: 's2-text 4s ease-out infinite' }}>PIX</text>

        {/* Linhas placeholder */}
        <g style={{ transformOrigin: '510px 470px', animation: 's2-line 4s ease infinite' }}>
          <circle cx="420" cy="465" r="6" fill={SOFT} />
          <rect x="435" y="461" width="120" height="8" rx="4" fill={SOFT} />
          <circle cx="420" cy="495" r="6" fill={SOFT} />
          <rect x="435" y="491" width="160" height="8" rx="4" fill={SOFT} />
        </g>
      </HandHoldingPhone>
    </>
  );
}

window.Scene2 = Scene2;
