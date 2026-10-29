'use client';

import type { CSSProperties } from 'react';
import { ACHIEVEMENT_ORDER } from '@/content/game';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useGameControls } from '@/lib/game/useGameControls';
import { useRovingFocus } from '@/lib/game/useRovingFocus';
import { useHandheld } from '@/lib/game/useHandheld';
import ControlHints from '../ui/ControlHints';
import PixelIcon from '../ui/PixelIcon';

export default function AchievementsScreen() {
  const { c } = useLanguage();
  const a = c.achievements;
  // One column on a phone held upright, so ↑↓ walk the list.
  const columns = useHandheld() ? 1 : 2;
  const unlocked = ACHIEVEMENT_ORDER.filter((id) => id !== 'locked').length;
  const { index, setIndex, setRef, move } = useRovingFocus<HTMLLIElement>(ACHIEVEMENT_ORDER.length, columns);

  useGameControls(move);

  return (
    <div className="absolute inset-0 flex flex-col gap-[3cqh] px-[var(--gutter)] pt-[7cqh] pb-[3cqh] hh:overflow-y-auto hh:pt-[46px] hh:gap-[18px]">
      <header className="flex items-center gap-[1em]">
        <PixelIcon src="/sprites/achievements/payment-wizard.svg" className="h-[1.6em] w-auto" />
        <h1 className="font-pixel text-[length:var(--fs-h1)] text-gold">{a.heading}</h1>
        <span className="ml-auto font-pixel text-[length:var(--fs-small)] text-muted">
          {unlocked}/{ACHIEVEMENT_ORDER.length}
        </span>
      </header>

      <ul
        className="grid min-h-0 flex-1 grid-cols-2 grid-rows-[repeat(var(--rows),minmax(0,1fr))] gap-[1.6cqh_3cqw] hh:flex-none hh:grid-cols-1 hh:grid-rows-none hh:gap-[12px]"
        style={{ '--rows': Math.ceil(ACHIEVEMENT_ORDER.length / 2) } as CSSProperties}
        aria-label={a.heading}
      >
        {ACHIEVEMENT_ORDER.map((id, i) => {
          const item = a.items[id];
          const locked = id === 'locked';
          const active = i === index;
          return (
            <li
              key={id}
              ref={setRef(i)}
              tabIndex={active ? 0 : -1}
              onMouseEnter={() => setIndex(i, false)}
              onFocus={() => setIndex(i, false)}
              className={`pixel-panel flex min-h-0 items-center gap-[1em] px-[1em] py-[0.4em] hh:py-[0.7em] ${
                active ? 'shadow-[0_0_0_2px_#07041a,0_0_0_4px_#ffd23f,0_0_0_6px_#07041a]' : ''
              } ${locked ? 'opacity-60' : ''}`}
            >
              <span className="flex aspect-square h-[78%] max-h-[9cqh] shrink-0 items-center justify-center bg-night-950 shadow-[0_0_0_2px_#3d2b80] hh:h-[13cqw] hh:max-h-none">
                <PixelIcon src={`/sprites/achievements/${id}.svg`} className="h-[75%] w-auto" />
              </span>
              <span className="min-w-0">
                <span className={`block font-pixel text-[length:var(--fs-small)] ${locked ? 'text-muted' : 'text-gold'}`}>
                  {item.title}
                </span>
                <span className="block font-vt text-[length:var(--fs-body)] leading-[1.05] text-cream">
                  {item.description}
                </span>
              </span>
            </li>
          );
        })}
      </ul>

      <ControlHints
        hints={[
          { keys: '↑↓←→', label: c.ui.hintSelect },
          { keys: 'Ⓑ / ESC', label: c.ui.hintBack },
        ]}
      />
    </div>
  );
}
