'use client';

import { useEffect, useRef, useState } from 'react';
import { shared, STAT_ORDER } from '@/content/game';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useGameControls } from '@/lib/game/useGameControls';
import VenezuelaFlag from '../art/VenezuelaFlag';
import ControlHints from '../ui/ControlHints';
import PixelArrow from '../ui/PixelArrow';
import Sprite from '../ui/Sprite';
import StatBar from '../ui/StatBar';
import Typewriter from '../ui/Typewriter';

export default function PlayerCardScreen() {
  const { c } = useLanguage();
  const p = c.playerCard;
  const [bioDone, setBioDone] = useState(false);
  const [skipBio, setSkipBio] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    rootRef.current?.focus();
  }, []);

  useGameControls({ confirm: () => setSkipBio(true) });

  return (
    <div
      ref={rootRef}
      tabIndex={-1}
      className="absolute inset-0 flex flex-col gap-[3cqh] px-[var(--gutter)] pt-[7cqh] pb-[3cqh] outline-none"
      onClick={() => setSkipBio(true)}
    >
      <h1 className="sr-only">{p.heading}</h1>

      <div className="grid min-h-0 flex-1 grid-cols-[38%_1fr] gap-[3cqw]">
        {/* Left: the player and the special move */}
        <div className="flex min-h-0 flex-col gap-[2.5cqh]">
          <div className="pixel-panel relative flex min-h-0 flex-1 items-end justify-center overflow-hidden bg-gradient-to-b from-night-800 to-night-900">
            <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[18%] bg-night-700/60" />
            <span aria-hidden="true" className="absolute top-[6%] left-[6%] font-pixel text-[length:var(--fs-menu)] text-rose">
              ♥
            </span>
            <Sprite
              src="/sprites/player-idle.svg"
              frameWidth={32}
              frameHeight={48}
              frames={4}
              fps={3}
              label={shared.name}
              className="relative mb-[6%] h-[80%] w-auto"
            />
          </div>
          <div className="pixel-panel px-[0.9em] py-[0.7em]">
            <p className="font-pixel text-[length:var(--fs-small)] text-sunset">{p.specialMoveLabel}</p>
            <p className="mt-[0.3em] font-vt text-[length:var(--fs-body)] text-cream">{p.specialMove}</p>
          </div>
        </div>

        {/* Right: the card */}
        <div className="pixel-panel flex min-h-0 flex-col gap-[2.5cqh] px-[1.2em] py-[1em]">
          <div className="flex items-center gap-[1.2em]">
            <div className="flex flex-col items-center bg-night-950 px-[0.9em] py-[0.5em] shadow-[0_0_0_2px_#ffd23f]">
              <span className="font-pixel text-[length:var(--fs-small)] text-gold">{p.ovrLabel}</span>
              <span className="font-pixel text-[length:var(--fs-h1)] text-gold">{shared.ovr}</span>
            </div>
            <div className="flex flex-col gap-[0.4em]">
              <span className="font-pixel text-[length:var(--fs-menu)] text-cream">{p.role}</span>
              <span className="flex items-center gap-[0.6em] font-vt text-[length:var(--fs-body)] text-muted">
                <VenezuelaFlag className="pixelated h-[0.75em] w-auto" />
                {p.nationality}
              </span>
              <span className="font-vt text-[length:var(--fs-body)] text-muted">{p.english}</span>
            </div>
          </div>

          <dl className="flex flex-1 flex-col justify-around">
            {STAT_ORDER.map((id, i) => (
              <StatBar key={id} label={p.stats[id]} value={shared.stats[id]} delay={0.15 + i * 0.08} />
            ))}
          </dl>
        </div>
      </div>

      {/* Bio dialog */}
      <div className="pixel-panel relative min-h-[18cqh] px-[1.2em] py-[0.8em]">
        <Typewriter
          text={p.bio}
          complete={skipBio}
          onDone={() => setBioDone(true)}
          className="font-vt text-[length:var(--fs-body)] text-cream"
        />
        {bioDone && (
          <PixelArrow direction="down" className="blink absolute right-[1em] bottom-[0.6em] h-[0.8em] w-auto text-gold" />
        )}
      </div>

      <ControlHints hints={[{ keys: 'Ⓑ / ESC', label: c.ui.hintBack }]} />
    </div>
  );
}
