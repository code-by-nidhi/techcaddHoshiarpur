"use client";

import BackgroundEffects from "./BackgroundEffects";
import HeroContent from "./HeroContent";
import RobotShowcase from "./RobotShowcase";

export default function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[100svh] w-full overflow-hidden"
    >
      <BackgroundEffects />

      {/*
       * Separation without a hard rule: a short wash under the fixed bar so it
       * reads as its own layer rather than being welded to the hero copy.
       */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[calc(var(--nav-h)+2rem)] bg-[linear-gradient(180deg,rgba(2,6,23,0.55),transparent)]"
      />

      <div /*
         * Top padding is the bar height plus a deliberate gap — 28px on
         * phones, 40px on tablets, 60px on desktop. It was a flat 86px at
         * lg, which is exactly the bar height, so the copy began the
         * moment the navbar ended with no breathing room at all.
         */
        className="mx-auto grid min-h-[100svh] w-full max-w-[1600px] grid-cols-1 items-center gap-10 px-6 pb-16 pt-[calc(var(--nav-h)+1.75rem)] sm:pt-[calc(var(--nav-h)+2.5rem)] lg:grid-cols-[minmax(0,44%)_minmax(0,56%)] lg:gap-4 lg:px-[4.5rem] lg:pb-10 lg:pt-[calc(var(--nav-h)+3.75rem)]">
        <HeroContent />
        <RobotShowcase />
      </div>
    </section>
  );
}
