"use client";

import { useEffect, useRef } from "react";

/**
 * Deep navy field with the reference's blue/purple radial glows and a light
 * dusting of drifting particles. Particles run on one 2D canvas rather than
 * hundreds of DOM nodes, and stop when the tab is hidden or the user prefers
 * reduced motion.
 */
export default function BackgroundEffects() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let width = 0;
    let height = 0;
    let raf = 0;

    type P = { x: number; y: number; r: number; vx: number; vy: number; a: number };
    let particles: P[] = [];

    const seed = () => {
      const count = window.innerWidth < 768 ? 40 : 110;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.4 + 0.4,
        vx: (Math.random() - 0.5) * 0.12,
        vy: -(Math.random() * 0.18 + 0.04),
        a: Math.random() * 0.45 + 0.12,
      }));
    };

    const resize = () => {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
    };

    const paint = () => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147, 197, 253, ${p.a})`;
        ctx.fill();
      }
    };

    const draw = () => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
      }
      paint();
      raf = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);

    /*
     * The loop only runs while the hero is on screen and the tab is visible.
     * Without the observer it kept repainting 110 particles for the whole
     * length of the page, which is pure CPU cost once the hero is scrolled
     * away and shows up as input latency further down.
     */
    let onScreen = true;
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    const start = () => {
      if (reduced || raf || !onScreen || document.hidden) return;
      raf = requestAnimationFrame(draw);
    };

    if (reduced) paint();
    else start();

    const observer = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry.isIntersecting;
        if (onScreen) start();
        else stop();
      },
      { rootMargin: "120px" },
    );
    observer.observe(canvas);

    const onVisibility = () => {
      if (reduced) return;
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      stop();
      observer.disconnect();
      window.removeEventListener("resize", resize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <div className="absolute inset-0 bg-[#020617]" />

      {/* deep navy wash rising from the bottom right, as in the reference */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_120%_90%_at_78%_60%,rgba(12,26,74,0.95)_0%,rgba(6,10,26,0.6)_45%,transparent_75%)]" />

      {/* violet bloom at the far right edge */}
      <div className="absolute right-[-12%] top-[6%] size-[52rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.30)_0%,transparent_68%)] blur-3xl" />

      {/* electric blue pool behind the platform */}
      <div className="absolute bottom-[2%] right-[16%] size-[44rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.28)_0%,transparent_70%)] blur-3xl" />

      {/* faint cool light on the copy side */}
      <div className="absolute -left-40 top-[18%] size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(30,64,175,0.18)_0%,transparent_70%)] blur-3xl" />

      <canvas ref={canvasRef} className="absolute inset-0 size-full" />

      {/* vignette to keep the headline crisp */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(2,4,10,0.55)_0%,transparent_60%)]" />
    </div>
  );
}
