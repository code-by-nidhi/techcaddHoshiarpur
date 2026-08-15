"use client";

import Image from "next/image";
import { useState, type ReactNode } from "react";

import type { AboutImage } from "@/data/about";

interface ShowcaseTileProps {
  title: string;
  description: string;
  image: AboutImage;
  /**
   * The rendered icon, not the component.
   *
   * This tile is a client component (it swaps in a fallback when a photograph
   * fails to load), and a server section cannot hand a client component a
   * function — so the caller renders the icon and passes the element.
   */
  icon: ReactNode;
}

/**
 * A photographic tile with its copy laid over a scrim.
 *
 * The scrim is not decoration: it is what keeps the white title legible over an
 * arbitrary photograph, so it stays even when the image fails to load.
 */
export default function ShowcaseTile({
  title,
  description,
  image,
  icon,
}: ShowcaseTileProps) {
  const [failed, setFailed] = useState(false);

  return (
    <article className="group relative flex h-full min-h-[15rem] flex-col justify-end overflow-hidden rounded-[var(--radius-card)] bg-linear-to-br from-royal to-royal-deep p-5 sm:min-h-[17rem] sm:p-6">
      {!failed ? (
        <Image
          src={image.src}
          alt=""
          fill
          sizes="(max-width: 1280px) 45vw, 22vw"
          onError={() => setFailed(true)}
          className="object-cover transition-transform duration-[900ms] ease-[var(--ease-out-soft)] group-hover:scale-[1.07]"
        />
      ) : null}

      <span
        aria-hidden="true"
        className="absolute inset-0 bg-linear-to-t from-royal-deep via-royal-deep/70 to-royal-deep/10"
      />

      <span
        aria-hidden="true"
        className="chip-border relative flex size-10 items-center justify-center rounded-[var(--radius-card)] bg-white/10 text-white backdrop-blur-md"
      >
        {icon}
      </span>

      <h4 className="font-display relative mt-4 text-base font-bold tracking-[-0.015em] text-white">
        {title}
      </h4>
      <p className="relative mt-2 text-[0.8125rem] leading-relaxed text-white/75">
        {description}
      </p>
    </article>
  );
}
