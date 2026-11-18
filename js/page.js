/* Builds the page from the data: depth zones, species cards, filters, status bars, depth gauge.
   Agents never touch the page directly. They go through the site actions in js/actions.js. */
(function () {
  const D = window.WHALES;
  const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const LARGEST = 33; // scale: blue whale, in metres
  const regionById = Object.fromEntries(D.regions.map((r) => [r.id, r]));
  const speciesById = Object.fromEntries(D.species.map((s) => [s.id, s]));
  const num = (n) => n.toLocaleString('en-US');

  function speciesMonths(s) {
    const set = new Set();
    s.sightings.forEach((g) => g.months.forEach((m) => set.add(m)));
    return set;
  }

  function cardHTML(s) {
    const months = speciesMonths(s);
    const ratio = (s.length.max / LARGEST) * 100;
    const places = s.sightings.slice(0, 2).map((g) => regionById[g.region].country.split(' (')[0]).join(', ');
    return `
      <article class="card" id="species-${s.id}" data-species="${s.id}" tabindex="-1" aria-labelledby="name-${s.id}">
        <div class="card-top">
          <div>
            <h3 id="name-${s.id}">${s.name}</h3>
            <p class="latin">${s.scientificName}</p>
          </div>
          <span class="iucn" data-code="${s.status}" title="IUCN: ${D.conservationCodes[s.status]}"><b>${s.status}</b>${D.conservationCodes[s.status]}</span>
        </div>
        <figure class="card-image">
          <img src="${s.image}" alt="${s.name}" loading="lazy" onerror="this.classList.add('img-missing')">
          ${s.sound ? `<button type="button" class="listen" data-sound="${s.id}" aria-pressed="false" title="${s.sound.note}">
            <span class="listen-icon" aria-hidden="true"><i></i><i></i><i></i><i></i></span><span class="listen-text">Listen: ${s.sound.label.toLowerCase()}</span>
          </button>` : ''}
        </figure>
        <div class="size-bar" role="img" aria-label="Up to ${num(s.length.max)} metres long, compared with a 1.8 metre person">
          <div class="sb-track">
            <span class="sb-whale" style="width:${ratio.toFixed(1)}%"></span>
            <span class="sb-human" style="width:${Math.max(1.2, (1.8 / LARGEST) * 100).toFixed(1)}%"></span>
          </div>
          <div class="sb-legend"><span><i class="sb-dot-human"></i>Person 1.8 m</span><span><i class="sb-dot-whale"></i>Up to ${num(s.length.max)} m</span></div>
        </div>
        <p class="card-summary">${s.summary}</p>
        <dl class="facts">
          <div><dt>Length</dt><dd>${num(s.length.min)}–${num(s.length.max)} m</dd></div>
          <div><dt>Weight</dt><dd>${num(s.weight.min)}–${num(s.weight.max)} t</dd></div>
          <div><dt>Max dive</dt><dd>${num(s.dive.recordMeters)} m</dd></div>
        </dl>
        <div>
          <p class="months-label">Best months</p>
          <div class="months">${MONTHS.map((m, i) => `<span class="${months.has(i + 1) ? 'good' : ''}" data-month="${i + 1}" title="${m}">${m[0]}</span>`).join('')}</div>
        </div>
        <p class="card-sources">Sources: ${(s.sources || []).map((x) => `<a href="${x.url}" target="_blank" rel="noopener">${x.name.split(',')[0].replace(' species page', '')}</a>`).join(', ')}${s.sound ? `. Sound: <a href="${s.sound.source}" target="_blank" rel="noopener">${s.sound.credit}</a>` : ''}</p>
        <div class="card-foot">
          <span class="places">${places}${s.sightings.length > 2 ? ` and ${s.sightings.length - 2} more` : ''}</span>
          <button type="button" class="link-btn" data-map="${s.id}">Show on map</button>
        </div>
      </article>`;
  }

  function buildZones() {
    document.getElementById('zones').innerHTML = D.depthZones.map((z) => {
      const list = D.species.filter((s) => s.depthZone === z.id).sort((a, b) => b.length.max - a.length.max);
      const [first, ...rest] = z.name.split(' ');
      return `
        <section class="zone" id="zone-${z.id}" data-zone="${z.id}" data-top="${z.top}" data-bottom="${z.bottom}" aria-labelledby="zh-${z.id}">
          <div class="inner">
            <header class="zone-head">
              <div class="zone-depth">${num(z.top)}–${num(z.bottom)}<small> m</small></div>
              <div>
                <h2 class="zone-name" id="zh-${z.id}">${first} <em>${rest.join(' ')}</em></h2>
                <p class="zone-text">${z.description}</p>
              </div>
            </header>
            <div class="cards">${list.map(cardHTML).join('')}</div>
          </div>
        </section>`;
    }).join('');
  }

  /* ---------- Size line-up: every species, a bus and a person at one scale ---------- */
  function buildLineup() {
    const track = document.getElementById('lineup-track');
    if (!track) return;
    const sorted = [...D.species].sort((a, b) => b.length.max - a.length.max);
    const person = `<figure class="lu-item lu-ref" style="--m:1.8">
        <svg class="lu-person" viewBox="0 0 10 36" aria-hidden="true"><circle cx="5" cy="3.2" r="3.2"/><path d="M1.6 8h6.8l1.2 12H7.4l-.6 16H3.2l-.6-16H.4z"/></svg>
        <figcaption><b>You</b>1.8 m</figcaption></figure>`;
    const bus = `<figure class="lu-item lu-ref" style="--m:12">
        <svg class="lu-bus" viewBox="0 0 120 32" aria-hidden="true"><rect x="0" y="0" width="120" height="27" rx="4"/><g class="win">${Array.from({ length: 8 }, (_, i) => `<rect x="${8 + i * 13.5}" y="5" width="10" height="9" rx="1.5"/>`).join('')}</g><circle cx="22" cy="27" r="5"/><circle cx="98" cy="27" r="5"/></svg>
        <figcaption><b>City bus</b>12 m</figcaption></figure>`;
    track.innerHTML = person + bus + sorted.map((s) => `
      <figure class="lu-item" style="--m:${s.length.max}">
        <button type="button" class="lu-go" data-go="${s.id}" aria-label="${s.name}, up to ${num(s.length.max)} metres. Go to card">
          <img src="${s.image}" alt="" loading="lazy" onerror="this.classList.add('img-missing')">
        </button>
        <figcaption><b>${s.name}</b>${num(s.length.max)} m</figcaption>
      </figure>`).join('');
    track.addEventListener('click', (e) => {
      const b = e.target.closest('[data-go]');
      if (!b) return;
      const card = document.getElementById('species-' + b.dataset.go);
      if (card) { card.scrollIntoView({ behavior: 'smooth', block: 'center' }); card.focus({ preventScroll: true }); }
    });
  }

  /* ---------- Filtering ---------- */
  const filter = { teeth: '', status: [], month: null };

  function applyFilter(next) {
    Object.assign(filter, next);
    if (typeof filter.status === 'string') filter.status = filter.status ? filter.status.split(',') : [];
    const visible = [];
    D.species.forEach((s) => {
      const match =
        (!filter.teeth || s.teeth === filter.teeth) &&
        (!filter.status.length || filter.status.includes(s.status)) &&
        (!filter.month || speciesMonths(s).has(filter.month));
      const card = document.getElementById('species-' + s.id);
      card.classList.toggle('dim', !match);
      card.querySelectorAll('.months span').forEach((el) => el.classList.toggle('selected', Number(el.dataset.month) === filter.month));
      if (match) visible.push(s.id);
    });
    // keep the controls in sync, even when an agent changed the filter
    document.querySelectorAll('.chip[data-filter="teeth"]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.value === filter.teeth)));
    const sel = document.getElementById('filter-status');
    const val = filter.status.join(',');
    if (![...sel.options].some((o) => o.value === val)) sel.add(new Option(filter.status.map((c) => D.conservationCodes[c]).join(' + '), val));
    sel.value = val;
    document.getElementById('filter-month').value = filter.month || '';
    document.getElementById('filter-count').textContent = visible.length === D.species.length ? `${visible.length} species` : `${visible.length} of ${D.species.length} species`;
    return visible;
  }

  function bindFilters() {
    const monthSel = document.getElementById('filter-month');
    MONTHS.forEach((m, i) => monthSel.add(new Option(m, i + 1)));
    document.querySelectorAll('.chip[data-filter="teeth"]').forEach((b) =>
      b.addEventListener('click', () => applyFilter({ teeth: b.dataset.value })));
    document.getElementById('filter-status').addEventListener('change', (e) => applyFilter({ status: e.target.value }));
    monthSel.addEventListener('change', (e) => applyFilter({ month: e.target.value ? Number(e.target.value) : null }));
  }

  /* ---------- Conservation status bars ---------- */
  function buildStatusBars() {
    const order = ['EN', 'VU', 'LC', 'DD'];
    const color = { EN: 'var(--iucn-en)', VU: 'var(--iucn-vu)', LC: 'var(--iucn-lc)', DD: 'var(--iucn-dd)' };
    document.getElementById('status-bars').innerHTML = order.map((c) => {
      const list = D.species.filter((s) => s.status === c);
      return `<div class="sb-row"><span>${D.conservationCodes[c]}</span>
        <span class="sb-track"><i style="width:${(list.length / D.species.length) * 100}%;background:${color[c]}"></i></span>
        <b>${list.length}</b><span class="sb-species">${list.map((s) => s.name).join(', ')}</span></div>`;
    }).join('');
  }

  /* ---------- Depth gauge and dark header ---------- */
  function trackDepth() {
    const value = document.getElementById('dg-value');
    const cursor = document.getElementById('dg-cursor');
    const gauge = document.querySelector('.depth-gauge');
    const header = document.querySelector('.site-header');
    const filters = document.querySelector('.filters');
    const hero = document.getElementById('surface');
    const zones = [...document.querySelectorAll('.zone')];
    const map = document.getElementById('map');
    // positions on the gauge for 0, 200, 1,000 and 3,000 m
    const place = (m) => (m <= 200 ? (m / 200) * 33 : m <= 1000 ? 33 + ((m - 200) / 800) * 33 : 66 + ((m - 1000) / 2000) * 34);

    let queued = false;
    function update() {
      queued = false;
      const mid = window.scrollY + window.innerHeight * 0.5;
      let m = 0;
      for (const z of zones) {
        const start = z.offsetTop, end = start + z.offsetHeight;
        if (mid >= start) m = Number(z.dataset.top) + (Math.min(mid, end) - start) / (end - start) * (Number(z.dataset.bottom) - Number(z.dataset.top));
      }
      const surfaced = mid > map.offsetTop;
      value.textContent = surfaced ? 'Surface' : `−${num(Math.round(m))} m`;
      cursor.style.top = place(surfaced ? 0 : m) + '%';
      gauge.classList.toggle('visible', mid > zones[0].offsetTop && !surfaced);
      header.classList.toggle('dark', window.scrollY > 40);
      filters.classList.toggle('dark', m > 120);
      window.depthRatio = surfaced ? 0.6 : Math.min(m / 3000, 1);
    }
    window.addEventListener('scroll', () => { if (!queued) { queued = true; requestAnimationFrame(update); } }, { passive: true });
    window.addEventListener('resize', update);
    update();
  }

  buildZones();
  buildLineup();
  bindFilters();
  buildStatusBars();
  trackDepth();

  window.Page = { applyFilter, speciesById, regionById, MONTHS, speciesMonths, filter };
})();
