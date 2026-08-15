import FeatureGrid from "@/components/about/ui/FeatureGrid";
import SectionHeading from "@/components/about/ui/SectionHeading";
import TechBackground from "@/components/about/ui/TechBackground";
import { whyChoose, whySection } from "@/data/about";

/** "Why Choose TechCADD" — the six stated reasons. */
export default function WhyChooseSection() {
  return (
    <section
      id="why-it-matters"
      aria-labelledby="why-it-matters-heading"
      className="surface-dark section-y relative isolate overflow-hidden bg-royal-deep"
    >
      <TechBackground variant="hero" />

      <div className="shell">
        <SectionHeading
          id="why-it-matters-heading"
          eyebrow={whySection.eyebrow}
          title={whySection.heading}
          align="center"
        />

        <FeatureGrid items={whyChoose} columns={3} className="mt-12 lg:mt-16" />
      </div>
    </section>
  );
}
