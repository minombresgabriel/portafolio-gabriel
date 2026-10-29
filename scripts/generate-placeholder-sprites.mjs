// Generates the placeholder pixel sprites in /public/sprites.
// Each sprite is a horizontal sprite sheet (frames side by side) drawn on a pixel grid.
// Replace any output file with real art of the same size and frame count — no code changes needed.
//
//   node scripts/generate-placeholder-sprites.mjs

import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUT = join(dirname(fileURLToPath(import.meta.url)), '..', 'public', 'sprites');
mkdirSync(OUT, { recursive: true });

/** A frame is a Map "x,y" -> color. */
function frame(w, h) {
  const px = new Map();
  const api = {
    w,
    h,
    px,
    rect(x, y, rw, rh, color) {
      for (let j = y; j < y + rh; j++) for (let i = x; i < x + rw; i++) if (i >= 0 && j >= 0 && i < w && j < h) px.set(`${i},${j}`, color);
      return api;
    },
    clear(x, y, rw, rh) {
      for (let j = y; j < y + rh; j++) for (let i = x; i < x + rw; i++) px.delete(`${i},${j}`);
      return api;
    },
    /** Shift every pixel with y in [fromY, toY) down by dy. */
    shiftRows(fromY, toY, dy) {
      const moved = [];
      for (const [k, c] of px) {
        const [x, y] = k.split(',').map(Number);
        if (y >= fromY && y < toY) moved.push([x, y, c]);
      }
      for (const [x, y] of moved) px.delete(`${x},${y}`);
      for (const [x, y, c] of moved) px.set(`${x},${y + dy}`, c);
      return api;
    },
    clone() {
      const f = frame(w, h);
      for (const [k, c] of px) f.px.set(k, c);
      return f;
    },
  };
  return api;
}

/** Serialize frames into one SVG sheet: one <path> per color, horizontal runs as h/v segments. */
function sheet(name, frames) {
  const { w, h } = frames[0];
  const byColor = new Map();
  frames.forEach((f, n) => {
    for (let y = 0; y < h; y++) {
      let x = 0;
      while (x < w) {
        const c = f.px.get(`${x},${y}`);
        if (!c) {
          x++;
          continue;
        }
        let run = 1;
        while (f.px.get(`${x + run},${y}`) === c) run++;
        const d = byColor.get(c) ?? [];
        d.push(`M${n * w + x} ${y}h${run}v1h-${run}z`);
        byColor.set(c, d);
        x += run;
      }
    }
  });
  const paths = [...byColor].map(([c, d]) => `<path fill="${c}" d="${d.join('')}"/>`).join('');
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${w * frames.length}" height="${h}" viewBox="0 0 ${w * frames.length} ${h}" shape-rendering="crispEdges">${paths}</svg>
`;
  writeFileSync(join(OUT, name), svg);
  console.log(`${name}: ${frames.length} frame(s) of ${w}x${h}`);
}

// ---------------------------------------------------------------------------
// player-idle.svg — Gabriel: slicked-back hair, black hoodie, laptop. 4 frames 32x48.
// ---------------------------------------------------------------------------
{
  const C = {
    hair: '#15101c',
    hairHi: '#3b3350',
    skin: '#c98a5e',
    skinSh: '#a06a45',
    eye: '#15101c',
    hood: '#1c1a24',
    hoodHi: '#302c3e',
    string: '#e6e0f0',
    lid: '#9aa0b4',
    lidSh: '#5d6278',
    glow: '#3fe0ff',
    pants: '#2a3350',
    shoe: '#0e0c12',
  };

  const base = frame(32, 48)
    // hair, slicked back
    .rect(11, 2, 10, 1, C.hair)
    .rect(10, 3, 12, 4, C.hair)
    .rect(13, 3, 5, 1, C.hairHi)
    .rect(12, 4, 3, 1, C.hairHi)
    .rect(10, 7, 1, 3, C.hair)
    .rect(21, 7, 1, 3, C.hair)
    // face
    .rect(11, 6, 10, 9, C.skin)
    .rect(11, 7, 1, 7, C.skinSh)
    .rect(12, 14, 8, 1, C.skinSh)
    .rect(13, 8, 2, 1, C.hair)
    .rect(17, 8, 2, 1, C.hair)
    .rect(13, 10, 1, 2, C.eye)
    .rect(18, 10, 1, 2, C.eye)
    .rect(16, 12, 1, 1, C.skinSh)
    .rect(15, 13, 2, 1, C.skinSh)
    // neck + hood
    .rect(14, 15, 4, 1, C.skin)
    .rect(12, 15, 2, 2, C.hoodHi)
    .rect(18, 15, 2, 2, C.hoodHi)
    // hoodie body
    .rect(9, 16, 14, 19, C.hood)
    .rect(8, 17, 16, 17, C.hood)
    .rect(10, 17, 1, 16, C.hoodHi)
    .rect(14, 17, 1, 4, C.string)
    .rect(17, 17, 1, 4, C.string)
    // arms
    .rect(6, 18, 3, 12, C.hood)
    .rect(23, 18, 3, 12, C.hood)
    .rect(6, 18, 1, 11, C.hoodHi)
    // laptop (back of the lid faces us)
    .rect(9, 21, 14, 9, C.lid)
    .rect(9, 21, 14, 1, C.lidSh)
    .rect(9, 29, 14, 1, C.lidSh)
    .rect(15, 24, 2, 2, C.glow)
    .rect(7, 30, 18, 2, C.lidSh)
    // hands
    .rect(7, 28, 2, 2, C.skin)
    .rect(23, 28, 2, 2, C.skin)
    // legs + shoes
    .rect(10, 35, 12, 10, C.pants)
    .clear(15, 39, 2, 6)
    .rect(9, 45, 6, 2, C.shoe)
    .rect(17, 45, 6, 2, C.shoe);

  const breathe = base.clone().shiftRows(0, 35, 1).rect(10, 35, 12, 1, C.pants);
  const blink = base.clone().clear(13, 10, 1, 2).clear(18, 10, 1, 2).rect(13, 11, 1, 1, C.eye).rect(18, 11, 1, 1, C.eye).rect(13, 10, 1, 1, C.skin).rect(18, 10, 1, 1, C.skin);

  sheet('player-idle.svg', [base, breathe, base, blink]);

  // player-walk.svg — same pose, legs alternate. Shown while moving on the map.
  const stride = (leftUp, rightUp) =>
    base
      .clone()
      .clear(9, 35, 14, 13)
      .rect(10, 35, 12, 4, C.pants)
      .rect(10, 39 - leftUp, 5, 6, C.pants)
      .rect(17, 39 - rightUp, 5, 6, C.pants)
      .rect(9, 45 - leftUp, 6, 2, C.shoe)
      .rect(17, 45 - rightUp, 6, 2, C.shoe);
  sheet('player-walk.svg', [stride(2, 0), base, stride(0, 2), base]);
}

// ---------------------------------------------------------------------------
// Helpers for ASCII-drawn sprites
// ---------------------------------------------------------------------------

const OUTLINE = '#07041a';

/** Draw a frame from rows of chars. `palette` maps chars to colors; '.' is transparent, 'k' is the outline. */
function ascii(rows, palette, name) {
  const w = rows[0].length;
  rows.forEach((r, i) => {
    if (r.length !== w) throw new Error(`${name}: row ${i} has width ${r.length}, expected ${w}`);
  });
  const f = frame(w, rows.length);
  rows.forEach((row, y) =>
    [...row].forEach((ch, x) => {
      if (ch === '.') return;
      const color = ch === 'k' ? OUTLINE : palette[ch];
      if (!color) throw new Error(`${name}: no color for "${ch}"`);
      f.px.set(`${x},${y}`, color);
    }),
  );
  return f;
}

/** Nearest-neighbour upscale. */
function scale(f, k) {
  const out = frame(f.w * k, f.h * k);
  for (const [key, c] of f.px) {
    const [x, y] = key.split(',').map(Number);
    out.rect(x * k, y * k, k, k, c);
  }
  return out;
}

function sheetIn(dir, name, frames) {
  mkdirSync(join(OUT, dir), { recursive: true });
  sheet(`${dir}/${name}`, frames);
}

// 16×16 shapes. 1 = main, 2 = shade, 3 = highlight, 4 = accent, k = outline.
const SHAPES = {
  sword: [
    '................',
    '............kkk.',
    '...........k33k.',
    '..........k31k..',
    '.........k31k...',
    '........k31k....',
    '.......k31k.....',
    '..kk..k31k......',
    '..k4kk31k.......',
    '...k441k........',
    '....k44k........',
    '...k4kk4k.......',
    '..k4k..kk.......',
    '.k4k............',
    '.kk.............',
    '................',
  ],
  shield: [
    '................',
    '..kkkkkkkkkkkk..',
    '..k1111111122k..',
    '..k1311111122k..',
    '..k1311441122k..',
    '..k1314444122k..',
    '..k1311441122k..',
    '..k1311441122k..',
    '..k1111111122k..',
    '...k11111122k...',
    '...k11111122k...',
    '....k111122k....',
    '.....k1122k.....',
    '......k12k......',
    '.......kk.......',
    '................',
  ],
  potion: [
    '................',
    '......kkkk......',
    '......k33k......',
    '.......kk.......',
    '......k11k......',
    '.....k1111k.....',
    '....k131111k....',
    '...k13111111k...',
    '...k14444444k...',
    '...k14444444k...',
    '...k14444442k...',
    '...k14444422k...',
    '....k444222k....',
    '.....kkkkkk.....',
    '................',
    '................',
  ],
  gem: [
    '................',
    '................',
    '....kkkkkkkk....',
    '...k33111122k...',
    '..k3311111222k..',
    '.kkkkkkkkkkkkkk.',
    '.k311111111222k.',
    '..k3111111122k..',
    '...k31111122k...',
    '....k311122k....',
    '.....k3112k.....',
    '......k12k......',
    '.......kk.......',
    '................',
    '................',
    '................',
  ],
  database: [
    '................',
    '....kkkkkkkk....',
    '...k33333333k...',
    '...k11111111k...',
    '...kk111111kk...',
    '...k3kkkkkk2k...',
    '...k31111112k...',
    '...kk111111kk...',
    '...k3kkkkkk2k...',
    '...k31111112k...',
    '...kk111111kk...',
    '...k3kkkkkk2k...',
    '...k31111112k...',
    '....kkkkkkkk....',
    '................',
    '................',
  ],
  orb: [
    '................',
    '.....kkkkkk.....',
    '....k111111k....',
    '...k13311111k...',
    '..k1331111112k..',
    '..k1311111112k..',
    '..k1111111122k..',
    '..k1111111122k..',
    '..k1111111222k..',
    '..k1111112222k..',
    '...k11122222k...',
    '....k222222k....',
    '.....kkkkkk.....',
    '................',
    '................',
    '................',
  ],
  card: [
    '................',
    '................',
    '................',
    '.kkkkkkkkkkkkkk.',
    '.k333333333333k.',
    '.k111111111111k.',
    '.kkkkkkkkkkkkkk.',
    '.k222222222222k.',
    '.k244222222222k.',
    '.k244222222222k.',
    '.k222222211112k.',
    '.k222222222222k.',
    '.kkkkkkkkkkkkkk.',
    '................',
    '................',
    '................',
  ],
  gear: [
    '................',
    '.......kk.......',
    '...kk.k11k.kk...',
    '...k1k1111k1k...',
    '....k111111k....',
    '..kk11kkkk11kk..',
    '.k111k3333k111k.',
    '.k11k3....3k11k.',
    '.k11k3....3k11k.',
    '.k111k3333k111k.',
    '..kk11kkkk11kk..',
    '....k111111k....',
    '...k1k1111k1k...',
    '...kk.k11k.kk...',
    '.......kk.......',
    '................',
  ],
  book: [
    '................',
    '..kkkkkkkkkkk...',
    '..k3111111112k..',
    '..k3111441112k..',
    '..k3114444112k..',
    '..k3111441112k..',
    '..k3111111112k..',
    '..k3111111112k..',
    '..k3111111112k..',
    '..k3111111112k..',
    '..k3111111112k..',
    '..kkkkkkkkkkkk..',
    '..k3333333333k..',
    '...kkkkkkkkkkk..',
    '................',
    '................',
  ],
  chip: [
    '................',
    '...k.k.k.k.k....',
    '...k.k.k.k.k....',
    '.kkkkkkkkkkkkk..',
    '.k11111111111k..',
    'kk13333333331kk.',
    '.k13444444431k..',
    'kk13411111431kk.',
    '.k13411111431k..',
    'kk13444444431kk.',
    '.k13333333331k..',
    '.k11111111111k..',
    '.kkkkkkkkkkkkk..',
    '...k.k.k.k.k....',
    '...k.k.k.k.k....',
    '................',
  ],
  flow: [
    '................',
    '................',
    '.kkkk......kkkk.',
    '.k11k......k44k.',
    '.k11kkkkkkkk44k.',
    '.k11k......k44k.',
    '.kkkk..k...kkkk.',
    '.......k........',
    '....kkkkkkk.....',
    '....k33333k.....',
    '....k33333k.....',
    '....kkkkkkk.....',
    '................',
    '................',
    '................',
    '................',
  ],
  globe: [
    '................',
    '.....kkkkkk.....',
    '...kk1k11k1kk...',
    '..k11k1111k11k..',
    '..k1k111111k1k..',
    '.kkkkkkkkkkkkkk.',
    '.k1k11111111k1k.',
    '.k1k11111111k1k.',
    '.kkkkkkkkkkkkkk.',
    '..k1k111111k1k..',
    '..k11k1111k11k..',
    '...kk1k11k1kk...',
    '.....kkkkkk.....',
    '................',
    '................',
    '................',
  ],
  trophy: [
    '................',
    '..kkkkkkkkkkkk..',
    '.kk3111111122kk.',
    'k.k3111111122k.k',
    'k.k3111111122k.k',
    '.kk3111111122kk.',
    '...k31111122k...',
    '....k311122k....',
    '.....kk12kk.....',
    '......k12k......',
    '......k12k......',
    '....kkkkkkkk....',
    '....k222222k....',
    '....kkkkkkkk....',
    '................',
    '................',
  ],
  ghost: [
    '................',
    '.....kkkkkk.....',
    '....k333333k....',
    '...k33333333k...',
    '...k3kk33kk3k...',
    '...k3kk33kk3k...',
    '...k33333333k...',
    '...k33344333k...',
    '...k33333333k...',
    '...k33333333k...',
    '...k33333333k...',
    '...k3k33k33kk...',
    '...kk.kk.kk.....',
    '................',
    '................',
    '................',
  ],
  cube: [
    '................',
    '.......kk.......',
    '.....kk33kk.....',
    '...kk333333kk...',
    '..k3333333333k..',
    '..k1133333322k..',
    '..k1111kk2222k..',
    '..k1111k22222k..',
    '..k1111k22222k..',
    '..k1111k22222k..',
    '..k1111k22222k..',
    '...kk11k222kk...',
    '.....kk.2kk.....',
    '.......kk.......',
    '................',
    '................',
  ],
  tv: [
    '................',
    '.....k....k.....',
    '......k..k......',
    '.......kk.......',
    '.kkkkkkkkkkkkkk.',
    '.k222222222222k.',
    '.k2kkkkkkkk2k2k.',
    '.k2k333111k242k.',
    '.k2k331111k222k.',
    '.k2k311111k242k.',
    '.k2kkkkkkkk222k.',
    '.k222222222222k.',
    '.kkkkkkkkkkkkkk.',
    '..kk........kk..',
    '................',
    '................',
  ],
  ball: [
    '................',
    '.....kkkkkk.....',
    '....k33kk33k....',
    '...k33kkkk33k...',
    '..k333kkkk333k..',
    '..kk33333333kk..',
    '..kkk333333kkk..',
    '..kk33333333kk..',
    '..k333kkkk333k..',
    '...k3kkkkkk3k...',
    '....k3kkkk3k....',
    '.....kkkkkk.....',
    '................',
    '................',
    '................',
    '................',
  ],
  bubble: [
    '................',
    '.kkkkkkkkkkkkk..',
    '.k33333333333k..',
    '.k3kk3k3kk333k..',
    '.k3333333kkk3k..',
    '.k3kkk3kk3333k..',
    '.k33333333333k..',
    '.kkkk3kkkkkkkk..',
    '....k3k.kkkkkkk.',
    '....kk..k44444k.',
    '........k4kk44k.',
    '........k44444k.',
    '........kkkkk4k.',
    '............kk..',
    '................',
    '................',
  ],
  lock: [
    '................',
    '.....kkkkkk.....',
    '....k222222k....',
    '....k2kkkk2k....',
    '....k2k..k2k....',
    '....k2k..k2k....',
    '..kkkkkkkkkkkk..',
    '..k3333333333k..',
    '..k3111kk1112k..',
    '..k3111kk1112k..',
    '..k31111k1112k..',
    '..k3111111112k..',
    '..k2222222222k..',
    '..kkkkkkkkkkkk..',
    '................',
    '................',
  ],
  hydra: [
    '.kk.....kk....kk',
    'k14k...k14k..k14',
    'k11k...k11k..k11',
    '.k1k...k1k...k1k',
    '.k1k...k1k...k1k',
    '..k1k..k1k..k1k.',
    '..k1k..k1k..k1k.',
    '...k1kk111kk1k..',
    '...k1111111111k.',
    '..k11122222111k.',
    '..k1122222221k..',
    '..k1222222221k..',
    '..k1222222221k..',
    '..k1111111111k..',
    '...k11k..k11k...',
    '...kkk...kkk....',
  ],
  switchMonster: [
    '..k..........k..',
    '..kk........kk..',
    '..k2k......k2k..',
    '...k2kkkkkk2k...',
    '..k1111111111k..',
    '..k1144111441k..',
    '..k1144111441k..',
    '..k1111111111k..',
    '.kk1kkkkkkkk1kk.',
    'k11k14141414k11k',
    'k11k1kkkkkk1k11k',
    '.kk.k333333k.kk.',
    '....k333333k....',
    '....k33kk33k....',
    '....kkk..kkk....',
    '................',
  ],
};

const pal = (main, shade, hi, accent) => ({ 1: main, 2: shade, 3: hi, 4: accent });

// ---------------------------------------------------------------------------
// Inventory items — 16×16, 1 frame. /public/sprites/items/<id>.svg
// ---------------------------------------------------------------------------
const ITEMS = {
  nestjs: ['sword', pal('#c9ced8', '#7b8294', '#ffffff', '#e8457a')],
  nodejs: ['shield', pal('#4ea24a', '#2d6b2b', '#8fdc6f', '#f6eedd')],
  typescript: ['book', pal('#3178c6', '#1f4f88', '#7fb2ee', '#f6eedd')],
  prisma: ['gem', pal('#5a67d8', '#2e3a8c', '#a3b0ff', '#ffffff')],
  postgresql: ['database', pal('#3e6ea8', '#24456e', '#8fb6e6', '#ffffff')],
  redis: ['cube', pal('#c8372d', '#7e1f19', '#ff7a6b', '#ffffff')],
  react: ['orb', pal('#3fe0ff', '#1a8aa8', '#c4f6ff', '#ffffff')],
  nextjs: ['shield', pal('#3a3a46', '#1c1c24', '#7a7a88', '#f6eedd')],
  redux: ['gear', pal('#8a5cd6', '#563394', '#c4a6ff', '#ffffff')],
  tailwind: ['potion', pal('#9de8ff', '#4fb0d0', '#e6fbff', '#38bdf8')],
  wordpress: ['globe', pal('#3d7fb8', '#24507a', '#8fc1ea', '#ffffff')],
  stripe: ['card', pal('#7d6bf0', '#4b3db0', '#b9afff', '#ffd23f')],
  paypal: ['card', pal('#2f6fd1', '#1c4488', '#86b2f5', '#ffd23f')],
  klarna: ['card', pal('#f5a3c0', '#c0668a', '#ffd6e5', '#ffd23f')],
  '3ds': ['lock', pal('#ffd23f', '#b8860b', '#fff1a8', '#ffffff')],
  bnpl: ['orb', pal('#ffb84d', '#c0782a', '#ffe1a8', '#ffffff')],
  llms: ['chip', pal('#2b9e74', '#1a5e46', '#7ee8be', '#4ee88a')],
  n8n: ['flow', pal('#e8457a', '#a32a55', '#ff8a2b', '#ffd23f')],
};

for (const [id, [shape, colors]] of Object.entries(ITEMS)) {
  sheetIn('items', `${id}.svg`, [ascii(SHAPES[shape], colors, id)]);
}

// ---------------------------------------------------------------------------
// Achievements — 16×16, 1 frame. /public/sprites/achievements/<id>.svg
// ---------------------------------------------------------------------------
const ACHIEVEMENTS = {
  'payment-wizard': ['trophy', pal('#ffd23f', '#b8860b', '#fff1a8', '#ffffff')],
  ghostbuster: ['ghost', pal('#ffffff', '#c4c0d8', '#f6eedd', '#e8457a')],
  'printer-master': ['cube', pal('#ff8a2b', '#b85a10', '#ffc48a', '#ffffff')],
  'on-screen': ['tv', pal('#3fe0ff', '#4a3a6e', '#c4f6ff', '#e8457a')],
  golazo: ['ball', pal('#ffffff', '#c4c0d8', '#f6eedd', '#ffffff')],
  international: ['globe', pal('#3fe0ff', '#1a8aa8', '#c4f6ff', '#ffffff')],
  'bilingual-boss': ['bubble', pal('#ffffff', '#c4c0d8', '#f6eedd', '#ffd23f')],
  locked: ['lock', pal('#5d5878', '#3a3550', '#8a84a8', '#ffffff')],
};

for (const [id, [shape, colors]] of Object.entries(ACHIEVEMENTS)) {
  sheetIn('achievements', `${id}.svg`, [ascii(SHAPES[shape], colors, id)]);
}

// ---------------------------------------------------------------------------
// Bosses — 48×48, 2 frames (idle + bob with eye flash). /public/sprites/bosses/<id>.svg
// ---------------------------------------------------------------------------
const BOSSES = {
  'boss-400': ['switchMonster', pal('#6a3aa8', '#3d1f6e', '#ffd23f', '#ffd23f'), '#e8457a'],
  'boss-ghost': ['ghost', pal('#e6e0f0', '#9a94b8', '#e6e0f0', '#e8457a'), '#3fe0ff'],
  'boss-3ds': ['lock', pal('#8a2a3a', '#4e1420', '#c84a5a', '#ffd23f'), '#ff8a2b'],
  'boss-hydra': ['hydra', pal('#3f9a3a', '#2a6a2c', '#8fdc6f', '#ffd23f'), '#e8457a'],
  'quest-ai': ['chip', pal('#2b9e74', '#1a5e46', '#7ee8be', '#4ee88a'), '#3fe0ff'],
};

for (const [id, [shape, colors, flash]] of Object.entries(BOSSES)) {
  const idle = scale(ascii(SHAPES[shape], colors, id), 3);
  const alt = scale(ascii(SHAPES[shape], { ...colors, 4: flash }, id), 3).shiftRows(0, 48, -2);
  sheetIn('bosses', `${id}.svg`, [idle, alt]);
}

// ---------------------------------------------------------------------------
// map-venezuela.svg — 320×240 world map: Venezuela + an inset of Spain (top-right).
// Node positions in components/game/screens/StoryMapScreen.tsx use this same 320×240 grid.
// ---------------------------------------------------------------------------
{
  const CELL = 2;
  const map = frame(320, 240);

  const venezuela = [
    [-72.2, 11.1], [-71.9, 11.6], [-71.3, 11.8], [-71.0, 11.0], [-70.2, 11.4], [-70.0, 12.2],
    [-69.8, 11.6], [-68.4, 10.9], [-67.0, 10.6], [-66.0, 10.6], [-64.3, 10.6], [-63.8, 10.7],
    [-62.3, 10.7], [-62.0, 10.1], [-61.6, 9.8], [-60.8, 8.6], [-60.0, 8.5], [-60.6, 7.0],
    [-61.4, 5.9], [-60.7, 5.2], [-60.0, 5.0], [-61.0, 4.5], [-62.7, 4.0], [-63.5, 3.9],
    [-64.2, 4.1], [-64.8, 4.0], [-64.0, 2.5], [-63.4, 2.2], [-64.0, 1.5], [-65.0, 0.9],
    [-66.8, 0.7], [-67.3, 2.0], [-67.8, 2.8], [-67.6, 5.5], [-67.8, 6.2], [-69.4, 6.1],
    [-70.1, 7.0], [-71.0, 7.0], [-72.0, 7.3], [-72.4, 8.0], [-72.3, 9.0], [-73.0, 9.4],
    [-72.9, 10.4],
  ].map(([lon, lat]) => [(lon + 74) * 15 + 20, (12.6 - lat) * 15 + 30]);

  const insetX = (lon) => 250 + (lon + 10) * 4.3;
  const insetY = (lat) => 14 + (44 - lat) * 4.3;
  const spain = [
    [-8.9, 42.0], [-9.3, 43.0], [-8.0, 43.7], [-5.8, 43.6], [-3.5, 43.5], [-1.8, 43.4], [0.0, 42.7],
    [3.2, 42.4], [3.2, 41.9], [0.9, 41.0], [0.0, 39.9], [-0.3, 39.0], [0.2, 38.7], [-0.7, 37.6],
    [-2.0, 36.7], [-4.4, 36.7], [-5.6, 36.0], [-6.4, 36.8], [-7.4, 37.2], [-7.0, 38.0], [-7.3, 39.5],
    [-6.9, 41.0], [-8.2, 41.9],
  ].map(([lon, lat]) => [insetX(lon), insetY(lat)]);
  const portugal = [
    [-8.9, 42.0], [-8.2, 41.9], [-6.9, 41.0], [-7.3, 39.5], [-7.0, 38.0], [-7.4, 37.2], [-8.9, 37.0],
    [-8.8, 38.7], [-9.5, 38.8], [-8.7, 40.6],
  ].map(([lon, lat]) => [insetX(lon), insetY(lat)]);

  const inside = (poly, x, y) => {
    let hit = false;
    for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
      const [xi, yi] = poly[i];
      const [xj, yj] = poly[j];
      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) hit = !hit;
    }
    return hit;
  };
  const r = rngFor(11);
  function rngFor(seed) {
    let a = seed;
    return () => {
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // Ocean with sparse wave pixels
  map.rect(0, 0, 320, 240, '#16285e');
  for (let y = 4; y < 240; y += 8) {
    for (let x = (y / 8) % 2 ? 6 : 2; x < 320; x += 16) {
      if (r() < 0.45) map.rect(x, y, 4, 1, '#22397a');
    }
  }

  // Land cells
  const land = new Set();
  for (let y = 0; y < 240; y += CELL) for (let x = 0; x < 320; x += CELL) if (inside(venezuela, x + 1, y + 1)) land.add(`${x},${y}`);
  const lake = (x, y) => ((x - 56) / 8) ** 2 + ((y - 76) / 13) ** 2 < 1 || (x > 53 && x < 59 && y > 52 && y < 66);
  const river = [];
  const riverPts = [[-67.6, 5.8], [-66.6, 7.4], [-65.0, 7.7], [-63.5, 8.0], [-62.3, 8.5], [-61.2, 8.7]].map(([lon, lat]) => [(lon + 74) * 15 + 20, (12.6 - lat) * 15 + 30]);
  for (let i = 0; i < riverPts.length - 1; i++) {
    const [ax, ay] = riverPts[i];
    const [bx, by] = riverPts[i + 1];
    for (let t = 0; t <= 1; t += 0.02) river.push(`${Math.floor((ax + (bx - ax) * t) / CELL) * CELL},${Math.floor((ay + (by - ay) * t) / CELL) * CELL}`);
  }
  const riverSet = new Set(river);

  for (const key of land) {
    const [x, y] = key.split(',').map(Number);
    const coast = !land.has(`${x - CELL},${y}`) || !land.has(`${x + CELL},${y}`) || !land.has(`${x},${y - CELL}`) || !land.has(`${x},${y + CELL}`);
    let color = y > 110 && x > 120 ? '#2f7d33' : '#3f9a3a';
    // Andes / coastal range (El Ávila) as brown highlands
    if ((x < 70 && y > 80 && y < 125 && Math.abs(x - (130 - y * 0.75)) < 10) || (y < 66 && x > 95 && x < 160)) color = '#8a6a3a';
    if (r() < 0.12) color = color === '#8a6a3a' ? '#a8854a' : '#5cbf48';
    if (coast) color = '#e8d48a';
    if (lake(x, y) || riverSet.has(key)) color = '#2c56b0';
    map.rect(x, y, CELL, CELL, color);
  }

  // Spain inset frame
  map.rect(244, 8, 72, 58, '#07041a');
  map.rect(246, 10, 68, 54, '#1b3170');
  for (let y = 10; y < 64; y += CELL) {
    for (let x = 246; x < 314; x += CELL) {
      if (inside(spain, x + 1, y + 1)) map.rect(x, y, CELL, CELL, '#3f9a3a');
      else if (inside(portugal, x + 1, y + 1)) map.rect(x, y, CELL, CELL, '#2e6a4a');
    }
  }

  sheet('map-venezuela.svg', [map]);
}
