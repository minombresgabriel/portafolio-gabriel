'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useNavigation } from '@/lib/game/navigation';
import { useGameControls } from '@/lib/game/useGameControls';
import Skyline from '../art/Skyline';

type Props = {
  /** Keep focus off the START button while the boot overlay is up. */
  active: boolean;
};

export default function TitleScreen({ active }: Props) {
  const { c } = useLanguage();
  const { go } = useNavigation();
  const startRef = useRef<HTMLButtonElement>(null);
  const start = () => go({ id: 'menu' });

  useEffect(() => {
    if (active) startRef.current?.focus();
  }, [active]);

  useGameControls({ confirm: start }, active);

  return (
    <div className="absolute inset-0 cursor-pointer" onClick={start}>
      <Skyline className="pixelated absolute inset-0 h-full w-full" />

      <div className="relative flex h-full flex-col items-center px-[var(--gutter)] pt-[10cqh] text-center">
        <h1 className="font-pixel text-[length:var(--fs-logo)] leading-[1.1]">
          <span className="block">
            <span className="logo-text" data-text={c.ui.gameTitleLine1}>
              <span className="logo-fill">{c.ui.gameTitleLine1}</span>
            </span>
          </span>
          <span className="block">
            <span className="logo-text" data-text={c.ui.gameTitleLine2}>
              <span className="logo-fill">{c.ui.gameTitleLine2}</span>
            </span>
          </span>
          <span className="mt-[0.9em] flex items-center justify-center gap-[0.8em] text-[length:var(--fs-h1)] text-cream">
            <span aria-hidden="true" className="h-[0.25em] w-[2.4em] bg-sunset" />
            {c.ui.gameSubtitle}
            <span aria-hidden="true" className="h-[0.25em] w-[2.4em] bg-sunset" />
          </span>
        </h1>

        <button
          ref={startRef}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            start();
          }}
          className="blink mt-auto mb-[7cqh] px-[1em] py-[0.6em] font-pixel text-[length:var(--fs-menu)] text-cream [text-shadow:0_0.15em_0_#1a0f2e]"
        >
          {c.ui.pressStart}
        </button>

        <p className="mb-[3.5cqh] font-pixel text-[length:var(--fs-small)] text-cream/80 [text-shadow:0_0.15em_0_#07041a]">
          {c.ui.titleFooter}
        </p>
      </div>
    </div>
  );
}
