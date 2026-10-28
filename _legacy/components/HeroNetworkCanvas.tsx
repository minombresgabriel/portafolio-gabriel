'use client';

import { useEffect, useRef } from 'react';

interface Particle {
  from: { x: number; y: number };
  progress: number;
  speed: number;
  hot: boolean;
}

const NODE_POSITIONS = [
  { x: 0.12, y: 0.22 },
  { x: 0.85, y: 0.15 },
  { x: 0.08, y: 0.75 },
  { x: 0.92, y: 0.7 },
  { x: 0.5, y: 0.08 },
  { x: 0.35, y: 0.9 },
  { x: 0.68, y: 0.85 },
];
const CORE = { x: 0.5, y: 0.5 };

const HeroNetworkCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let w = 0;
    let h = 0;
    let dpr = 1;

    const nodePx = (n: { x: number; y: number }) => ({ x: n.x * w, y: n.y * h });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (reduced) drawStatic();
    };

    const drawStatic = () => {
      ctx.clearRect(0, 0, w, h);
      const c = nodePx(CORE);
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.14)';
      ctx.lineWidth = 1;
      NODE_POSITIONS.forEach((n) => {
        const p = nodePx(n);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(c.x, c.y);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
        ctx.fill();
      });
      ctx.beginPath();
      ctx.arc(c.x, c.y, 3.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 61, 110, 0.6)';
      ctx.fill();
    };

    window.addEventListener('resize', resize);
    resize();

    if (reduced) return () => window.removeEventListener('resize', resize);

    let particles: Particle[] = [];
    let t = 0;
    let rafId: number | null = null;

    const spawn = () => {
      const from = NODE_POSITIONS[Math.floor(Math.random() * NODE_POSITIONS.length)];
      particles.push({
        from,
        progress: 0,
        speed: 0.006 + Math.random() * 0.006,
        hot: Math.random() < 0.12,
      });
    };
    const spawnTimer = window.setInterval(spawn, 380);

    const frame = () => {
      t += 1;
      ctx.fillStyle = 'rgba(5, 7, 14, 0.22)';
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = 'lighter';
      ctx.strokeStyle = 'rgba(0, 240, 255, 0.08)';
      ctx.lineWidth = 1;
      const c = nodePx(CORE);
      NODE_POSITIONS.forEach((n) => {
        const p = nodePx(n);
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(c.x, c.y);
        ctx.stroke();
      });

      particles.forEach((particle) => {
        particle.progress += particle.speed;
        const p = nodePx(particle.from);
        const x = p.x + (c.x - p.x) * particle.progress;
        const y = p.y + (c.y - p.y) * particle.progress;
        const radius = particle.hot ? 2.6 : 1.8;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.hot ? 'rgba(255, 61, 110, 0.9)' : 'rgba(0, 240, 255, 0.85)';
        ctx.fill();
      });
      particles = particles.filter((particle) => particle.progress < 1);

      NODE_POSITIONS.forEach((n) => {
        const p = nodePx(n);
        const pulse = 2.5 + Math.sin(t * 0.03 + n.x * 10) * 0.8;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulse, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(0, 240, 255, 0.5)';
        ctx.fill();
      });
      ctx.beginPath();
      ctx.arc(c.x, c.y, 4, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 61, 110, 0.7)';
      ctx.fill();
      ctx.globalCompositeOperation = 'source-over';

      rafId = requestAnimationFrame(frame);
    };

    const startLoop = () => {
      if (rafId === null) rafId = requestAnimationFrame(frame);
    };
    const stopLoop = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) startLoop();
        else stopLoop();
      },
      { threshold: 0 }
    );
    io.observe(canvas);

    return () => {
      window.removeEventListener('resize', resize);
      window.clearInterval(spawnTimer);
      stopLoop();
      io.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
};

export default HeroNetworkCanvas;
