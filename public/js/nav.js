/* ============================================================
   nav.js: scroll spy da sidebar + toggle menu mobile + copy hex
   ============================================================ */

// Auto-print quando a página é aberta com ?print=1 (botão Baixar PDF do hub)
(function () {
  if (new URLSearchParams(location.search).get('print') !== '1') return;
  window.addEventListener('load', () => {
    setTimeout(() => window.print(), 400);
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
