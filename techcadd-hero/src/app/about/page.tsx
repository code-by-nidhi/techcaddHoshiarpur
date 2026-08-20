import AboutSection from "@/components/about/AboutSection";
import CTASection from "@/components/about/CTASection";
import HeroSection from "@/components/about/HeroSection";
import JourneySection from "@/components/about/JourneySection";
import PurposeSection from "@/components/about/PurposeSection";
import StatsSection from "@/components/about/StatsSection";
import TechnologySection from "@/components/about/TechnologySection";
import TrainingSection from "@/components/about/TrainingSection";
import ValuesSection from "@/components/about/ValuesSection";
import WhyChooseSection from "@/components/about/WhyChooseSection";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/seo/schema";

/**
 * The about page, in tonal movements: the navy hero opens and hands off to
 * white, the two mid-page navy sections break up the long light stretch, and
 * the closing CTA card sits on white so the page ends into the dark footer.
 *
 * `StatsSection` is passed to the hero as a child rather than imported inside
 * it: the hero is a client component for its parallax, and this keeps the four
 * figures server-rendered.
 */
export default function AboutPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "About Us", path: "/about" }]))} />
      <HeroSection>
        <StatsSection />
      </HeroSection>

      <AboutSection />
      <PurposeSection />
      <JourneySection />
      <ValuesSection />
      <TrainingSection />
      <TechnologySection />
      <WhyChooseSection />
      <CTASection />

      {/* light → dark, handing off to the footer */}
      <div
        aria-hidden
        className="h-24 bg-gradient-to-b from-white via-[#14245C]/40 to-[#101E52]"
      />
    </>
  );
}
