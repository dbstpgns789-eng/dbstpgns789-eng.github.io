(() => {
  const tabs = Array.from(document.querySelectorAll('[data-scene]'));
  const image = document.querySelector('#scene-image');
  const caption = document.querySelector('#scene-caption');
  const panel = document.querySelector('#product-screen');
  const scenes = {
    preview: ['assets/maldong-preview.png', '말똥 시연 장면. 마시기 전에 반만 마시는 선택과 잔존 카페인을 비교합니다.', '마시기 전 · 기록하기 전에, 그대로 마실 때와 덜 마실 때를 비교합니다.'],
    cafe: ['assets/maldong-cafe.png', '말똥 시연 장면. 카페 앞에서 캐릭터가 음료 선택을 안내합니다.', '카페 앞 · 앱을 연 상태에서 등록된 카페에 가까워지면 선택지를 안내합니다. 대회장 좌표 한 곳에서 시연했습니다.'],
    check: ['assets/maldong-check.png', '말똥 시연 장면. 다음 날 마신 양과 잠을 확인하는 두 가지 질문을 보여 줍니다.', '다음 날 · 두 번의 탭으로 어제 마신 양과 잠을 돌아봅니다.']
  };
  function select(tab, focus = false) {
    const scene = scenes[tab.dataset.scene];
    if (!scene || !image || !caption || !panel) return;
    tabs.forEach(item => { const active = item === tab; item.setAttribute('aria-selected', String(active)); item.tabIndex = active ? 0 : -1; });
    image.src = scene[0]; image.alt = scene[1]; caption.textContent = scene[2];
    panel.setAttribute('aria-labelledby', tab.id);
    if (focus) tab.focus();
  }
  tabs.forEach((tab, index) => {
    tab.addEventListener('click', () => select(tab));
    tab.addEventListener('keydown', event => {
      let next;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== undefined) { event.preventDefault(); select(tabs[next], true); }
    });
  });
})();
