/* ============================================================
   nav.js: shared docs shell behavior
   - PDF/print download mode
   - sidebar mobile toggle
   - scroll spy with sidebar auto-scroll
   - back-to-top
   - copy color tokens
   ============================================================ */

(function () {
  const params = new URLSearchParams(location.search);
  const wantsDownload = params.get('download') === '1';
  const wantsPrint = params.get('print') === '1';
  if (!wantsDownload && !wantsPrint) return;

  const body = document.body;
  const pdfTarget = body.dataset.pdfTarget || '.main, .doc-main, body';
  const pdfFilename = body.dataset.pdfFilename || `${location.pathname.split('/').filter(Boolean).pop() || 'design-system'}.pdf`;
  const pdfBackground = body.dataset.pdfBackground || '#1A2F51';
  const pdfWidth = Number(body.dataset.pdfWidth || 1180);

  body.classList.add('is-pdf-mode');

  const overlay = document.createElement('div');
  overlay.id = 'pdf-overlay';
  overlay.innerHTML =
    '<div class="pdf-loading">' +
      '<div class="pdf-loading-spinner"></div>' +
      '<div class="pdf-loading-title">Gerando PDF do Design System...</div>' +
      '<div class="pdf-loading-hint">Pode levar alguns segundos. Nao feche esta aba.</div>' +
    '</div>';
  document.body.appendChild(overlay);

  function setOverlay(title, hint) {
    const titleEl = overlay.querySelector('.pdf-loading-title');
    const hintEl = overlay.querySelector('.pdf-loading-hint');
    if (titleEl) titleEl.textContent = title;
    if (hintEl) hintEl.textContent = hint;
  }

  function runPrint() {
    window.addEventListener('afterprint', () => window.close());
    setTimeout(() => window.print(), 400);
  }

  function generatePdf() {
    const element = document.querySelector(pdfTarget) || document.body;
    const opts = {
      margin: [10, 8, 10, 8],
      filename: pdfFilename,
      image: { type: 'jpeg', quality: 0.95 },
      html2canvas: {
        scale: 2,
        backgroundColor: pdfBackground,
        useCORS: true,
        windowWidth: pdfWidth,
        logging: false,
      },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait', compress: true },
      pagebreak: { mode: ['css', 'legacy'] },
    };

    html2pdf().set(opts).from(element).save()
      .then(() => {
        setOverlay('PDF gerado! Voce pode fechar esta aba.', 'O arquivo foi salvo na sua pasta de Downloads.');
        const spinner = overlay.querySelector('.pdf-loading-spinner');
        if (spinner) spinner.style.display = 'none';
      })
      .catch((err) => {
        console.error(err);
        setOverlay('Algo deu errado - abrindo dialogo de impressao.', 'Use Salvar como PDF na janela do navegador.');
        setTimeout(runPrint, 1200);
      });
  }

  Promise.all([
    document.fonts ? document.fonts.ready : Promise.resolve(),
    new Promise((resolve) => (document.readyState === 'complete') ? resolve() : window.addEventListener('load', resolve, { once: true })),
    new Promise((resolve) => setTimeout(resolve, 800)),
  ]).then(() => {
    if (wantsPrint) {
      runPrint();
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = generatePdf;
    script.onerror = () => {
      setOverlay('Nao consegui carregar o gerador - abrindo impressao.', 'Use Salvar como PDF na janela do navegador.');
      setTimeout(runPrint, 1200);
    };
    document.head.appendChild(script);
  });
})();

(function () {
  const shells = [
    {
      sidebar: document.getElementById('sidebar'),
      nav: document.querySelector('.sidebar__nav'),
      toggle: document.getElementById('menuToggle'),
      overlay: document.getElementById('sidebarOverlay'),
      links: Array.from(document.querySelectorAll('.sidebar__link')),
      mobileMax: 1024,
    },
    {
      sidebar: document.getElementById('docSidebar'),
      nav: document.querySelector('.doc-sidebar__nav'),
      toggle: document.getElementById('docMenuToggle'),
      overlay: document.getElementById('docSidebarOverlay'),
      links: Array.from(document.querySelectorAll('.doc-sidebar__link')),
      mobileMax: 900,
    },
  ];

  const shell = shells.find((item) => item.sidebar && item.links.length);
  if (!shell) return;
  const configuredMobileMax = Number(document.body.dataset.navMobileMax);
  if (Number.isFinite(configuredMobileMax) && configuredMobileMax > 0) {
    shell.mobileMax = configuredMobileMax;
  }

  const sections = shell.links
    .map((link) => {
      const href = link.getAttribute('href') || '';
      if (!href.startsWith('#') || href.length < 2) return null;
      return { link, section: document.getElementById(href.slice(1)) };
    })
    .filter((item) => item && item.section);

  let lastActive = null;
  let ticking = false;

  function setOverlay(open) {
    if (!shell.overlay) return;
    shell.overlay.classList.toggle('is-visible', open);
    shell.overlay.classList.toggle('is-open', open);
    shell.overlay.setAttribute('aria-hidden', open ? 'false' : 'true');
  }

  function closeSidebar() {
    shell.sidebar.classList.remove('is-open');
    setOverlay(false);
    if (shell.toggle) shell.toggle.setAttribute('aria-expanded', 'false');
  }

  function toggleSidebar() {
    const open = !shell.sidebar.classList.contains('is-open');
    shell.sidebar.classList.toggle('is-open', open);
    setOverlay(open);
    if (shell.toggle) shell.toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  }

  function updateActiveLink() {
    ticking = false;
    if (!sections.length) return;

    const scrollPos = window.scrollY + 120;
    let active = sections[0];
    for (const item of sections) {
      if (item.section.offsetTop <= scrollPos) active = item;
      else break;
    }

    shell.links.forEach((link) => link.classList.remove('is-active'));
    if (!active) return;
    active.link.classList.add('is-active');

    if (active.link !== lastActive && window.innerWidth > shell.mobileMax && shell.nav) {
      const navRect = shell.nav.getBoundingClientRect();
      const linkRect = active.link.getBoundingClientRect();
      const margin = 60;
      const outOfView = linkRect.top < navRect.top + margin || linkRect.bottom > navRect.bottom - margin;
      if (outOfView) {
        const linkTopInNav = linkRect.top - navRect.top + shell.nav.scrollTop;
        const target = linkTopInNav - shell.nav.clientHeight / 2 + active.link.offsetHeight / 2;
        shell.nav.scrollTo({ top: Math.max(0, target), behavior: 'smooth' });
      }
      lastActive = active.link;
    }
  }

  function requestActiveUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateActiveLink);
  }

  shell.toggle?.setAttribute('aria-expanded', 'false');
  shell.toggle?.addEventListener('click', toggleSidebar);
  shell.overlay?.addEventListener('click', closeSidebar);
  shell.links.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= shell.mobileMax) closeSidebar();
    });
  });

  window.addEventListener('scroll', requestActiveUpdate, { passive: true });
  updateActiveLink();
})();

(function () {
  const backToTop = document.getElementById('backToTop');
  if (!backToTop) return;

  function update() {
    backToTop.classList.toggle('is-visible', window.scrollY > 600);
  }

  window.addEventListener('scroll', update, { passive: true });
  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  update();
})();

(function () {
  function fallbackCopy(text, done) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.setAttribute('readonly', '');
    textarea.style.position = 'fixed';
    textarea.style.top = '-1000px';
    document.body.appendChild(textarea);
    textarea.select();
    try { document.execCommand('copy'); } catch (err) {}
    document.body.removeChild(textarea);
    done();
  }

  document.querySelectorAll('.swatch').forEach((swatch) => {
    const hex = swatch.getAttribute('data-hex') || swatch.querySelector('.swatch__hex')?.textContent?.trim();
    if (!hex) return;

    swatch.addEventListener('click', () => {
      const colorEl = swatch.querySelector('.swatch__color');
      const ok = () => {
        swatch.classList.add('is-copied');
        colorEl?.classList.add('is-copied');
        setTimeout(() => {
          swatch.classList.remove('is-copied');
          colorEl?.classList.remove('is-copied');
        }, 1500);
      };

      if (navigator.clipboard) {
        navigator.clipboard.writeText(hex).then(ok).catch(() => fallbackCopy(hex, ok));
      } else {
        fallbackCopy(hex, ok);
      }
    });
  });
})();
