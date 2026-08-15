/**
 * Bootstrap's grid-only build: containers, rows, columns and the flex helpers,
 * with no Reboot and no component styles. That is deliberate — the full
 * bootstrap.css would restyle every heading, button and input on the Tailwind
 * pages, so only the grid layer is loaded, and only on this route.
 */
import "bootstrap/dist/css/bootstrap-grid.min.css";

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
      <main className="relative overflow-hidden bg-[#020617] text-white">{children}</main>
      <MegaFooter />
    </>
  );
}
