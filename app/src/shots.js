// Fixed scenes for screenshots: ?shot=cover shows the exported cover alone,
// ?shot=editor shows the page with sample photos loaded. window.__shotReady
// is set once the scene has painted, so a screenshot tool can wait on it.
const SCENES = {
  cover: {
    layoutId: 'slash-7', gradeId: 'neon-night',
    size: { w: 1920, h: 1080 },
    title: 'PALM LIGHT', subtitle: 'Low sun, loud streets',
    tagline: 'TWO LANES · ONE SKYLINE · FULL THROTTLE',
    quote: 'CHASING LIGHT DOWN THE PROMENADE',
    coverOnly: true,
  },
  cover2: {
    layoutId: 'hero-left', gradeId: 'vice-sunset',
    size: { w: 1080, h: 1350 },
    title: 'CITY OF PALMS', subtitle: 'Heat on the horizon',
    tagline: 'EVERY STREET ENDS AT THE SEA',
    quote: 'THE CITY KEEPS ITS PROMISES',
    coverOnly: true,
  },
  cover3: {
    layoutId: 'comic-5', gradeId: 'palm-duotone',
    size: { w: 1080, h: 1080 },
    title: 'LAST LIGHT RUN', subtitle: 'Chasing the last light',
    tagline: 'DRIVE FAST · DREAM LOUDER',
    quote: 'GOLD ON THE WATER, PINK IN THE SKY',
    coverOnly: true,
  },
  editor: {
    layoutId: 'grid-9', gradeId: 'golden-hour',
    size: { w: 1080, h: 1080 },
    title: 'CRIMSON PALMS', subtitle: 'Low sun, loud streets',
    tagline: 'TWO LANES · ONE SKYLINE · FULL THROTTLE',
    quote: 'CHASING LIGHT DOWN THE PROMENADE',
    coverOnly: false,
  },
};

// Chip labels, so runShot() can sync the editor's active chips to the
// scene it just set up (layout and grade alike).
const LAYOUT_LABELS = { 'hero-left': 'Hero Left', 'hero-right': 'Hero Right', 'grid-9': 'Grid', 'comic-5': 'Comic', 'slash-7': 'Slash', 'center-7': 'Center', 'mosaic-8': 'Mosaic' };
const GRADE_LABELS = { 'vice-sunset': 'Vice Sunset', 'neon-night': 'Neon Night', 'golden-hour': 'Golden Hour', 'comic-ink': 'Comic Ink', 'noir-heat': 'Noir Heat', 'palm-duotone': 'Palm Duotone' };

export function runShot(shot, query, state, helpers) {
  const scene = SCENES[shot] || SCENES.editor;
  const layout = query.get('layout') || scene.layoutId;
  const grade = query.get('grade') || scene.gradeId;
  state.layoutId = layout;
  state.gradeId = grade;
  state.size = scene.size;
  state.title = query.get('caption') || scene.title;
  state.subtitle = scene.subtitle;
  state.tagline = scene.tagline;
  state.quote = scene.quote;
  const total = state.photos.length + 3;
  // Photos lead; one drawn graphic panel at most in a small cover.
  const pattern = [0, 1, 2, 0, 1, 3, 4, 1, 0];
  state.panels = [];
  const count = { 'hero-left': 6, 'hero-right': 6, 'grid-9': 9, 'comic-5': 5, 'slash-7': 7, 'center-7': 7, 'mosaic-8': 8 }[layout] || 6;
  for (let i = 0; i < count; i++) {
    state.panels.push({
      photo: pattern[i % pattern.length] % total,
      zoom: 1.05,
      ox: 0,
      oy: 0,
      place: ['CORAL ROW', 'MERMAID AVENUE', 'LANTERN PIER', 'ROOFTOP NINE', 'JASMINE LANE', 'COCONUT COURT', 'HARBOUR LIGHTS', 'MANGO WHARF', 'VELVET SAND'][i % 9],
      time: ['8:14 PM', '6:03 PM', '10:26 PM', '5:47 AM', '9:58 PM', '7:31 PM', '11:12 PM', '6:58 PM', '4:44 PM'][i % 9],
      hook: ['ENGINE STILL WARM', 'KEYS IN HAND', 'TIDE COMING IN', 'CITY STILL ASLEEP', 'WRONG TURN, RIGHT NIGHT', 'FRONT SEAT STORIES', 'ONE MORE SONG', 'OFF THE CLOCK', 'LINE IS IN THE WATER'][i % 9],
    });
  }
  const layoutLabel = LAYOUT_LABELS[layout];
  document.querySelectorAll('#layoutRow .chip').forEach((c) => c.classList.toggle('active', !!layoutLabel && c.textContent.includes(layoutLabel)));
  const gradeLabel = GRADE_LABELS[grade];
  document.querySelectorAll('#gradeRow .chip').forEach((c) => c.classList.toggle('active', !!gradeLabel && c.textContent.includes(gradeLabel)));
  if (scene.coverOnly) document.body.classList.add('shot-cover');
  else document.body.classList.add('shot-editor');
  helpers.redraw();
  const statusEl = document.getElementById('status');
  if (statusEl) statusEl.textContent = `Sample photos loaded. ${state.photos.length} photos on this machine. Pick a layout, export PNG.`;
  requestAnimationFrame(() => requestAnimationFrame(() => { window.__shotReady = true; }));
}
