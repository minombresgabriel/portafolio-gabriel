"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { profile } from "@/data/portfolio";
import { useSpace } from "@/lib/store";
import { INTRO_KEY, writePref } from "@/lib/storage";

// Phase boundaries in seconds.
const POINT = 1.3; // a point of light appears and pulses
const LAUNCH = 1.9; // it streaks forward like a payment launching
const WARP = 2.75; // the camera follows it through light trails
const WRITE = 3.75; // the trail slows and writes the name

const smooth = (a: number, b: number, x: number) => {
  const t = Math.min(Math.max((x - a) / (b - a), 0), 1);
  return t * t * (3 - 2 * t);
};

type Streak = { angle: number; dist: number; speed: number; width: number };

export function Intro() {
  const introDone = useSpace((s) => s.introDone);
  const finishIntro = useSpace((s) => s.finishIntro);
  const [gone, setGone] = useState(introDone);
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const name = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    if (useSpace.getState().introDone) return;
    const el = canvas.current!;
    const ctx = el.getContext("2d")!;
    const dpr = Math.min(window.devicePixelRatio, 2);
    let w = 0;
    let h = 0;
    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      el.width = w * dpr;
      el.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const streaks: Streak[] = Array.from({ length: 260 }, () => ({
      angle: Math.random() * Math.PI * 2,
      dist: Math.pow(Math.random(), 0.6),
      speed: 0.6 + Math.random() * 0.8,
      width: 0.4 + Math.random() * 1.1,
    }));

    let raf = 0;
    let ended = false;
    const start = performance.now();

    const glow = (x: number, y: number, r: number, alpha: number, hue = "255,236,205") => {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r);
      g.addColorStop(0, `rgba(255,255,255,${alpha})`);
      g.addColorStop(0.15, `rgba(${hue},${alpha * 0.8})`);
      g.addColorStop(1, `rgba(${hue},0)`);
      ctx.fillStyle = g;
      ctx.fillRect(x - r, y - r, r * 2, r * 2);
    };

    const end = (skipped: boolean) => {
      if (ended) return;
      ended = true;
      cancelAnimationFrame(raf);
      writePref(INTRO_KEY, "1");
      finishIntro();
      const brand = document.getElementById("brand-name");
      const n = name.current;
      const tl = gsap.timeline({ onComplete: () => setGone(true) });
      if (!skipped && brand && n) {
        // Settle the big name into the small one in the header.
        const from = n.getBoundingClientRect();
        const to = brand.getBoundingClientRect();
        const scale = parseFloat(getComputedStyle(brand).fontSize) / parseFloat(getComputedStyle(n).fontSize);
        n.style.maskImage = n.style.webkitMaskImage = "none";
        tl.to(n, {
          x: to.left - from.left,
          y: to.top - from.top,
          scale,
          transformOrigin: "left top",
          duration: 1.1,
          ease: "power3.inOut",
        });
        tl.to(el, { opacity: 0, duration: 0.8 }, 0);
        tl.to(root.current, { backgroundColor: "rgba(0,0,0,0)", duration: 1.2 }, 0);
        tl.to(n, { opacity: 0, duration: 0.3 }, 1.0);
      } else {
        tl.to(root.current, { opacity: 0, duration: 0.6 });
      }
    };

    const frame = (now: number) => {
      const t = (now - start) / 1000;
      const cx = w / 2;
      const cy = h / 2;
      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = "rgba(0,0,0,0.42)"; // short persistence = soft motion blur
      ctx.fillRect(0, 0, w, h);
      ctx.globalCompositeOperation = "lighter";

      if (t < POINT) {
        const appear = smooth(0.15, 0.6, t);
        const pulse = Math.pow(Math.max(0, Math.sin((t - 0.55) * Math.PI * 2.6)), 6) * smooth(0.55, 0.7, t);
        glow(cx, cy, 26 + pulse * 30, appear * (0.55 + pulse * 0.45));
        glow(cx, cy, 3 + pulse * 2, appear);
      } else if (t < LAUNCH) {
        const k = (t - POINT) / (LAUNCH - POINT);
        const head = cx + Math.pow(k, 2.2) * w * 0.32;
        const len = 40 + k * w * 0.28;
        const g = ctx.createLinearGradient(head - len, cy, head, cy);
        g.addColorStop(0, "rgba(255,190,110,0)");
        g.addColorStop(1, "rgba(255,236,205,0.95)");
        ctx.fillStyle = g;
        ctx.fillRect(head - len, cy - 1, len, 2);
        glow(head, cy, 34, 0.9);
      } else if (t < WARP) {
        const k = (t - LAUNCH) / (WARP - LAUNCH);
        const intensity = Math.sin(k * Math.PI);
        const reach = Math.hypot(w, h) * 0.6;
        for (const s of streaks) {
          const d0 = ((s.dist + k * s.speed * 1.4) % 1) * reach;
          const len = 8 + intensity * 140 * s.speed * (d0 / reach);
          const dx = Math.cos(s.angle);
          const dy = Math.sin(s.angle);
          ctx.strokeStyle = `rgba(255,${200 + s.speed * 40},${150 + s.speed * 60},${0.15 + intensity * 0.55})`;
          ctx.lineWidth = s.width;
          ctx.beginPath();
          ctx.moveTo(cx + dx * d0, cy + dy * d0);
          ctx.lineTo(cx + dx * (d0 + len), cy + dy * (d0 + len));
          ctx.stroke();
        }
        glow(cx, cy, 60 * (1 - k) + 20, 0.6 * (1 - k * 0.5));
      } else if (t < WRITE) {
        const k = smooth(WARP, WRITE, t);
        const n = name.current;
        if (n) {
          const r = n.getBoundingClientRect();
          const reveal = k * 104;
          n.style.opacity = "1";
          n.style.maskImage = n.style.webkitMaskImage = `linear-gradient(90deg, #000 ${reveal - 4}%, transparent ${reveal}%)`;
          const x = r.left + (r.width * reveal) / 100;
          const y = r.top + r.height / 2;
          const g = ctx.createLinearGradient(x - 220, y, x, y);
          g.addColorStop(0, "rgba(255,190,110,0)");
          g.addColorStop(1, "rgba(255,226,180,0.6)");
          ctx.fillStyle = g;
          ctx.fillRect(x - 220, y - 0.75, 220, 1.5);
          if (k < 1) glow(x, y, 30, 0.85 * (1 - k * 0.6));
        }
      } else if (t > WRITE + 0.35) {
        end(false);
        return;
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const skip = () => end(true);
    window.addEventListener("keydown", skip);
    window.addEventListener("wheel", skip, { passive: true });
    window.addEventListener("pointerdown", skip);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("keydown", skip);
      window.removeEventListener("wheel", skip);
      window.removeEventListener("pointerdown", skip);
    };
  }, [finishIntro]);

  if (gone) return null;

  return (
    <div ref={root} className="fixed inset-0 z-50 bg-black" aria-hidden>
      <canvas ref={canvas} className="absolute inset-0 h-full w-full" />
      <p
        ref={name}
        className="brand-name intro-name absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(1.1rem,2.6vw,2.1rem)] opacity-0"
      >
        {profile.name}
      </p>
      <button
        onClick={(e) => e.currentTarget.blur()}
        className="absolute bottom-7 right-8 font-mono text-[10px] uppercase tracking-[0.3em] text-white/40 transition hover:text-white/80"
      >
        Skip intro
      </button>
    </div>
  );
}
