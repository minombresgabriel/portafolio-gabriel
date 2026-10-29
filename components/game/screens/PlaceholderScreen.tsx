'use client';

import { useEffect, useRef } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useNavigation } from '@/lib/game/navigation';
import ControlHints from '../ui/ControlHints';

type Props = { title: string };

/** Temporary screen for levels that arrive in later phases. */
export default function PlaceholderScreen({ title }: Props) {
  const { c } = useLanguage();
  const { back } = useNavigation();
  const backRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    backRef.current?.focus();
  }, []);

  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center gap-[2em] px-[var(--gutter)] text-center">
      <h1 className="font-pixel text-[length:var(--fs-h1)] text-gold">{title}</h1>
      <div className="pixel-panel max-w-[70cqw] px-[1.2em] py-[0.8em]">
        <p className="font-pixel text-[length:var(--fs-small)] text-sunset">{c.ui.underConstruction}</p>
        <p className="mt-[0.4em] font-vt text-[length:var(--fs-body)] text-cream">{c.ui.underConstructionBody}</p>
      </div>
      <button
        ref={backRef}
        type="button"
        onClick={back}
        className="pixel-panel px-[1.2em] py-[0.7em] font-pixel text-[length:var(--fs-menu)] text-cream hover:text-gold"
      >
        ◀ {c.ui.back}
      </button>
      <ControlHints hints={[{ keys: 'Ⓑ / ESC', label: c.ui.hintBack }]} />
    </div>
  );
}
