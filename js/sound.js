/* Real whale sounds on the species cards (NOAA "Sounds in the Ocean" recordings).
   One sound plays at a time. Agents can start one too, through the "playSound" site action. */
(function () {
  const audio = new Audio();
  audio.preload = 'none';
  let currentId = null;

  function buttonsFor(id) { return document.querySelectorAll(`[data-sound="${id}"]`); }
  function setState(id, state) {   // state: '' | 'loading' | 'playing' | 'error'
    buttonsFor(id).forEach((b) => {
      b.dataset.state = state;
      b.setAttribute('aria-pressed', String(state === 'playing' || state === 'loading'));
      const s = window.Page.speciesById[id].sound;
      b.querySelector('.listen-text').textContent =
        state === 'playing' ? 'Playing…' : state === 'loading' ? 'Loading…' : state === 'error' ? 'Could not load the sound' : `Listen: ${s.label.toLowerCase()}`;
    });
  }

  function stop() {
    if (!currentId) return;
    audio.pause();
    setState(currentId, '');
    currentId = null;
  }

  /* Plays the sound of one species. Resolves with what is playing, or rejects if the sound cannot load. */
  function play(id) {
    const s = window.Page.speciesById[id];
    if (!s || !s.sound) return Promise.reject(new Error(`No recording for ${id}`));
    if (currentId === id && !audio.paused) { stop(); return Promise.resolve({ stopped: id }); }
    stop();
    currentId = id;
    audio.src = s.sound.url;
    setState(id, 'loading');
    return audio.play().then(() => {
      setState(id, 'playing');
      return { playing: id, name: s.name, sound: s.sound.label, note: s.sound.note, credit: s.sound.credit };
    }).catch((err) => {
      setState(id, 'error');
      currentId = null;
      setTimeout(() => setState(id, ''), 3000);
      throw err;
    });
  }

  audio.addEventListener('ended', stop);
  audio.addEventListener('error', () => { if (currentId) { const id = currentId; currentId = null; setState(id, 'error'); setTimeout(() => setState(id, ''), 3000); } });

  document.addEventListener('click', (e) => {
    const b = e.target.closest('[data-sound]');
    if (b) { e.stopPropagation(); play(b.dataset.sound).catch(() => {}); }
  });

  window.WhaleSound = { play, stop };
})();
