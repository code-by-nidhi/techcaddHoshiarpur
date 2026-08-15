import ContactHero from "@/components/contact/ContactHero";
import CounsellingForm from "@/components/contact/CounsellingForm";
import SupportHub from "@/components/contact/SupportHub";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFaq from "@/components/contact/ContactFaq";
import FinalCta from "@/components/contact/FinalCta";

/**
 * Career counselling page, in three tonal movements:
 *
 *   dark navy hero  ->  white booking section  ->  light blue lower half
 *
 * The hero stays dark because the fixed navbar draws its logo and links in
 * white, and the closing CTA returns to a saturated gradient so the page hands
 * off cleanly to the dark footer.
 */
export default function ContactPage() {
  return (
    <div className="relative">
      <ContactHero />

      {/* dark -> white, so the hero dissolves rather than stopping at a line */}
      <div
        aria-hidden
        className="h-28 bg-gradient-to-b from-[#020617] via-[#0B1B3F]/60 to-white lg:h-36"
      />

      <CounsellingForm />
      <SupportHub />
      <ContactInfo />
      <ContactFaq />

      <FinalCta />

      {/* light -> dark, handing off to the footer */}
      <div aria-hidden className="h-24 bg-gradient-to-b from-[#EEF4FF] via-[#0B1B3F]/40 to-[#020617]" />
    </div>
  );
}
