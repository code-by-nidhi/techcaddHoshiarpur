"use client";

/** DOM placeholder shown before the WebGL bundle is downloaded. */
export default function StageFallback() {
  return (
    <div className="flex size-full items-center justify-center">
      <div className="relative flex size-56 items-center justify-center rounded-full">
        <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.28)_0%,transparent_68%)] blur-xl" />
        <div className="size-10 animate-spin rounded-full border-2 border-white/15 border-t-cyan-300" />
      </div>
    </div>
  );
}
