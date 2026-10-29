'use client';

import { useEffect, useRef, useState } from 'react';
import type { Figure } from '@/data/projects';

interface GiantFigureProps {
  figure: Figure;
  word?: string;
  statLabel?: string;
}

const GiantFigure = ({ figure, word, statLabel }: GiantFigureProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const [display, setDisplay] = useState(figure.kind === 'stat' ? '0' : '');

  useEffect(() => {
    if (figure.kind !== 'stat') return;
    const el = ref.current;
    if (!el) return;

    const target = figure.value;
    const suffix = figure.suffix ?? '';
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animate = () => {
      if (reduced) {
        setDisplay(`${target}${suffix}`);
        return;
      }
      const start = performance.now();
      const duration = 1200;
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setDisplay(`${Math.round(target * eased)}${suffix}`);
        if (progress < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          animate();
          io.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [figure]);

  if (figure.kind === 'stat') {
    return (
      <div ref={ref} className="text-left">
        <span
          className="block font-extrabold leading-none tracking-tight text-[#ff3d6e]"
          style={{ fontSize: 'clamp(4rem, 3rem + 8vw, 9rem)', fontVariantNumeric: 'tabular-nums' }}
        >
          {display}
        </span>
        {statLabel && (
          <p className="mt-4 max-w-[24ch] font-mono text-sm uppercase tracking-wider text-gray-400">
            {statLabel}
          </p>
        )}
      </div>
    );
  }

  return (
    <div className="text-left">
      <span
        className="block font-extrabold leading-[0.9] tracking-tight text-[#ff3d6e]"
        style={{ fontSize: 'clamp(3.2rem, 2.4rem + 6vw, 7rem)', fontVariantNumeric: 'tabular-nums' }}
      >
        {word}
      </span>
    </div>
  );
};

export default GiantFigure;
