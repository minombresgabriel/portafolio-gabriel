'use client';

import { useEffect, useRef } from 'react';
import { BOSS_ORDER, shared, type WorldContent, type WorldId } from '@/content/game';
import { useLanguage } from '@/lib/i18n/LanguageContext';
import { useNavigation } from '@/lib/game/navigation';
import ControlHints from '../ui/ControlHints';
import MenuList, { type MenuItem } from '../ui/MenuList';
import PixelIcon from '../ui/PixelIcon';

type Props = { world: WorldId };

/** Editor look per file type: `pattern` must have one capture group, its matches get `accent`. */
const EDITORS = {
  // Turbo Pascal: blue IDE, keywords in white, the rest in yellow.
  pas: {
    pattern: /\b(program|begin|end)\b/g,
    frame: 'bg-[#1726a8] shadow-[0_0_0_2px_#07041a,0_0_0_4px_#8a8f99]',
    bar: 'bg-[#8a8f99] text-night-950',
    text: 'text-gold',
    accent: 'text-cream',
  },
  // A dark code editor: tags in pink, content in cream.
  html: {
    pattern: /(<\/?[a-z0-9]+|>)/g,
    frame: 'bg-night-950 shadow-[0_0_0_2px_#07041a,0_0_0_4px_#3d2b80]',
    bar: 'bg-[#3d2b80] text-cream',
    text: 'text-cream',
    accent: 'text-rose',
  },
};

function editorFor(file: string) {
  return file.toLowerCase().endsWith('.html') ? EDITORS.html : EDITORS.pas;
}

/** A short listing in a retro editor window, with a blinking cursor. */
function CodeWindow({ file, code }: NonNullable<WorldContent['snippet']>) {
  const editor = editorFor(file);
  return (
    <figure className={`flex min-h-0 flex-col ${editor.frame}`}>
      <figcaption className={`px-[0.6em] py-[0.25em] text-center font-pixel text-[length:var(--fs-small)] ${editor.bar}`}>
        {file}
      </figcaption>
      <pre className={`overflow-hidden px-[0.7em] py-[0.5em] font-vt text-[length:var(--fs-story)] leading-[1.15] whitespace-pre ${editor.text}`}>
        {code.split(editor.pattern).map((part, i) =>
          i % 2 === 1 ? (
            <span key={i} className={editor.accent}>
              {part}
            </span>
          ) : (
            part
          ),
        )}
        <span aria-hidden="true" className="blink bg-cream">
          {' '}
        </span>
      </pre>
    </figure>
  );
}

/** A process as linked steps, e.g. an ERP document flow. */
function FlowPanel({ title, steps }: NonNullable<WorldContent['flow']>) {
  return (
    <figure className="pixel-panel px-[0.9em] py-[0.7em]">
      <figcaption className="font-pixel text-[length:var(--fs-small)] text-sunset">{title}</figcaption>
      <ol className="mt-[0.6em] flex flex-wrap items-center gap-[0.4em]">
        {steps.map((step, i) => (
          <li key={step} className="flex items-center gap-[0.4em]">
            {i > 0 && (
              <span aria-hidden="true" className="font-vt text-[length:var(--fs-story)] text-gold">
                ▸
              </span>
            )}
            <span className="bg-night-950 px-[0.5em] py-[0.1em] font-vt text-[length:var(--fs-story)] leading-tight text-cream shadow-[0_0_0_2px_#2a1d5e]">
              {step}
            </span>
          </li>
        ))}
      </ol>
    </figure>
  );
}

/** Parent company → the brands it runs, as a small pixel tree. */
function FamilyTree({ family, label }: { family: NonNullable<WorldContent['family']>; label: string }) {
  return (
    <figure className="flex shrink-0 items-center gap-[0.8em] hh:flex-wrap" aria-label={label}>
      <div className="flex flex-col items-center gap-[0.3em]">
        <PixelIcon src={`/sprites/worlds/${family.parent.sprite}.svg`} className="h-[8cqh] w-auto" />
        <span className="font-pixel text-[length:var(--fs-small)] text-gold">{family.parent.caption}</span>
      </div>
      <span aria-hidden="true" className="font-vt text-[length:var(--fs-story)] text-gold">
        ▸
      </span>
      <ul className="flex gap-[0.9em] border-t-2 border-gold/50 pt-[0.5em]">
        {family.children.map((child) => (
          <li key={child.sprite} className="flex flex-col items-center gap-[0.3em]">
            <PixelIcon src={`/sprites/worlds/${child.sprite}.svg`} className="h-[6cqh] w-auto" />
            <span className="font-vt text-[length:clamp(11px,1.7cqw,18px)] leading-none whitespace-nowrap text-cream">
              {child.caption}
            </span>
          </li>
        ))}
      </ul>
    </figure>
  );
}

function ToolIcons({ tools, label, className }: { tools: readonly { sprite: string; name: string }[]; label: string; className?: string }) {
  return (
    <ul className={`flex flex-wrap gap-[0.8em] ${className ?? ''}`} aria-label={label}>
      {tools.map((t) => (
        <li key={t.sprite} title={t.name}>
          <PixelIcon src={`/sprites/items/${t.sprite}.svg`} className="h-[5cqh] w-auto" />
          <span className="sr-only">{t.name}</span>
        </li>
      ))}
    </ul>
  );
}

/** Client sites as clickable cards: logo, name, one line, and a link out. */
function ProjectCards({ projects, label, visit }: { projects: NonNullable<WorldContent['projects']>; label: string; visit: string }) {
  return (
    <section className="mt-auto">
      <p className="font-pixel text-[length:var(--fs-small)] text-gold">{label}</p>
      <ul className="mt-[0.6em] grid grid-cols-2 gap-[1em] hh:grid-cols-1">
        {projects.map((p) => (
          <li key={p.url}>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full items-center gap-[0.8em] bg-night-950 px-[0.7em] py-[0.6em] shadow-[0_0_0_2px_#2a1d5e] hover:shadow-[0_0_0_2px_#ffd23f] focus-visible:shadow-[0_0_0_2px_#ffd23f]"
            >
              <PixelIcon src={`/sprites/worlds/${p.sprite}.svg`} className="h-[8cqh] w-auto shrink-0" />
              <span className="flex min-w-0 flex-col gap-[0.25em]">
                <span className="font-pixel text-[length:var(--fs-small)] text-cream group-hover:text-gold">{p.name}</span>
                <span className="font-vt text-[length:var(--fs-story)] leading-[1.05] text-muted">{p.description}</span>
                <span className="font-pixel text-[length:clamp(7px,1.1cqw,12px)] text-gold">
                  {visit} <span aria-hidden="true">▸</span>
                </span>
              </span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}

/** Level card for a world. World 6 holds the boss levels; World 7 links out to Krality. */
export default function WorldScreen({ world }: Props) {
  const { c } = useLanguage();
  const { go, back, previous } = useNavigation();
  const w = c.story.worlds[world];
  const hasBosses = world === 'w6';
  const tools: readonly { sprite: string; name: string }[] | undefined =
    shared.worldTools[world as keyof typeof shared.worldTools];
  const hasArt = Boolean(w.badges || w.snippet || w.flow);
  const link: string | undefined = shared.worldLinks[world as keyof typeof shared.worldLinks];
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
    <div className="absolute inset-0 flex flex-col gap-[3cqh] px-[var(--gutter)] pt-[7cqh] pb-[3cqh] hh:overflow-y-auto hh:pt-[46px] hh:gap-[18px]">
      <header className="pixel-panel flex items-center justify-between gap-[1.5em] px-[1.2em] py-[0.9em] hh:flex-col hh:items-start">
        <div className="min-w-0">
          <p className="font-pixel text-[length:var(--fs-small)] text-sunset">
            {w.label} · {shared.worldYears[world].replace('NOW', c.story.now)}
          </p>
          <h1 className="mt-[0.5em] font-pixel text-[length:var(--fs-h1)] text-cream">{w.title}</h1>
          {w.place && <p className="mt-[0.3em] font-vt text-[length:var(--fs-body)] text-muted">{w.place}</p>}
        </div>
        {w.family && <FamilyTree family={w.family} label={c.story.familyLabel} />}
      </header>

      <div className="flex min-h-0 flex-1 gap-[3cqw] hh:flex-none hh:flex-col hh:gap-[18px]">
        {hasArt && (
          <div className="flex min-h-0 w-[32%] shrink-0 flex-col gap-[2.5cqh] hh:w-full hh:gap-[18px]">
            {w.badges && (
              <div className="pixel-panel flex min-h-0 flex-1 flex-col items-center justify-center gap-[1.2em] bg-gradient-to-b from-night-800 to-night-950 px-[0.8em] py-[0.8em]">
                <ul className="flex w-full items-center justify-around gap-[1em]">
                  {w.badges.map((b) => (
                    <li key={b.sprite} className="flex flex-col items-center gap-[0.6em]">
                      <PixelIcon src={`/sprites/worlds/${b.sprite}.svg`} className={tools ? 'h-[12cqh] w-auto' : 'h-[15cqh] w-auto'} />
                      <span className="font-pixel text-[length:var(--fs-small)] text-gold">{b.caption}</span>
                    </li>
                  ))}
                </ul>
                {tools && <ToolIcons tools={tools} label={c.story.toolsLabel} className="justify-center" />}
                {link && w.linkLabel && (
                  <a
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-[1em] bg-[#6d4fff] px-[1em] py-[0.6em] font-pixel text-[length:var(--fs-small)] text-cream shadow-[0_0_0_2px_#07041a,0_0_0_4px_#8f78ff] hover:bg-[#8f78ff] focus-visible:bg-[#8f78ff]"
                  >
                    {w.linkLabel}
                    <span aria-hidden="true" className="text-gold">▸</span>
                  </a>
                )}
              </div>
            )}
            {w.snippet && <CodeWindow {...w.snippet} />}
            {w.flow && <FlowPanel {...w.flow} />}
          </div>
        )}

        <div className="pixel-panel flex min-h-0 flex-1 flex-col gap-[0.8em] overflow-hidden px-[1.2em] py-[1em] hh:overflow-visible">
          <div className="flex items-start gap-[1em]">
            {w.locked && <PixelIcon src="/sprites/achievements/locked.svg" className="h-[10cqh] w-auto shrink-0" />}
            <p className="font-vt text-[length:var(--fs-body)] text-cream">
              {w.locked && <span className="mb-[0.3em] block font-pixel text-[length:var(--fs-small)] text-muted">{c.story.lockedNotice}</span>}
              “{w.tagline}”
            </p>
          </div>
          {w.summary && <p className="font-vt text-[length:var(--fs-story)] leading-[1.15] text-muted">{w.summary}</p>}
          {w.learned && (
            <div>
              <p className="font-pixel text-[length:var(--fs-small)] text-gold">{c.story.learnedLabel}</p>
              <ul className="mt-[0.6em] flex flex-wrap gap-[0.7em]">
                {w.learned.map((l) => (
                  <li key={l} className="bg-night-950 px-[0.5em] py-[0.1em] font-vt text-[length:var(--fs-story)] leading-tight text-mint shadow-[0_0_0_2px_#2a1d5e]">
                    {l}
                  </li>
                ))}
              </ul>
            </div>
          )}
          {w.details && (
            <ul className="flex flex-wrap gap-[0.6em]">
              {w.details.map((d) => (
                <li key={d} className="bg-night-950 px-[0.5em] py-[0.1em] font-vt text-[length:var(--fs-story)] leading-tight text-cyan shadow-[0_0_0_2px_#2a1d5e]">
                  {d}
                </li>
              ))}
            </ul>
          )}
          {tools && !w.badges && <ToolIcons tools={tools} label={c.story.toolsLabel} className="mt-auto" />}
          {w.projects && <ProjectCards projects={w.projects} label={c.story.projectsLabel} visit={c.story.projectVisit} />}
        </div>

        {hasBosses && (
          <nav className="pixel-panel flex min-h-0 w-[40%] shrink-0 flex-col px-[1em] py-[0.9em] hh:w-full" aria-label={c.story.bossSelect}>
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
