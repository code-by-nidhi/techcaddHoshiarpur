"use client";

import { useEffect, useState } from "react";

/**
 * The thin bar across the top of an article, 0% → 100%.
 *
 * Progress is measured against the article element itself, not the document:
 * measuring the page would have the bar reach 100% somewhere inside the footer,
 * long after the reader finished the piece.
 */
export default function ReadingProgress({ targetId }: { targetId: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const target = document.getElementById(targetId);
    if (!target) return;

    let frame = 0;

    const measure = () => {
      frame = 0;

      const { top, height } = target.getBoundingClientRect();
      const scrollable = height - window.innerHeight;

      if (scrollable <= 0) {
        setProgress(top <= 0 ? 100 : 0);
        return;
      }

      setProgress(Math.min(100, Math.max(0, (-top / scrollable) * 100)));
    };

    // scroll fires far faster than the screen repaints; coalesce to one per frame
    const onScroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [targetId]);

  return (
    <div
      role="progressbar"
      aria-label="Article reading progress"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress)}
      className="fixed inset-x-0 top-0 z-[9998] h-1 bg-transparent"
    >
      <div
        className="h-full origin-left bg-linear-to-r from-brand to-accent transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
