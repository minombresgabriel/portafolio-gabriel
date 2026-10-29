"use client";

import { profile } from "@/data/portfolio";
import { useSpace } from "@/lib/store";

export function Header() {
  const introDone = useSpace((s) => s.introDone);
  const menuOpen = useSpace((s) => s.menuOpen);
  const setMenu = useSpace((s) => s.setMenu);
  const goTo = useSpace((s) => s.goTo);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-0 z-40 flex items-center justify-between px-6 py-6 md:px-10 md:py-8">
      <button
        id="brand-name"
        onClick={() => goTo(0)}
        className={`brand-name pointer-events-auto text-left text-[11px] text-white/85 transition-opacity duration-700 hover:text-white ${
          introDone ? "opacity-100 delay-[900ms]" : "opacity-0"
        }`}
      >
        {profile.name}
      </button>
      <div
        className={`pointer-events-auto flex items-center gap-5 transition-opacity duration-1000 ${
          introDone ? "opacity-100 delay-[1400ms]" : "opacity-0"
        }`}
      >
        <a
          href={profile.cv}
          download
          className="rounded-full border border-white/20 px-4 py-2 text-xs text-white/85 transition hover:border-white/50 hover:text-white"
        >
          Download CV
        </a>
        <button
          onClick={() => setMenu(!menuOpen)}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="group relative h-8 w-8"
        >
          <span
            className={`absolute left-1 right-1 h-px bg-white transition-transform duration-500 ${
              menuOpen ? "top-1/2 rotate-45" : "top-[11px]"
            }`}
          />
          <span
            className={`absolute left-1 right-1 h-px bg-white transition-transform duration-500 ${
              menuOpen ? "top-1/2 -rotate-45" : "top-[19px]"
            }`}
          />
        </button>
      </div>
    </header>
  );
}
