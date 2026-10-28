"use client";

import { planets, profile } from "@/data/portfolio";
import { useSpace } from "@/lib/store";
import { MODE_KEY, writePref } from "@/lib/storage";
import { ContactForm } from "./ContactForm";
import { ExperienceList, StackList } from "./Menu";
import { GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

const SectionLabel = ({ children }: { children: React.ReactNode }) => (
  <h2 className="mb-6 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">{children}</h2>
);

/** Recruiter mode: the same content as a calm, fast, one-page read. */
export function QuickView() {
  const setMode = useSpace((s) => s.setMode);
  const enter = () => {
    writePref(MODE_KEY, "experience");
    setMode("experience");
  };

  const EnterButton = ({ className = "" }) => (
    <button
      onClick={enter}
      className={`rounded-full border border-white/25 px-5 py-2.5 text-sm text-white/90 transition hover:border-white/60 ${className}`}
    >
      Enter the experience
    </button>
  );

  return (
    <div className="min-h-screen bg-[var(--bg)] text-white">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6 md:px-10">
        <p className="brand-name text-[11px] text-white/85">{profile.name}</p>
        <div className="flex items-center gap-3">
          <a
            href={profile.cv}
            download
            className="rounded-full border border-white/20 px-4 py-2 text-xs text-white/85 transition hover:border-white/50"
          >
            Download CV
          </a>
          <EnterButton className="hidden md:inline-flex md:px-4 md:py-2 md:text-xs" />
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <section className="grid gap-14 py-12 md:grid-cols-[1.1fr_1fr_0.9fr] md:py-20">
          <div>
            <h1 className="text-balance font-display text-[clamp(2rem,3.6vw,3rem)] font-light leading-[1.08] tracking-[-0.03em]">
              {profile.tagline}
            </h1>
            <p className="mt-5 text-sm text-white/55">
              {profile.role} · {profile.stackLine}
              <br />
              {profile.location} · {profile.availability} · {profile.english}
            </p>
            <ul className="mt-8 grid gap-3 text-sm text-white/75">
              <li>
                <a href={`mailto:${profile.email}`} className="inline-flex items-center gap-3 hover:text-white">
                  <MailIcon /> {profile.email}
                </a>
              </li>
              <li>
                <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-white">
                  <LinkedInIcon /> {profile.linkedin.replace("https://", "")}
                </a>
              </li>
              <li>
                <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 hover:text-white">
                  <GitHubIcon /> {profile.github.replace("https://", "")}
                </a>
              </li>
            </ul>
          </div>
          <div>
            <SectionLabel>Experience</SectionLabel>
            <ExperienceList />
          </div>
          <div>
            <SectionLabel>Stack</SectionLabel>
            <StackList />
          </div>
        </section>

        <section className="border-t border-white/10 py-16">
          <SectionLabel>Selected work</SectionLabel>
          <ol className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 md:grid-cols-2 lg:grid-cols-3">
            {planets.map((p, i) => (
              <li key={p.id} className="bg-[var(--bg)] p-7" style={{ "--accent": p.color } as React.CSSProperties}>
                <p className="font-mono text-[11px] text-[var(--accent)]">
                  {String(i + 1).padStart(2, "0")} · {p.subtitle}
                </p>
                <h3 className="mt-3 text-xl text-white">{p.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-white/80">{p.hook}</p>
                <dl className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                  {p.metrics.map((m) => (
                    <div key={m.label} className="flex flex-col-reverse">
                      <dt className="text-[11px] text-white/50">{m.label}</dt>
                      <dd className="text-lg font-medium text-[var(--accent)]">{m.value}</dd>
                    </div>
                  ))}
                </dl>
                <p className="mt-5 text-sm leading-relaxed text-white/60">{p.challenge}</p>
                <p className="mt-3 text-sm leading-relaxed text-white/80">{p.approach}</p>
                <ul className="mt-4 grid gap-1 text-sm text-white/70">
                  {p.result.map((r) => (
                    <li key={r}>— {r}</li>
                  ))}
                </ul>
                <p className="mt-5 font-mono text-[11px] text-white/40">{p.tech.join(" · ")}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-10 border-t border-white/10 py-16 md:grid-cols-2">
          <div>
            <SectionLabel>Contact</SectionLabel>
            <p className="font-display text-[clamp(1.8rem,3vw,2.6rem)] font-light leading-[1.1] tracking-[-0.03em]">
              Let&apos;s build something that moves.
            </p>
          </div>
          <ContactForm />
        </section>

        <div className="flex justify-center pt-6">
          <EnterButton />
        </div>
      </main>
    </div>
  );
}
