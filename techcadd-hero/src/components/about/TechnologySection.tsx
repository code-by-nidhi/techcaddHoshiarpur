import GlassCard from "@/components/about/ui/GlassCard";
import ScrollReveal from "@/components/about/ui/ScrollReveal";
import SectionHeading from "@/components/about/ui/SectionHeading";
import TechBackground from "@/components/about/ui/TechBackground";
import TechPill from "@/components/about/ui/TechPill";
import {
  technologies,
  technologyCategories,
  technologySection,
} from "@/data/about";

/**
 * "What we teach" — every course/technology in the catalogue, grouped by family.
 *
 * Grouping is presentational: the names themselves are rendered exactly as they
 * appear in the data file.
 */
export default function TechnologySection() {
  return (
    <section
      id="what-we-teach"
      aria-labelledby="what-we-teach-heading"
      className="surface-dark section-y relative isolate overflow-hidden bg-royal-deep"
    >
      <TechBackground variant="hero" />

      <div className="shell">
        <SectionHeading
          id="what-we-teach-heading"
          eyebrow={technologySection.eyebrow}
          title={technologySection.heading}
          description={technologySection.intro}
          align="center"
          className="max-w-3xl"
        />

        <ScrollReveal className="mt-12 lg:mt-16">
          <GlassCard className="relative overflow-hidden p-6 sm:p-8 lg:p-12">
            {/* Animated background grid, contained within the panel. */}
            <div
              aria-hidden="true"
              className="animate-sheen pointer-events-none absolute inset-0 opacity-60"
              style={{
                backgroundImage:
                  "linear-gradient(to right, rgb(255 255 255 / 4%) 1px, transparent 1px), linear-gradient(to bottom, rgb(255 255 255 / 4%) 1px, transparent 1px), radial-gradient(40rem 20rem at 50% 0%, rgb(37 99 235 / 18%), transparent 70%)",
                backgroundSize: "48px 48px, 48px 48px, 200% 100%",
              }}
            />

            <div className="relative flex flex-col gap-9 sm:gap-10">
              {technologyCategories.map((category, categoryIndex) => {
                const items = technologies.filter(
                  (tech) => tech.category === category.id,
                );

                if (items.length === 0) return null;

                return (
                  <ScrollReveal
                    key={category.id}
                    delay={categoryIndex * 0.06}
                    className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-8"
                  >
                    <h3 className="type-eyebrow flex shrink-0 items-center gap-2.5 pt-1 text-ink-muted sm:w-40 lg:w-48">
                      <span
                        aria-hidden="true"
                        className="size-1.5 rounded-full bg-accent/70"
                      />
                      {category.label}
                    </h3>

                    {/* Each pill reveals on its own short delay, so a row
                        arrives as a sweep rather than all at once. */}
                    <ul className="flex flex-wrap gap-2.5">
                      {items.map((tech, techIndex) => (
                        <ScrollReveal
                          key={tech.name}
                          as="li"
                          delay={techIndex * 0.05}
                        >
                          <TechPill name={tech.name} icon={tech.icon} />
                        </ScrollReveal>
                      ))}
                    </ul>
                  </ScrollReveal>
                );
              })}
            </div>
          </GlassCard>
        </ScrollReveal>
      </div>
    </section>
  );
}
