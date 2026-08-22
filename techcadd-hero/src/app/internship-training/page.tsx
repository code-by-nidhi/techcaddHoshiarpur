import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight, FiClock } from "react-icons/fi";
import Navbar from "@/components/Layout/Navbar";
import MegaFooter from "@/components/Layout/MegaFooter";
import JsonLd from "@/components/seo/JsonLd";
import { breadcrumbSchema, graph } from "@/lib/seo/schema";
import {
  CATEGORY_META,
  programmesByCategory,
  type TrainingCategory,
} from "@/lib/training/programmes";
import { trainingPath } from "@/lib/seo/routes";

/** The index the mega menu's "See All Training Formats" points at. */

export const metadata: Metadata = {
  title: "Internship & Training",
  description:
    "Training and internship formats at TechCadd Hoshiarpur — from 45-day university requirements to six-month job-ready programmes.",
  alternates: { canonical: "/internship-training" },
};

const ORDER: TrainingCategory[] = ["short-term", "long-term", "programmes"];

export default function InternshipTrainingPage() {
  return (
    <>
      <JsonLd data={graph(breadcrumbSchema([{ name: "Home", path: "/" }, { name: "Internship & Training", path: "/internship-training" }]))} />
      <Navbar />

      <main id="content">
        <section className="relative overflow-x-clip bg-[#101E52] pb-16 pt-[calc(var(--nav-h)+3rem)] lg:pb-20">
          <span
            aria-hidden
            className="pointer-events-none absolute -left-[10%] top-0 size-[32rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.22),transparent_70%)] blur-3xl"
          />
          <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
            <span className="font-[family-name:var(--font-mono-face)] text-[11px] uppercase tracking-[0.2em] text-[#93C5FD]">
              Internship &amp; Training
            </span>
            <h1 className="mt-4 max-w-3xl font-[family-name:var(--font-sora)] text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
              Every training format we run
            </h1>
            <p className="mt-4 max-w-2xl text-[15px] leading-[1.85] text-white/65">
              Pick the length your college or your calendar requires. The subject
              track is chosen separately, so any format can be paired with any course.
            </p>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
            {ORDER.map((category) => {
              const meta = CATEGORY_META[category];
              const items = programmesByCategory(category);

              return (
                <div key={category} className="mb-14 last:mb-0">
                  <h2 className="font-[family-name:var(--font-sora)] text-[clamp(1.3rem,2.2vw,1.7rem)] font-extrabold tracking-[-0.025em] text-[#0F172A]">
                    {meta.heading}
                  </h2>
                  <p className="mt-2 text-[14px] text-[#475569]">{meta.description}</p>

                  <ul className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((p) => (
                      <li key={p.slug}>
                        <Link
                          href={trainingPath(p.slug)}
                          className="group flex h-full flex-col rounded-[22px] border border-slate-200/80 bg-white p-6 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.55)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(37,99,235,0.45)] motion-reduce:hover:translate-y-0"
                        >
                          <span className="relative mb-4 block aspect-[16/10] w-full overflow-hidden rounded-[16px]">
                            <Image
                              src={p.image}
                              alt=""
                              aria-hidden
                              fill
                              loading="lazy"
                              sizes="(max-width: 639px) 90vw, (max-width: 1023px) 45vw, 30vw"
                              className="object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                            />
                          </span>

                          <span className="flex items-start justify-between gap-3">
                            <span className="font-[family-name:var(--font-sora)] text-[16px] font-bold leading-snug text-[#0F172A]">
                              {p.title}
                            </span>
                            {p.badge && (
                              <span className="shrink-0 rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB] px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.08em] text-white">
                                {p.badge}
                              </span>
                            )}
                          </span>

                          <span className="mt-2.5 flex-1 text-[13px] leading-relaxed text-[#475569]">
                            {p.summary}
                          </span>

                          <span className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5">
                            <span className="inline-flex items-center gap-1.5 text-[12px] text-[#64748B]">
                              <FiClock aria-hidden className="size-3.5" />
                              {p.duration}
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
                </div>
              );
            })}
          </div>
        </section>
      </main>

      <MegaFooter />
    </>
  );
}
