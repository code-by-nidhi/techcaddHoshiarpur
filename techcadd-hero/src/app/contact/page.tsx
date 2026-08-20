import ContactHero from "@/components/contact/ContactHero";
import StudentDesk from "@/components/contact/StudentDesk";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFaq from "@/components/contact/ContactFaq";
import FinalCta from "@/components/contact/FinalCta";
import { safely } from "@/lib/cms/client";
import { getFaqs, type CmsFaq } from "@/lib/cms/content";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, localBusinessSchema } from "@/lib/seo/schema";

/**
 * Career counselling page, in three tonal movements:
 *
 *   dark navy hero  ->  white booking section  ->  light blue lower half
 *
 * The hero stays dark because the fixed navbar draws its logo and links in
 * white, and the closing CTA returns to a saturated gradient so the page hands
 * off cleanly to the dark footer.
 *
 * The FAQ band reads from the CMS — the questions an editor marked for this
 * page. Wrapped in `safely`, so a CMS outage costs the page that band and not
 * the counselling form above it.
 */
export default async function ContactPage() {
  const faqs = await safely(getFaqs({ featured: true, limit: 8 }), [] as CmsFaq[]);

  return (
    <div className="relative">
      <JsonLd data={graph(localBusinessSchema(), breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Contact Us", path: "/contact" }]))} />
      <ContactHero />

      {/* dark -> white, so the hero dissolves rather than stopping at a line */}
      <div
        aria-hidden
        className="h-28 bg-gradient-to-b from-[#101E52] via-[#14245C]/60 to-white lg:h-36"
      />

      <StudentDesk />
      <ContactInfo />
      <ContactFaq faqs={faqs} />

      <FinalCta />

      {/* light -> dark, handing off to the footer */}
      <div aria-hidden className="h-24 bg-gradient-to-b from-[#EEF4FF] via-[#14245C]/40 to-[#101E52]" />
    </div>
  );
}
