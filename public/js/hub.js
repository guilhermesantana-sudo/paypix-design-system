/* ============================================================
   hub.js: lógica de hub↔cliente (showHub/showClient)
   ============================================================ */

(function () {
  const hub = document.getElementById('hub');
  const layout = document.getElementById('layout');
  const menuBtn = document.getElementById('menuToggle');
  const backBtn = document.getElementById('backToHub');

  function showHub() {
    if (hub) hub.style.display = 'block';
    if (layout) layout.style.display = 'none';
    if (menuBtn) menuBtn.style.display = 'none';
    document.body.classList.remove('viewing-client');
    document.body.classList.add('viewing-hub');
    document.title = 'PayPix · Design Systems';
    window.scrollTo(0, 0);
  }

  function showClient(slug) {
    if (hub) hub.style.display = 'none';
    if (layout) layout.style.display = 'grid';
    if (menuBtn) menuBtn.style.display = '';
    document.body.classList.add('viewing-client');
    document.body.classList.remove('viewing-hub');
    const titles = { hiperxcap: 'HiperXCAP' };
    document.title = (titles[slug] || 'Cliente') + ' · Design System · PayPix';
    window.scrollTo(0, 0);
  }

  // Estado inicial: começa no hub
  showHub();

  // Clique no card ativo abre o design system
  document.querySelectorAll('.client-card--active').forEach(card => {
    card.addEventListener('click', () => {
      const slug = card.getAttribute('data-client') || 'hiperxcap';
      showClient(slug);
    });
  });

  // Botão "Voltar ao hub" no sidebar
  if (backBtn) backBtn.addEventListener('click', showHub);
})();
