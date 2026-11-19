// Crimson Palms Cover Press: draws the multi-panel GTA-style cover onto a
// canvas. All art is drawn in code (gradients, palms, skyline, halftone) or
// comes from the user's own photos; nothing here copies Rockstar artwork.

export const LAYOUTS = [
  {
    id: 'hero-left', name: 'Hero Left 6',
    panels: [
      [0, 0, 0.58, 0.66], [0, 0.66, 0.29, 0.34], [0.29, 0.66, 0.29, 0.34],
      [0.58, 0, 0.42, 0.33], [0.58, 0.33, 0.42, 0.33], [0.58, 0.66, 0.42, 0.34],
    ],
  },
  {
    id: 'hero-right', name: 'Hero Right 6',
    panels: [
      [0.42, 0, 0.58, 0.66], [0.42, 0.66, 0.29, 0.34], [0.71, 0.66, 0.29, 0.34],
      [0, 0, 0.42, 0.33], [0, 0.33, 0.42, 0.33], [0, 0.66, 0.42, 0.34],
    ],
  },
  {
    id: 'grid-9', name: 'Grid 3x3 · 9',
    panels: [
      [0, 0, 0.333, 0.333], [0.333, 0, 0.334, 0.333], [0.667, 0, 0.333, 0.333],
      [0, 0.333, 0.333, 0.334], [0.333, 0.333, 0.334, 0.334], [0.667, 0.333, 0.333, 0.334],
      [0, 0.667, 0.333, 0.333], [0.333, 0.667, 0.334, 0.333], [0.667, 0.667, 0.333, 0.333],
    ],
  },
  {
    id: 'comic-5', name: 'Comic 5',
    panels: [
      [0, 0, 1, 0.46],
      [0, 0.46, 0.25, 0.54], [0.25, 0.46, 0.25, 0.54],
      [0.5, 0.46, 0.25, 0.54], [0.75, 0.46, 0.25, 0.54],
    ],
  },
  {
    id: 'slash-7', name: 'Key Art Slash 7', slant: 0.07,
    panels: [
      [0, 0, 0.55, 0.62], [0.55, 0, 0.45, 0.62],
      [0, 0.62, 0.2, 0.38], [0.2, 0.62, 0.2, 0.38], [0.4, 0.62, 0.2, 0.38],
      [0.6, 0.62, 0.2, 0.38], [0.8, 0.62, 0.2, 0.38],
    ],
  },
  {
    id: 'center-7', name: 'Center Stage 7',
    panels: [
      [0.25, 0, 0.5, 0.62],
      [0, 0, 0.25, 0.31], [0, 0.31, 0.25, 0.31],
      [0.75, 0, 0.25, 0.31], [0.75, 0.31, 0.25, 0.31],
      [0, 0.62, 0.5, 0.38], [0.5, 0.62, 0.5, 0.38],
    ],
  },
  {
    id: 'mosaic-8', name: 'Mosaic 8',
    panels: [
      [0, 0, 0.34, 0.34], [0.34, 0, 0.33, 0.34], [0.67, 0, 0.33, 0.34],
      [0, 0.34, 0.5, 0.32], [0.5, 0.34, 0.5, 0.32],
      [0, 0.66, 0.333, 0.34], [0.333, 0.66, 0.334, 0.34], [0.667, 0.66, 0.333, 0.34],
    ],
  },
];

export const GRADES = [
  { id: 'vice-sunset', name: 'Vice Sunset', levels: 6, sat: 1.22, tint: ['#ff8a3d', '#ff4d8d', '#7b2fbe'], tintAlpha: 0.28, halftone: 0.10 },
  { id: 'neon-night', name: 'Neon Night', levels: 6, sat: 1.18, tint: ['#ff4dd2', '#2dd4c8', '#2b1a8f'], tintAlpha: 0.30, halftone: 0.12 },
  { id: 'golden-hour', name: 'Golden Hour', levels: 8, sat: 1.12, tint: ['#ffc93d', '#ff7a3d', '#c24d7a'], tintAlpha: 0.20, halftone: 0.06 },
  { id: 'comic-ink', name: 'Comic Ink', levels: 4, sat: 1.30, tint: ['#ff9a3d', '#e63d7a', '#3d1a5e'], tintAlpha: 0.34, halftone: 0.16 },
  { id: 'noir-heat', name: 'Noir Heat', levels: 5, sat: 0.55, tint: ['#3d3d5e', '#8f2f4d', '#0d0d1a'], tintAlpha: 0.30, halftone: 0.10 },
  { id: 'palm-duotone', name: 'Palm Duotone', levels: 5, sat: 1.05, tint: ['#ff4d8d', '#2dd4c8', '#123a5e'], tintAlpha: 0.32, halftone: 0.12 },
];

export const GRAPHIC_KINDS = [
  { id: 'graphic-sunset', name: 'Graphic: Sunset' },
  { id: 'graphic-skyline', name: 'Graphic: Skyline' },
  { id: 'graphic-palms', name: 'Graphic: Palms' },
];

const DEFAULT_CAPTIONS = [
  { place: 'CORAL ROW', time: '8:14 PM', hook: 'ENGINE STILL WARM' },
  { place: 'MERMAID AVENUE', time: '6:03 PM', hook: 'KEYS IN HAND' },
  { place: 'LANTERN PIER', time: '10:26 PM', hook: 'TIDE COMING IN' },
  { place: 'ROOFTOP NINE', time: '5:47 AM', hook: 'CITY STILL ASLEEP' },
  { place: 'JASMINE LANE', time: '9:58 PM', hook: 'WRONG TURN, RIGHT NIGHT' },
  { place: 'COCONUT COURT', time: '7:31 PM', hook: 'FRONT SEAT STORIES' },
  { place: 'HARBOUR LIGHTS', time: '11:12 PM', hook: 'ONE MORE SONG' },
  { place: 'MANGO WHARF', time: '6:58 PM', hook: 'OFF THE CLOCK' },
  { place: 'VELVET SAND', time: '4:44 PM', hook: 'LINE IS IN THE WATER' },
];

export function defaultPanels(count) {
  return Array.from({ length: count }, (_, i) => ({
    photo: i % 3 === 2 ? 2 : i % 2,
    zoom: 1.05,
    ox: 0,
    oy: 0,
    ...DEFAULT_CAPTIONS[i % DEFAULT_CAPTIONS.length],
  }));
}

export function layoutById(id) {
  return LAYOUTS.find((l) => l.id === id) || LAYOUTS[0];
}

export function gradeById(id) {
  return GRADES.find((g) => g.id === id) || GRADES[0];
}

function posterizeImage(img, w, h, grade, skinSafe, strength, contrast, saturation) {
  const off = document.createElement('canvas');
  off.width = Math.max(2, w);
  off.height = Math.max(2, h);
  const c = off.getContext('2d');
  const scale = Math.max(w / img.naturalWidth, h / img.naturalHeight);
  const pw = img.naturalWidth * scale;
  const ph = img.naturalHeight * scale;
  c.drawImage(img, (w - pw) / 2, (h - ph) / 2, pw, ph);
  const levels = skinSafe ? Math.max(grade.levels, 8) : grade.levels;
  const satBoost = skinSafe ? Math.min(saturation, 0.08) : saturation;
  const sat = grade.sat + satBoost;
  const data = c.getImageData(0, 0, off.width, off.height);
  const d = data.data;
  const step = 255 / (levels - 1);
  for (let i = 0; i < d.length; i += 4) {
    let r = d[i], g = d[i + 1], b = d[i + 2];
    r = Math.round(r / step) * step;
    g = Math.round(g / step) * step;
    b = Math.round(b / step) * step;
    const lum = 0.299 * r + 0.587 * g + 0.114 * b;
    r = lum + (r - lum) * sat;
    g = lum + (g - lum) * sat;
    b = lum + (b - lum) * sat;
    const cf = 1 + contrast * strength;
    r = (r - 128) * cf + 128;
    g = (g - 128) * cf + 128;
    b = (b - 128) * cf + 128;
    d[i] = Math.max(0, Math.min(255, r));
    d[i + 1] = Math.max(0, Math.min(255, g));
    d[i + 2] = Math.max(0, Math.min(255, b));
  }
  c.putImageData(data, 0, 0);
  return off;
}

function drawPalm(ctx, x, y, s, color) {
  ctx.save();
  ctx.translate(x, y);
  ctx.scale(s, s);
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
  ctx.lineWidth = 5;
  ctx.lineCap = 'round';
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.quadraticCurveTo(6, -28, 2, -52);
  ctx.stroke();
  for (let k = 0; k < 6; k++) {
    const a = (-160 + k * 32) * Math.PI / 180;
    ctx.beginPath();
    ctx.moveTo(2, -52);
    ctx.quadraticCurveTo(2 + Math.cos(a) * 26, -52 + Math.sin(a) * 20, 2 + Math.cos(a) * 44, -52 + Math.sin(a) * 26 + 12);
    ctx.stroke();
  }
  ctx.restore();
}

function drawGraphicPanel(ctx, kind, x, y, w, h, grade) {
  const g = ctx.createLinearGradient(0, y, 0, y + h);
  if (kind === 'graphic-skyline') {
    g.addColorStop(0, '#2b1a5e');
    g.addColorStop(0.55, '#c24d7a');
    g.addColorStop(1, '#ff8a3d');
  } else if (kind === 'graphic-palms') {
    g.addColorStop(0, '#123a5e');
    g.addColorStop(0.6, '#2dd4c8');
    g.addColorStop(1, '#ff4dd2');
  } else {
    g.addColorStop(0, '#7b2fbe');
    g.addColorStop(0.5, '#ff4d8d');
    g.addColorStop(1, '#ff8a3d');
  }
  ctx.fillStyle = g;
  ctx.fillRect(x, y, w, h);
  const sunR = h * 0.30;
  const sun = ctx.createRadialGradient(x + w * 0.5, y + h * 0.5, sunR * 0.1, x + w * 0.5, y + h * 0.5, sunR);
  sun.addColorStop(0, '#fff3c4');
  sun.addColorStop(0.6, '#ffc93d');
  sun.addColorStop(1, 'rgba(255,138,61,0)');
  ctx.fillStyle = sun;
  ctx.beginPath();
  ctx.arc(x + w * 0.5, y + h * 0.5, sunR, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = 'rgba(20,8,30,0.9)';
  if (kind === 'graphic-skyline') {
    let bx = x + w * 0.04;
    while (bx < x + w * 0.96) {
      const bw = w * (0.08 + Math.random() * 0.06);
      const bh = h * (0.28 + Math.random() * 0.32);
      ctx.fillRect(bx, y + h - bh, bw, bh);
      bx += bw + w * 0.02;
    }
  }
  drawPalm(ctx, x + w * 0.14, y + h * 0.98, h / 200, 'rgba(20,8,30,0.95)');
  drawPalm(ctx, x + w * 0.86, y + h * 0.98, h / 240, 'rgba(20,8,30,0.95)');
  if (grade.id === 'noir-heat') {
    ctx.fillStyle = 'rgba(10,10,26,0.35)';
    ctx.fillRect(x, y, w, h);
  }
}

function drawPanelPhoto(ctx, rect, photo, panel, grade, state) {
  const { x, y, w, h } = rect;
  ctx.save();
  ctx.beginPath();
  ctx.rect(x, y, w, h);
  ctx.clip();
  if (!photo) {
    const g = ctx.createLinearGradient(x, y, x, y + h);
    g.addColorStop(0, '#3d2144');
    g.addColorStop(1, '#160a1e');
    ctx.fillStyle = g;
    ctx.fillRect(x, y, w, h);
  } else if (photo.kind === 'graphic') {
    drawGraphicPanel(ctx, photo.graphic, x, y, w, h, grade);
  } else {
    const zoom = (panel.zoom || 1.15) * 1.0;
    const base = Math.max(w / photo.img.naturalWidth, h / photo.img.naturalHeight) * zoom;
    const pw = photo.img.naturalWidth * base;
    const ph = photo.img.naturalHeight * base;
    const graded = posterizeImage(
      photo.img, Math.round(pw), Math.round(ph), grade, state.skinSafe,
      state.strength, state.contrast, state.saturation,
    );
    // Face-aware crop: centre the visible window on the subject's face
    // (photo.face, fractions of the photo; default upper-third centre),
    // clamped so the photo still covers the whole panel. The old code
    // top-aligned the photo, so a wide/short panel showed only the top
    // ~14% of a portrait photo — hair and palms, no face (Comic 5 hero
    // and Mosaic 8 middle row at 1920x1080). A wide panel still cannot
    // fit a whole face, but it now shows eyes, nose and mouth instead
    // of the top of the head.
    const face = photo.face || { x: 0.5, y: 0.25 };
    const visW = w / pw;
    const visH = h / ph;
    const winX = Math.min(Math.max(face.x - visW / 2, 0), 1 - visW);
    const winY = Math.min(Math.max(face.y - visH / 2, 0), 1 - visH);
    let dx = x - winX * pw + (panel.ox || 0) * w * 0.3;
    let dy = y - winY * ph + (panel.oy || 0) * h * 0.3;
    // Clamp the user's shift so the photo never leaves a gap in the panel.
    dx = Math.min(Math.max(dx, x + w - pw), x);
    dy = Math.min(Math.max(dy, y + h - ph), y);
    ctx.drawImage(graded, dx, dy, pw, ph);
  }
  const tintAlpha = (state.skinSafe ? grade.tintAlpha * 0.6 : grade.tintAlpha) * state.strength;
  const tint = ctx.createLinearGradient(x, y, x + w, y + h);
  tint.addColorStop(0, grade.tint[0]);
  tint.addColorStop(0.55, grade.tint[1]);
  tint.addColorStop(1, grade.tint[2]);
  ctx.globalCompositeOperation = 'overlay';
  ctx.globalAlpha = tintAlpha;
  ctx.fillStyle = tint;
  ctx.fillRect(x, y, w, h);
  ctx.globalCompositeOperation = 'source-over';
  ctx.globalAlpha = 1;
  ctx.restore();
}

function drawHalftone(ctx, w, h, alpha) {
  if (alpha <= 0) return;
  ctx.save();
  ctx.fillStyle = `rgba(10,5,20,${alpha})`;
  const step = Math.max(6, Math.round(w / 150));
  for (let yy = step / 2; yy < h; yy += step) {
    for (let xx = step / 2; xx < w; xx += step) {
      ctx.beginPath();
      ctx.arc(xx, yy, step * 0.14, 0, Math.PI * 2);
      ctx.fill();
    }
  }
  ctx.restore();
}

function drawGrain(ctx, w, h, amount) {
  if (amount <= 0) return;
  ctx.save();
  const n = Math.round(w * h * amount * 0.00012);
  for (let i = 0; i < n; i++) {
    const v = Math.random() > 0.5 ? 255 : 0;
    ctx.fillStyle = `rgba(${v},${v},${v},${0.05 + Math.random() * 0.08})`;
    ctx.fillRect(Math.random() * w, Math.random() * h, 1.6, 1.6);
  }
  ctx.restore();
}

function drawVignette(ctx, w, h, amount) {
  if (amount <= 0) return;
  const g = ctx.createRadialGradient(w / 2, h / 2, Math.min(w, h) * 0.35, w / 2, h / 2, Math.max(w, h) * 0.75);
  g.addColorStop(0, 'rgba(0,0,0,0)');
  g.addColorStop(1, `rgba(0,0,0,${amount * 0.55})`);
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, w, h);
}

function fitFont(ctx, text, maxWidth, startSize, family, weight) {
  let size = startSize;
  ctx.font = `${weight} ${size}px ${family}`;
  while (ctx.measureText(text).width > maxWidth && size > 10) {
    size -= 2;
    ctx.font = `${weight} ${size}px ${family}`;
  }
  return size;
}

// Panels occupy only the top 74% of the cover; the title band lives BELOW
// them (0.74h-0.925h) and never overlaps a panel, so every panel in every
// layout stays fully visible. The old band (0.65h-0.96h, drawn over the
// panels) buried the bottom row; this layout cannot do that.
function drawTitleBlock(ctx, w, h, state) {
  const bandY = h * 0.74;
  const bandH = h * 0.185;
  // The title band is a solid dark strip, never a fade: panel borders and
  // bright art must not show through behind the title and subtitle.
  const scrim = ctx.createLinearGradient(0, bandY, 0, bandY + bandH);
  scrim.addColorStop(0, 'rgba(10,4,18,0.92)');
  scrim.addColorStop(0.5, 'rgba(10,4,18,0.95)');
  scrim.addColorStop(1, 'rgba(10,4,18,0.97)');
  ctx.fillStyle = scrim;
  ctx.fillRect(0, bandY, w, bandH);
  // Palm silhouettes live inside the band only, so their fronds never
  // scratch across the panels above it.
  ctx.save();
  ctx.beginPath();
  ctx.rect(0, bandY, w, bandH);
  ctx.clip();
  drawPalm(ctx, w * 0.05, bandY + bandH * 0.95, h / 380, 'rgba(8,3,14,0.85)');
  drawPalm(ctx, w * 0.95, bandY + bandH * 0.95, h / 420, 'rgba(8,3,14,0.85)');
  ctx.restore();

  const title = (state.title || 'CRIMSON PALMS').toUpperCase();
  const titleSize = fitFont(ctx, title, w * 0.92, Math.round(w * 0.09), 'Arial Black, "Archivo Black", sans-serif', 900);
  const ty = bandY + bandH * 0.38;
  const grad = ctx.createLinearGradient(0, ty - titleSize, 0, ty + titleSize * 0.2);
  grad.addColorStop(0, '#fff6d8');
  grad.addColorStop(0.45, '#ffc93d');
  grad.addColorStop(0.75, '#ff8a3d');
  grad.addColorStop(1, '#ff4d8d');
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.lineJoin = 'round';
  ctx.font = `900 ${titleSize}px "Arial Black", "Archivo Black", sans-serif`;
  ctx.strokeStyle = '#1c0716';
  ctx.lineWidth = Math.max(4, titleSize * 0.14);
  ctx.strokeText(title, w / 2, ty);
  ctx.shadowColor = '#ff2d92';
  ctx.shadowBlur = titleSize * 0.18;
  ctx.fillStyle = grad;
  ctx.fillText(title, w / 2, ty);
  ctx.shadowBlur = 0;

  const sub = state.subtitle || '';
  if (sub) {
    const subSize = Math.round(titleSize * 0.38);
    ctx.font = `italic 700 ${subSize}px "Brush Script MT", "Snell Roundhand", cursive`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    // Faux-bold neon script: a thick dark outline plus a strong glow, so the
    // subtitle reads as heavy lettering even where the script font falls
    // back to a plain italic.
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#5e0040';
    ctx.lineWidth = Math.max(3, subSize * 0.10);
    ctx.shadowColor = '#ff2d92';
    ctx.shadowBlur = subSize * 0.55;
    ctx.strokeText(sub, w / 2, ty + titleSize * 0.50);
    ctx.fillStyle = '#ff7ad9';
    ctx.fillText(sub, w / 2, ty + titleSize * 0.50);
    ctx.shadowBlur = 0;
  }
}

function drawStarsPill(ctx, w, h, state) {
  const stars = '★'.repeat(state.stars || 5) + '☆'.repeat(5 - (state.stars || 5));
  const quote = state.quote || '';
  const text = `${stars}  ${quote}`;
  const fs = Math.round(w * 0.020);
  ctx.font = `700 ${fs}px system-ui, sans-serif`;
  const tw = ctx.measureText(text).width;
  const pw = tw + fs * 2.2;
  const ph = fs * 2.1;
  const px = w * 0.03;
  const py = h * 0.025;
  ctx.fillStyle = 'rgba(12,5,20,0.85)';
  ctx.strokeStyle = '#ffc93d';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.roundRect(px, py, pw, ph, ph / 2);
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#ffc93d';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, px + fs * 1.1, py + ph / 2 + 1);
}

function drawSeal(ctx, w, h) {
  const cx = w * 0.93;
  const cy = h * 0.10;
  const r = Math.min(w, h) * 0.075;
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(-0.22);
  ctx.fillStyle = '#ff4d8d';
  ctx.strokeStyle = '#fff6d8';
  ctx.lineWidth = 3;
  ctx.beginPath();
  for (let i = 0; i < 16; i++) {
    const a = (i / 16) * Math.PI * 2;
    const rr = i % 2 === 0 ? r : r * 0.78;
    ctx[i === 0 ? 'moveTo' : 'lineTo'](Math.cos(a) * rr, Math.sin(a) * rr);
  }
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
  ctx.fillStyle = '#fff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `900 ${Math.round(r * 0.24)}px system-ui, sans-serif`;
  ctx.fillText('ORIGINAL', 0, -r * 0.28);
  ctx.fillText('COVER ART', 0, r * 0.02);
  ctx.font = `700 ${Math.round(r * 0.17)}px system-ui, sans-serif`;
  ctx.fillText('★ EST. 2026 ★', 0, r * 0.34);
  ctx.restore();
}

function drawBarcode(ctx, w, h, state) {
  const stripH = h * 0.038;
  const bw = w * 0.13;
  const bh = h * 0.032;
  const numH = h * 0.016;
  const bx = w - bw - w * 0.025;
  // The barcode sits above the tagline strip, never on top of its text.
  const by = h - stripH - bh - numH - h * 0.018;
  ctx.fillStyle = '#fff';
  ctx.fillRect(bx - 6, by - 6, bw + 12, bh + numH + 12);
  ctx.fillStyle = '#000';
  let x = bx;
  let seed = 7;
  while (x < bx + bw - 3) {
    seed = (seed * 37 + 11) % 97;
    const barW = 1 + (seed % 4);
    if (seed % 3 !== 0) ctx.fillRect(x, by, barW, bh);
    x += barW + 1 + (seed % 3);
  }
  ctx.font = `700 ${Math.round(numH * 0.8)}px monospace, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(`CP-0626-${String(state.volume || 'VOL. 06').replace(/[^0-9]/g, '') || '06'}`, bx + bw / 2, by + bh + numH / 2 + 3);
}

function drawTaglineStrip(ctx, w, h, state) {
  const stripH = h * 0.038;
  const y = h - stripH;
  ctx.fillStyle = '#0d0512';
  ctx.fillRect(0, y, w, stripH);
  ctx.fillStyle = '#ffc93d';
  ctx.font = `800 ${Math.round(stripH * 0.52)}px system-ui, sans-serif`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText((state.tagline || '').toUpperCase(), w / 2, y + stripH / 2);
  const badge = (state.badge || '').toUpperCase();
  if (badge) {
    ctx.font = `800 ${Math.round(h * 0.013)}px system-ui, sans-serif`;
    const bw = ctx.measureText(badge).width + 24;
    ctx.fillStyle = '#ff4d8d';
    ctx.beginPath();
    ctx.moveTo(w * 0.5 - bw / 2, y - h * 0.022);
    ctx.lineTo(w * 0.5 + bw / 2, y - h * 0.022);
    ctx.lineTo(w * 0.5 + bw / 2 - 8, y);
    ctx.lineTo(w * 0.5 - bw / 2 + 8, y);
    ctx.closePath();
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.fillText(badge, w / 2, y - h * 0.009);
  }
}

function drawPanelCaption(ctx, rect, panel, w, h) {
  const label = `${panel.place || ''} — ${panel.time || ''} · ${panel.hook || ''}`.trim();
  if (!label || label === '— ·') return;
  // Shrink the type until the whole caption fits inside its panel.
  let fs = Math.max(11, Math.round(w * 0.0115));
  ctx.font = `700 ${fs}px system-ui, sans-serif`;
  while (ctx.measureText(label).width > rect.w - 16 && fs > 8) {
    fs -= 1;
    ctx.font = `700 ${fs}px system-ui, sans-serif`;
  }
  const tw = ctx.measureText(label).width;
  const pad = 8;
  const pw = Math.min(tw + pad * 2, rect.w - 8);
  const ph = fs + 12;
  const px = rect.x + 6;
  // Panels end above the title band, so the caption always sits at the
  // panel foot and is never covered by the band.
  const py = rect.y + rect.h - ph - 6;
  ctx.fillStyle = 'rgba(10,4,16,0.82)';
  ctx.fillRect(px, py, pw, ph);
  ctx.fillStyle = '#ffe9a8';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.save();
  ctx.beginPath();
  ctx.rect(px, py, pw, ph);
  ctx.clip();
  ctx.fillText(label, px + pad, py + ph / 2 + 1);
  ctx.restore();
}

/** Draws the whole cover for `state` onto `canvas` at the canvas's own size. */
export function drawCover(canvas, state) {
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;
  const layout = layoutById(state.layoutId);
  const grade = gradeById(state.gradeId);
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, w, h);
  const gutter = Math.max(3, Math.round(Math.min(w, h) * 0.008));
  const frame = Math.max(4, Math.round(Math.min(w, h) * 0.01));
  const panelAreaTop = frame;
  const panelAreaH = h * 0.74 - frame;
  layout.panels.forEach((p, i) => {
    const rect = {
      x: frame + p[0] * (w - frame * 2) + gutter / 2,
      y: panelAreaTop + p[1] * panelAreaH + gutter / 2,
      w: p[2] * (w - frame * 2) - gutter,
      h: p[3] * panelAreaH - gutter,
    };
    const panel = state.panels[i] || defaultPanels(layout.panels.length)[i];
    const photo = state.photos[panel.photo] || null;
    if (layout.slant) {
      const s = layout.slant * w;
      ctx.save();
      ctx.beginPath();
      ctx.moveTo(rect.x + s, rect.y);
      ctx.lineTo(rect.x + rect.w, rect.y);
      ctx.lineTo(rect.x + rect.w - s, rect.y + rect.h);
      ctx.lineTo(rect.x, rect.y + rect.h);
      ctx.closePath();
      ctx.clip();
      drawPanelPhoto(ctx, rect, photo, panel, grade, state);
      ctx.restore();
      // Outline the slanted panel itself; no line is drawn across its face.
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = Math.max(2, gutter * 0.6);
      ctx.beginPath();
      ctx.moveTo(rect.x + s, rect.y);
      ctx.lineTo(rect.x + rect.w, rect.y);
      ctx.lineTo(rect.x + rect.w - s, rect.y + rect.h);
      ctx.lineTo(rect.x, rect.y + rect.h);
      ctx.closePath();
      ctx.stroke();
    } else {
      drawPanelPhoto(ctx, rect, photo, panel, grade, state);
      ctx.strokeStyle = '#fff';
      ctx.lineWidth = Math.max(2, gutter * 0.6);
      ctx.strokeRect(rect.x, rect.y, rect.w, rect.h);
    }
    drawPanelCaption(ctx, rect, panel, w, h);
  });
  if (state.halftone) drawHalftone(ctx, w, h, grade.halftone * state.strength);
  drawGrain(ctx, w, h, state.grain || 0);
  drawVignette(ctx, w, h, state.vignette || 0);
  drawTitleBlock(ctx, w, h, state);
  drawStarsPill(ctx, w, h, state);
  drawSeal(ctx, w, h);
  drawTaglineStrip(ctx, w, h, state);
  drawBarcode(ctx, w, h, state);
  ctx.strokeStyle = '#000';
  ctx.lineWidth = frame;
  ctx.strokeRect(frame / 2, frame / 2, w - frame, h - frame);
}

/** Panel rectangles in canvas pixels, for click-to-select in the editor. */
export function panelRects(canvas, state) {
  const w = canvas.width;
  const h = canvas.height;
  const layout = layoutById(state.layoutId);
  const gutter = Math.max(3, Math.round(Math.min(w, h) * 0.008));
  const frame = Math.max(4, Math.round(Math.min(w, h) * 0.01));
  const panelAreaTop = frame;
  const panelAreaH = h * 0.74 - frame;
  return layout.panels.map((p) => ({
    x: frame + p[0] * (w - frame * 2) + gutter / 2,
    y: panelAreaTop + p[1] * panelAreaH + gutter / 2,
    w: p[2] * (w - frame * 2) - gutter,
    h: p[3] * panelAreaH - gutter,
  }));
}
