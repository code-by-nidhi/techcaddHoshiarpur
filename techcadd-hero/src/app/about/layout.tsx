import type { Metadata } from "next";
import type { ReactNode } from "react";

import Navbar from "@/components/Layout/Navbar";
import MegaFooter from "@/components/Layout/MegaFooter";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "A decade of training engineers in Hoshiarpur — who TechCADD is, how the labs and live project floor work, and what every programme is built to deliver.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {/*
       * No inherited text colour: the page alternates navy and white, and each
       * section sets its own through `surface-dark` / `surface-light`. A
       * blanket text-white here would go invisible on the white sections.
       */}
      <main className="relative bg-paper">{children}</main>
      <MegaFooter />
    </>
  );
}
