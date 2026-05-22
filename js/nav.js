/* ============================================================
   nav.js: scroll spy da sidebar + toggle menu mobile + copy hex
   ============================================================ */

(function() {
  const links = document.querySelectorAll('.sidebar__link');
  const sections = Array.from(links).map(link => {
    const id = link.getAttribute('href').slice(1);
    return { link, section: document.getElementById(id) };
  }).filter(item => item.section);
  function onScroll() {
    const scrollPos = window.scrollY + 120;
    let active = sections[0];
    for (const item of sections) {
      if (item.section.offsetTop <= scrollPos) active = item;
      else break;
    }
    links.forEach(l => l.classList.remove('is-active'));
    if (active) active.link.classList.add('is-active');
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();

const menuToggle = document.getElementById('menuToggle');
const sidebar = document.getElementById('sidebar');
if (menuToggle && sidebar) {
  const overlay = document.createElement('div');
  overlay.className = 'sidebar-overlay';
  document.body.appendChild(overlay);

  function openSidebar() {
    sidebar.classList.add('is-open');
    overlay.classList.add('is-visible');
  }
  function closeSidebar() {
    sidebar.classList.remove('is-open');
    overlay.classList.remove('is-visible');
  }

  menuToggle.addEventListener('click', () => {
    sidebar.classList.contains('is-open') ? closeSidebar() : openSidebar();
  });
  overlay.addEventListener('click', closeSidebar);
  sidebar.querySelectorAll('.sidebar__link').forEach(link => {
    link.addEventListener('click', () => {
      if (window.innerWidth <= 1024) closeSidebar();
    });
  });
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
