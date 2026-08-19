import Navbar from "@/components/Layout/Navbar";
import Hero from "@/components/Hero/Hero";
import MegaFooter from "@/components/Layout/MegaFooter";
import About from "@/components/sections/About";
import CourseCategories from "@/components/sections/CourseCategories";
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
 * Home page section order.
 *
 * The dark hero opens, the page runs light the whole way down, and the Launch
 * Center closes it back on dark. Neighbouring sections never share a
 * background — see each section's own root element for its colour.
 *
 * No spacing wrappers between sections: a transparent div between two
 * differently-coloured sections shows the dark page background through as an
 * empty band. Each section's own section-pad is the gap.
 */
export default function Home() {
  return (
    <>
      <Navbar />
      <main id="home">
        <Hero />
        <About />
        <CourseCategories />
        <FeaturedCourses />
        <WhyChoose />
        <CareerOutcomes />
        <StudentWall />
        <ProgrammeRoadmap />
        <TechUniverse />
        <CommandCenter />
        <HelpCenter />
        <KnowledgeHub />
        <LaunchCenter />
      </main>
      <MegaFooter />
    </>
  );
}
