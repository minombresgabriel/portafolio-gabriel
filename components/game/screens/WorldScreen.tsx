'use client';

import { useEffect, useRef } from 'react';
import { BOSS_ORDER, shared, type WorldId } from '@/content/game';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useNavigation } from '@/lib/game/navigation';
import ControlHints from '../ui/ControlHints';
import MenuList, { type MenuItem } from '../ui/MenuList';
import PixelIcon from '../ui/PixelIcon';

type Props = { world: WorldId };

/** Level card for a world. World 6 holds the boss levels; World 7 is locked. */
export default function WorldScreen({ world }: Props) {
  const { c } = useLanguage();
  const { go, back, previous } = useNavigation();
  const w = c.story.worlds[world];
  const hasBosses = world === 'w6';
  const continueRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!hasBosses) continueRef.current?.focus();
  }, [hasBosses]);

  const bossItems: MenuItem[] = BOSS_ORDER.map((id) => {
    const b = c.bosses[id];
    const prefix = b.kind === 'side-quest' ? `${c.level.sideQuestLabel}: ` : '';
    return { id, label: `${prefix}${b.name}`, onSelect: () => go({ id: 'boss', boss: id }) };
  });
  const lastBoss = previous?.id === 'boss' ? BOSS_ORDER.indexOf(previous.boss) : 0;

  return (
    <div className="absolute inset-0 flex flex-col gap-[3cqh] px-[var(--gutter)] pt-[7cqh] pb-[3cqh]">
      <header className="pixel-panel px-[1.2em] py-[0.9em]">
        <p className="font-pixel text-[length:var(--fs-small)] text-sunset">
          {w.label} · {shared.worldYears[world].replace('NOW', c.story.now)}
        </p>
        <h1 className="mt-[0.5em] font-pixel text-[length:var(--fs-h1)] text-cream">{w.title}</h1>
        {w.place && <p className="mt-[0.3em] font-vt text-[length:var(--fs-body)] text-muted">{w.place}</p>}
      </header>

      <div className="flex min-h-0 flex-1 gap-[3cqw]">
        <div className="pixel-panel flex min-h-0 flex-1 flex-col gap-[1em] overflow-hidden px-[1.2em] py-[1em]">
          <div className="flex items-start gap-[1em]">
            {w.locked && <PixelIcon src="/sprites/achievements/locked.svg" className="h-[10cqh] w-auto shrink-0" />}
            <p className="font-vt text-[length:var(--fs-body)] text-cream">
              {w.locked && <span className="mb-[0.3em] block font-pixel text-[length:var(--fs-small)] text-muted">{c.story.lockedNotice}</span>}
              “{w.tagline}”
            </p>
          </div>
          {w.details && (
            <ul className="flex flex-wrap gap-[0.6em]">
              {w.details.map((d) => (
                <li key={d} className="bg-night-950 px-[0.6em] py-[0.15em] font-vt text-[length:var(--fs-body)] leading-tight text-cyan shadow-[0_0_0_2px_#2a1d5e]">
                  {d}
                </li>
              ))}
            </ul>
          )}
        </div>

        {hasBosses && (
          <nav className="pixel-panel flex min-h-0 w-[48%] flex-col px-[1em] py-[0.9em]" aria-label={c.story.bossSelect}>
            <p className="mb-[0.6em] font-pixel text-[length:var(--fs-small)] text-gold">{c.story.bossSelect}</p>
            <MenuList items={bossItems} label={c.story.bossSelect} initialIndex={lastBoss} className="text-[length:var(--fs-small)]" />
          </nav>
        )}
      </div>

      <div className="flex items-center justify-between gap-[1em]">
        <ControlHints
          hints={
            hasBosses
              ? [
                  { keys: '↑↓', label: c.ui.hintSelect },
                  { keys: 'Ⓐ', label: c.ui.hintConfirm },
                  { keys: 'Ⓑ', label: c.ui.hintBack },
                ]
              : [{ keys: 'Ⓑ / ESC', label: c.ui.hintBack }]
          }
        />
        {!hasBosses && (
          <button
            ref={continueRef}
            type="button"
            onClick={back}
            className="pixel-panel px-[1em] py-[0.6em] font-pixel text-[length:var(--fs-small)] text-cream hover:text-gold"
          >
            {c.level.continue} ▸
          </button>
        )}
      </div>
    </div>
  );
}
