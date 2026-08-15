import ImageCard from "@/components/about/ui/ImageCard";
import ScrollReveal from "@/components/about/ui/ScrollReveal";
import ShowcaseTile from "@/components/about/ui/ShowcaseTile";
import TechBackground from "@/components/about/ui/TechBackground";
import { campusHighlights, images, moreThanTraining } from "@/data/about";
import { revealScale } from "@/lib/motion";

/**
 * "More Than Training" — a deep navy technology panel: copy on the left, two
 * overlapping image cards on the right, with the campus tiles beneath.
 */
export default function TrainingSection() {
  return (
    <section
      id="more-than-training"
      aria-labelledby="more-than-training-heading"
      className="surface-light section-y relative isolate bg-paper"
    >
      <TechBackground variant="subtle" tone="light" />

      <div className="shell">
        {/* A blue panel inside a white section — `surface-dark` flips the
            tokens for everything inside it. */}
        <div className="surface-dark relative isolate overflow-hidden rounded-[var(--radius-hero)] bg-royal-deep px-6 py-12 shadow-[0_30px_80px_-40px_rgb(8_21_64/0.8)] sm:px-10 sm:py-16 lg:px-14 lg:py-20">
          <TechBackground variant="panel" />

          <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
            {/* ----------------------------- Copy ---------------------------- */}
            <div>
              <ScrollReveal>
                <p className="type-eyebrow inline-flex items-center gap-2.5 text-eyebrow">
                  <span aria-hidden="true" className="h-px w-6 bg-eyebrow/60" />
                  {moreThanTraining.eyebrow}
                </p>
              </ScrollReveal>

              <ScrollReveal delay={0.06}>
                <h2 id="more-than-training-heading" className="type-h2 mt-4">
                  <span className="text-gradient-brand">
                    {moreThanTraining.heading}
                  </span>
                </h2>
              </ScrollReveal>

              <div className="mt-6 flex flex-col gap-5">
                {moreThanTraining.paragraphs.map((paragraph, index) => (
                  <ScrollReveal
                    key={paragraph.slice(0, 32)}
                    delay={0.12 + index * 0.06}
                  >
                    <p className="type-lead max-w-xl text-ink-muted">{paragraph}</p>
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* ---------------------------- Visual --------------------------- */}
            <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
              <ScrollReveal variants={revealScale}>
                <ImageCard
                  image={images.trainingPrimary}
                  aspect="aspect-4/5"
                  sizes="(max-width: 1024px) 90vw, 40vw"
                  className="lg:ml-auto lg:w-[85%]"
                />
              </ScrollReveal>

              {/* Overlapping card. Stacks below on mobile, overlaps from `sm`. */}
              <ScrollReveal
                variants={revealScale}
                delay={0.14}
                className="mt-4 sm:absolute sm:-bottom-8 sm:left-0 sm:mt-0 sm:w-3/5 lg:-left-6"
              >
                <ImageCard
                  image={images.trainingSecondary}
                  aspect="aspect-4/3"
                  sizes="(max-width: 1024px) 60vw, 26vw"
                />
              </ScrollReveal>
            </div>
          </div>
        </div>

        {/* -------------------------- Inside the campus ---------------------- */}
        <div className="mt-16 lg:mt-20">
          <ScrollReveal>
            <h3 className="type-eyebrow text-ink-muted">Inside the campus</h3>
          </ScrollReveal>

          {/* Image tiles rather than text cards: four stacked paragraphs in a
              row read as a wall of copy, and a campus is better shown than
              described. Nothing was cut — the same names and descriptions now
              sit over the photographs. */}
          <ul className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 xl:grid-cols-4">
            {campusHighlights.map((entry, index) => (
              <ScrollReveal
                key={entry.name}
                as="li"
                delay={index * 0.08}
                className="h-full"
              >
                <ShowcaseTile
                  title={entry.name}
                  description={entry.description}
                  image={entry.image}
                  icon={<entry.icon className="size-4.5" strokeWidth={1.75} />}
                />
              </ScrollReveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
