import ContactHero from "@/components/contact/ContactHero";
import WhyCounselling from "@/components/contact/WhyCounselling";
import CounsellingForm from "@/components/contact/CounsellingForm";
import SupportHub from "@/components/contact/SupportHub";
import ContactInfo from "@/components/contact/ContactInfo";
import ContactFaq from "@/components/contact/ContactFaq";
import FinalCta from "@/components/contact/FinalCta";
import { Ambience, Divider, Shell } from "@/components/contact/shared";

/**
 * Career counselling page. Dark throughout, because the fixed navbar draws its
 * logo and links in white and would be invisible over a light page.
 */
export default function ContactPage() {
  return (
    <div className="relative">
      <Ambience />

      <ContactHero />
      <Shell>
        <Divider />
      </Shell>

      <WhyCounselling />
      <CounsellingForm />

      <Shell>
        <Divider />
      </Shell>
      <SupportHub />

      <ContactInfo />
      <ContactFaq />
      <FinalCta />
    </div>
  );
}
