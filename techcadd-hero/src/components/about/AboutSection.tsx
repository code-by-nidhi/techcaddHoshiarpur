import { CalendarDays } from "lucide-react";

import GlassCard from "@/components/about/ui/GlassCard";
import HighlightedText from "@/components/about/ui/HighlightedText";
import ImageCard from "@/components/about/ui/ImageCard";
import Parallax from "@/components/about/ui/Parallax";
import ScrollReveal from "@/components/about/ui/ScrollReveal";
import SectionHeading from "@/components/about/ui/SectionHeading";
import TechBackground from "@/components/about/ui/TechBackground";
import { images, whoWeAre } from "@/data/about";
import { revealScale } from "@/lib/motion";

export default function AboutSection() {
  return (
    <section
      id="who-we-are"
      aria-labelledby="who-we-are-heading"
      className="surface-light section-y relative isolate bg-paper"
    >
      <TechBackground variant="hero" tone="light" />

      <div className="shell">
        {/* Top-aligned, not centred: the image column is far taller than the
            copy, and centring pushed the heading halfway down the section. */}
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start lg:gap-16 xl:gap-20">
          {/* ------------------------------ Copy ------------------------------ */}
          {/* `lg:pt-2` is optical, not structural — it lifts the eyebrow's
              cap-height into line with the top edge of the lead image. */}
          <div className="lg:pt-2">
            <SectionHeading
              id="who-we-are-heading"
              eyebrow={whoWeAre.eyebrow}
              title={whoWeAre.heading}
              className="max-w-xl"
            />

            <div className="mt-8 flex flex-col gap-5">
              {whoWeAre.paragraphs.map((paragraph, index) => (
                <ScrollReveal key={paragraph.slice(0, 32)} delay={0.06 * index}>
                  <p className="type-lead max-w-xl text-ink-muted">
                    <HighlightedText
                      text={paragraph}
                      highlights={whoWeAre.highlights}
                    />
                  </p>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* ----------------------------- Visual ----------------------------- */}
          <div className="relative">
            {/* Decorative gradient behind the composition. */}
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[3rem] bg-linear-to-tr from-brand/15 via-transparent to-accent/12 blur-2xl"
            />

            <Parallax offset={22}>
              <ScrollReveal variants={revealScale}>
                {/* The info card lives inside this wrapper so it travels with
                    the image under parallax. Below `sm` it stays in flow and
                    simply sits under the photo; from `sm` it insets into the
                    photo's lower-left corner. */}
                <div className="relative">
                  <ImageCard
                    image={images.team}
                    aspect="aspect-4/3"
                    sizes="(max-width: 1024px) 92vw, 46vw"
                  />

                  <GlassCard
                    strong
                    className="mt-4 flex items-center gap-4 p-4 sm:absolute sm:bottom-4 sm:left-4 sm:mt-0 sm:w-60 sm:p-5"
                  >
                    <span
                      aria-hidden="true"
                      className="chip-border flex size-11 shrink-0 items-center justify-center rounded-xl bg-[var(--ctx-chip-bg)] text-[var(--ctx-chip-fg)]"
                    >
                      <CalendarDays className="size-5" strokeWidth={1.75} />
                    </span>

                    <span className="flex flex-col">
                      <span className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-muted">
                        {whoWeAre.infoCard.label}
                      </span>
                      <span className="font-display mt-0.5 text-2xl font-bold tracking-[-0.02em] text-ink">
                        {whoWeAre.infoCard.value}
                      </span>
                      <span className="mt-1 text-xs leading-snug text-ink-muted">
                        {whoWeAre.infoCard.caption}
                      </span>
                    </span>
                  </GlassCard>
                </div>
              </ScrollReveal>
            </Parallax>

            {/* Two smaller images, in a row beneath the lead image at every
                screen size so nothing overlaps on mobile. */}
            <div className="mt-4 grid grid-cols-2 gap-4">
              <ScrollReveal variants={revealScale} delay={0.1}>
                <ImageCard
                  image={images.students}
                  aspect="aspect-square"
                  sizes="(max-width: 1024px) 45vw, 23vw"
                />
              </ScrollReveal>

              <ScrollReveal variants={revealScale} delay={0.18}>
                <ImageCard
                  image={images.learning}
                  aspect="aspect-square"
                  sizes="(max-width: 1024px) 45vw, 23vw"
                />
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
