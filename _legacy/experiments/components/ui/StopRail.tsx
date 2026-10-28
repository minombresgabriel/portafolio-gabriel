"use client";

import { planets } from "@/data/portfolio";
import { useSpace } from "@/lib/store";

const RAIL = [
  { label: "Home", color: "#ffffff" },
  ...planets.map((p) => ({ label: p.name, color: p.color })),
  { label: "Contact", color: "#ffffff" },
];

/** Where am I, and how many stops are left: a vertical rail on the left edge. */
export function StopRail() {
  const introDone = useSpace((s) => s.introDone);
  const stop = useSpace((s) => s.stop);
  const goTo = useSpace((s) => s.goTo);

  return (
    <nav
      aria-label="Stops"
      className={`fixed left-6 top-1/2 z-20 hidden -translate-y-1/2 transition-opacity duration-1000 md:block ${
        introDone ? "opacity-100 delay-[1400ms]" : "pointer-events-none opacity-0"
      }`}
    >
      <span aria-hidden className="absolute bottom-3 left-[5px] top-3 w-px bg-white/15" />
      <ol className="relative grid gap-4">
        {RAIL.map((s, i) => {
          const current = i === stop;
          return (
            <li key={s.label}>
              <button
                onClick={() => goTo(i)}
                aria-current={current ? "step" : undefined}
                className="group flex items-center gap-3"
              >
                <span
                  className={`h-[11px] w-[11px] rounded-full border transition-all duration-500 ${
                    current ? "scale-110 border-transparent" : "border-white/40 bg-black group-hover:border-white"
                  }`}
                  style={current ? { background: s.color, boxShadow: `0 0 12px ${s.color}` } : undefined}
                />
                <span
                  className={`legible whitespace-nowrap text-xs transition-all duration-500 ${
                    current
                      ? "translate-x-0 text-white opacity-100"
                      : "-translate-x-1 text-white/70 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
