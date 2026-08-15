import type { Metadata } from "next";
import type { ReactNode } from "react";
import Navbar from "@/components/Layout/Navbar";
import MegaFooter from "@/components/Layout/MegaFooter";

export const metadata: Metadata = {
  title: "Contact Us & Career Counselling",
  description:
    "Talk to a TechCadd counsellor about courses, placements, internships and certifications. Free session, no obligation.",
  alternates: { canonical: "/contact" },
};

export default function ContactLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {/*
       * No inherited text colour here: the page runs dark, then white, then
       * light blue, so each section declares its own. A blanket text-white
       * would go invisible the moment the background turns light.
       */}
      <main className="relative overflow-hidden bg-white">{children}</main>
      <MegaFooter />
    </>
  );
}
