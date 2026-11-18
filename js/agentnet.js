/* Live agent network diagram at the top of the chat panel.
   Shows which agent is speaking, animates each handoff along its link, flashes site action calls,
   and shows the consent state of the link to the other site (Ocean Conditions).
   chat.js calls: AgentNet.activate(id), AgentNet.pass(from, to), AgentNet.action(name, ok), AgentNet.consent(state).
   The <ol id="agents"> list stays in the page for screen readers; this drawing is decorative (aria-hidden). */
(function () {
  const host = document.getElementById('agent-net');
  if (!host) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const NS = 'http://www.w3.org/2000/svg';

  const NODES = {
    'guide':               { x: 122, y: 34,  label: 'Guide', sub: 'front man', mark: 'G' },
    'species-expert':      { x: 40,  y: 112, label: 'Species Expert', mark: 'S' },
    'trip-planner':        { x: 206, y: 112, label: 'Trip Planner', mark: 'T' },
    'conservation-expert': { x: 122, y: 112, label: 'Conservation', mark: 'C' },
    'sea-advisor':         { x: 318, y: 112, label: 'Sea Advisor', mark: 'O', external: true },
  };
  const EDGES = [
    ['guide', 'species-expert'], ['guide', 'trip-planner'], ['guide', 'conservation-expert'],
    ['trip-planner', 'sea-advisor'],
    ['sea-advisor', 'guide'],
  ];
  const BOUNDARY_X = 262;

  const el = (name, attrs = {}, parent) => {
    const n = document.createElementNS(NS, name);
    Object.entries(attrs).forEach(([k, v]) => n.setAttribute(k, v));
    if (parent) parent.appendChild(n);
    return n;
  };

  function edgePath(a, b) {
    const A = NODES[a], B = NODES[b];
    if (a === 'sea-advisor' || b === 'sea-advisor') {
      if ((a === 'guide') || (b === 'guide')) {
        // the reply from the other site curves back over the top to the Guide
        const [P, Q] = a === 'guide' ? [A, B] : [B, A];
        return `M${P.x + 16},${P.y} C${P.x + 120},${P.y - 8} ${Q.x},${Q.y - 60} ${Q.x},${Q.y - 16}`;
      }
      return `M${A.x + 16},${A.y} L${B.x - 16},${B.y}`;
    }
    const midY = (A.y + B.y) / 2;
    return `M${A.x},${A.y + 16} C${A.x},${midY} ${B.x},${midY} ${B.x},${B.y - 16}`;
  }

  const svg = el('svg', { viewBox: '0 0 360 168', class: 'net-svg', 'aria-hidden': 'true', focusable: 'false' }, host);

  // The two sites: this one on the left, the other origin on the right
  el('rect', { x: 2, y: 2, width: BOUNDARY_X - 8, height: 164, rx: 12, class: 'net-site' }, svg);
  el('rect', { x: BOUNDARY_X + 4, y: 2, width: 354 - BOUNDARY_X, height: 164, rx: 12, class: 'net-site net-site-ext' }, svg);
  el('text', { x: 14, y: 18, class: 'net-site-label' }, svg).textContent = 'WHALE GUIDE';
  el('text', { x: BOUNDARY_X + 14, y: 18, class: 'net-site-label' }, svg).textContent = 'OCEAN';
  el('text', { x: BOUNDARY_X + 14, y: 29, class: 'net-site-label' }, svg).textContent = 'CONDITIONS';

  const edgesG = el('g', {}, svg);
  const edges = {};
  EDGES.forEach(([a, b]) => {
    const p = el('path', { d: edgePath(a, b), class: 'net-edge' + (a === 'sea-advisor' || b === 'sea-advisor' ? ' net-edge-ext' : '') }, edgesG);
    edges[a + '>' + b] = p;
  });

  // Consent gate where the link crosses into the other site
  const gate = el('g', { class: 'net-gate', transform: `translate(${BOUNDARY_X},112)` }, svg);
  el('circle', { r: 9 }, gate);
  const gateIcon = el('path', { d: 'M-3.5,-0.5 v-2 a3.5,3.5 0 0 1 7,0 v2 M-4.5,-0.5 h9 v6 h-9 z', class: 'net-gate-icon' }, gate);
  const gateText = el('text', { x: 0, y: 26, class: 'net-gate-text' }, gate);
  gateText.textContent = 'consent';

  const nodesG = el('g', {}, svg);
  const nodes = {};
  Object.entries(NODES).forEach(([id, n]) => {
    const g = el('g', { class: 'net-node' + (n.external ? ' net-node-ext' : ''), transform: `translate(${n.x},${n.y})` }, nodesG);
    el('circle', { r: 22, class: 'net-halo' }, g);
    el('circle', { r: 15, class: 'net-dot' }, g);
    el('text', { y: 4.5, class: 'net-mark' }, g).textContent = n.mark;
    el('text', { y: 31, class: 'net-label' }, g).textContent = n.label;
    if (n.sub) el('text', { x: -22, y: 4, class: 'net-sub' }, g).textContent = n.sub;
    nodes[id] = g;
  });

  const pulse = el('circle', { r: 4, class: 'net-pulse', opacity: 0 }, svg);
  const actionTag = el('g', { class: 'net-action', opacity: 0 }, svg);
  const actionBg = el('rect', { rx: 8, height: 16 }, actionTag);
  const actionText = el('text', { y: 11.5 }, actionTag);

  let current = 'guide';
  function activate(id) {
    current = id;
    Object.entries(nodes).forEach(([k, g]) => g.classList.toggle('active', k === id));
  }

  /* Sends a glowing pulse along the link from one agent to the other. Resolves when it arrives. */
  function pass(from, to) {
    const fwd = edges[from + '>' + to];
    const back = edges[to + '>' + from];
    const path = fwd || back;
    if (!path) { activate(to); return Promise.resolve(); }
    path.classList.add('flow');
    const len = path.getTotalLength();
    const duration = reduceMotion ? 0 : 650;
    return new Promise((resolve) => {
      const t0 = performance.now();
      function step(t) {
        const k = duration ? Math.min(1, (t - t0) / duration) : 1;
        const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        const pt = path.getPointAtLength((fwd ? e : 1 - e) * len);
        pulse.setAttribute('cx', pt.x); pulse.setAttribute('cy', pt.y);
        pulse.setAttribute('opacity', duration ? String(Math.sin(k * Math.PI) * 0.6 + 0.4) : '0');
        if (k < 1) requestAnimationFrame(step);
        else {
          pulse.setAttribute('opacity', 0);
          activate(to);
          setTimeout(() => path.classList.remove('flow'), 900);
          resolve();
        }
      }
      requestAnimationFrame(step);
    });
  }

  /* Flashes the name of a site action under the agent that called it */
  let actionTimer;
  function action(name, ok = true) {
    const n = NODES[current] || NODES.guide;
    actionText.textContent = (ok ? '' : '✕ ') + name + '()';
    const w = actionText.getComputedTextLength() + 16;
    const x = Math.max(4, Math.min(BOUNDARY_X - w - 6, n.x - w / 2));
    actionTag.setAttribute('transform', `translate(${x},${n.y + 38})`);
    actionBg.setAttribute('width', w);
    actionText.setAttribute('x', w / 2);
    actionTag.classList.toggle('error', !ok);
    actionTag.setAttribute('opacity', 1);
    clearTimeout(actionTimer);
    actionTimer = setTimeout(() => actionTag.setAttribute('opacity', 0), 1800);
  }

  /* state: 'ask' while the consent dialog is open, then 'allowed' or 'denied' */
  function consent(state) {
    gate.classList.remove('ask', 'allowed', 'denied');
    gate.classList.add(state);
    gateText.textContent = { ask: 'asking you', allowed: 'allowed', denied: 'denied' }[state] || 'consent';
    gateIcon.setAttribute('d', state === 'denied'
      ? 'M-3.5,-3.5 L3.5,3.5 M3.5,-3.5 L-3.5,3.5'
      : state === 'allowed'
        ? 'M-4,0.5 L-1,3.5 L4.5,-3'
        : 'M-3.5,-0.5 v-2 a3.5,3.5 0 0 1 7,0 v2 M-4.5,-0.5 h9 v6 h-9 z');
    edges['trip-planner>sea-advisor'].classList.toggle('blocked', state === 'denied');
    if (state === 'allowed') nodes['sea-advisor'].classList.add('loaded');
  }

  activate('guide');
  window.AgentNet = { activate, pass, action, consent };
})();
