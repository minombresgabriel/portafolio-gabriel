'use client';

import { useEffect, useRef, type CSSProperties, type MouseEvent, type PointerEvent } from 'react';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useSettings } from '@/lib/game/settings';
import { pressControl, type Control } from '@/lib/game/useGameControls';
import PixelArrow from '../ui/PixelArrow';

/** Hold a direction to keep moving, like a real pad. */
const REPEAT_DELAY = 380;
const REPEAT_EVERY = 110;

/**
 * A pad key. It fires on pointer down and never takes focus, so the A button
 * still "clicks" whatever is selected on screen.
 */
function useKey(control: Control, repeat: boolean) {
  const timers = useRef<number[]>([]);

  const stop = (e?: PointerEvent<HTMLButtonElement>) => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current.length = 0;
    e?.currentTarget.removeAttribute('data-held');
  };

  useEffect(() => {
    const pending = timers.current;
    return () => pending.forEach((t) => window.clearTimeout(t));
  }, []);

  return {
    onPointerDown: (e: PointerEvent<HTMLButtonElement>) => {
      e.preventDefault();
      e.currentTarget.setAttribute('data-held', '');
      navigator.vibrate?.(8);
      pressControl(control);
      if (!repeat) return;
      const start = window.setTimeout(() => {
        const tick = () => {
          pressControl(control);
          timers.current.push(window.setTimeout(tick, REPEAT_EVERY));
        };
        tick();
      }, REPEAT_DELAY);
      timers.current.push(start);
    },
    onPointerUp: stop,
    onPointerLeave: stop,
    onPointerCancel: stop,
    onContextMenu: (e: MouseEvent) => e.preventDefault(),
  };
}

function DirKey({ control, rotate, style }: { control: Control; rotate: number; style: CSSProperties }) {
  const handlers = useKey(control, true);
  return (
    <button type="button" tabIndex={-1} className="pad-key flex items-center justify-center" style={style} {...handlers}>
      <span className="flex" style={{ transform: `rotate(${rotate}deg)` }}>
        <PixelArrow className="h-[14px] w-auto" />
      </span>
    </button>
  );
}

function RoundKey({ control, label, style }: { control: Control; label: string; style: CSSProperties }) {
  const handlers = useKey(control, false);
  return (
    <button type="button" tabIndex={-1} className="pad-key flex items-center justify-center font-pixel text-[18px]" style={style} {...handlers}>
      {label}
    </button>
  );
}

/** Pill buttons stay out of the focus order too, so A keeps acting on the screen. */
function Pill({ label, aria, pressed, onPress }: { label: string; aria: string; pressed?: boolean; onPress: () => void }) {
  return (
    <button
      type="button"
      tabIndex={-1}
      aria-label={aria}
      aria-pressed={pressed}
      className="pad-key pad-pill font-pixel text-[9px] tracking-[0.15em] text-[#8f8a9c]"
      onPointerDown={(e) => e.preventDefault()}
      onClick={onPress}
    >
      <span aria-hidden="true" />
      <span>{label}</span>
    </button>
  );
}

/** Phone controls: D-pad, A/B and two pills (language, CRT effect). Hidden on desktop by CSS. */
export default function HandheldPad() {
  const { c, toggle } = useLanguage();
  const { crtFx, toggleCrtFx } = useSettings();

  return (
    <>
      <p className="pad-brand" aria-hidden="true">
        {c.ui.consoleBrand}
      </p>
      <div className="pad-dpad" aria-hidden="true">
        <DirKey control="up" rotate={-90} style={{ left: 44, top: 0 }} />
        <DirKey control="left" rotate={180} style={{ left: 0, top: 44 }} />
        <DirKey control="right" rotate={0} style={{ left: 88, top: 44 }} />
        <DirKey control="down" rotate={90} style={{ left: 44, top: 88 }} />
      </div>
      <div className="pad-ab" aria-hidden="true">
        <RoundKey control="back" label="B" style={{ left: 0, bottom: 0 }} />
        <RoundKey control="confirm" label="A" style={{ right: 0, top: 0 }} />
      </div>
      <div className="pad-pills">
        <Pill label={c.ui.langToggle} aria={c.ui.langToggleAria} onPress={toggle} />
        <Pill label={crtFx ? c.ui.fxOn : c.ui.fxOff} aria={c.ui.fxAria} pressed={crtFx} onPress={toggleCrtFx} />
      </div>
    </>
  );
}
