"use client";

import { useEffect, useRef, useState } from "react";
import { CONTACT_STOP, planets, type Planet } from "@/data/portfolio";
import { useSpace } from "@/lib/store";
import { ArrowIcon, CheckIcon } from "./icons";

const pad = (n: number) => String(n).padStart(2, "0");

/** Counts a leading number up from zero when it comes into view ("10+" → 0…10+). */
function CountUp({ value, active }: { value: string; active: boolean }) {
  const match = value.match(/^(\d+)(\D*)$/);
  const target = match ? Number(match[1]) : 0;
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!match || !active || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start = performance.now() + 450;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / 1400));
      setN(Math.round(target * (1 - Math.pow(1 - t, 3))));
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, value]);

  if (!match) return <>{value}</>;
  return (
    <>
      {n}
      {match[2]}
    </>
  );
}

/** The project's flow as connected nodes, with a pulse of light travelling along it. */
function Flow({ steps }: { steps: string[] }) {
  return (
    <div className="relative">
      <div aria-hidden className="absolute left-[6px] right-[6px] top-[6px] h-px bg-white/15">
        <span className="flow-pulse absolute -top-[3px] h-[7px] w-16 rounded-full" />
      </div>
      <ol
        className="relative grid gap-3"
        style={{ gridTemplateColumns: `repeat(${steps.length}, minmax(0, 1fr))` }}
      >
        {steps.map((s, i) => (
          <li key={s} className="flex flex-col gap-3">
            <span
              className="flow-node h-[13px] w-[13px] rounded-full border border-[var(--accent)] bg-black"
              style={{ animationDelay: `${(i / steps.length) * 3.2}s` }}
            />
            <span className="text-[13px] leading-snug text-white/80">
              <span className="mb-1 block font-mono text-[10px] text-white/35">{pad(i + 1)}</span>
              {s}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

const Heading = ({ children }: { children: React.ReactNode }) => (
  <h3 className="mb-4 flex items-center gap-3 text-[11px] font-medium uppercase tracking-[0.22em] text-white/55">
    <span className="h-px w-5 bg-[var(--accent)]" />
    {children}
  </h3>
);

/** HUD framing the cluster on the left: reticle, label and a giant ghost index. */
function Reticle({ p, index }: { p: Planet; index: number }) {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 hidden min-[900px]:block">
      <div className="reveal absolute left-[25%] top-1/2 h-[min(34vh,300px)] w-[min(34vh,300px)] -translate-x-1/2 -translate-y-1/2">
        <svg viewBox="0 0 100 100" className="reticle-spin absolute inset-0 h-full w-full">
          <circle cx="50" cy="50" r="47" fill="none" stroke="var(--accent)" strokeOpacity="0.35" strokeWidth="0.3" strokeDasharray="1 3" />
        </svg>
        {["left-0 top-0 border-l border-t", "right-0 top-0 border-r border-t", "left-0 bottom-0 border-l border-b", "right-0 bottom-0 border-r border-b"].map((c) => (
          <span key={c} className={`absolute h-6 w-6 border-[var(--accent)] ${c}`} />
        ))}
        <p className="legible absolute -bottom-9 left-0 whitespace-nowrap font-mono text-[11px] uppercase tracking-[0.2em] text-white/75">
          <span className="text-[var(--accent)]">{pad(index + 1)}</span> · {p.subtitle}
        </p>
      </div>
      <p className="ghost-index reveal reveal-late absolute bottom-[-0.12em] left-[5vw] font-display text-[clamp(9rem,17vw,16rem)] font-light leading-none tracking-[-0.06em]">
        {pad(index + 1)}
      </p>
    </div>
  );
}

export function PlanetStop({ index, active }: { index: number; active: boolean }) {
  const p = planets[index];
  const goTo = useSpace((s) => s.goTo);
  const body = useRef<HTMLDivElement>(null);
  const prev = planets[index - 1];
  const next = planets[index + 1];

  // Every visit starts from the top of the dossier.
  useEffect(() => {
    if (active && body.current) body.current.scrollTop = 0;
  }, [active]);

  return (
    <section
      id={p.id}
      aria-hidden={!active}
      inert={!active}
      data-active={active}
      aria-labelledby={`${p.id}-title`}
      className="stop pointer-events-none absolute inset-0"
      style={{ "--accent": p.color } as React.CSSProperties}
    >
      <Reticle p={p} index={index} />

      <article className="hud pointer-events-auto absolute inset-x-3 bottom-3 top-[42vh] flex flex-col overflow-hidden rounded-3xl min-[900px]:inset-x-auto min-[900px]:bottom-5 min-[900px]:right-5 min-[900px]:top-24 min-[900px]:w-[min(780px,54vw)]">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-64 opacity-20"
          style={{ background: `radial-gradient(90% 100% at 100% 0%, ${p.color}, transparent 70%)` }}
        />

        <div ref={body} data-scrollable className="relative flex-1 overflow-y-auto px-7 pb-10 pt-7 md:px-10 md:pt-9">
          {/* Header: where this project sits in the journey. */}
          <div className="reveal flex flex-wrap items-center justify-between gap-4">
            <p className="flex items-center gap-3 text-xs text-white/70">
              <span className="font-mono text-[var(--accent)]">PROJECT {pad(index + 1)}</span>
              <span className="h-px w-6 bg-white/25" />
              <span className="uppercase tracking-[0.18em]">{p.subtitle}</span>
            </p>
            <div className="flex gap-1.5" aria-label={`Project ${index + 1} of ${planets.length}`}>
              {planets.map((q, i) => (
                <span
                  key={q.id}
                  className="h-1 w-7 rounded-full"
                  style={{ background: i === index ? p.color : i < index ? "rgb(255 255 255 / 0.45)" : "rgb(255 255 255 / 0.12)" }}
                />
              ))}
            </div>
          </div>

          <h2
            id={`${p.id}-title`}
            className="reveal mt-6 font-display text-[clamp(2.6rem,4.6vw,4.8rem)] font-light leading-[0.95] tracking-[-0.04em] text-white"
          >
            {p.name}
          </h2>
          <p className="reveal mt-5 max-w-[560px] text-lg leading-relaxed text-white/85 md:text-xl">{p.hook}</p>

          <dl
            className="reveal reveal-mid mt-8 grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10"
            style={{ gridTemplateColumns: `repeat(${p.metrics.length}, minmax(0, 1fr))` }}
          >
            {p.metrics.map((m) => (
              <div key={m.label} className="bg-black/55 px-5 py-5">
                <dt className="sr-only">{m.label}</dt>
                <dd className="truncate text-[clamp(1.6rem,2.6vw,2.4rem)] font-medium leading-none tracking-[-0.03em] text-[var(--accent)]">
                  <CountUp value={m.value} active={active} />
                </dd>
                <dd className="mt-2.5 text-xs leading-snug text-white/60">{m.label}</dd>
              </div>
            ))}
          </dl>

          <section className="reveal reveal-mid mt-10">
            <Heading>How it works</Heading>
            <Flow steps={p.flow} />
          </section>

          <div className="reveal reveal-late mt-10 grid gap-8 md:grid-cols-2">
            <section>
              <Heading>The problem</Heading>
              <p className="text-[15px] leading-relaxed text-white/75">{p.challenge}</p>
            </section>
            <section>
              <Heading>What I built</Heading>
              <p className="text-[15px] leading-relaxed text-white/75">{p.approach}</p>
            </section>
          </div>

          <section className="reveal reveal-late mt-10">
            <Heading>The impact</Heading>
            <ul className="grid gap-3 md:grid-cols-3">
              {p.result.map((r) => (
                <li key={r} className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-sm leading-snug text-white/85">
                  <CheckIcon className="mb-3 text-[var(--accent)]" />
                  {r}
                </li>
              ))}
            </ul>
          </section>

          <section className="reveal reveal-late mt-10">
            <Heading>Built with</Heading>
            <ul className="flex flex-wrap gap-2">
              {p.tech.map((t) => (
                <li key={t} className="rounded-full border border-white/15 bg-white/[0.04] px-3.5 py-1.5 text-xs text-white/85">
                  {t}
                </li>
              ))}
            </ul>
          </section>
        </div>

        <footer className="relative flex items-center justify-between gap-4 border-t border-white/10 bg-black/30 px-7 py-4 md:px-10">
          <button
            onClick={() => goTo(index)}
            className="group inline-flex min-w-0 items-center gap-2 text-sm text-white/60 transition hover:text-white"
          >
            <ArrowIcon className="shrink-0 rotate-180 transition-transform group-hover:-translate-x-0.5" />
            <span className="truncate">{prev ? prev.name : "Home"}</span>
          </button>
          <button
            onClick={() => goTo(next ? index + 2 : CONTACT_STOP)}
            className="group inline-flex min-w-0 items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2 text-sm font-medium text-black transition hover:brightness-110"
          >
            <span className="truncate">Next: {next ? next.name : "Contact"}</span>
            <ArrowIcon className="shrink-0 transition-transform group-hover:translate-x-0.5" />
          </button>
        </footer>
      </article>
    </section>
  );
}
