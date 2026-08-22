import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowRight, FiArrowUpRight, FiClock } from "react-icons/fi";
import Navbar from "@/components/Layout/Navbar";
import MegaFooter from "@/components/Layout/MegaFooter";
import CourseEnquiryForm from "@/components/forms/CourseEnquiryForm";
import { getCourse } from "@/lib/courses";
import {
  AFTER12_CATEGORY_META,
  DEFAULT_AFTER12_HERO,
  after12Slugs,
  getAfter12,
} from "@/lib/after12/programmes";
import { AFTER12_URL, after12Path, coursePath } from "@/lib/seo/routes";

/**
 * A pathway page: what the certificate covers and which catalogue courses it
 * is built from. Same route contract as the course and training templates —
 * static params, `notFound()` on an unknown slug, no fallback.
 */

export const dynamicParams = false;

/*
 * Params carry the public suffix, and every lookup strips it first. Old,
 * suffix-less addresses never reach this route — next.config redirects them
 * with a 301 before routing — so `dynamicParams` stays false and an unknown
 * slug is still a clean 404.
 */
export function generateStaticParams() {
  return after12Slugs().map((slug) => ({ slug: AFTER12_URL.param(slug) }));
}

/** The pathway behind a public URL segment. */
const resolveAfter12 = (param: string) => {
  const slug = AFTER12_URL.slugFromParam(param);
  return slug ? getAfter12(slug) : undefined;
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const programme = resolveAfter12(slug);

  if (!programme) {
    return { title: "Programme not found", robots: { index: false, follow: true } };
  }

  return {
    /* Hoshiarpur, not Jalandhar: the site was moved off the Jalandhar name and
       the string appears nowhere else in the codebase. */
    title: `${programme.title} Course in Hoshiarpur`,
    description: programme.summary,
    alternates: { canonical: after12Path(programme.slug) },
    openGraph: {
      title: `${programme.title} Course in Hoshiarpur`,
      description: programme.summary,
      url: after12Path(programme.slug),
    },
  };
}

export default async function After12ProgrammePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programme = resolveAfter12(slug);

  if (!programme) notFound();

  const meta = AFTER12_CATEGORY_META[programme.category];
  const courses = programme.courseSlugs.map(getCourse).filter((c) => c !== undefined);
  const enquirySubject = courses[0] ?? getCourse("artificial-intelligence");

  /* explicit artwork, else the first linked course's, else the default */
  const heroImage = programme.heroImage ?? courses[0]?.heroImage ?? DEFAULT_AFTER12_HERO;

  return (
    <>
      <Navbar />

      <main id="content">
        <section className="relative overflow-x-clip bg-[#101E52] pb-16 pt-[calc(var(--nav-h)+3rem)] lg:pb-20">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-[10%] top-0 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.22),transparent_70%)] blur-3xl"
          />

          <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
            <div className="grid items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-14">
              <div>
            <nav aria-label="Breadcrumb" className="text-[12.5px] text-white/50">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span aria-hidden> / </span>
              <Link href="/after-12th" className="hover:text-white">
                After 12th
              </Link>
              <span aria-hidden> / </span>
              <span className="text-white/80">{programme.title}</span>
            </nav>

            <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.2em] text-[#93C5FD] backdrop-blur-xl">
              {meta.heading}
              {programme.badge && (
                <span className="rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB] px-2 py-0.5 text-[9px] font-bold text-white">
                  {programme.badge}
                </span>
              )}
            </span>

            <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-sora)] text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
              {programme.title}
            </h1>

            <p className="mt-4 max-w-2xl text-[15px] leading-[1.85] text-white/65">
              {programme.summary}
            </p>

            <p className="mt-7 inline-flex items-center gap-2 text-[14px] text-white/70">
              <FiClock aria-hidden className="size-4 text-[#60A5FA]" />
              {programme.duration}
            </p>
              </div>

              {/* image: right on desktop, below the copy once stacked */}
              <div className="relative order-last aspect-[16/10] w-full overflow-hidden rounded-[26px] ring-1 ring-inset ring-white/10">
                <Image
                  src={heroImage}
                  alt={programme.title}
                  fill
                  priority
                  sizes="(max-width: 1023px) 92vw, 45vw"
                  className="object-cover"
                />
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_55%,rgba(5,11,31,0.55))]"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
            <h2 className="font-[family-name:var(--font-sora)] text-[clamp(1.4rem,2.4vw,1.9rem)] font-extrabold tracking-[-0.025em] text-[#0F172A]">
              What this pathway covers
            </h2>

            {courses.length > 0 ? (
              <>
                <p className="mt-3 max-w-2xl text-[14.5px] leading-[1.8] text-[#475569]">
                  This certificate is built from the following tracks. Each has its own
                  syllabus, projects and placement support.
                </p>

                <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {courses.map((course) => (
                    <li key={course.slug}>
                      <Link
                        href={coursePath(course.slug)}
                        className="group flex h-full flex-col rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.55)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(37,99,235,0.45)] motion-reduce:hover:translate-y-0"
                      >
                        <span className="font-[family-name:var(--font-sora)] text-[16px] font-bold leading-snug text-[#0F172A]">
                          {course.shortTitle ?? course.title}
                        </span>
                        <span className="mt-2.5 flex-1 text-[13px] leading-relaxed text-[#475569]">
                          {course.shortDescription}
                        </span>
                        <span className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5">
                          <span className="inline-flex items-center gap-1.5 text-[12px] text-[#64748B]">
                            <FiClock aria-hidden className="size-3.5" />
                            {course.duration}
                          </span>
                          <FiArrowUpRight
                            aria-hidden
                            className="size-4 text-[#2563EB] transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                          />
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="mt-3 max-w-2xl text-[14.5px] leading-[1.8] text-[#475569]">
                The detailed syllabus for this pathway is being finalised. Speak to a
                counsellor for the current batch plan, or browse the tracks we run today.
              </p>
            )}

            <Link
              href="/courses"
              className="mt-9 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_0_30px_-6px_rgba(37,99,235,0.9)]"
            >
              Browse all courses
              <FiArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
        </section>

        {enquirySubject && <CourseEnquiryForm course={enquirySubject} />}
      </main>

      <MegaFooter />
    </>
  );
}
