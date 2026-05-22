/* ============================================================
   nav.js: scroll spy da sidebar + toggle menu mobile + copy hex
   ============================================================ */

// Download direto de PDF quando a página é aberta com ?download=1
// (botão Baixar PDF do hub). Carrega html2pdf.js sob demanda.
(function () {
  const params = new URLSearchParams(location.search);
  const wantsDownload = params.get('download') === '1';
  const wantsPrint    = params.get('print')    === '1';
  if (!wantsDownload && !wantsPrint) return;

  document.body.classList.add('is-pdf-mode');

  const overlay = document.createElement('div');
  overlay.id = 'pdf-overlay';
  overlay.innerHTML =
    '<div class="pdf-loading">' +
      '<div class="pdf-loading-spinner"></div>' +
      '<div class="pdf-loading-title">Gerando PDF do Design System…</div>' +
      '<div class="pdf-loading-hint">Pode levar alguns segundos. Não feche esta aba.</div>' +
    '</div>';
  document.body.appendChild(overlay);

  function runPrint() {
    window.addEventListener('afterprint', () => window.close());
    setTimeout(() => window.print(), 400);
  }

  function generatePdf() {
    const element = document.querySelector('.main') || document.body;
    const opts = {
      margin: [10, 8, 10, 8],
      filename: 'hiperxcap-design-system.pdf',
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: {
        scale: 2,
        backgroundColor: '#1A2F51',
        useCORS: true,
        windowWidth: 1180,
        logging: false,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
      pagebreak: { mode: ['css', 'legacy'] },
    };
    html2pdf().set(opts).from(element).save()
      .then(() => {
        overlay.querySelector('.pdf-loading-title').textContent = 'PDF gerado! Você pode fechar esta aba.';
        overlay.querySelector('.pdf-loading-spinner').style.display = 'none';
        overlay.querySelector('.pdf-loading-hint').textContent = 'O arquivo foi salvo na sua pasta de Downloads.';
      })
      .catch(err => {
        console.error(err);
        overlay.querySelector('.pdf-loading-title').textContent = 'Algo deu errado — abrindo diálogo de impressão.';
        setTimeout(runPrint, 1200);
      });
  }

  Promise.all([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    new Promise(r => (document.readyState === 'complete') ? r() : window.addEventListener('load', r)),
    new Promise(r => setTimeout(r, 800)),
  ]).then(() => {
    if (wantsPrint) { runPrint(); return; }
    const s = document.createElement('script');
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    s.onload = generatePdf;
    s.onerror = () => {
      overlay.querySelector('.pdf-loading-title').textContent = 'Não consegui carregar o gerador — abrindo impressão.';
      setTimeout(runPrint, 1200);
    };
    document.head.appendChild(s);
  });
})();

(function() {
  const links = document.querySelectorAll('.sidebar__link');
  const sidebarNav = document.querySelector('.sidebar__nav');
  const sections = Array.from(links).map(link => {
    const id = link.getAttribute('href').slice(1);
    return { link, section: document.getElementById(id) };
  }).filter(item => item.section);
  let lastActive = null;
  function onScroll() {
    const scrollPos = window.scrollY + 120;
    let active = sections[0];
    for (const item of sections) {
      if (item.section.offsetTop <= scrollPos) active = item;
      else break;
    }
    links.forEach(l => l.classList.remove('is-active'));
    if (!active) return;
    active.link.classList.add('is-active');

    // Auto-scroll da sidebar pra acompanhar a seção atual (desktop apenas)
    if (active.link !== lastActive && window.innerWidth > 1024 && sidebarNav) {
      const nv = sidebarNav.getBoundingClientRect();
      const lk = active.link.getBoundingClientRect();
      const margin = 60;
      const outOfView = lk.top < nv.top + margin || lk.bottom > nv.bottom - margin;
      if (outOfView) {
        const linkTopInNav = lk.top - nv.top + sidebarNav.scrollTop;
        const target = linkTopInNav - sidebarNav.clientHeight / 2 + active.link.offsetHeight / 2;
        sidebarNav.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
      }
      lastActive = active.link;
    }
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
function closeSidebar() {
  sidebar?.classList.remove('is-open');
  sidebarOverlay?.classList.remove('is-visible');
}
function toggleSidebar() {
  sidebar?.classList.toggle('is-open');
  sidebarOverlay?.classList.toggle('is-visible');
}
if (menuToggle && sidebar) {
  menuToggle.addEventListener('click', toggleSidebar);
  sidebarOverlay?.addEventListener('click', closeSidebar);
  sidebar.querySelectorAll('.sidebar__link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) closeSidebar();
    });
  });
}

// Botão "Voltar ao topo"
const backToTop = document.getElementById('backToTop');
if (backToTop) {
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
}

document.querySelectorAll('.swatch[data-hex]').forEach(swatch => {
  swatch.addEventListener('click', () => {
    const hex = swatch.getAttribute('data-hex');
    const colorEl = swatch.querySelector('.swatch__color');
    const ok = () => {
      colorEl.classList.add('is-copied');
      setTimeout(() => colorEl.classList.remove('is-copied'), 1500);
    };
    if (navigator.clipboard) {
      navigator.clipboard.writeText(hex).then(ok).catch(() => {
        const ta = document.createElement('textarea');
        ta.value = hex; document.body.appendChild(ta); ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta); ok();
      });
    } else {
      const ta = document.createElement('textarea');
      ta.value = hex; document.body.appendChild(ta); ta.select();
      try { document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta); ok();
    }
  });
});
