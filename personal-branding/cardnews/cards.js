(() => {
  const exportMode = new URLSearchParams(location.search).has('export');
  if (exportMode) document.body.classList.add('export-mode');
  const rail = document.querySelector('.rail');
  const frames = [...document.querySelectorAll('.frame')];
  const previous = document.querySelector('#previous');
  const next = document.querySelector('#next');
  const position = document.querySelector('#position');
  let current = 0;
  function resize() { frames.forEach(frame => { frame.firstElementChild.style.transform = exportMode ? 'none' : `scale(${frame.clientWidth / 1080})`; }); }
  function update() {
    const center = rail.scrollLeft + rail.clientWidth / 2;
    current = frames.reduce((best, frame, i) => Math.abs(frame.offsetLeft + frame.clientWidth / 2 - center) < Math.abs(frames[best].offsetLeft + frames[best].clientWidth / 2 - center) ? i : best, 0);
    position.textContent = `${String(current + 1).padStart(2, '0')} / 05`;
    previous.disabled = current === 0; next.disabled = current === frames.length - 1;
  }
  function go(delta) { const target = Math.max(0, Math.min(frames.length - 1, current + delta)); frames[target].scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth', block: 'nearest', inline: 'center' }); }
  previous.addEventListener('click', () => go(-1)); next.addEventListener('click', () => go(1));
  rail.addEventListener('scroll', update, { passive: true });
  new ResizeObserver(() => { resize(); update(); }).observe(rail);
  resize(); update();
})();
