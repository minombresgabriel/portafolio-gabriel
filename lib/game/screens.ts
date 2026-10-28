import { BOSS_ORDER, WORLD_ORDER, type BossId, type WorldId } from '@/content/game';

/** Every screen the game can show. Boot is an overlay, not a screen. */
export type Screen =
  | { id: 'title' }
  | { id: 'menu' }
  | { id: 'player-card' }
  | { id: 'story-map' }
  | { id: 'world'; world: WorldId }
  | { id: 'boss'; boss: BossId }
  | { id: 'achievements' }
  | { id: 'inventory' }
  | { id: 'multiplayer' };

export type ScreenId = Screen['id'];

export const TITLE: Screen = { id: 'title' };

const SIMPLE_HASHES = {
  menu: 'menu',
  'player-card': 'player-card',
  'story-map': 'story',
  achievements: 'achievements',
  inventory: 'inventory',
  multiplayer: 'multiplayer',
} as const satisfies Partial<Record<ScreenId, string>>;

type SimpleId = keyof typeof SIMPLE_HASHES;

/** World IDs are `w1`…`w7`; their hashes are `world-1`…`world-7`. */
const worldHash = (world: WorldId) => `world-${world.slice(1)}`;

export function screenToHash(screen: Screen): string {
  switch (screen.id) {
    case 'title':
      return '';
    case 'world':
      return worldHash(screen.world);
    case 'boss':
      return screen.boss;
    default:
      return SIMPLE_HASHES[screen.id];
  }
}

export function hashToScreen(rawHash: string): Screen {
  const hash = rawHash.replace(/^#/, '');
  if (!hash) return TITLE;

  const simple = (Object.keys(SIMPLE_HASHES) as SimpleId[]).find((id) => SIMPLE_HASHES[id] === hash);
  if (simple) return { id: simple };

  const world = WORLD_ORDER.find((w) => worldHash(w) === hash);
  if (world) return { id: 'world', world };

  const boss = BOSS_ORDER.find((b) => b === hash);
  if (boss) return { id: 'boss', boss };

  return TITLE;
}

/** Where Esc / B takes you from each screen. */
export function parentOf(screen: Screen): Screen | null {
  switch (screen.id) {
    case 'title':
      return null;
    case 'menu':
      return TITLE;
    case 'world':
      return { id: 'story-map' };
    case 'boss':
      return { id: 'world', world: 'w6' };
    default:
      return { id: 'menu' };
  }
}

export function sameScreen(a: Screen, b: Screen): boolean {
  return screenToHash(a) === screenToHash(b);
}
