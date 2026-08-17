import ScrollReveal from "@/components/about/ui/ScrollReveal";
import SectionHeading from "@/components/about/ui/SectionHeading";
import TechBackground from "@/components/about/ui/TechBackground";
import { values, valuesSection } from "@/data/about";
import { cn } from "@/lib/utils";

/**
 * Dividers for a grid that runs 1 column → 2 (`sm`) → 4 (`lg`).
 *
 * Written out per index rather than derived, because the correct rule depends
 * on the cell's position in each of three different grids — and the values list
 * is a fixed four. Anything beyond the fourth cell simply gets no rules, so a
 * fifth entry degrades quietly instead of drawing a wrong line.
 */
const DIVIDER_BOTTOM = [
  "border-b lg:border-b-0",
  "border-b lg:border-b-0",
  "border-b sm:border-b-0",
  "",
];
const DIVIDER_RIGHT = ["sm:border-r", "lg:border-r", "sm:border-r", ""];

/**
 * "What We Stand For".
 *
 * Deliberately not the card grid used by "Why It Matters" — the two sections
 * sit close together and would otherwise read as the same component twice.
 * This is a single frosted slab split by hairlines, with an oversized outline
 * numeral behind each cell.
 */
export default function ValuesSection() {
  return (
    <section
      id="what-we-stand-for"
      aria-labelledby="what-we-stand-for-heading"
      className="surface-light section-y relative isolate bg-paper"
    >
      <TechBackground variant="hero" tone="light" />

      <div className="shell">
        <SectionHeading
          id="what-we-stand-for-heading"
          eyebrow={valuesSection.eyebrow}
          title={valuesSection.heading}
          align="center"
        />

        <div className="relative mt-12 lg:mt-16">
          {/* Soft ring behind the slab — the section's own signature, and what
              gives the frosted panel something to refract. */}
          <div
            aria-hidden="true"
            className="absolute -inset-x-6 -inset-y-10 -z-10 rounded-[4rem] bg-linear-to-tr from-brand/12 via-accent/8 to-transparent blur-3xl"
          />

          <ScrollReveal>
            <div className="glass-panel-strong relative overflow-hidden rounded-[var(--radius-hero)]">
              {/* Travelling highlight along the top edge. */}
              <span
                aria-hidden="true"
                className="animate-sheen absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgb(37_99_235/0.8),rgb(168_85_247/0.8),transparent)]"
              />

              <ul className="grid sm:grid-cols-2 lg:grid-cols-4">
                {values.map((item, index) => (
                  <li
                    key={item.title}
                    className={cn(
                      "group relative overflow-hidden p-7 sm:p-8 lg:p-9",
                      DIVIDER_BOTTOM[index] ?? "",
                      DIVIDER_RIGHT[index] ?? "",
                    )}
                  >
                    {/* Wash that fills the cell on hover. */}
                    <span
                      aria-hidden="true"
                      className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(120%_100%_at_50%_100%,rgb(37_99_235/0.10),transparent_70%)] opacity-0 transition-opacity duration-500 ease-[var(--ease-out-soft)] group-hover:opacity-100"
                    />

                    {/* Oversized outline numeral. Stroked with the context
                        hairline directly rather than through the theme colour,
                        which resolves once at the root and would keep the dark
                        value inside this light section. */}
                    <span
                      aria-hidden="true"
                      className="font-display pointer-events-none absolute -top-3 right-3 -z-10 text-[5.5rem] leading-none font-bold text-transparent transition-colors duration-500 [-webkit-text-stroke:1px_var(--ctx-hairline)] group-hover:[-webkit-text-stroke:1px_rgb(37_99_235/0.35)]"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <span
                      aria-hidden="true"
                      className="chip-border inline-flex size-12 items-center justify-center rounded-[var(--radius-card)] bg-[var(--ctx-chip-bg)] text-[var(--ctx-chip-fg)] transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1 group-hover:scale-105 motion-reduce:transform-none"
                    >
                      <item.icon className="size-5" strokeWidth={1.75} />
                    </span>

                    <h3 className="type-h3 mt-6 text-ink">{item.title}</h3>

                    {/* Accent rule that draws out from under the title. */}
                    <span
                      aria-hidden="true"
                      className="mt-3 block h-px w-8 bg-linear-to-r from-brand to-accent transition-all duration-500 ease-[var(--ease-out-soft)] group-hover:w-16 motion-reduce:transition-none"
                    />

                    <p className="type-body-sm mt-4 text-ink-muted">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
