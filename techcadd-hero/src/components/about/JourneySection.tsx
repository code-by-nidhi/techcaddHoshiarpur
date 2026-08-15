import GlassCard from "@/components/about/ui/GlassCard";
import ScrollReveal from "@/components/about/ui/ScrollReveal";
import SectionHeading from "@/components/about/ui/SectionHeading";
import Spotlight from "@/components/about/ui/Spotlight";
import TechBackground from "@/components/about/ui/TechBackground";
import TimelineRail from "@/components/about/ui/TimelineRail";
import { journeySection, milestones } from "@/data/about";

/**
 * "Our Journey" — an ordered timeline on a single rail.
 *
 * One layout at every breakpoint: the rail sits inside the padding on mobile
 * and moves out beside the year column from `sm`, so nothing has to reflow into
 * a different structure on small screens.
 */
export default function JourneySection() {
  return (
    <section
      id="our-journey"
      aria-labelledby="our-journey-heading"
      className="surface-light section-y relative isolate bg-mist"
    >
      <TechBackground variant="subtle" tone="light" />

      <div className="shell">
        <SectionHeading
          id="our-journey-heading"
          eyebrow={journeySection.eyebrow}
          title={journeySection.heading}
          align="center"
        />

        {/* `--rail` is the single source of truth for the rail's x-position:
            the line sits on it, the nodes centre on it. Below `sm` it runs in
            the row's left padding; from `sm` it moves into the gap between the
            year column and the cards. */}
        <ol className="relative mt-12 [--rail:0.71875rem] sm:[--rail:8.25rem] lg:mt-16 lg:[--rail:10.25rem]">
          {/* The rail, drawn down as the section scrolls past. Decorative —
              the list order carries the meaning. */}
          <TimelineRail />

          {milestones.map((milestone, index) => (
            <ScrollReveal
              key={milestone.year}
              as="li"
              delay={index * 0.08}
              className="relative flex gap-6 pb-8 pl-8 last:pb-0 sm:gap-10 sm:pl-0"
            >
              {/* Year + node */}
              <div className="flex shrink-0 items-start sm:w-28 sm:justify-end lg:w-36">
                <span className="font-mono text-sm font-semibold tracking-[0.02em] text-eyebrow sm:text-base">
                  {milestone.year}
                </span>
              </div>

              <span
                aria-hidden="true"
                className="chip-border absolute top-1.5 left-[calc(var(--rail)-0.4375rem)] flex size-3.5 items-center justify-center rounded-full bg-[var(--ctx-bg)]"
              >
                <span className="animate-node size-1.5 rounded-full bg-[var(--ctx-chip-fg)]" />
              </span>

              <Spotlight className="flex-1">
                <GlassCard interactive className="h-full p-6 sm:p-7">
                  <h3 className="type-h3 text-ink">{milestone.title}</h3>
                  <p className="type-body mt-3 text-ink-muted">
                    {milestone.description}
                  </p>
                </GlassCard>
              </Spotlight>
            </ScrollReveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
