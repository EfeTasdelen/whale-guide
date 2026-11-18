# Requirements

Whale Guide is a static website: plain HTML, CSS and JavaScript. There is no build step and nothing to compile.

## To view the site

| Need | Why |
| --- | --- |
| A modern browser (Chrome, Edge, Firefox, Safari) | Runs the whole site |
| Internet connection | Whale images, satellite map tiles, Google Fonts and GBIF sightings load from the web |

That is all. Double-click `index.html`.

## To run it on a local server (recommended)

One of these:

| Option | Install | Run |
| --- | --- | --- |
| Python 3.8+ | https://www.python.org/downloads/ (tick "Add Python to PATH") | `start.bat` or `python -m http.server 5500` |
| Node.js 18+ | https://nodejs.org/ | `npm start` |

Then open http://localhost:5500. The second site (Ocean Conditions) will use port 5501.

## Libraries already included

These are copied into `vendor/`, so nothing needs to be downloaded:

| Library | Version | Used for |
| --- | --- | --- |
| GSAP + ScrollTrigger | 3.12.5 | Whale and scroll animations |
| Leaflet | 1.9.4 | World map |

## Only for editing the data (optional)

| Task | Command | Needs |
| --- | --- | --- |
| After editing `data/whales.json` | `npm run data` (or `python tools/copy_data.py`) | Python, no packages (`requirements.txt` is empty on purpose) |
| Rebuild the range shapes on the map | `npm install` then `npm run ranges` | Node.js; installs world-atlas, topojson-client, polygon-clipping |
