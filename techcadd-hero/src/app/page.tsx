import Navbar from "@/components/Layout/Navbar";
import Hero from "@/components/Hero/Hero";
import MegaFooter from "@/components/Layout/MegaFooter";
import About from "@/components/sections/About";
import FeaturedCourses from "@/components/sections/FeaturedCourses";
import WhyChoose from "@/components/sections/WhyChoose";
import CareerOutcomes from "@/components/sections/CareerOutcomes";
import StudentWall from "@/components/sections/StudentWall";
import ProgrammeRoadmap from "@/components/sections/ProgrammeRoadmap";
import TechUniverse from "@/components/sections/TechUniverse";
import CommandCenter from "@/components/sections/CommandCenter";
import HelpCenter from "@/components/sections/HelpCenter";
import KnowledgeHub from "@/components/sections/KnowledgeHub";
import LaunchCenter from "@/components/sections/LaunchCenter";
import { getArticles, getCategories } from "@/lib/blog/api";
import { safely } from "@/lib/cms/client";
import { getFaqs, getReviews, type CmsFaq, type CmsReview } from "@/lib/cms/content";
import type { Article, CategorySummary } from "@/lib/blog/types";

/**
 * Home page section order.
 *
 * The dark hero opens, the page runs light the whole way down, and the Launch
 * Center closes it back on dark. Neighbouring sections never share a
 * background — see each section's own root element for its colour.
 *
 * No spacing wrappers between sections: a transparent div between two
 * differently-coloured sections shows the dark page background through as an
 * empty band. Each section's own section-pad is the gap.
 *
 * Three sections read from the CMS — the student wall, the help centre and the
 * knowledge hub. All four requests are made together rather than section by
 * section, so the page waits once instead of four times, and each is wrapped
 * in `safely`: a CMS that is down or empty costs the page those sections, not
 * the whole route.
 */
export default async function Home() {
  const [reviews, faqs, articles, topics] = await Promise.all([
    safely(getReviews(), [] as CmsReview[]),
    safely(getFaqs(), [] as CmsFaq[]),
    // Six: one lead panel, two cards and a trending list of three.
    safely(getArticles({ limit: 6, sort: "latest" }), {
      data: [] as Article[],
      meta: { page: 1, limit: 6, total: 0, totalPages: 1, hasMore: false },
    }),
    safely(getCategories(), [] as CategorySummary[]),
  ]);

  return (
    <>
      <Navbar />
      <main id="home">
        <Hero />
        <About />
        <FeaturedCourses />
        {/*
         * Directly after the courses section, with no spacing wrapper: a
         * transparent div between the dark courses band and the light
         * TechUniverse showed the page background through as an empty strip.
         * Each section's own padding is the gap.
         */}
        <TechUniverse />
        <WhyChoose />
        <CareerOutcomes />
        <StudentWall reviews={reviews} />
        <ProgrammeRoadmap />
        <CommandCenter />
        <HelpCenter faqs={faqs} />
        <KnowledgeHub articles={articles.data} topics={topics} />
        <LaunchCenter />
      </main>
      <MegaFooter />
    </>
  );
}
