"use client";

import { Html, useProgress } from "@react-three/drei";

/** In-scene loader shown while the 3D assets stream in. */
export default function CanvasLoader() {
  const { progress } = useProgress();

  return (
    <Html center>
      <div className="flex w-40 flex-col items-center gap-3">
        <div className="size-9 animate-spin rounded-full border-2 border-white/15 border-t-cyan-300" />
        <div className="h-px w-full overflow-hidden bg-white/10">
          <div
            className="h-px bg-gradient-to-r from-blue-500 to-violet-400 transition-[width] duration-200"
            style={{ width: `${progress.toFixed(0)}%` }}
          />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
          Loading {progress.toFixed(0)}%
        </span>
      </div>
    </Html>
  );
}
