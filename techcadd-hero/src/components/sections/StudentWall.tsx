"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, A11y, Navigation, Pagination } from "swiper/modules";
import type { Swiper as SwiperClass } from "swiper";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaQuoteLeft, FaStar } from "react-icons/fa6";
import type { CmsReview } from "@/lib/cms/content";
import Reveal from "@/components/UI/Reveal";
import SectionHeading from "@/components/UI/SectionHeading";
import Counter from "@/components/UI/Counter";

import "swiper/css";
import "swiper/css/pagination";

const initials = (name: string) =>
  name
    .split(" ")
    .map((w) => w[0])
    .join("");

/**
 * The avatar gradients, cycled by position.
 *
 * Deliberately not a CMS field: asking an editor to pick a Tailwind gradient
 * for each review would be asking them to make a decision they have no way to
 * judge, and one wrong value would break the card. Cycling keeps neighbouring
 * cards distinct, which is the whole point of varying them.
 */
const TONES = [
  "from-[#2563EB] to-[#2563EB]",
  "from-[#0891B2] to-[#60A5FA]",
  "from-[#142C8E] to-[#2563EB]",
  "from-[#0D9488] to-[#60A5FA]",
  "from-[#60A5FA] to-[#1D4ED8]",
  "from-[#1D4ED8] to-[#60A5FA]",
  "from-[#1D4ED8] to-[#60A5FA]",
];

/**
 * Student reviews as a carousel.
 *
 * Every review is an equal card — the old layout promoted one story into a
 * large block on the left, which fixed the hierarchy and left the rest to a
 * masonry column. This gives the whole width to the reviews themselves.
 *
 * The reviews are fetched on the server and passed in, so the carousel stays a
 * presentation component and the page does not wait on the CMS in the browser.
 * An empty list means the CMS had nothing published or could not be reached;
 * either way the section removes itself rather than rendering an empty rail.
 */
export default function StudentWall({ reviews }: { reviews: CmsReview[] }) {
  const swiperRef = useRef<SwiperClass | null>(null);

  if (reviews.length === 0) return null;

  return (
    <section id="stories" className="relative overflow-hidden tech-light section-pad">
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-[380px] bg-[radial-gradient(ellipse_60%_100%_at_50%_0%,rgba(37,99,235,0.07),transparent_70%)]"
      />

      {/* floating blur blobs */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <motion.div
          animate={{ y: [0, -22, 0], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -left-24 top-40 size-[26rem] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.14)_0%,transparent_70%)] blur-3xl"
        />
        <motion.div
          animate={{ y: [0, 20, 0], opacity: [0.45, 0.75, 0.45] }}
          transition={{ duration: 13, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
          className="absolute -right-20 bottom-24 size-[28rem] rounded-full bg-[radial-gradient(circle,rgba(96,165,250,0.14)_0%,transparent_70%)] blur-3xl"
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-6 lg:px-[4.5rem]">
        <div className="flex flex-col items-start justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            tone="light"
            align="left"
            eyebrow="Student success wall"
            title="Careers That Started Here"
          />

          <Reveal delay={0.1}>
            <div className="flex items-center gap-6 rounded-2xl border border-slate-200/80 bg-white px-6 py-4 shadow-[0_12px_34px_-28px_rgba(15,23,42,0.7)]">
              <div>
                <p className="font-[family-name:var(--font-poppins)] text-[28px] font-extrabold leading-none text-[#0F172A]">
                  <Counter to={750} suffix="+" />
                </p>
                <p className="mt-1 text-[12.5px] text-[#64748B]">Verified reviews</p>
              </div>
              <span aria-hidden className="h-10 w-px bg-slate-200" />
              <div>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <FaStar key={i} aria-hidden className="size-3.5 text-[#F59E0B]" />
                  ))}
                </div>
                <p className="mt-1.5 text-[12.5px] text-[#64748B]">4.9 average rating</p>
              </div>
            </div>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="relative mt-10"
        >
          <Swiper
            modules={[Autoplay, Pagination, Navigation, A11y]}
            onSwiper={(sw) => {
              swiperRef.current = sw;
            }}
            loop
            grabCursor
            centeredSlides
            speed={800}
            autoplay={{ delay: 3000, disableOnInteraction: false, pauseOnMouseEnter: true }}
            pagination={{ clickable: true, el: ".wall-dots" }}
            a11y={{ prevSlideMessage: "Previous review", nextSlideMessage: "Next review" }}
            spaceBetween={16}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
            }}
            className="!px-1 !py-5"
          >
            {reviews.map((r, index) => (
              <SwiperSlide key={r.id} className="!h-auto">
                {({ isActive }) => (
                  <article
                    className={`group relative flex h-[272px] w-full flex-col overflow-hidden rounded-[24px] border bg-white/75 p-5 backdrop-blur-xl transition-[transform,box-shadow,border-color,opacity] duration-500 ease-out hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_34px_70px_-32px_rgba(37,99,235,0.5)] motion-reduce:hover:translate-y-0 sm:h-[288px] ${
                      isActive
                        ? "border-[#2563EB]/30 opacity-100 shadow-[0_26px_60px_-30px_rgba(37,99,235,0.5)] lg:scale-[1.05]"
                        : "border-white/70 opacity-90 shadow-[0_12px_32px_-28px_rgba(15,23,42,0.6)] lg:scale-[0.95]"
                    }`}
                  >
                    {/* glass reflection */}
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-[linear-gradient(180deg,rgba(255,255,255,0.75),transparent)]"
                    />
                    <span
                      aria-hidden
                      className="pointer-events-none absolute -right-10 -top-12 size-32 rounded-full bg-[#2563EB]/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                    />

                    <div className="relative flex items-center justify-between gap-3">
                      <span className="flex gap-0.5" aria-label={`Rated ${r.rating} out of 5`}>
                        {Array.from({ length: 5 }).map((_, i) => (
                          <FaStar
                            key={i}
                            aria-hidden
                            className={`size-3 ${i < r.rating ? "text-[#F59E0B]" : "text-slate-200"}`}
                          />
                        ))}
                      </span>
                      <FaQuoteLeft aria-hidden className="size-4 shrink-0 text-[#2563EB]/25" />
                    </div>

                    {/*
                     * Fixed height plus a 4-line clamp: one review in the set
                     * runs to 382 characters against ~100 for the rest, and it
                     * was setting the height for every card in the row.
                     */}
                    <blockquote className="relative mt-3 line-clamp-4 flex-1 overflow-hidden text-[13px] leading-[1.6] text-[#475569]">
                      &ldquo;{r.quote}&rdquo;
                    </blockquote>

                    <figcaption className="relative mt-3 flex items-center gap-3 border-t border-slate-100 pt-3.5">
                      <span
                        className={`grid size-10 shrink-0 place-content-center rounded-full bg-gradient-to-br ${
                          TONES[index % TONES.length]
                        } text-[12px] font-bold text-white shadow-[0_10px_22px_-12px_rgba(37,99,235,0.9)]`}
                      >
                        {initials(r.authorName)}
                      </span>

                      <span className="min-w-0 flex-1 leading-tight">
                        <span className="block truncate text-[13.5px] font-bold tracking-[-0.01em] text-[#0F172A]">
                          {r.authorName}
                        </span>
                        {r.courseName && (
                          <span className="mt-0.5 block truncate text-[11px] text-[#64748B]">
                            {r.courseName}
                          </span>
                        )}
                        {/* Only where there is an outcome to claim — an empty
                            pill reads as a missing value, not as "no badge". */}
                        {r.badge && (
                          <span className="mt-1.5 inline-flex max-w-full items-center truncate rounded-full bg-gradient-to-r from-[#142C8E] to-[#2563EB] px-2.5 py-1 text-[9.5px] font-semibold uppercase tracking-[0.07em] text-white">
                            {r.badge}
                          </span>
                        )}
                      </span>
                    </figcaption>
                  </article>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          {/* controls */}
          <div className="mt-6 flex items-center justify-center gap-5">
            <button
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
              aria-label="Previous review"
              className="grid size-11 shrink-0 place-content-center rounded-full border border-slate-200 bg-white text-[#475569] shadow-[0_10px_26px_-20px_rgba(15,23,42,0.8)] transition-colors duration-300 hover:border-[#2563EB] hover:text-[#2563EB]"
            >
              <FiChevronLeft className="size-4" />
            </button>

            <div className="wall-dots flex items-center justify-center gap-2" />

            <button
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
              aria-label="Next review"
              className="grid size-11 shrink-0 place-content-center rounded-full border border-slate-200 bg-white text-[#475569] shadow-[0_10px_26px_-20px_rgba(15,23,42,0.8)] transition-colors duration-300 hover:border-[#2563EB] hover:text-[#2563EB]"
            >
              <FiChevronRight className="size-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
