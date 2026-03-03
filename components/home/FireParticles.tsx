"use client";

import React, { useRef, useEffect } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  ttl: number;
  color: string;
};

export default function FireParticles({ className = "" }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const prefersReduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const canvas = canvasRef.current!;

    const ctx = canvas.getContext("2d")!;

    let mounted = true;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      canvas.width = Math.max(1, Math.floor(rect.width * dpr));
      canvas.height = Math.max(1, Math.floor(rect.height * dpr));
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      try { ctx.setTransform(dpr, 0, 0, dpr, 0, 0); } catch {}
    };

    resize();

    let last = performance.now();
    const particles: Particle[] = [];
    const colors = ["#ffd27f", "#ff9f4b", "#ff5e3a", "#ff3d00"];
    const MAX = 45;

    function spawn() {
      if (!mounted) return;
      if (window.innerWidth < 768) return; // disable on small screens
      if (particles.length >= MAX) return;
      const rect = canvas.getBoundingClientRect();
      const x = rect.width * (0.7 + Math.random() * 0.25);
      const y = rect.height - (12 + Math.random() * 14);
      const speed = 30 + Math.random() * 80;
      const angle = -Math.PI / 2 + (Math.random() - 0.5) * (Math.PI / 6);
      const vx = Math.cos(angle) * speed;
      const vy = Math.sin(angle) * speed;
      const size = 1 + Math.random() * 3;
      const ttl = 1.2 + Math.random() * 2.6;
      const color = colors[Math.floor(Math.random() * colors.length)];
      particles.push({ x, y, vx, vy, size, life: ttl, ttl: ttl, color });
    }

    function loop(now: number) {
      if (!mounted) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;

      if (Math.random() < 0.25) spawn();

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.globalCompositeOperation = "lighter";

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life -= dt;
        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        const t = p.life / p.ttl;
        ctx.beginPath();
        ctx.fillStyle = p.color;
        ctx.globalAlpha = Math.max(0, Math.min(1, t));
        ctx.shadowColor = p.color;
        ctx.shadowBlur = 10 * t;
        ctx.arc(p.x, p.y, p.size * (1 + (1 - t) * 1.5), 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      rafRef.current = requestAnimationFrame(loop);
    }

    rafRef.current = requestAnimationFrame(loop);
    window.addEventListener("resize", resize);

    return () => {
      mounted = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className={`absolute inset-0 pointer-events-none ${className}`} />;
}
