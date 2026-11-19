// Crimson Palms Cover Press: wires the editor page. Photos are read on the
// user's own machine (FileReader / object URLs) and never uploaded; exports
// are plain canvas PNG downloads. A `?shot=` query sets up a fixed scene for
// a screenshot instead of the live editor.
import { LAYOUTS, GRADES, GRAPHIC_KINDS, drawCover, panelRects, defaultPanels, layoutById } from './cover.js';
import { runShot } from './shots.js';

const canvas = document.getElementById('cover');
const status = document.getElementById('status');

const state = {
  size: { w: 1080, h: 1080 },
  layoutId: 'hero-left',
  gradeId: 'vice-sunset',
  skinSafe: true,
  halftone: true,
  strength: 0.85,
  contrast: 0.06,
  saturation: 0.18,
  grain: 0.25,
  vignette: 0.45,
  title: 'CRIMSON PALMS',
  subtitle: 'Low sun, loud streets',
  tagline: 'TWO LANES · ONE SKYLINE · FULL THROTTLE',
  badge: "COLLECTOR'S EDITION",
  volume: 'VOL. 06',
  stars: 5,
  quote: 'CHASING LIGHT DOWN THE PROMENADE',
  photos: [],
  panels: [],
  selectedPanel: 0,
};

const SIZES = {
  '1080x1080': { w: 1080, h: 1080 },
  '1080x1350': { w: 1080, h: 1350 },
  '1920x1080': { w: 1920, h: 1080 },
};

/** Loads an image from a URL, resolving once it can be drawn. */
export function loadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = url;
  });
}

function photoList() {
  return [
    ...state.photos.map((p, i) => ({ index: i, name: p.name })),
    ...GRAPHIC_KINDS.map((g, k) => ({ index: state.photos.length + k, name: g.name })),
  ];
}

function resolvePhoto(index) {
  if (index < state.photos.length) return state.photos[index];
  const g = GRAPHIC_KINDS[index - state.photos.length];
  return g ? { kind: 'graphic', graphic: g.id, name: g.name } : null;
}

function allPhotosForDraw() {
  const list = [];
  for (let i = 0; i < state.photos.length + GRAPHIC_KINDS.length; i++) list.push(resolvePhoto(i));
  return list;
}

function ensurePanels() {
  const count = layoutById(state.layoutId).panels.length;
  if (state.panels.length !== count) state.panels = defaultPanels(count);
}

function redraw() {
  ensurePanels();
  canvas.width = state.size.w;
  canvas.height = state.size.h;
  drawCover(canvas, { ...state, photos: allPhotosForDraw() });
}

function refreshPhotoStrip() {
  const strip = document.getElementById('photoStrip');
  strip.innerHTML = '';
  state.photos.forEach((p, i) => {
    const img = document.createElement('img');
    img.src = p.url;
    img.alt = p.name;
    img.title = p.name;
    img.addEventListener('click', () => {
      state.panels[state.selectedPanel].photo = i;
      redraw();
      syncPanelForm();
    });
    strip.appendChild(img);
  });
  const sel = document.getElementById('panelPhoto');
  sel.innerHTML = '';
  photoList().forEach((p) => {
    const opt = document.createElement('option');
    opt.value = p.index;
    opt.textContent = p.name;
    sel.appendChild(opt);
  });
  sel.value = String(state.panels[state.selectedPanel]?.photo ?? 0);
}

function syncPanelForm() {
  const p = state.panels[state.selectedPanel];
  if (!p) return;
  const set = (id, v) => { const el = document.getElementById(id); if (el) el.value = v; };
  const setVal = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
  document.getElementById('panelSelect').value = String(state.selectedPanel);
  document.getElementById('panelPhoto').value = String(p.photo);
  set('panelZoom', p.zoom); setVal('panelZoomVal', p.zoom.toFixed(2));
  set('panelX', p.ox); setVal('panelXVal', p.ox.toFixed(2));
  set('panelY', p.oy); setVal('panelYVal', p.oy.toFixed(2));
  set('panelPlace', p.place);
  set('panelTime', p.time);
  set('panelHook', p.hook);
}

function buildChips() {
  const layoutRow = document.getElementById('layoutRow');
  LAYOUTS.forEach((l) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip' + (l.id === state.layoutId ? ' active' : '');
    b.textContent = l.name;
    b.addEventListener('click', () => {
      state.layoutId = l.id;
      document.querySelectorAll('#layoutRow .chip').forEach((c) => c.classList.remove('active'));
      b.classList.add('active');
      redraw();
      buildPanelSelect();
      syncPanelForm();
    });
    layoutRow.appendChild(b);
  });
  const gradeRow = document.getElementById('gradeRow');
  GRADES.forEach((g) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'chip' + (g.id === state.gradeId ? ' active' : '');
    b.textContent = g.name;
    b.addEventListener('click', () => {
      state.gradeId = g.id;
      document.querySelectorAll('#gradeRow .chip').forEach((c) => c.classList.remove('active'));
      b.classList.add('active');
      redraw();
    });
    gradeRow.appendChild(b);
  });
}

function buildPanelSelect() {
  const sel = document.getElementById('panelSelect');
  sel.innerHTML = '';
  layoutById(state.layoutId).panels.forEach((_, i) => {
    const opt = document.createElement('option');
    opt.value = i;
    opt.textContent = `Panel ${i + 1}`;
    sel.appendChild(opt);
  });
  sel.value = String(state.selectedPanel);
}

function bindRange(id, key, fmt) {
  const el = document.getElementById(id);
  const val = document.getElementById(`${id}Val`);
  el.addEventListener('input', () => {
    state[key] = parseFloat(el.value);
    if (val) val.textContent = fmt ? fmt(state[key]) : el.value;
    redraw();
  });
}

function bindText(id, key) {
  document.getElementById(id).addEventListener('input', (e) => {
    state[key] = e.target.value;
    redraw();
  });
}

function exportPNG(size) {
  const off = document.createElement('canvas');
  off.width = size.w;
  off.height = size.h;
  const savedSize = state.size;
  state.size = size;
  drawCover(off, { ...state, photos: allPhotosForDraw() });
  state.size = savedSize;
  return new Promise((resolve) => {
    off.toBlob((blob) => {
      const a = document.createElement('a');
      a.href = URL.createObjectURL(blob);
      a.download = `crimson-palms-${size.w}x${size.h}.png`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      setTimeout(() => URL.revokeObjectURL(a.href), 5000);
      resolve(blob);
    }, 'image/png');
  });
}

async function loadSamples() {
  // face: where the subject's face sits in each sample photo, as fractions
  // of the photo (measured from the shipped images) — drawPanelPhoto
  // centres wide-panel crops on it so faces stay in frame.
  for (const [name, url, face] of [['Boulevard sunset', 'samples/boulevard.jpg', { x: 0.48, y: 0.17 }], ['Pier morning', 'samples/pier.jpg', { x: 0.42, y: 0.24 }]]) {
    try {
      const img = await loadImage(url);
      state.photos.push({ kind: 'photo', img, url, name, face });
    } catch (err) {
      status.textContent = `Could not load sample ${name}.`;
    }
  }
  refreshPhotoStrip();
  redraw();
}

document.getElementById('photo').addEventListener('change', async (e) => {
  for (const file of e.target.files) {
    const url = URL.createObjectURL(file);
    try {
      const img = await loadImage(url);
      state.photos.push({ kind: 'photo', img, url, name: file.name });
    } catch (err) { /* unreadable file: skip it */ }
  }
  refreshPhotoStrip();
  redraw();
  status.textContent = `${state.photos.length} photos loaded. Photos stay on this machine.`;
});

document.querySelectorAll('.size-pill').forEach((b) => {
  b.addEventListener('click', () => {
    state.size = SIZES[b.dataset.size];
    document.querySelectorAll('.size-pill').forEach((x) => x.classList.remove('active'));
    b.classList.add('active');
    redraw();
  });
});
document.querySelector('.size-pill[data-size="1080x1080"]').classList.add('active');

document.getElementById('export').addEventListener('click', async () => {
  status.textContent = 'Exporting…';
  await exportPNG(state.size);
  status.textContent = `Saved crimson-palms-${state.size.w}x${state.size.h}.png`;
});

document.getElementById('exportAll').addEventListener('click', async () => {
  status.textContent = 'Exporting all 3 sizes…';
  for (const size of Object.values(SIZES)) await exportPNG(size);
  status.textContent = 'Saved all 3 sizes: 1080x1080, 1080x1350, 1920x1080.';
});

document.getElementById('fillAll').addEventListener('click', () => {
  const first = state.panels[0]?.photo ?? 0;
  state.panels.forEach((p) => { p.photo = first; });
  redraw();
  syncPanelForm();
});

document.getElementById('spreadAll').addEventListener('click', () => {
  const total = state.photos.length + GRAPHIC_KINDS.length;
  state.panels.forEach((p, i) => { p.photo = i % total; });
  redraw();
  syncPanelForm();
});

document.getElementById('surprise').addEventListener('click', () => {
  state.layoutId = LAYOUTS[Math.floor(Math.random() * LAYOUTS.length)].id;
  state.gradeId = GRADES[Math.floor(Math.random() * GRADES.length)].id;
  const total = state.photos.length + GRAPHIC_KINDS.length;
  state.panels.forEach((p) => { p.photo = Math.floor(Math.random() * total); });
  document.querySelectorAll('#layoutRow .chip').forEach((c) => c.classList.toggle('active', c.textContent === layoutById(state.layoutId).name));
  document.querySelectorAll('#gradeRow .chip').forEach((c) => c.classList.toggle('active', c.textContent === GRADES.find((g) => g.id === state.gradeId).name));
  redraw();
  buildPanelSelect();
  syncPanelForm();
});

document.getElementById('skinSafe').addEventListener('change', (e) => { state.skinSafe = e.target.checked; redraw(); });
document.getElementById('halftone').addEventListener('change', (e) => { state.halftone = e.target.checked; redraw(); });
bindRange('strength', 'strength', (v) => v.toFixed(2));
bindRange('contrast', 'contrast', (v) => v.toFixed(2));
bindRange('saturation', 'saturation', (v) => v.toFixed(2));
bindRange('grain', 'grain', (v) => v.toFixed(2));
bindRange('vignette', 'vignette', (v) => v.toFixed(2));
bindText('title', 'title');
bindText('subtitle', 'subtitle');
bindText('tagline', 'tagline');
bindText('badge', 'badge');
bindText('volume', 'volume');
bindText('quote', 'quote');
document.getElementById('stars').addEventListener('input', (e) => {
  state.stars = parseInt(e.target.value, 10);
  document.getElementById('starsVal').textContent = e.target.value;
  redraw();
});

document.getElementById('panelSelect').addEventListener('change', (e) => {
  state.selectedPanel = parseInt(e.target.value, 10);
  syncPanelForm();
});
document.getElementById('panelPhoto').addEventListener('change', (e) => {
  state.panels[state.selectedPanel].photo = parseInt(e.target.value, 10);
  redraw();
});
function bindPanelRange(id, key, fmt) {
  const el = document.getElementById(id);
  const val = document.getElementById(`${id}Val`);
  el.addEventListener('input', () => {
    state.panels[state.selectedPanel][key] = parseFloat(el.value);
    if (val) val.textContent = fmt(parseFloat(el.value));
    redraw();
  });
}
bindPanelRange('panelZoom', 'zoom', (v) => v.toFixed(2));
bindPanelRange('panelX', 'ox', (v) => v.toFixed(2));
bindPanelRange('panelY', 'oy', (v) => v.toFixed(2));
function bindPanelText(id, key) {
  document.getElementById(id).addEventListener('input', (e) => {
    state.panels[state.selectedPanel][key] = e.target.value;
    redraw();
  });
}
bindPanelText('panelPlace', 'place');
bindPanelText('panelTime', 'time');
bindPanelText('panelHook', 'hook');

canvas.addEventListener('click', (e) => {
  const r = canvas.getBoundingClientRect();
  const x = (e.clientX - r.left) * (canvas.width / r.width);
  const y = (e.clientY - r.top) * (canvas.height / r.height);
  const rects = panelRects(canvas, state);
  const hit = rects.findIndex((rc) => x >= rc.x && x <= rc.x + rc.w && y >= rc.y && y <= rc.y + rc.h);
  if (hit >= 0) {
    state.selectedPanel = hit;
    syncPanelForm();
    status.textContent = `Panel ${hit + 1} selected.`;
  }
});

buildChips();
buildPanelSelect();
syncPanelForm();

const query = new URLSearchParams(location.search);
const shot = query.get('shot');
if (shot) {
  await loadSamples();
  runShot(shot, query, state, { redraw, exportPNG, SIZES });
} else {
  await loadSamples();
  status.textContent = 'Sample photos loaded. Add your own, pick a layout, export PNG.';
}
