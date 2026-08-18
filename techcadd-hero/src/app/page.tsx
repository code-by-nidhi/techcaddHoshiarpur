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


/**
 * The dark hero opens, then the page runs white/#F8FAFC the whole way down
 * until the Launch Center closes it back on dark. Each section alternates
 * white ↔ surface so no two neighbours share a background.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home">
        <Hero />
        <About />
        <FeaturedCourses />
        {/*
         * No spacing wrapper here: a transparent div between the dark courses
         * section and the light TechUniverse showed the dark page background
         * through as an empty band. Each section's own section-pad is the gap.
         */}
        <TechUniverse />
        <WhyChoose />
        <CareerOutcomes />
        <StudentWall />
        <ProgrammeRoadmap />
        <CommandCenter />
        <HelpCenter />
        <KnowledgeHub />
        <LaunchCenter />
      </main>
      <MegaFooter />
    </>
  );
}
