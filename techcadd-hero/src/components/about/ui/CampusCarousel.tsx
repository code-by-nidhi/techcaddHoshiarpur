"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { A11y, Autoplay, Navigation, Pagination } from "swiper/modules";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { campusHighlights } from "@/data/about";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

/**
 * "Inside the campus" as a carousel.
 *
 * Swiper rather than Embla here, even though the course rail on the home page
 * uses Embla: this one advances a whole slide every four seconds and wants
 * arrows and dots, which Swiper ships with. Embla's auto-scroll is a
 * continuous marquee and would need two more plugins to do the same job.
 *
 * Swiper's `pauseOnMouseEnter` lag — the reason the home rail is not Swiper —
 * does not bite here, because a discrete 600ms slide transition finishing
 * after the pointer arrives reads as the slide settling, not as a control
 * refusing to stop.
 */

/*
 * The four highlights, twice.
 *
 * There are only four cards and four are visible on a desktop, so a loop has
 * nothing to rotate through — Swiper disables looping outright below roughly
 * twice the visible count. Eight slides give it the room. Nobody ever sees the
 * same card twice at once: the widest view is four of eight consecutive
 * slides, so the window can never span a repeat.
 */
const SLIDES = [...campusHighlights, ...campusHighlights].map((entry, i) => ({
  ...entry,
  key: `${entry.name}-${i}`,
  /* the second pass is decoration, and reading all eight would announce every
     highlight twice */
  ghost: i >= campusHighlights.length,
}));

export default function CampusCarousel() {
  return (
    <div className="relative mt-6">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, A11y]}
        loop
        grabCursor
        speed={600}
        autoplay={{ delay: 4000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        navigation={{ prevEl: ".campus-prev", nextEl: ".campus-next" }}
        pagination={{ el: ".campus-dots", clickable: true }}
        a11y={{ prevSlideMessage: "Previous campus highlight", nextSlideMessage: "Next campus highlight" }}
        /* only the neighbours are decoded up front; the rest arrive as they
           come into view, so the section costs one screen of images, not eight */
        lazyPreloadPrevNext={1}
        spaceBetween={16}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2, spaceBetween: 16 },
          1024: { slidesPerView: 3, spaceBetween: 20 },
          1280: { slidesPerView: 4, spaceBetween: 20 },
        }}
        className="!pb-1"
      >
        {SLIDES.map((entry) => {
          const Icon = entry.icon;

          return (
            <SwiperSlide key={entry.key} aria-hidden={entry.ghost || undefined}>
              {/* Fixed heights, so the row never reflows as images decode. */}
              <article className="group relative h-[340px] overflow-hidden rounded-[24px] border border-white/10 shadow-[0_18px_44px_-30px_rgba(16,30,82,0.9)] transition-[transform,box-shadow,border-color] duration-500 ease-out hover:border-[#60A5FA]/70 hover:shadow-[0_34px_70px_-28px_rgba(37,99,235,0.85),0_0_44px_-12px_rgba(96,165,250,0.65)] motion-safe:hover:-translate-y-1.5 lg:h-[420px]">
                <Image
                  src={entry.image.src}
                  alt={entry.ghost ? "" : entry.image.alt}
                  fill
                  loading="lazy"
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 92vw"
                  className="object-cover object-center transition-transform duration-[700ms] ease-out motion-safe:group-hover:scale-105"
                />

                {/* The readability wash. Weakest at the top, where the badge
                    sits on its own glass, and deepest at the bottom under the
                    copy. */}
                <span
                  aria-hidden
                  className="absolute inset-0 bg-[linear-gradient(to_top,rgba(0,0,0,0.85),rgba(0,0,0,0.45),rgba(0,0,0,0.15))]"
                />

                {/* icon badge, top-left */}
                <span className="absolute left-4 top-4 grid size-10 place-items-center rounded-2xl border border-white/25 bg-white/15 text-white shadow-[0_8px_24px_-12px_rgba(0,0,0,0.9)] backdrop-blur-xl">
                  <Icon aria-hidden className="size-[18px]" strokeWidth={1.75} />
                </span>

                {/* copy, bottom-left */}
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h4 className="font-[family-name:var(--font-poppins)] text-[19px] font-bold leading-[1.2] tracking-[-0.02em] text-white drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)] lg:text-[21px]">
                    {entry.name}
                  </h4>
                  <p className="mt-2 text-[13px] leading-[1.6] text-white/80">
                    {entry.description}
                  </p>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>

      {/* ---------------------------- controls ------------------------------ */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          type="button"
          aria-label="Previous campus highlight"
          className="campus-prev grid size-11 shrink-0 place-items-center rounded-full border border-[#2563EB]/25 bg-[#2563EB]/10 text-[#1E3A8A] shadow-[0_10px_24px_-16px_rgba(37,99,235,0.9)] backdrop-blur-xl transition-[background-color,border-color,transform] duration-300 hover:border-[#2563EB]/50 hover:bg-[#2563EB]/20 motion-safe:hover:-translate-x-0.5"
        >
          <FiChevronLeft aria-hidden className="size-5" />
        </button>

        <div className="campus-dots flex items-center justify-center gap-2" />

        <button
          type="button"
          aria-label="Next campus highlight"
          className="campus-next grid size-11 shrink-0 place-items-center rounded-full border border-[#2563EB]/25 bg-[#2563EB]/10 text-[#1E3A8A] shadow-[0_10px_24px_-16px_rgba(37,99,235,0.9)] backdrop-blur-xl transition-[background-color,border-color,transform] duration-300 hover:border-[#2563EB]/50 hover:bg-[#2563EB]/20 motion-safe:hover:translate-x-0.5"
        >
          <FiChevronRight aria-hidden className="size-5" />
        </button>
      </div>
    </div>
  );
}
