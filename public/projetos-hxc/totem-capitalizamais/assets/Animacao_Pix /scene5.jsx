// Cena 5: Pagamento realizado (escuro) — check com pulse

function Scene5() {
  return (
    <>
      <style>{`
        @keyframes s5-pulse { 0% { transform: scale(1); opacity: 0.5; } 70%,100% { transform: scale(2.4); opacity: 0; } }
        @keyframes s5-circle { 0%,10% { transform: scale(0) rotate(-90deg); } 35%,85% { transform: scale(1) rotate(0); } 100% { transform: scale(0) rotate(-90deg); } }
        @keyframes s5-check { 0%,25% { stroke-dashoffset: 80; } 45%,85% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 80; } }
        @keyframes s5-text { 0%,40% { opacity: 0; transform: translateY(10px); letter-spacing: 4px; } 55%,85% { opacity: 1; transform: translateY(0); letter-spacing: 0; } 100% { opacity: 0; } }
      `}</style>
      <HandHoldingPhone screenBg={PIX_NAVY_DEEP}>
        <g transform="translate(510, 280)">
          {/* Pulse rings */}
          <circle r="50" fill={PIX_GREEN} opacity="0" style={{ transformOrigin: 'center', animation: 's5-pulse 2s ease-out infinite', animationDelay: '0.4s' }} />
          <circle r="50" fill={PIX_GREEN} opacity="0" style={{ transformOrigin: 'center', animation: 's5-pulse 2s ease-out infinite', animationDelay: '1.2s' }} />
          {/* Círculo */}
          <circle r="50" fill={PIX_GREEN} style={{ transformOrigin: 'center', animation: 's5-circle 4s cubic-bezier(.5,1.6,.5,1) infinite' }} />
          {/* Check */}
          <path d="M -20 0 L -4 16 L 22 -14"
            stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" fill="none"
            strokeDasharray="80"
            style={{ animation: 's5-check 4s ease-out infinite' }}
          />
        </g>

        {/* Texto */}
        <g style={{ animation: 's5-text 4s ease-out infinite' }}>
          <text x="510" y="400" textAnchor="middle" fontSize="26" fontWeight="700" fill="#fff" fontFamily="Inter, system-ui">Pagamento</text>
          <text x="510" y="432" textAnchor="middle" fontSize="26" fontWeight="700" fill="#fff" fontFamily="Inter, system-ui">realizado!</text>
        </g>
      </HandHoldingPhone>
    </>
  );
}

window.Scene5 = Scene5;
