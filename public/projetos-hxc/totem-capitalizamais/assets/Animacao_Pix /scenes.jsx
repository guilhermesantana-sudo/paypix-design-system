// Compartilhados — constantes de cor e componente HandHoldingPhone.
// Carregar ANTES de scene1.jsx..scene6.jsx.
//
// Técnica do mockup (mockupflat_celular.png · 1536×1024 px):
//   O PNG tem fundo e área da tela TRANSPARENTES (alpha=0).
//   Posicionamos a animação exatamente atrás da abertura transparente
//   e sobrepomos o PNG por cima — o bezel, a mão e o notch ficam opacos,
//   a tela revela a animação. Sem filtros CSS necessários.
//
//   Medições exatas da área da tela no PNG:
//     left:   35.872%  (551 / 1536 px)
//     top:    12.598%  (129 / 1024 px)
//     width:  24.870%  (382 px)
//     height: 69.043%  (707 px)
//     aspect: 0.5403   (≈ 9:16.6)

// Constantes no window para ficarem acessíveis nos arquivos scene1–6.jsx
window.PIX_GREEN      = '#16a34a';
window.PIX_GREEN_DARK = '#0f7a37';
window.PIX_NAVY       = '#1e3a5f';
window.PIX_NAVY_DEEP  = '#162a44';
window.INK            = '#1f2937';
window.MUTED          = '#9ca3af';
window.SOFT           = '#e5e7eb';

const PIX_GREEN      = window.PIX_GREEN;
const PIX_GREEN_DARK = window.PIX_GREEN_DARK;
const PIX_NAVY       = window.PIX_NAVY;
const PIX_NAVY_DEEP  = window.PIX_NAVY_DEEP;
const INK            = window.INK;
const MUTED          = window.MUTED;
const SOFT           = window.SOFT;

// ViewBox centrado em x=510 (centro das cenas), aspecto 320/592 ≈ 0.5405 ≈ tela do mockup.
// Cobre: x 350→670, y 44→636.  Todo o conteúdo das cenas 1–5 cabe aqui.
const SCREEN_VIEWBOX = '350 44 320 593';

function HandHoldingPhone({ children, screenBg }) {
  return (
    <>
      <style>{`
        @keyframes mockupIn {
          0%   { transform: translateX(14%) scale(0.97); opacity: 0; }
          55%  { opacity: 1; }
          100% { transform: translateX(0) scale(1); opacity: 1; }
        }
      `}</style>

      {/* Container 3:2 — mesma proporção do PNG completo (1536×1024) */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        animation: 'mockupIn 0.85s cubic-bezier(.2,.8,.2,1) both',
      }}>

        {/* ── Animação posicionada exatamente na abertura transparente do PNG ── */}
        <div style={{
          position: 'absolute',
          left:   '35.872%',
          top:    '12.598%',
          width:  '24.870%',
          height: '69.043%',
          background: screenBg,
          overflow: 'hidden',
          /* sem border-radius — os cantos arredondados vêm do próprio PNG */
        }}>
          <svg
            viewBox={SCREEN_VIEWBOX}
            preserveAspectRatio="xMidYMid meet"
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            {children}
          </svg>
        </div>

        {/* ── Mockup PNG em cima — bezel, notch e mão ficam visíveis ── */}
        <img
          src="assets/mockupflat_celular.png"
          alt=""
          draggable="false"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            display: 'block',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      </div>
    </>
  );
}

window.HandHoldingPhone = HandHoldingPhone;
