import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Navbar from "@/components/Layout/Navbar";
import MegaFooter from "@/components/Layout/MegaFooter";
import Breadcrumbs from "@/components/courses/Breadcrumbs";
import { COURSES, coursesByCategory } from "@/lib/courses";

export const metadata: Metadata = {
  title: "Courses | Industry-focused training programmes",
  description:
    "Full stack, MERN, Python, Java, data analytics and digital marketing programmes — taught by practitioners, built around live projects.",
  alternates: { canonical: "/courses" },
};

/** The catalogue index. It reads the same data the detail pages do. */
export default function CoursesIndex() {
  const groups = coursesByCategory();

  return (
    <>
      <Navbar />

      <main className="bg-white">
        <section className="relative overflow-hidden bg-[#020817] pb-16 pt-[104px] lg:pb-20 lg:pt-[128px]">
          <div aria-hidden className="pointer-events-none absolute inset-0">
            <div className="absolute -left-[10%] top-[-10%] size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(124,58,237,0.20)_0%,transparent_68%)] blur-3xl" />
            <div className="absolute -right-[8%] top-[10%] size-[38rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.24)_0%,transparent_70%)] blur-3xl" />
          </div>

          <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
            <Breadcrumbs trail={[{ label: "Home", href: "/" }, { label: "Courses" }]} />

            <h1 className="mt-8 max-w-3xl font-[family-name:var(--font-sora)] text-[clamp(2rem,4vw,3rem)] font-extrabold leading-[1.08] tracking-[-0.03em] text-white">
              Courses built backwards from the job
            </h1>
            <p className="mt-4 max-w-xl text-[15.5px] leading-[1.8] text-white/65">
              {COURSES.length} programmes across development, data and marketing — each one taught
              by practitioners and ending in work you can show.
            </p>
          </div>
        </section>

        {groups.map(({ category, courses }, gi) => (
          <section
            key={category}
            className={`relative overflow-x-clip py-14 lg:py-16 ${
              gi % 2 ? "bg-[#F6F9FF]" : "bg-white"
            }`}
          >
            <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
              <h2 className="font-[family-name:var(--font-sora)] text-[clamp(1.3rem,2.2vw,1.7rem)] font-extrabold tracking-[-0.02em] text-[#0F172A]">
                {category}
              </h2>

              <ul className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {courses.map((c) => (
                  <li key={c.slug} className="h-full">
                    <Link
                      href={`/courses/${c.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-[22px] border border-slate-200/80 bg-white shadow-[0_14px_36px_-28px_rgba(15,23,42,0.55)] transition-[transform,box-shadow] duration-500 hover:-translate-y-1.5 hover:shadow-[0_30px_60px_-30px_rgba(37,99,235,0.45)] motion-reduce:hover:translate-y-0"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden">
                        <Image
                          src={c.heroImage}
                          alt={c.title}
                          fill
                          sizes="(max-width: 639px) 92vw, (max-width: 1023px) 46vw, 30vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                        />
                      </div>

                      <div className="flex flex-1 flex-col p-5">
                        <h3 className="font-[family-name:var(--font-sora)] text-[16px] font-bold leading-snug text-[#0F172A]">
                          {c.title}
                        </h3>
                        <p className="mt-2 flex-1 text-[13px] leading-relaxed text-[#475569]">
                          {c.shortDescription}
                        </p>
                        <p className="mt-4 flex items-center gap-3 border-t border-slate-100 pt-3.5 text-[12px] text-[#64748B]">
                          <span>{c.duration}</span>
                          <span aria-hidden>·</span>
                          <span>{c.level}</span>
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </main>

      <MegaFooter />
    </>
  );
}
