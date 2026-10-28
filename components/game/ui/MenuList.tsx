'use client';

import { useEffect, useRef, useState } from 'react';
import { useGameControls } from '@/lib/game/useGameControls';
import PixelArrow from './PixelArrow';

export type MenuItem = {
  id: string;
  label: string;
} & ({ onSelect: () => void; href?: never } | { href: string; download?: boolean; onSelect?: never });

type Props = {
  items: MenuItem[];
  label: string;
  initialIndex?: number;
  onCursorChange?: (index: number) => void;
  className?: string;
};

/**
 * Vertical game menu. Arrow keys move a cursor that also owns real DOM focus,
 * so Enter / Space / screen readers all work natively. Mouse hover moves the cursor.
 */
export default function MenuList({ items, label, initialIndex = 0, onCursorChange, className }: Props) {
  const [cursor, setCursor] = useState(initialIndex);
  const refs = useRef<(HTMLButtonElement | HTMLAnchorElement | null)[]>([]);

  const moveTo = (index: number, focus = true) => {
    const next = (index + items.length) % items.length;
    setCursor(next);
    onCursorChange?.(next);
    if (focus) refs.current[next]?.focus();
  };

  useEffect(() => {
    refs.current[initialIndex]?.focus();
    // Only on mount: the cursor is restored once, then the user drives it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGameControls({
    up: () => moveTo(cursor - 1),
    down: () => moveTo(cursor + 1),
    confirm: () => {
      const el = refs.current[cursor];
      el?.focus();
      el?.click();
    },
  });

  return (
    <ul role="menu" aria-label={label} className={className}>
      {items.map((item, i) => {
        const active = i === cursor;
        const classes = `inline-flex items-center gap-[1em] pr-[0.6em] py-[0.55em] text-left font-pixel uppercase transition-colors ${
          active ? 'text-gold' : 'text-cream/85 hover:text-cream'
        }`;
        const inner = (
          <>
            <span className="inline-flex w-[0.9em] shrink-0 justify-center">
              {active && <PixelArrow className="cursor-bob h-[0.95em] w-auto text-gold" />}
            </span>
            <span>{item.label}</span>
          </>
        );
        const common = {
          role: 'menuitem' as const,
          className: classes,
          tabIndex: active ? 0 : -1,
          onMouseEnter: () => moveTo(i, false),
          onFocus: () => {
            if (!active) moveTo(i, false);
          },
        };
        return (
          <li key={item.id} role="none">
            {item.href ? (
              <a
                {...common}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                href={item.href}
                download={item.download || undefined}
              >
                {inner}
              </a>
            ) : (
              <button
                {...common}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                type="button"
                onClick={item.onSelect}
              >
                {inner}
              </button>
            )}
          </li>
        );
      })}
    </ul>
  );
}
