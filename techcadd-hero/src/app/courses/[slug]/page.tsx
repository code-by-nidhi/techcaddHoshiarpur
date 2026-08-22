import type { Metadata } from "next";
import { notFound } from "next/navigation";

import CourseHero from "@/components/courses/CourseHero";
import CourseVideo from "@/components/courses/CourseVideo";
import WhoCanJoin from "@/components/courses/WhoCanJoin";
import WhyProgram from "@/components/courses/WhyProgram";
import CourseModules from "@/components/courses/CourseModules";
import LearningOutcomes from "@/components/courses/LearningOutcomes";
import ToolsTechnologies from "@/components/courses/ToolsTechnologies";
import CareerOutcomes from "@/components/courses/CareerOutcomes";
import Projects from "@/components/courses/Projects";
import InstructorSection from "@/components/courses/InstructorSection";
import Reviews from "@/components/courses/Reviews";
import CourseFaq from "@/components/courses/CourseFaq";
import CourseEnquiryForm from "@/components/forms/CourseEnquiryForm";
import CourseCta from "@/components/courses/CourseCta";
import RelatedCourses from "@/components/courses/RelatedCourses";
import StickyEnrolBar from "@/components/courses/StickyEnrolBar";

import Navbar from "@/components/Layout/Navbar";
import MegaFooter from "@/components/Layout/MegaFooter";
import { courseSlugs, getCourse, getRelated } from "@/lib/courses";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://techcadd.com";
const ORG = "TechCadd Computer Education";

type Params = { params: Promise<{ slug: string }> };

/** Every catalogue slug is prerendered; new courses appear on the next build. */
export function generateStaticParams() {
  return courseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    return { title: "Course not found", robots: { index: false, follow: true } };
  }

  /* The root layout appends "| TechCadd Hoshiarpur" via its title template,
     so adding the brand here would stamp it twice. "Course" is only appended
     when the title does not already contain it, so a title written for SEO
     ("Best Python Course in Hoshiarpur") does not end up saying it twice. */
  const needsSuffix = !course.title.toLowerCase().includes("course");
  const title = needsSuffix ? `${course.title} Course` : course.title;
  const description = course.overview.slice(0, 155);
  const url = `${SITE}/courses/${course.slug}`;

  return {
    title,
    description,
    keywords: course.keywords,
    alternates: { canonical: `/courses/${course.slug}` },
    openGraph: {
      type: "article",
      url,
      title,
      description,
      siteName: ORG,
      images: [{ url: course.heroImage, width: 1200, height: 630, alt: course.title }],
      locale: "en_IN",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [course.heroImage],
    },
  };
}

export default async function CoursePage({ params }: Params) {
  const { slug } = await params;
  const course = getCourse(slug);

  // an unknown slug renders the course-specific not-found page
  if (!course) notFound();

  const related = getRelated(slug);
  const url = `${SITE}/courses/${course.slug}`;

  const heroUrl = `${SITE}${course.heroImage}`;

  /*
   * Three graphs in one script: the Course itself, the breadcrumb trail, and
   * the FAQ. Keeping them in a @graph avoids three separate script tags and
   * lets them reference one another later if needed.
   */
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Course",
        "@id": `${url}#course`,
        name: course.title,
        description: course.overview,
        url,
        image: heroUrl,
        inLanguage: "en",
        educationalLevel: course.level,
        teaches: course.learningOutcomes,
        provider: {
          "@type": "EducationalOrganization",
          name: ORG,
          url: SITE,
        },
        offers: {
          "@type": "Offer",
          category: "Paid",
          availability: "https://schema.org/InStock",
          url,
        },
        hasCourseInstance: {
          "@type": "CourseInstance",
          courseMode: course.mode.includes("Online") ? "Online" : "Onsite",
          courseWorkload: course.duration,
        },
        ...(course.rating && {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: course.rating.score,
            reviewCount: course.rating.count,
            bestRating: 5,
          },
        }),
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${url}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE },
          { "@type": "ListItem", position: 2, name: "Courses", item: `${SITE}/courses` },
          { "@type": "ListItem", position: 3, name: course.title, item: url },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${url}#faq`,
        mainEntity: course.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      },
    ],
  };

  return (
    <>
      <Navbar />

      <script
        type="application/ld+json"
        // schema is generated from our own catalogue, never from user input
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-white">
        <CourseHero course={course} />
        <CourseVideo course={course} />
        <WhoCanJoin course={course} />
        <WhyProgram course={course} />
        <CourseModules course={course} />
        <LearningOutcomes course={course} />
        <ToolsTechnologies course={course} />
        <CareerOutcomes course={course} />
        <Projects course={course} />
        <InstructorSection course={course} />
        {/*
         * The tail is pinned rather than alternated by position: the enquiry
         * form is always dark, because that is the treatment the form was
         * designed for and it reads far better than the light one.
         *
         * Reviews is the one section that can be absent — a course carries
         * real testimonials or none — so on a course without them the
         * Instructor and FAQ bands end up adjacent and both light. That is the
         * cost of pinning the form: with a section missing, something has to
         * repeat, and two quiet content bands touching is a better trade than
         * a washed-out form.
         */}
        <Reviews course={course} />
        <CourseFaq course={course} />
        <CourseEnquiryForm course={course} />
        <CourseCta course={course} />
        <RelatedCourses courses={related} />
      </main>

      <StickyEnrolBar course={course} />

      <MegaFooter />
    </>
  );
}
