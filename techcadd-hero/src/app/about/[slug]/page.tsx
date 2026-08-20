import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowRight } from "react-icons/fi";
import Navbar from "@/components/Layout/Navbar";
import MegaFooter from "@/components/Layout/MegaFooter";
import { ABOUT_PAGES, aboutSlugs, getAboutPage } from "@/lib/about/pages";

/**
 * One template for the three About pages. Same route contract as the course
 * and training templates: static params from the data, `notFound()` on an
 * unknown slug, and no fallback that could render the wrong page.
 */

export const dynamicParams = false;

export function generateStaticParams() {
  return aboutSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getAboutPage(slug);

  if (!page) return { title: "Page not found", robots: { index: false, follow: true } };

  return {
    title: page.title,
    description: page.summary,
    alternates: { canonical: `/about/${page.slug}` },
    openGraph: {
      title: page.title,
      description: page.summary,
      url: `/about/${page.slug}`,
      images: [{ url: page.image, alt: page.imageAlt }],
    },
  };
}

export default async function AboutDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getAboutPage(slug);

  if (!page) notFound();

  const others = ABOUT_PAGES.filter((p) => p.slug !== page.slug);

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
            <nav aria-label="Breadcrumb" className="text-[12.5px] text-white/50">
              <Link href="/" className="hover:text-white">
                Home
              </Link>
              <span aria-hidden> / </span>
              <Link href="/about" className="hover:text-white">
                About Us
              </Link>
              <span aria-hidden> / </span>
              <span className="text-white/80">{page.title}</span>
            </nav>

            <span className="mt-6 inline-flex items-center rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 font-[family-name:var(--font-mono-face)] text-[10.5px] uppercase tracking-[0.2em] text-[#93C5FD] backdrop-blur-xl">
              {page.badge}
            </span>

            <h1 className="mt-5 max-w-3xl font-[family-name:var(--font-sora)] text-[clamp(1.9rem,4vw,3rem)] font-extrabold leading-[1.1] tracking-[-0.03em] text-white">
              {page.title}
            </h1>

            <p className="mt-4 max-w-2xl text-[15px] leading-[1.85] text-white/65">
              {page.summary}
            </p>
          </div>
        </section>

        <section className="bg-white py-16 lg:py-20">
          <div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-[1fr_0.85fr] lg:gap-14">
              <div>
                {page.paragraphs.map((copy) => (
                  <p
                    key={copy.slice(0, 40)}
                    className="mb-5 text-[15px] leading-[1.9] text-[#475569] last:mb-0"
                  >
                    {copy}
                  </p>
                ))}

                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB] px-6 py-3 text-[14px] font-semibold text-white shadow-[0_0_30px_-6px_rgba(37,99,235,0.9)]"
                >
                  Talk to a Counsellor
                  <FiArrowRight aria-hidden className="size-4" />
                </Link>
              </div>

              <div className="relative aspect-[4/3] w-full overflow-hidden rounded-[24px] shadow-[0_26px_60px_-34px_rgba(15,23,42,0.55)] ring-1 ring-inset ring-slate-900/[0.06]">
                <Image
                  src={page.image}
                  alt={page.imageAlt}
                  fill
                  priority
                  sizes="(max-width: 1023px) 92vw, 42vw"
                  className="object-cover"
                />
              </div>
            </div>

            {/* the other two, so the section is navigable without going back */}
            <ul className="mt-16 grid gap-5 sm:grid-cols-2">
              {others.map((p) => (
                <li key={p.slug}>
                  <Link
                    href={`/about/${p.slug}`}
                    className="group flex h-full items-center gap-4 rounded-[22px] border border-slate-200/80 bg-white p-5 shadow-[0_14px_36px_-28px_rgba(15,23,42,0.55)] transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-[0_28px_56px_-30px_rgba(37,99,235,0.45)] motion-reduce:hover:translate-y-0"
                  >
                    <span className="relative size-16 shrink-0 overflow-hidden rounded-[14px]">
                      <Image
                        src={p.image}
                        alt=""
                        aria-hidden
                        fill
                        loading="lazy"
                        sizes="64px"
                        className="object-cover"
                      />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-[family-name:var(--font-sora)] text-[15.5px] font-bold text-[#0F172A]">
                        {p.title}
                      </span>
                      <span className="mt-1 block line-clamp-2 text-[13px] text-[#475569]">
                        {p.summary}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>

      <MegaFooter />
    </>
  );
}
