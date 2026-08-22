import { Suspense } from "react";
import type { Metadata } from "next";

import Navbar from "@/components/Layout/Navbar";
import MegaFooter from "@/components/Layout/MegaFooter";
import Breadcrumbs from "@/components/courses/Breadcrumbs";
import CourseExplorer, { type ExplorerCourse } from "@/components/courses/CourseExplorer";
import { COURSES } from "@/lib/courses";
import { coursePath } from "@/lib/seo/routes";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph, itemListSchema } from "@/lib/seo/schema";

export const metadata: Metadata = {
  title: "Courses | Industry-focused training programmes",
  description:
    "Full stack, MERN, Python, Java, data analytics and digital marketing programmes — taught by practitioners, built around live projects.",
  alternates: { canonical: "/courses" },
};

/**
 * The catalogue index. It stays a server component and hands the grid a slim
 * projection: the filter pills need client state, but the course data does not
 * need to travel as whole `Course` objects to render a card.
 */
export default function CoursesIndex() {
  const courses: ExplorerCourse[] = COURSES.map((c) => ({
    slug: c.slug,
    title: c.shortTitle ?? c.title,
    shortDescription: c.shortDescription,
    category: c.category,
    duration: c.duration,
    level: c.level,
    heroImage: c.heroImage,
    badge: c.badge,
    tools: c.tools.slice(0, 3),
  }));

  return (
    <>
      {/* The catalogue as a list, so the programmes are discoverable as
          entities rather than only as links on a page. */}
      <JsonLd
        data={graph(
          breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Courses", path: "/courses" }]),
          itemListSchema("TechCadd courses", courses.map((c) => ({ name: c.title, path: coursePath(c.slug) }))),
        )}
      />
      <Navbar />

      <main className="relative overflow-x-clip bg-[#101E52]">
        {/* ---- ambience: radial glows over a faint grid ---- */}
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(96,165,250,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(96,165,250,0.05)_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_72%)]" />
          <div className="absolute -left-[10%] top-[-6%] size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.28)_0%,transparent_68%)] blur-3xl" />
          <div className="absolute -right-[8%] top-[18%] size-[40rem] rounded-full bg-[radial-gradient(circle,rgba(20,44,142,0.42)_0%,transparent_70%)] blur-3xl" />
          <div className="absolute bottom-[6%] left-[24%] size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.14)_0%,transparent_70%)] blur-3xl" />
        </div>

        <section className="relative pb-20 pt-[104px] lg:pt-[128px]">
          <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
            <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Courses" }]} />

            <div className="mt-10 text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-4 py-2 font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.22em] text-[#93C5FD] backdrop-blur-xl">
                <span aria-hidden className="size-1.5 rounded-full bg-[#60A5FA]" />
                Explore Our Courses
              </span>

              <h1 className="mx-auto mt-6 max-w-3xl font-[family-name:var(--font-sora)] text-[clamp(2rem,4.4vw,3.2rem)] font-extrabold leading-[1.08] tracking-[-0.035em] text-white">
                Build Skills.{" "}
                <span className="bg-gradient-to-r from-[#60A5FA] via-[#3B82F6] to-[#142C8E] bg-clip-text pr-[0.08em] text-transparent">
                  Build Future.
                </span>
              </h1>

              <p className="mx-auto mt-4 max-w-xl text-[15.5px] leading-[1.8] text-white/60">
                Industry-focused courses designed to make you job-ready and future-ready.
              </p>

              <p className="mt-3 text-[13px] text-white/40">
                {COURSES.length} programmes across development, data, design and marketing.
              </p>
            </div>

            <div className="mt-12">
              <Suspense fallback={null}>
                <CourseExplorer courses={courses} />
              </Suspense>
            </div>
          </div>
        </section>
      </main>

      <MegaFooter />
    </>
  );
}
