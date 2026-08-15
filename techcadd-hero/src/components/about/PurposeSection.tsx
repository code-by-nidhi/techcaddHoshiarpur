import GlassCard from "@/components/about/ui/GlassCard";
import ScrollReveal from "@/components/about/ui/ScrollReveal";
import SectionHeading from "@/components/about/ui/SectionHeading";
import Spotlight from "@/components/about/ui/Spotlight";
import TechBackground from "@/components/about/ui/TechBackground";
import { purpose } from "@/data/about";

/** "Our Purpose" — mission and vision, side by side. */
export default function PurposeSection() {
  return (
    <section
      id="our-purpose"
      aria-labelledby="our-purpose-heading"
      className="surface-light section-y relative isolate bg-mist"
    >
      <TechBackground variant="subtle" tone="light" />

      <div className="shell">
        <SectionHeading
          id="our-purpose-heading"
          eyebrow="Our Purpose"
          title="What we are building toward"
          align="center"
        />

        <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:gap-6">
          {purpose.map((item, index) => (
            <ScrollReveal key={item.eyebrow} delay={index * 0.1} className="h-full">
              <Spotlight className="h-full">
                <GlassCard interactive className="h-full p-7 sm:p-9">
                  <span
                    aria-hidden="true"
                    className="chip-border inline-flex size-12 items-center justify-center rounded-[var(--radius-card)] bg-[var(--ctx-chip-bg)] text-[var(--ctx-chip-fg)]"
                  >
                    <item.icon className="size-5.5" strokeWidth={1.75} />
                  </span>

                  <p className="type-eyebrow mt-6 text-eyebrow">{item.eyebrow}</p>

                  <h3 className="type-h3 mt-3">{item.title}</h3>

                  <p className="type-body mt-4 text-ink-muted">{item.body}</p>
                </GlassCard>
              </Spotlight>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
