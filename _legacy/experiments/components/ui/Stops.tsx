"use client";

import { CONTACT_STOP, planets, profile } from "@/data/portfolio";
import { useSpace } from "@/lib/store";
import { ContactForm } from "./ContactForm";
import { PlanetStop } from "./Dossier";
import { ArrowIcon, ChevronIcon, GitHubIcon, LinkedInIcon, MailIcon } from "./icons";

/** Props that hide an inactive stop from sight, focus and assistive tech. */
const presence = (active: boolean) => ({
  "aria-hidden": !active,
  inert: !active,
  "data-active": active,
});

const pad = (n: number) => String(n).padStart(2, "0");

function Home({ active }: { active: boolean }) {
  const step = useSpace((s) => s.step);
  const goTo = useSpace((s) => s.goTo);
  return (
    <section {...presence(active)} aria-labelledby="home-title" className="stop pointer-events-none absolute inset-0">
      <div className="absolute inset-x-6 bottom-[calc(13vh+120px)] text-center max-md:bottom-[16vh]">
        <p className="reveal mb-6 inline-flex items-center gap-2.5 rounded-full border border-white/15 bg-black/40 px-4 py-1.5 text-xs text-white/80 backdrop-blur-md">
          <span className="relative flex h-2 w-2">
            <span className="absolute inset-0 animate-ping rounded-full bg-emerald-400/70" />
            <span className="relative h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          {profile.availability}
        </p>
        <h1
          id="home-title"
          className="reveal legible mx-auto max-w-5xl text-balance font-display text-[clamp(2.1rem,4.7vw,4.6rem)] font-light leading-[1.05] tracking-[-0.035em] text-white"
        >
          {profile.tagline}
        </h1>
        <p className="reveal reveal-mid legible mt-5 text-sm text-white/75 md:text-base">
          {profile.name} · {profile.role} · <span className="text-white/55">{profile.stackLine}</span>
        </p>
        <p className="sr-only">
          {profile.location}. {profile.english}.
        </p>
      </div>

      {/* Selected work: the five stops ahead, each with its key number. */}
      <nav
        aria-label="Selected work"
        className="hud reveal reveal-late pointer-events-auto absolute bottom-[8vh] left-1/2 hidden w-[min(1080px,calc(100vw-160px))] -translate-x-1/2 grid-cols-5 overflow-hidden rounded-2xl md:grid"
      >
        {planets.map((p, i) => (
          <button
            key={p.id}
            onClick={() => goTo(i + 1)}
            style={{ "--accent": p.color } as React.CSSProperties}
            className="group relative border-white/10 px-5 py-4 text-left transition hover:bg-white/[0.05] [&:not(:first-child)]:border-l"
          >
            <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-[var(--accent)] transition-transform duration-500 group-hover:scale-x-100" />
            <span className="flex items-center gap-2 text-[11px] text-white/50">
              <span className="font-mono text-[var(--accent)]">{pad(i + 1)}</span>
              <span className="truncate uppercase tracking-[0.15em]">{p.subtitle}</span>
            </span>
            <span className="mt-2 block truncate text-xl font-medium tracking-[-0.02em] text-white">{p.metrics[0].value}</span>
            <span className="mt-0.5 block truncate text-xs text-white/55">{p.metrics[0].label}</span>
          </button>
        ))}
      </nav>

      <button
        onClick={() => step(1)}
        className="reveal reveal-late pointer-events-auto absolute bottom-5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 font-mono text-[11px] uppercase tracking-[0.25em] text-white/60 transition hover:text-white"
      >
        Scroll to explore
        <ChevronIcon className="animate-[drift_2.4s_ease-in-out_infinite]" />
      </button>
    </section>
  );
}

const links = [
  { icon: MailIcon, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { icon: LinkedInIcon, label: "LinkedIn", value: profile.linkedin.replace("https://", ""), href: profile.linkedin },
  { icon: GitHubIcon, label: "GitHub", value: profile.github.replace("https://", ""), href: profile.github },
];

const facts = [
  { label: "Role", value: profile.role },
  { label: "Stack", value: profile.stackLine },
  { label: "Based in", value: profile.location },
  { label: "English", value: profile.english.replace("English ", "") },
];

function Contact({ active }: { active: boolean }) {
  return (
    <section
      id="contact"
      {...presence(active)}
      aria-labelledby="contact-title"
      className="stop pointer-events-none absolute inset-0"
    >
      <div
        data-scrollable
        className="hud pointer-events-auto absolute inset-x-3 bottom-3 top-24 overflow-y-auto rounded-3xl md:inset-x-auto md:bottom-auto md:left-[max(8vw,9rem)] md:top-1/2 md:max-h-[calc(100vh-8rem)] md:w-[min(920px,64vw)] md:-translate-y-[45%]"
      >
        <div className="grid lg:grid-cols-[1.1fr_1fr]">
          <div className="p-7 md:p-10">
            <p className="reveal flex items-center gap-3 text-xs text-white/70">
              <span className="font-mono text-white/50">{pad(CONTACT_STOP)}</span>
              <span className="h-px w-6 bg-white/25" />
              <span className="uppercase tracking-[0.18em]">Contact</span>
            </p>
            <h2
              id="contact-title"
              className="reveal mt-5 font-display text-[clamp(2.2rem,3.6vw,3.4rem)] font-light leading-[1] tracking-[-0.035em] text-white"
            >
              Let&apos;s build something that moves.
            </h2>
            <p className="reveal mt-5 inline-flex items-center gap-2.5 text-sm text-emerald-300">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_10px_rgb(52_211_153/0.8)]" />
              {profile.availability}
            </p>

            <dl className="reveal reveal-mid mt-7 grid grid-cols-2 gap-x-6 gap-y-4 border-y border-white/10 py-5">
              {facts.map((f) => (
                <div key={f.label}>
                  <dt className="text-[11px] uppercase tracking-[0.18em] text-white/45">{f.label}</dt>
                  <dd className="mt-1 text-sm text-white/90">{f.value}</dd>
                </div>
              ))}
            </dl>

            <ul className="reveal reveal-mid mt-6 grid gap-2">
              {links.map(({ icon: Icon, label, value, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 transition hover:border-white/30 hover:bg-white/[0.06]"
                  >
                    <Icon className="text-white/70" />
                    <span className="min-w-0 flex-1">
                      <span className="block text-[11px] uppercase tracking-[0.18em] text-white/45">{label}</span>
                      <span className="block truncate text-sm text-white/90">{value}</span>
                    </span>
                    <ArrowIcon className="text-white/30 transition group-hover:translate-x-0.5 group-hover:text-white/70" />
                  </a>
                </li>
              ))}
            </ul>
            <a
              href={profile.cv}
              download
              className="reveal reveal-late mt-5 inline-flex items-center gap-2 text-sm text-white/70 underline-offset-4 transition hover:text-white hover:underline"
            >
              Download my CV (PDF) <ArrowIcon className="rotate-90" />
            </a>
          </div>

          <div className="reveal reveal-late border-t border-white/10 bg-white/[0.02] p-7 md:p-10 lg:border-l lg:border-t-0">
            <h3 className="text-lg text-white">Send me a message</h3>
            <p className="mb-6 mt-1.5 text-sm text-white/55">Tell me about the role or the project.</p>
            <ContactForm launch />
          </div>
        </div>
      </div>
    </section>
  );
}

export function Stops() {
  const arrived = useSpace((s) => (s.introDone ? s.arrived : null));
  return (
    <main className="pointer-events-none fixed inset-0 z-10">
      <Home active={arrived === 0} />
      {planets.map((p, i) => (
        <PlanetStop key={p.id} index={i} active={arrived === i + 1} />
      ))}
      <Contact active={arrived === CONTACT_STOP} />
    </main>
  );
}
