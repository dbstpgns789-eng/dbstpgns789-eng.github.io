(() => {
  document.querySelectorAll('[data-panel]').forEach(button => {
    const panel = document.getElementById(button.dataset.panel);
    if (!panel) return;
    button.addEventListener('click', () => {
      const expanded = button.getAttribute('aria-expanded') === 'true';
      button.setAttribute('aria-expanded', String(!expanded));
      panel.hidden = expanded;
      const label = expanded ? '프로젝트 보기 ' : '프로젝트 접기 ';
      button.firstChild.textContent = label;
    });
  });
  const links = [...document.querySelectorAll('.navigation a[href^="#"]')];
  const about = document.getElementById('about');
  const updateNavigation = () => {
    const current = about.getBoundingClientRect().top < innerHeight * 0.5 ? '#about' : '#work';
    links.forEach(link => {
      const active = link.getAttribute('href') === current;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  let scheduled = false;
  addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(() => { updateNavigation(); scheduled = false; });
  }, { passive: true });
  addEventListener('resize', updateNavigation);
  updateNavigation();
})();
