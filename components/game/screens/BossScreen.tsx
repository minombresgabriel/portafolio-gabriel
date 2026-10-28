'use client';

import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BOSS_ORDER, shared, type BossId } from '@/content/game';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useNavigation } from '@/lib/game/navigation';
import { useGameControls } from '@/lib/game/useGameControls';
import ControlHints from '../ui/ControlHints';
import Sprite from '../ui/Sprite';

type Props = { boss: BossId };

/** A defeated boss = a case study: what the problem was and what got unlocked. */
export default function BossScreen({ boss }: Props) {
  const { c } = useLanguage();
  const { go, back } = useNavigation();
  const reduce = useReducedMotion();
  const b = c.bosses[boss];
  const index = BOSS_ORDER.indexOf(boss);
  const isQuest = b.kind === 'side-quest';
  const continueRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    continueRef.current?.focus();
  }, [boss]);

  // ←→ jump straight to the neighbouring boss.
  const goToBoss = (i: number) => {
    const next = BOSS_ORDER[i];
    if (next) go({ id: 'boss', boss: next });
  };
  useGameControls({ left: () => goToBoss(index - 1), right: () => goToBoss(index + 1) });

  return (
    <div className="absolute inset-0 flex flex-col gap-[3cqh] px-[var(--gutter)] pt-[7cqh] pb-[3cqh]">
      <header className="pixel-panel px-[1.2em] py-[0.9em]">
        <p className="font-pixel text-[length:var(--fs-small)] text-sunset">
          {c.story.worlds.w6.label}-{index + 1}
        </p>
        <h1 className="mt-[0.5em] font-pixel text-[length:var(--fs-h1)] text-cream">
          {isQuest ? c.level.sideQuestLabel : c.level.bossLabel}: {b.name}
        </h1>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[34%_1fr] gap-[3cqw]">
        <div className="pixel-panel flex min-h-0 items-center justify-center bg-gradient-to-b from-night-800 to-night-950">
          <Sprite src={`/sprites/bosses/${boss}.svg`} frameWidth={48} frameHeight={48} frames={2} fps={2} className="w-[70%] max-h-[90%]" />
        </div>

        <div className="pixel-panel flex min-h-0 flex-col gap-[0.8em] overflow-hidden px-[1.2em] py-[1em]">
          <p className="font-vt text-[length:var(--fs-body)] text-muted">{b.intro}</p>
          <p className="font-vt text-[length:var(--fs-body)] text-cream">{b.story}</p>
          <motion.p
            key={boss}
            className="font-pixel text-[length:var(--fs-menu)] text-mint"
            initial={reduce ? false : { scale: 2.2, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.35, duration: 0.3, ease: [0.3, 1.6, 0.5, 1] }}
            style={{ transformOrigin: 'left center' }}
          >
            {isQuest ? c.level.completed : c.level.defeated}
          </motion.p>
          <div>
            <p className="font-pixel text-[length:var(--fs-small)] text-gold">{c.level.unlockedLabel}</p>
            <ul className="mt-[0.3em]">
              {b.unlocked.map((u) => (
                <li key={u} className="flex gap-[0.5em] font-vt text-[length:var(--fs-body)] leading-tight text-cream">
                  <span aria-hidden="true" className="text-mint">
                    ▸
                  </span>
                  {u}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="pixel-panel flex items-center justify-between gap-[1em] px-[1.2em] py-[0.7em]">
        <p className="font-pixel text-[length:var(--fs-small)] text-gold">
          ★ {c.level.reward}: +{shared.rewardXp} XP
        </p>
        <ControlHints
          className="hidden sm:flex"
          hints={[
            { keys: '←→', label: c.ui.hintSelect },
            { keys: 'Ⓑ', label: c.ui.hintBack },
          ]}
        />
        <button
          ref={continueRef}
          type="button"
          onClick={back}
          className="bg-night-950 px-[1em] py-[0.6em] font-pixel text-[length:var(--fs-small)] text-cream shadow-[0_0_0_2px_#ff8a2b] hover:text-gold"
        >
          {c.level.continue} ▸
        </button>
      </div>
    </div>
  );
}
