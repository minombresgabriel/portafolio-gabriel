"use client";

import { Html } from "@react-three/drei";
import { CONTACT_STOP } from "@/data/portfolio";
import { CLUSTERS } from "@/lib/galaxy";
import { useSpace } from "@/lib/store";

/**
 * Tiny labels pinned to each project cluster, shown only on the wide views
 * (home and contact) so the galaxy reads as a map of the work.
 */
export function ClusterLabels() {
  const visible = useSpace((s) => s.introDone && (s.arrived === 0 || s.arrived === CONTACT_STOP));
  const goTo = useSpace((s) => s.goTo);

  return (
    <>
      {CLUSTERS.map((c, i) => (
        <Html key={c.id} position={c.position} zIndexRange={[5, 0]} style={{ pointerEvents: "none" }}>
          <button
            tabIndex={visible ? 0 : -1}
            aria-hidden={!visible}
            onClick={() => goTo(i + 1)}
            className={`group ml-3 -mt-2 flex items-center gap-2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.25em] transition-all duration-700 ${
              visible ? "pointer-events-auto opacity-100" : "translate-y-1 opacity-0"
            }`}
            style={{ transitionDelay: visible ? `${600 + i * 120}ms` : "0ms" }}
          >
            <span className="h-px w-4 transition-all duration-500 group-hover:w-7" style={{ background: c.color }} />
            <span className="text-white/45 transition group-hover:text-white">
              {String(i + 1).padStart(2, "0")} {c.name}
            </span>
          </button>
        </Html>
      ))}
    </>
  );
}
