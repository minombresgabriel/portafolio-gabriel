"use client";

import { useEffect, useRef } from "react";
import { CONTACT_STOP, experience, planets, stack } from "@/data/portfolio";
import { useSpace, type Panel } from "@/lib/store";
import { MODE_KEY, writePref } from "@/lib/storage";
import { ArrowIcon, CloseIcon } from "./icons";

export function Menu() {
  const open = useSpace((s) => s.menuOpen);
  const goTo = useSpace((s) => s.goTo);
  const setPanel = useSpace((s) => s.setPanel);
  const setMode = useSpace((s) => s.setMode);
  const first = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) first.current?.focus({ preventScroll: true });
  }, [open]);

  const item = "group flex w-full items-center gap-5 py-2.5 text-left text-white/70 transition hover:text-white";

  return (
    <nav
      id="site-menu"
      aria-label="Site"
      aria-hidden={!open}
      inert={!open}
      className={`fixed inset-0 z-30 flex items-center bg-black/80 backdrop-blur-xl transition-opacity duration-500 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
    >
      <div className="mx-auto grid w-full max-w-5xl gap-14 px-8 md:grid-cols-[1.4fr_1fr] md:px-12">
        <div>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">Planets</p>
          <ul>
            {planets.map((p, i) => (
              <li key={p.id}>
                <button ref={i === 0 ? first : undefined} onClick={() => goTo(i + 1)} className={item}>
                  <span className="w-6 font-mono text-[11px] text-white/35">{String(i + 1).padStart(2, "0")}</span>
                  <span
                    className="h-3.5 w-3.5 rounded-full"
                    style={{ background: `radial-gradient(circle at 35% 35%, #fff8, ${p.color} 45%, #000 110%)` }}
                  />
                  <span className="font-display text-2xl font-light tracking-[-0.02em] md:text-3xl">{p.name}</span>
                </button>
              </li>
            ))}
            <li>
              <button onClick={() => goTo(CONTACT_STOP)} className={item}>
                <span className="w-6 font-mono text-[11px] text-white/35">06</span>
                <ArrowIcon className="h-3.5 w-3.5" />
                <span className="font-display text-2xl font-light tracking-[-0.02em] md:text-3xl">Contact</span>
              </button>
            </li>
          </ul>
        </div>
        <div>
          <p className="mb-5 font-mono text-[10px] uppercase tracking-[0.3em] text-white/35">More</p>
          <ul className="grid gap-1">
            {(["experience", "stack"] as Panel[]).map((panel) => (
              <li key={panel}>
                <button onClick={() => setPanel(panel)} className={`${item} text-lg capitalize`}>
                  {panel}
                </button>
              </li>
            ))}
            <li>
              <button
                onClick={() => {
                  writePref(MODE_KEY, "quick");
                  setMode("quick");
                }}
                className={`${item} text-lg`}
              >
                Quick view <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">Recruiter mode</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export function InfoPanel() {
  const panel = useSpace((s) => s.panel);
  const setPanel = useSpace((s) => s.setPanel);
  const close = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (panel) close.current?.focus({ preventScroll: true });
  }, [panel]);

  return (
    <div
      role="dialog"
      aria-label={panel ?? undefined}
      aria-hidden={!panel}
      inert={!panel}
      className={`fixed inset-0 z-30 flex items-center justify-center bg-black/50 px-4 backdrop-blur-sm transition-opacity duration-500 ${
        panel ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={(e) => e.target === e.currentTarget && setPanel(null)}
    >
      <div data-scrollable className="hud max-h-[82vh] w-[min(620px,100%)] overflow-y-auto rounded-2xl p-8 md:p-10">
        <header className="mb-8 flex items-center justify-between">
          <h2 className="font-display text-3xl font-light capitalize tracking-[-0.02em] text-white">{panel}</h2>
          <button
            ref={close}
            onClick={() => setPanel(null)}
            aria-label="Close"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/70 transition hover:border-white/40 hover:text-white"
          >
            <CloseIcon />
          </button>
        </header>
        {panel === "experience" && <ExperienceList />}
        {panel === "stack" && <StackList />}
      </div>
    </div>
  );
}

export function ExperienceList() {
  return (
    <ol className="relative grid gap-7">
      <span aria-hidden className="absolute bottom-2 left-[5px] top-2 w-px bg-white/12" />
      {experience.map((e, i) => (
        <li key={e.company} className="relative grid grid-cols-[11px_1fr] gap-5">
          <span
            className={`mt-1.5 h-[11px] w-[11px] rounded-full border ${
              i === 0 ? "border-emerald-400 bg-emerald-400 shadow-[0_0_10px_rgb(52_211_153/0.7)]" : "border-white/40 bg-black"
            }`}
          />
          <div>
            <p className="flex items-center gap-2 text-xs text-white/50">
              {e.period}
              {i === 0 && (
                <span className="rounded-full border border-emerald-400/40 px-2 py-px text-[10px] uppercase tracking-[0.15em] text-emerald-300">
                  Now
                </span>
              )}
            </p>
            <h3 className="mt-1.5 text-lg leading-snug text-white">{e.company}</h3>
            <p className="text-sm text-white/55">{e.role}</p>
            <p className="mt-2.5 text-sm leading-relaxed text-white/70">{e.summary}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}

export function StackList() {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {stack.map((s) => (
        <div key={s.group} className="rounded-xl border border-white/10 bg-white/[0.03] p-4">
          <h3 className="text-xs uppercase tracking-[0.18em] text-white/50">{s.group}</h3>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {s.items.map((t) => (
              <li key={t} className="rounded-full border border-white/15 px-2.5 py-1 text-xs text-white/85">
                {t}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
