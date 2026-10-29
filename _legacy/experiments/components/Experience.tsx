"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import { useSpace } from "@/lib/store";
import { INTRO_KEY, MODE_KEY, readPref } from "@/lib/storage";
import { stopFromHash, useSpaceControls } from "@/lib/useSpaceControls";
import { Header } from "./ui/Header";
import { Stops } from "./ui/Stops";
import { StopRail } from "./ui/StopRail";
import { InfoPanel, Menu } from "./ui/Menu";
import { Intro } from "./ui/Intro";
import { QuickView } from "./ui/QuickView";

// The 3D scene is client-only and loaded lazily, after the HTML is on screen.
const Scene = dynamic(() => import("./galaxy/Scene"), { ssr: false });

const hasWebGL = () => {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
};

/** Recruiter mode by default on phones, low-power devices and reduced motion. */
const prefersQuickView = () => {
  const nav = navigator as Navigator & { deviceMemory?: number };
  return (
    window.matchMedia("(max-width: 767px)").matches ||
    window.matchMedia("(pointer: coarse) and (max-width: 1100px)").matches ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    (nav.hardwareConcurrency ?? 8) <= 2 ||
    (nav.deviceMemory ?? 8) <= 2 ||
    !hasWebGL()
  );
};

export default function Experience() {
  const mode = useSpace((s) => s.mode);
  const introDone = useSpace((s) => s.introDone);
  const sceneReady = useSpace((s) => s.sceneReady);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const requested = params.get("view") ?? readPref(MODE_KEY);
    const mode =
      requested === "quick" || requested === "experience" ? requested : prefersQuickView() ? "quick" : "experience";

    // Deep links land directly on their planet, without the intro.
    const stop = stopFromHash(window.location.hash);
    const skipIntro = stop !== 0 || (readPref(INTRO_KEY) === "1" && !params.has("intro"));
    useSpace.setState({ stop, arrived: stop, introDone: skipIntro, mode });
  }, []);

  useSpaceControls(mode === "experience");

  if (mode === "quick") return <QuickView />;

  return (
    <div className="fixed inset-0 overflow-hidden bg-black text-white">
      <div
        className={`absolute inset-0 transition-opacity duration-[1800ms] ease-out ${
          introDone && sceneReady ? "opacity-100" : "opacity-0"
        }`}
      >
        {mode === "experience" && <Scene />}
      </div>
      <Header />
      <Stops />
      <StopRail />
      <Menu />
      <InfoPanel />
      {mode === "experience" ? <Intro /> : <div className="fixed inset-0 z-50 bg-black" aria-hidden />}
    </div>
  );
}
