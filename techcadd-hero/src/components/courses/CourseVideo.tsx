"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { FiPlay, FiX } from "react-icons/fi";
import type { Course } from "@/lib/courses/types";
import { Reveal, Section, SectionHead, fadeUp } from "./shared";

/**
 * Introduction video. Until a course has a real `video.url`, the thumbnail
 * still renders with an honest "coming soon" state rather than a play button
 * that leads nowhere.
 */
export default function CourseVideo({ course }: { course: Course }) {
  const [playing, setPlaying] = useState(false);
  const hasVideo = Boolean(course.video.url);

  return (
    <Section tint>
      <Reveal className="grid items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <motion.div variants={fadeUp}>
          <div className="relative aspect-video w-full overflow-hidden rounded-[24px] shadow-[0_24px_60px_-34px_rgba(15,23,42,0.6)] ring-1 ring-inset ring-slate-900/[0.06]">
            <Image
              src={course.video.thumbnail}
              alt={`${course.title} introduction`}
              fill
              sizes="(max-width: 1023px) 92vw, 55vw"
              className="object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-slate-950/45" />

            {hasVideo ? (
              <button
                type="button"
                onClick={() => setPlaying(true)}
                aria-label="Play course introduction"
                className="group absolute inset-0 grid place-items-center"
              >
                <span className="grid size-16 place-items-center rounded-full bg-[rgba(10,15,35,0.9)] shadow-[0_18px_44px_-16px_rgba(5,11,31,0.8)] transition-transform duration-300 group-hover:scale-110 sm:size-20">
                  <FiPlay className="ml-1 size-6 text-white" />
                </span>
              </button>
            ) : (
              <span className="absolute inset-x-0 bottom-0 p-5 text-[12.5px] font-medium text-white/70">
                Introduction video coming soon
              </span>
            )}
          </div>
        </motion.div>

        <motion.div variants={fadeUp}>
          <SectionHead
            eyebrow="Watch"
            title="Watch Course Introduction"
            sub={course.video.caption}
          />
          <p className="mt-4 text-[14px] leading-[1.85] text-white/65">
            A short walkthrough of the syllabus, the projects you will build and how the batches
            are run — worth five minutes before you enrol.
          </p>
        </motion.div>
      </Reveal>

      <AnimatePresence>
        {playing && hasVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setPlaying(false)}
            className="fixed inset-0 z-[10000] grid place-items-center bg-slate-950/85 p-4 backdrop-blur-md"
          >
            <button
              type="button"
              aria-label="Close video"
              onClick={() => setPlaying(false)}
              className="absolute right-5 top-5 grid size-10 place-items-center rounded-full border border-white/25 bg-white/10 text-white"
            >
              <FiX className="size-4" />
            </button>
            <div
              onClick={(e) => e.stopPropagation()}
              className="aspect-video w-full max-w-[900px] overflow-hidden rounded-[20px] bg-black"
            >
              <iframe
                src={course.video.url}
                title={`${course.title} introduction`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="size-full"
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </Section>
  );
}
