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

      <div className="mx-auto grid min-h-[100svh] w-full max-w-[1600px] grid-cols-1 items-center gap-10 px-6 pb-16 pt-[120px] lg:grid-cols-[minmax(0,44%)_minmax(0,56%)] lg:gap-4 lg:px-[4.5rem] lg:pb-10 lg:pt-[86px]">
        <HeroContent />
        <RobotShowcase />
      </div>
    </section>
  );
}
