/* Builds data/ranges.json and js/ranges.js: each species' approximate range as sea areas, with land cut out.
   Setup once: npm install world-atlas@2.0.2 topojson-client@3.1.0 polygon-clipping@0.15.7
   Run from the project folder: node tools/build_ranges.js */
const topo = require('topojson-client');
const pc = require('polygon-clipping');
const land110 = require('world-atlas/land-110m.json');
const land = topo.feature(land110, land110.objects.land); // MultiPolygon
const feats = land.features || [land];
const landCoords = feats.flatMap((f) => (f.geometry.type === 'MultiPolygon' ? f.geometry.coordinates : [f.geometry.coordinates]));
const box = (w, s, e, n) => [[[w, s], [e, s], [e, n], [w, n], [w, s]]];
const RANGES = {
  blue:     { note: 'All oceans, from the tropics to the edge of the polar ice. Rare in the Mediterranean.', boxes: [[-180, -70, 180, 72]] },
  fin:      { note: 'All oceans, mostly temperate and polar waters, including the Mediterranean.', boxes: [[-180, -70, 180, 78]] },
  humpback: { note: 'All oceans. Feeds in cold waters in summer and breeds in the tropics in winter.', boxes: [[-180, -70, 180, 75]] },
  orca:     { note: 'Every ocean, densest in cold, productive coastal waters.', boxes: [[-180, -75, 180, 80]] },
  sperm:    { note: 'Deep waters of all oceans. Females stay below about 45° latitude, males travel to the poles.', boxes: [[-180, -60, 180, 70]] },
  cuvier:   { note: 'Deep waters of all oceans from the tropics to cool temperate seas.', boxes: [[-180, -55, 180, 62]] },
  minke:    { note: 'North Atlantic and North Pacific. A dwarf form lives in the Southern Hemisphere.', boxes: [[-80, 25, 30, 82], [120, 20, 180, 70], [-180, 20, -110, 70]] },
  gray:     { note: 'North Pacific only: from Baja California and Mexico to the Bering and Chukchi seas, plus a small western population off Russia.', boxes: [[-180, 20, -108, 72], [130, 40, 165, 62]] },
  bowhead:  { note: 'Arctic and sub-Arctic waters only, close to the sea ice.', boxes: [[-180, 60, 180, 86]] },
  pilot:    { note: 'Warm temperate and tropical waters of all oceans, mostly over deep slopes near islands and coasts.', boxes: [[-180, -45, 180, 50]] },
  risso:    { note: 'Temperate and tropical waters of all oceans, roughly from 64°N to 46°S, including the Mediterranean.', boxes: [[-180, -46, 180, 64]] },
  beluga:   { note: 'Arctic and sub-Arctic coasts, plus an isolated group in the St. Lawrence estuary.', boxes: [[-180, 55, 180, 86], [-72, 46.5, -66, 50]] },
};
const out = {};
for (const [id, r] of Object.entries(RANGES)) {
  const sea = pc.union(...r.boxes.map((b) => box(...b)));
  const water = pc.difference(sea, landCoords);
  // round to 1 decimal to keep the file small
  const rounded = water.map((poly) => poly.map((ring) => ring.map(([x, y]) => [Math.round(x * 10) / 10, Math.round(y * 10) / 10])));
  out[id] = { note: r.note, geometry: { type: 'MultiPolygon', coordinates: rounded } };
}
const fs = require('fs');
const B = require('path').join(__dirname, '..') + '/';
const json = JSON.stringify({ source: 'Approximate ranges drawn for this site from IUCN range descriptions; coastlines from Natural Earth 1:110m (public domain).', ranges: out });
fs.writeFileSync(B + 'data/ranges.json', json + '\n');
fs.writeFileSync(B + 'js/ranges.js', '// Copy of data/ranges.json for file:// use. Rebuild with tools/build_ranges.js\nwindow.WHALE_RANGES = ' + json + ';\n');
console.log((json.length / 1024).toFixed(0) + ' KB');
