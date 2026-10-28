'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { shared, WORLD_ORDER, type WorldId } from '@/content/game';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useNavigation } from '@/lib/game/navigation';
import { useGameControls } from '@/lib/game/useGameControls';
import ControlHints from '../ui/ControlHints';
import PixelIcon from '../ui/PixelIcon';
import Sprite from '../ui/Sprite';

/** Map art is a 320×240 grid (public/sprites/map-venezuela.svg); positions use the same units. */
const MAP_W = 320;
const MAP_H = 240;
type Point = [number, number];

const CARACAS: Point = [126, 62];
const SPAIN_LABEL: Point = [280, 58];

const NODES: Record<WorldId, Point> = {
  w1: CARACAS,
  w2: [100, 88],
  w3: [298, 27], // Tarragona, in the Spain inset
  w4: [150, 102],
  w5: [182, 86],
  w6: [202, 124],
  w7: [176, 180],
};

/** Route from each world to the next (index i → i+1). The w2 → w3 → w4 legs cross the ocean. */
const ROUTES: Point[][] = [
  [NODES.w1, NODES.w2],
  [NODES.w2, [112, 50], [180, 26], [246, 22], NODES.w3],
  [NODES.w3, [282, 66], [214, 80], NODES.w4],
  [NODES.w4, NODES.w5],
  [NODES.w5, NODES.w6],
  [NODES.w6, NODES.w7],
];

const OCEAN_LEGS = new Set([1, 2]);

const pct = ([x, y]: Point) => ({ left: `${(x / MAP_W) * 100}%`, top: `${(y / MAP_H) * 100}%` });

function initialWorld(previous: ReturnType<typeof useNavigation>['previous']): number {
  if (previous?.id === 'world') return WORLD_ORDER.indexOf(previous.world);
  if (previous?.id === 'boss') return WORLD_ORDER.indexOf('w6');
  return 0;
}

export default function StoryMapScreen() {
  const { c } = useLanguage();
  const { go, previous } = useNavigation();
  const reduce = useReducedMotion();
  const [cursor, setCursor] = useState(() => initialWorld(previous));
  const [path, setPath] = useState<Point[]>([NODES[WORLD_ORDER[cursor]]]);
  const [walking, setWalking] = useState(false);
  const listRefs = useRef<(HTMLButtonElement | null)[]>([]);

  useEffect(() => {
    listRefs.current[cursor]?.focus();
    // Focus the restored cursor once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const moveTo = (next: number, focus = true) => {
    if (next < 0 || next >= WORLD_ORDER.length || next === cursor) return;
    const from = NODES[WORLD_ORDER[cursor]];
    const to = NODES[WORLD_ORDER[next]];
    // One step follows the drawn route; bigger jumps walk straight there.
    const route = Math.abs(next - cursor) === 1 ? ROUTES[Math.min(cursor, next)] : [from, to];
    setPath(next > cursor ? route : [...route].reverse());
    setCursor(next);
    if (focus) listRefs.current[next]?.focus();
  };

  const open = (i: number) => go({ id: 'world', world: WORLD_ORDER[i] });

  useGameControls({
    left: () => moveTo(cursor - 1),
    up: () => moveTo(cursor - 1),
    right: () => moveTo(cursor + 1),
    down: () => moveTo(cursor + 1),
    confirm: () => open(cursor),
  });

  const current = WORLD_ORDER[cursor];
  const world = c.story.worlds[current];
  const target = path[path.length - 1];

  return (
    <div className="absolute inset-0 flex flex-col gap-[2.5cqh] px-[var(--gutter)] pt-[7cqh] pb-[3cqh]">
      <h1 className="sr-only">{c.story.heading}</h1>

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_24%] gap-[2.5cqw]">
        {/* Map */}
        <div className="pixel-panel relative flex min-h-0 items-center justify-center overflow-hidden bg-[#16285e]">
          <div className="relative aspect-[4/3] max-h-full w-full">
            {/* eslint-disable-next-line @next/next/no-img-element -- pixel map art, must not be resampled */}
            <img src="/sprites/map-venezuela.svg" alt="" aria-hidden="true" draggable={false} className="pixelated absolute inset-0 h-full w-full" />

            {/* Routes */}
            <svg viewBox={`0 0 ${MAP_W} ${MAP_H}`} className="absolute inset-0 h-full w-full" aria-hidden="true">
              {ROUTES.map((route, i) => (
                <polyline
                  key={i}
                  points={route.map((p) => p.join(',')).join(' ')}
                  fill="none"
                  stroke={OCEAN_LEGS.has(i) ? '#f6eedd' : '#ffd23f'}
                  strokeOpacity={i === ROUTES.length - 1 ? 0.35 : 0.9}
                  strokeWidth={1.5}
                  strokeDasharray="2 3"
                  shapeRendering="crispEdges"
                />
              ))}
            </svg>

            {/* Labels */}
            <span
              className="absolute -translate-x-1/2 translate-y-[0.9em] font-pixel text-[length:var(--fs-small)] text-cream [text-shadow:0_0.15em_0_#07041a]"
              style={pct(CARACAS)}
              aria-hidden="true"
            >
              ★ {c.story.mapLegendHome}
            </span>
            <span
              className="absolute -translate-x-1/2 font-pixel text-[length:clamp(6px,1.1cqw,11px)] text-cream [text-shadow:0_0.15em_0_#07041a]"
              style={pct(SPAIN_LABEL)}
              aria-hidden="true"
            >
              {c.story.mapLegendAbroad}
            </span>

            {/* Level nodes (pointer shortcut; the year list is the accessible control) */}
            {WORLD_ORDER.map((id, i) => {
              const locked = c.story.worlds[id].locked;
              const active = i === cursor;
              return (
                <button
                  key={id}
                  type="button"
                  tabIndex={-1}
                  aria-hidden="true"
                  onClick={() => (active ? open(i) : moveTo(i))}
                  className={`absolute flex h-[7%] w-[5.25%] -translate-x-1/2 -translate-y-1/2 items-center justify-center font-pixel text-[length:clamp(6px,1.2cqw,12px)] ${
                    active ? 'bg-gold text-night-950' : locked ? 'bg-night-700 text-muted' : 'bg-sunset text-night-950'
                  } shadow-[0_0_0_2px_#07041a]`}
                  style={pct(NODES[id])}
                >
                  {locked ? <PixelIcon src="/sprites/achievements/locked.svg" className="h-[80%] w-auto" /> : i + 1}
                </button>
              );
            })}

            {/* The player walks the route */}
            <motion.div
              className="pointer-events-none absolute w-[8%] -translate-x-1/2 -translate-y-full"
              initial={false}
              animate={{
                left: path.map((p) => pct(p).left),
                top: path.map((p) => pct(p).top),
              }}
              transition={reduce ? { duration: 0 } : { duration: 0.25 * Math.max(1, path.length - 1), ease: 'linear' }}
              onAnimationStart={() => setWalking(!reduce)}
              onAnimationComplete={() => setWalking(false)}
              style={pct(target)}
            >
              <Sprite
                src={walking ? '/sprites/player-walk.svg' : '/sprites/player-idle.svg'}
                frameWidth={32}
                frameHeight={48}
                frames={4}
                fps={walking ? 8 : 3}
                className="w-full"
              />
            </motion.div>
          </div>
        </div>

        {/* Year list */}
        <ol className="pixel-panel flex min-h-0 flex-col justify-between px-[0.8em] py-[1em]" aria-label={c.story.heading}>
          {WORLD_ORDER.map((id, i) => {
            const w = c.story.worlds[id];
            const active = i === cursor;
            return (
              <li key={id}>
                <button
                  ref={(el) => {
                    listRefs.current[i] = el;
                  }}
                  type="button"
                  tabIndex={active ? 0 : -1}
                  aria-current={active ? 'step' : undefined}
                  aria-label={`${w.label} · ${shared.worldYears[id]} · ${w.title}${w.locked ? ` · ${c.story.lockedNotice}` : ''}`}
                  onMouseEnter={() => moveTo(i, false)}
                  onFocus={() => moveTo(i, false)}
                  onClick={() => open(i)}
                  className={`flex w-full items-center gap-[0.7em] font-pixel text-[length:var(--fs-small)] ${
                    active ? 'text-gold' : w.locked ? 'text-muted/60' : 'text-cream/85 hover:text-cream'
                  }`}
                >
                  <span
                    className={`flex h-[1.8em] w-[1.8em] shrink-0 items-center justify-center ${
                      active ? 'bg-gold text-night-950' : 'bg-night-700'
                    }`}
                  >
                    {w.locked ? '?' : i + 1}
                  </span>
                  {shared.worldYears[id].replace('NOW', c.story.now)}
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="flex items-center justify-between gap-[1em]">
        <p className="min-w-0 truncate font-vt text-[length:var(--fs-body)] text-cream" aria-live="polite">
          <span className="text-gold">{world.label}</span> · {world.title}
        </p>
        <ControlHints
          className="shrink-0"
          hints={[
            { keys: '←→', label: c.ui.hintMove },
            { keys: 'Ⓐ', label: c.ui.hintConfirm },
          ]}
        />
      </div>
    </div>
  );
}
