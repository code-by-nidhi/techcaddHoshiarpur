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
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[calc(var(--nav-h)+2rem)] bg-[linear-gradient(180deg,rgba(5,11,31,0.55),transparent)]"
      />

      <div /*
         * Top padding is the bar height plus a deliberate gap — 28px on
         * phones, 40px on tablets, 60px on desktop. It was a flat 86px at
         * lg, which is exactly the bar height, so the copy began the
         * moment the navbar ended with no breathing room at all.
         */
        /*
         * The bottom padding carries `--stats-lift` on top of its own value.
         *
         * EnterpriseStats is pulled up by exactly that much to sit on this
         * section's edge, and without the reserve it landed on the feature
         * chips and cut them in half. Because the box is border-box, adding it
         * does not make the hero taller than the 100svh below — the content
         * simply centres in what is left, which is the intent: the cards
         * overlap empty navy.
         */
        className="mx-auto grid min-h-[100svh] w-full max-w-[1600px] grid-cols-1 items-center gap-10 px-6 pb-[calc(4rem+var(--stats-lift))] pt-[calc(var(--nav-h)+1.75rem)] sm:pt-[calc(var(--nav-h)+2.5rem)] lg:grid-cols-[minmax(0,44%)_minmax(0,56%)] lg:gap-4 lg:px-[4.5rem] lg:pb-[calc(2.5rem+var(--stats-lift))] lg:pt-[calc(var(--nav-h)+3.75rem)]">
        <HeroContent />
        <RobotShowcase />
      </div>
    </section>
  );
}
