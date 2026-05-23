// Cena 4: Pagamento PIX (claro) — check desenhado + detalhes

function Scene4() {
  return (
    <>
      <style>{`
        @keyframes s4-title { 0%,5% { opacity: 0; transform: translateY(-12px); } 20%,90% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; } }
        @keyframes s4-circle { 0%,15% { transform: scale(0); } 35%,90% { transform: scale(1); } 100% { transform: scale(0); } }
        @keyframes s4-check { 0%,30% { stroke-dashoffset: 80; } 50%,90% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: 80; } }
        @keyframes s4-msg { 0%,40% { opacity: 0; transform: translateY(8px); } 55%,90% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; } }
        @keyframes s4-row { 0%,55% { opacity: 0; transform: translateX(-10px); } 70%,90% { opacity: 1; transform: translateX(0); } 100% { opacity: 0; } }
        @keyframes s4-btn { 0%,70% { opacity: 0; transform: translateY(20px); } 85%,95% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; } }
      `}</style>
      <HandHoldingPhone screenBg="#ffffff">
        {/* Título */}
        <text x="510" y="120" textAnchor="middle" fontSize="22" fontWeight="700" fill={INK}
          fontFamily="Inter, system-ui"
          style={{ animation: 's4-title 4s ease-out infinite' }}>Pagamento PIX</text>

        {/* Círculo verde com check */}
        <g transform="translate(510, 220)">
          <circle r="46" fill={PIX_GREEN} style={{ transformOrigin: 'center', animation: 's4-circle 4s cubic-bezier(.5,1.6,.5,1) infinite' }} />
          <path d="M -18 0 L -4 14 L 20 -12"
            stroke="#fff" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none"
            strokeDasharray="80"
            style={{ animation: 's4-check 4s ease-out infinite' }}
          />
        </g>

        {/* Mensagem principal */}
        <g style={{ animation: 's4-msg 4s ease-out infinite' }}>
          <text x="510" y="320" textAnchor="middle" fontSize="22" fontWeight="800" fill={PIX_GREEN}
            fontFamily="Inter, system-ui">Pagamento</text>
          <text x="510" y="346" textAnchor="middle" fontSize="22" fontWeight="800" fill={PIX_GREEN}
            fontFamily="Inter, system-ui">realizado!</text>
          <text x="510" y="380" textAnchor="middle" fontSize="13" fill={INK} opacity="0.7"
            fontFamily="Inter, system-ui">O pagamento foi</text>
          <text x="510" y="397" textAnchor="middle" fontSize="13" fill={INK} opacity="0.7"
            fontFamily="Inter, system-ui">realizado com sucesso.</text>
        </g>

        {/* Linhas de detalhes */}
        <g style={{ animation: 's4-row 4s ease-out infinite' }}>
          <line x1="395" y1="430" x2="625" y2="430" stroke={SOFT} strokeWidth="1" />
          <text x="395" y="455" fontSize="12" fill="#6b7280" fontFamily="Inter, system-ui">Valor pago</text>
          <text x="625" y="455" textAnchor="end" fontSize="13" fontWeight="700" fill={PIX_GREEN} fontFamily="Inter, system-ui">R$ 34,00</text>
          <line x1="395" y1="478" x2="625" y2="478" stroke={SOFT} strokeWidth="1" />
          <text x="395" y="503" fontSize="12" fill="#6b7280" fontFamily="Inter, system-ui">Data e hora</text>
          <text x="625" y="503" textAnchor="end" fontSize="12" fill={INK} fontFamily="Inter, system-ui">24/04/2024 - 10:30</text>
          <line x1="395" y1="520" x2="625" y2="520" stroke={SOFT} strokeWidth="1" />
        </g>

        {/* Botão Concluir */}
        <g style={{ animation: 's4-btn 4s ease-out infinite' }}>
          <rect x="385" y="555" width="250" height="48" rx="8" fill={PIX_GREEN} />
          <text x="510" y="585" textAnchor="middle" fontSize="16" fontWeight="700" fill="#fff" fontFamily="Inter, system-ui">Concluir</text>
        </g>
      </HandHoldingPhone>
    </>
  );
}

window.Scene4 = Scene4;
