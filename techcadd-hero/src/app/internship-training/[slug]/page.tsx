import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowRight, FiCheck, FiClock, FiUsers } from "react-icons/fi";
import Navbar from "@/components/Layout/Navbar";
import MegaFooter from "@/components/Layout/MegaFooter";
import CourseEnquiryForm from "@/components/forms/CourseEnquiryForm";
import { getCourse } from "@/lib/courses";
import {
  CATEGORY_META,
  getProgramme,
  programmeSlugs,
} from "@/lib/training/programmes";

/**
 * One template for every training format, mirroring the course detail route:
 * static params from the data, `notFound()` when a slug is unknown, and no
 * fallback that could quietly render the wrong programme.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return programmeSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const programme = getProgramme(slug);

  if (!programme) {
    return { title: "Training format not found", robots: { index: false, follow: true } };
  }

  return {
    title: programme.title,
    description: programme.summary,
    alternates: { canonical: `/internship-training/${programme.slug}` },
    openGraph: {
      title: programme.title,
      description: programme.summary,
      url: `/internship-training/${programme.slug}`,
    },
  };
}

export default async function ProgrammePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const programme = getProgramme(slug);

  if (!programme) notFound();

  const category = CATEGORY_META[programme.category];
  /* the enquiry form takes a Course; AI is the safe generic subject here, and
     the programme name travels in the message metadata */
  const enquirySubject = getCourse("artificial-intelligence");

  return (
    <>
      <Navbar />

      <main id="content">
        {/* ---------------------------- hero ---------------------------- */}
        <section className="relative overflow-x-clip bg-[#101E52] pb-16 pt-[calc(var(--nav-h)+3rem)] lg:pb-20">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-[10%] top-0 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.22),transparent_70%)] blur-3xl"
          />

          <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
            <nav aria-label="Breadcrumb" className="text-[12.5px] text-white/50">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span aria-hidden> / </span>
              <Link href="/internship-training" className="hover:text-white">
                Internship &amp; Training
              </Link>
              <span aria-hidden> / </span>
              <span className="text-white/80">{programme.title}</span>
            </nav>

            {/*
             * Copy left, image right. The banner used to sit full width under
             * the copy, which is why it read as "below the content" on every
             * one of these pages — there was no column for it to sit in.
             */}
            <div className="mt-6 grid items-start gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-10">
              <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.2em] text-[#93C5FD] backdrop-blur-xl">
              {category.heading}
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

            <dl className="mt-8 flex flex-wrap gap-x-8 gap-y-4">
              <div>
                <dt className="flex items-center gap-1.5 text-[11.5px] uppercase tracking-[0.16em] text-white/40">
                  <FiClock aria-hidden className="size-3.5" /> Duration
                </dt>
                <dd className="mt-1 text-[15px] font-semibold text-white">{programme.duration}</dd>
              </div>
              <div className="max-w-md">
                <dt className="flex items-center gap-1.5 text-[11.5px] uppercase tracking-[0.16em] text-white/40">
                  <FiUsers aria-hidden className="size-3.5" /> Who it is for
                </dt>
                <dd className="mt-1 text-[15px] text-white/80">{programme.audience}</dd>
              </div>
            </dl>

              </div>

              {/* image card: sticky beside the copy, and last in the DOM so it
                  falls below the content once the grid collapses */}
              <div className="relative order-last h-fit w-full overflow-hidden rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.20)] ring-1 ring-inset ring-white/10 lg:sticky lg:top-[120px]">
                <div className="relative aspect-[4/3] w-full">
                  <Image
                    src={programme.image}
                    alt={programme.title}
                    fill
                    priority
                    sizes="(max-width: 1023px) 92vw, 420px"
                    className="object-cover"
                  />
                </div>
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_60%,rgba(5,11,31,0.45))]"
                />
              </div>
            </div>
          </div>
        </section>

        {/* --------------------------- includes -------------------------- */}
        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-16">
              <div>
                <h2 className="font-[family-name:var(--font-sora)] text-[clamp(1.4rem,2.4vw,1.9rem)] font-extrabold tracking-[-0.025em] text-[#0F172A]">
                  What is included
                </h2>
                <ul className="mt-6 grid gap-3">
                  {programme.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14.5px] text-[#334155]">
                      <span className="mt-0.5 grid size-5 shrink-0 place-content-center rounded-full bg-gradient-to-br from-[#142C8E] to-[#2563EB] text-white">
                        <FiCheck aria-hidden size={11} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h2 className="font-[family-name:var(--font-sora)] text-[clamp(1.4rem,2.4vw,1.9rem)] font-extrabold tracking-[-0.025em] text-[#0F172A]">
                  What you leave with
                </h2>
                <ul className="mt-6 grid gap-3">
                  {programme.outcomes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-[14.5px] text-[#334155]">
                      <span className="mt-0.5 grid size-5 shrink-0 place-content-center rounded-full bg-gradient-to-br from-[#142C8E] to-[#2563EB] text-white">
                        <FiCheck aria-hidden size={11} />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>

                <Link
                  href="/courses"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_0_30px_-6px_rgba(37,99,235,0.9)]"
                >
                  Choose a subject track
                  <FiArrowRight aria-hidden className="size-4" />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {enquirySubject && <CourseEnquiryForm course={enquirySubject} />}
      </main>

      <MegaFooter />
    </>
  );
}
