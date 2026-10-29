'use client';

import { useEffect, useRef, useState, type FormEvent } from 'react';
import { shared } from '@/content/game';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useNavigation } from '@/lib/game/navigation';
import ControlHints from '../ui/ControlHints';

/** FormSubmit's AJAX endpoint: same inbox as the old site's contact form, without leaving the game. */
const FORM_ENDPOINT = `https://formsubmit.co/ajax/${shared.email}`;

type Status = 'idle' | 'sending' | 'sent' | 'error';

const FIELD =
  'w-full bg-night-950 px-[0.6em] py-[0.35em] font-vt text-[length:var(--fs-body)] text-cream placeholder:text-muted/60 shadow-[0_0_0_2px_#3d2b80] outline-none focus:shadow-[0_0_0_2px_#ffd23f]';
const LABEL = 'font-pixel text-[length:var(--fs-small)] text-sunset';

/** Contact screen: "Player 2" sends a message through FormSubmit, or picks a direct channel. */
export default function MultiplayerScreen() {
  const { c } = useLanguage();
  const m = c.multiplayer;
  const { back } = useNavigation();
  const [status, setStatus] = useState<Status>('idle');
  const nameRef = useRef<HTMLInputElement>(null);
  const continueRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (status === 'sent') continueRef.current?.focus();
  }, [status]);

  // Only with a mouse: on touch screens this would pop the keyboard up on arrival.
  useEffect(() => {
    if (window.matchMedia('(pointer: fine)').matches) nameRef.current?.focus();
  }, []);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    if (data.get('_honey')) return;
    setStatus('sending');
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: data.get('name'),
          email: data.get('email'),
          message: data.get('message'),
          _subject: `Portafolio: mensaje de ${data.get('name')}`,
          _template: 'table',
          _captcha: 'false',
        }),
      });
      const json = (await res.json().catch(() => ({}))) as { success?: string | boolean };
      setStatus(res.ok && String(json.success) !== 'false' ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const channels = [
    { label: m.emailLabel, text: shared.email, href: `mailto:${shared.email}` },
    { label: m.linkedinLabel, text: shared.linkedin.label, href: shared.linkedin.url },
    { label: m.githubLabel, text: shared.github.label, href: shared.github.url },
  ];

  return (
    <div className="absolute inset-0 flex flex-col gap-[3cqh] px-[var(--gutter)] pt-[7cqh] pb-[3cqh] hh:overflow-y-auto hh:pt-[46px] hh:gap-[18px]">
      <header className="flex items-center gap-[1em]">
        <span aria-hidden="true" className="font-pixel text-[length:var(--fs-h1)] text-rose">
          ♥
        </span>
        <h1 className="font-pixel text-[length:var(--fs-h1)] text-gold">{m.heading}</h1>
      </header>

      <div className="grid min-h-0 flex-1 grid-cols-[1fr_36%] gap-[3cqw] hh:flex-none hh:grid-cols-1 hh:gap-[18px]">
        {status === 'sent' ? (
          <div className="pixel-panel flex flex-col items-center justify-center gap-[1.4em] px-[1.2em] py-[1em] text-center">
            <p className="font-pixel text-[length:var(--fs-h1)] text-mint">{m.sent}</p>
            <p className="font-vt text-[length:var(--fs-body)] text-cream">{m.thanks}</p>
            <button
              ref={continueRef}
              type="button"
              onClick={back}
              className="pixel-panel px-[1em] py-[0.6em] font-pixel text-[length:var(--fs-small)] text-gold hover:text-cream"
            >
              {m.continuePrompt} <span className="blink">▸</span>
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="pixel-panel flex min-h-0 flex-col gap-[1em] px-[1.2em] py-[1em]">
            {/* Honeypot: bots fill it, people never see it */}
            <input type="text" name="_honey" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden="true" />
            <label className="flex flex-col gap-[0.4em]">
              <span className={LABEL}>{m.nameLabel}</span>
              <input ref={nameRef} name="name" type="text" required autoComplete="name" placeholder={m.namePlaceholder} className={FIELD} />
            </label>
            <label className="flex flex-col gap-[0.4em]">
              <span className={LABEL}>{m.replyLabel}</span>
              <input name="email" type="email" required autoComplete="email" placeholder={m.replyPlaceholder} className={FIELD} />
            </label>
            <label className="flex min-h-0 flex-1 flex-col gap-[0.4em]">
              <span className={LABEL}>{m.messageLabel}</span>
              <textarea name="message" required placeholder={m.messagePlaceholder} className={`${FIELD} min-h-[4em] flex-1 resize-none hh:h-[7em] hh:flex-none`} />
            </label>
            <div className="flex items-center gap-[1em]">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="bg-rose px-[1em] py-[0.6em] font-pixel text-[length:var(--fs-small)] text-cream shadow-[0_0_0_2px_#07041a,0_0_0_4px_#ff8fb0] hover:bg-sunset focus-visible:bg-sunset disabled:opacity-60"
              >
                {status === 'sending' ? m.sending : `${m.send} ▸`}
              </button>
              {status === 'error' && (
                <p role="alert" className="font-vt text-[length:var(--fs-story)] text-rose">
                  {m.error}
                </p>
              )}
            </div>
          </form>
        )}

        <aside className="pixel-panel flex min-h-0 flex-col gap-[1.2em] px-[1.2em] py-[1em]">
          <p className="font-pixel text-[length:var(--fs-small)] text-gold">{m.connectVia}</p>
          <ul className="flex flex-col gap-[1em]">
            {channels.map((ch) => (
              <li key={ch.label}>
                <a
                  href={ch.href}
                  target={ch.href.startsWith('mailto:') ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex flex-col gap-[0.3em] bg-night-950 px-[0.7em] py-[0.5em] shadow-[0_0_0_2px_#2a1d5e] hover:shadow-[0_0_0_2px_#ffd23f] focus-visible:shadow-[0_0_0_2px_#ffd23f]"
                >
                  <span className="font-pixel text-[length:var(--fs-small)] text-sunset group-hover:text-gold">{ch.label} ▸</span>
                  <span className="font-vt text-[length:var(--fs-story)] leading-tight break-all text-cream">{ch.text}</span>
                </a>
              </li>
            ))}
          </ul>
        </aside>
      </div>

      <ControlHints hints={[{ keys: 'Ⓑ / ESC', label: c.ui.hintBack }]} />
    </div>
  );
}
