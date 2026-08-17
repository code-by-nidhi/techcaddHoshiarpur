import type { Metadata } from "next";
import type { ReactNode } from "react";

import Navbar from "@/components/Layout/Navbar";
import MegaFooter from "@/components/Layout/MegaFooter";

export const metadata: Metadata = {
  title: {
    default: "Blog — Insights on learning, building and getting hired",
    template: "%s | TechCADD Blog",
  },
  description:
    "Practical guides, career insights, technology trends and expert advice from the trainers and engineers at TechCADD Hoshiarpur.",
  alternates: { canonical: "/blog" },
  openGraph: {
    type: "website",
    url: "/blog",
    siteName: "TechCADD Hoshiarpur",
    title: "TechCADD Blog",
    description:
      "Practical guides, career insights and technology trends from the people who train tomorrow's developers.",
  },
  twitter: { card: "summary_large_image" },
};

export default function BlogLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      {/* Sections declare their own surface, so no colour is inherited here. */}
      <main className="relative bg-paper">{children}</main>
      <MegaFooter />
    </>
  );
}
