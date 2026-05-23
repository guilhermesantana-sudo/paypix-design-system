// Cena 1: Splash banco — colunas do prédio surgem escalonadas

function Scene1() {
  return (
    <>
      <style>{`
        @keyframes handIn { 0% { transform: translate(40%, 25%) rotate(-8deg); opacity: 0; } 100% { transform: translate(0,0) rotate(0); opacity: 1; } }
        @keyframes s1-roof { 0%,15% { transform: translateY(-60px); opacity: 0; } 30%,90% { transform: translateY(0); opacity: 1; } 100% { transform: translateY(-60px); opacity: 0; } }
        @keyframes s1-col { 0%,30% { transform: scaleY(0); opacity: 0; } 50%,90% { transform: scaleY(1); opacity: 1; } 100% { transform: scaleY(0); opacity: 0; } }
        @keyframes s1-base { 0%,55% { transform: scaleX(0); opacity: 0; } 70%,90% { transform: scaleX(1); opacity: 1; } 100% { transform: scaleX(0); opacity: 0; } }
      `}</style>
      <HandHoldingPhone screenBg={PIX_NAVY}>
        <g transform="translate(510, 340)">
          {/* Telhado */}
          <g style={{ transformOrigin: '0px 0px', animation: 's1-roof 4s ease-in-out infinite' }}>
            <polygon points="-90,-20 0,-70 90,-20" fill="#fff" />
            <rect x="-95" y="-22" width="190" height="14" rx="2" fill="#e2e8f0" />
            <circle cx="0" cy="-38" r="5" fill={PIX_NAVY} />
          </g>
          {/* Colunas */}
          {[-65, -22, 22, 65].map((x, i) => (
            <rect key={i} x={x - 12} y={-8} width="24" height="86"
              fill="#fff"
              style={{
                transformOrigin: `${x}px ${-8}px`,
                animation: `s1-col 4s ease-out infinite`,
                animationDelay: `${0.05 * i}s`,
              }}
            />
          ))}
          {/* Base */}
          <g style={{ transformOrigin: '0px 80px', animation: 's1-base 4s ease-out infinite' }}>
            <rect x="-100" y="78" width="200" height="14" rx="2" fill="#fff" />
            <rect x="-110" y="92" width="220" height="10" rx="2" fill="#cbd5e1" />
          </g>
        </g>
      </HandHoldingPhone>
    </>
  );
}

window.Scene1 = Scene1;
