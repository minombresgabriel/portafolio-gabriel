'use client';

import Link from 'next/link';
import type { ReactNode } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useSettings } from '@/lib/game/settings';
import HandheldPad from './HandheldPad';

/** Desktop frame: a CRT television with its control panel and a footer legend. On phones, CSS turns it into a handheld. */
export default function CrtTv({ children }: { children: ReactNode }) {
  const { c, toggle } = useLanguage();
  const { crtFx, toggleCrtFx } = useSettings();

  const panelButton =
    'rounded-[3px] bg-[#0f0d13] px-[0.9em] py-[0.45em] font-pixel text-[length:var(--fs-small)] text-[#8f8a9c] shadow-[inset_0_-2px_0_#000,0_1px_0_#3a3542] hover:text-cream';

  return (
    <main className="game-root flex flex-col items-center justify-center gap-2 px-3">
      <div className="tv">
        <div className="tv-bezel">
          <div className={`crt ${crtFx ? 'crt-fx' : ''}`}>{children}</div>
        </div>

        <div className="tv-panel flex items-center justify-between px-[2%]">
          <div className="flex items-center gap-[0.8em] font-pixel text-[length:clamp(7px,1.2cqw,12px)] text-[#6e6879]">
            <span>{c.ui.power}</span>
            <span aria-hidden="true" className="h-[0.7em] w-[0.7em] rounded-full bg-rose shadow-[0_0_8px_#e8457a]" />
          </div>
          <span className="font-pixel text-[length:clamp(7px,1.3cqw,13px)] tracking-[0.2em] text-[#4f4a5a]">
            {c.ui.consoleBrand}
          </span>
          <div className="flex items-center gap-[0.6em] [--fs-small:clamp(7px,1.1cqw,11px)]">
            <button type="button" onClick={toggle} aria-label={c.ui.langToggleAria} className={panelButton}>
              {c.ui.langToggle}
            </button>
            <button type="button" onClick={toggleCrtFx} aria-label={c.ui.fxAria} aria-pressed={crtFx} className={panelButton}>
              {crtFx ? c.ui.fxOn : c.ui.fxOff}
            </button>
          </div>
        </div>

        <HandheldPad />
      </div>

      <footer className="hidden w-[var(--tv-w)] items-center justify-between gap-4 font-pixel text-[10px] text-muted/70 md:flex">
        <span>{c.ui.footerControls}</span>
        <Link href="/resume" className="hover:text-cream">
          {c.ui.footerSkip}
        </Link>
        <span>{c.ui.footerBuilt}</span>
      </footer>
    </main>
  );
}
