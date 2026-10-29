'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * Pixel skyline of Caracas with El Ávila behind it, drawn on a 320×240 grid.
 * All layers are generated deterministically so server and client markup match.
 */

const W = 320;
const H = 240;

function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A stair-stepped silhouette path from a height function, 2px per step. */
function ridgePath(height: (x: number) => number, step = 2): string {
  let d = `M0 ${H}`;
  for (let x = 0; x <= W; x += step) {
    d += ` V${Math.round(height(x))} H${x + step}`;
  }
  return `${d} V${H} Z`;
}

const avilaRidge = ridgePath(
  (x) =>
    150 -
    26 * Math.exp(-(((x - 110) / 70) ** 2)) -
    18 * Math.exp(-(((x - 215) / 55) ** 2)) -
    6 * Math.sin(x / 9) * Math.sin(x / 23) -
    4,
);

const avilaFar = ridgePath(
  (x) => 158 - 14 * Math.exp(-(((x - 260) / 60) ** 2)) - 10 * Math.exp(-(((x - 40) / 50) ** 2)) - 3 * Math.sin(x / 7),
);

type Building = { x: number; w: number; top: number; windows: { x: number; y: number; on: boolean }[] };

function makeBuildings(seed: number, minH: number, maxH: number, base: number, density: number): Building[] {
  const r = rng(seed);
  const list: Building[] = [];
  let x = -4;
  while (x < W) {
    const w = 8 + Math.floor(r() * 4) * 4;
    const top = base - (minH + Math.floor(r() * (maxH - minH)));
    const windows: Building['windows'] = [];
    for (let wy = top + 4; wy < base - 4; wy += 5) {
      for (let wx = x + 2; wx < x + w - 2; wx += 4) {
        if (r() < density) windows.push({ x: wx, y: wy, on: r() < 0.55 });
      }
    }
    list.push({ x, w, top, windows });
    x += w + (r() < 0.3 ? 2 : 0);
  }
  return list;
}

const backBuildings = makeBuildings(7, 18, 46, 214, 0.25);
const frontBuildings = makeBuildings(21, 10, 34, 226, 0.6);

const stars = (() => {
  const r = rng(3);
  return Array.from({ length: 38 }, () => ({ x: Math.floor(r() * W), y: Math.floor(r() * 90), big: r() < 0.15 }));
})();

const SKY_SUNSET = ['#140c33', '#1d1145', '#2a1d5e', '#43207a', '#6a2b8f', '#9a3a8d', '#c84a7e', '#e8606a', '#ff8a4b', '#ffb05a'];
const SKY_NIGHT = ['#07041a', '#0a0622', '#0d0829', '#100a30', '#140c38', '#180f40', '#1d1248', '#211550', '#261858', '#2a1b60'];

type Props = {
  variant?: 'sunset' | 'night';
  className?: string;
};

export default function Skyline({ variant = 'sunset', className }: Props) {
  const reduce = useReducedMotion();
  const farRef = useRef<SVGGElement>(null);
  const midRef = useRef<SVGGElement>(null);
  const nearRef = useRef<SVGGElement>(null);
  const sunset = variant === 'sunset';
  const sky = sunset ? SKY_SUNSET : SKY_NIGHT;
  const band = 176 / sky.length;

  // Pointer parallax: nearer layers move more.
  useEffect(() => {
    if (reduce) return;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const dx = (e.clientX / window.innerWidth - 0.5) * 2;
        const dy = (e.clientY / window.innerHeight - 0.5) * 2;
        const set = (el: SVGGElement | null, k: number) =>
          el?.setAttribute('transform', `translate(${Math.round(-dx * k)} ${Math.round(-dy * k * 0.3)})`);
        set(farRef.current, 2);
        set(midRef.current, 4);
        set(nearRef.current, 7);
      });
    };
    window.addEventListener('pointermove', onMove);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onMove);
    };
  }, [reduce]);

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMax slice"
      shapeRendering="crispEdges"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      {/* Sky bands */}
      {sky.map((color, i) => (
        <rect key={color + i} x={0} y={Math.floor(i * band)} width={W} height={Math.ceil(band) + 1} fill={color} />
      ))}
      <rect x={0} y={176} width={W} height={H - 176} fill={sky[sky.length - 1]} />

      {/* Stars */}
      {stars.map((s, i) => (
        <rect
          key={i}
          x={s.x}
          y={s.y}
          width={s.big ? 2 : 1}
          height={s.big ? 2 : 1}
          fill="#f6eedd"
          opacity={sunset ? (s.y < 50 ? 0.8 : 0.25) : 0.85}
        />
      ))}

      {/* Sun, sliced by horizontal gaps */}
      {sunset && (
        <g>
          {Array.from({ length: 13 }, (_, i) => {
            const y = 108 + i * 3;
            const dy = y - 140;
            const half = Math.round(Math.sqrt(Math.max(0, 34 * 34 - dy * dy)));
            return i > 6 && i % 2 === 0 ? null : (
              <rect key={i} x={160 - half} y={y} width={half * 2} height={3} fill={i < 4 ? '#ffe28a' : '#ffc14d'} />
            );
          })}
        </g>
      )}

      {/* El Ávila */}
      <g ref={farRef}>
        <path d={avilaFar} fill={sunset ? '#5a2a7e' : '#1a1240'} />
        <path d={avilaRidge} fill={sunset ? '#3a1b5e' : '#140d36'} />
        <path d={avilaRidge} fill="none" stroke={sunset ? '#ff8a4b' : '#2a1d5e'} strokeWidth={1} opacity={0.55} transform="translate(0 1)" />
      </g>

      {/* Back city */}
      <g ref={midRef}>
        {backBuildings.map((b) => (
          <g key={`b${b.x}`}>
            <rect x={b.x} y={b.top} width={b.w} height={214 - b.top + 20} fill={sunset ? '#26164f' : '#120b30'} />
            {b.windows.map((w) =>
              w.on ? <rect key={`${w.x}-${w.y}`} x={w.x} y={w.y} width={1} height={2} fill="#b98cff" opacity={0.6} /> : null,
            )}
          </g>
        ))}
        {/* Parque Central twin towers */}
        {[228, 246].map((x) => (
          <g key={x}>
            <rect x={x} y={120} width={12} height={110} fill={sunset ? '#1f1245' : '#0f0928'} />
            <rect x={x + 5} y={110} width={2} height={10} fill={sunset ? '#1f1245' : '#0f0928'} />
            <rect x={x + 5} y={108} width={2} height={2} fill="#ff4f6d" className="blink" />
            {Array.from({ length: 18 }, (_, i) => (
              <rect key={i} x={x + 2} y={124 + i * 5} width={8} height={1} fill="#ffd23f" opacity={(i * 7) % 3 === 0 ? 0.75 : 0.18} />
            ))}
          </g>
        ))}
      </g>

      {/* Front city */}
      <g ref={nearRef}>
        {frontBuildings.map((b) => (
          <g key={`f${b.x}`}>
            <rect x={b.x} y={b.top} width={b.w} height={H - b.top + 10} fill="#0d0824" />
            <rect x={b.x} y={b.top} width={b.w} height={1} fill={sunset ? '#4a2a6e' : '#1d1248'} />
            {b.windows.map((w) =>
              w.on ? (
                <rect
                  key={`${w.x}-${w.y}`}
                  x={w.x}
                  y={w.y}
                  width={2}
                  height={2}
                  fill={(w.x + w.y) % 3 === 0 ? '#3fe0ff' : '#ffd23f'}
                  opacity={0.85}
                />
              ) : null,
            )}
          </g>
        ))}
        <rect x={-10} y={228} width={W + 20} height={20} fill="#07041a" />
      </g>
    </svg>
  );
}
