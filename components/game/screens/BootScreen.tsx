'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';

type Props = {
  onDone: () => void;
  durationMs: number;
};

/** CRT power-on: a white line opens into the picture, then the GR SYSTEM 16 logo. */
export default function BootScreen({ onDone, durationMs }: Props) {
  const { c } = useLanguage();

  useEffect(() => {
    const timer = window.setTimeout(onDone, durationMs);
    const skip = () => onDone();
    window.addEventListener('keydown', skip);
    window.addEventListener('pointerdown', skip);
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', skip);
      window.removeEventListener('pointerdown', skip);
    };
  }, [onDone, durationMs]);

  return (
    <div className="absolute inset-0 z-30 flex items-center justify-center bg-[#030208]" role="presentation">
      <div className="boot-line absolute inset-0 bg-[#e9f1ff]" />
      <div className="boot-logo flex flex-col items-center gap-[1.4em] text-center">
        <span
          className="boot-glow font-pixel leading-none text-[#dfe8ff]"
          style={{ fontSize: 'clamp(28px, 13cqw, 140px)' }}
        >
          {c.ui.bootLogo}
        </span>
        <span className="boot-glow font-pixel text-[length:var(--fs-h1)] tracking-[0.25em] text-[#b9c6ff]">
          {c.ui.bootSystem}
        </span>
        <span className="blink mt-[2em] font-pixel text-[length:var(--fs-small)] text-muted">{c.ui.bootSkip}</span>
      </div>
    </div>
  );
}
