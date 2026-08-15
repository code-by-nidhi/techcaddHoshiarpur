"use client";

import Image from "next/image";
import { useState } from "react";
import { useReducedMotion } from "framer-motion";

import type { AboutImage } from "@/data/about";
import { cn } from "@/lib/utils";

interface ImageCardProps {
  image: AboutImage;
  /** Aspect utility, e.g. `aspect-4/3`. */
  aspect: string;
  sizes: string;
  priority?: boolean;
  className?: string;
}

/**
 * A photograph in a rounded frame: zooms gently on hover, and falls back to a
 * branded gradient carrying the alt text if the file is not on disk — the same
 * contract the home page's collage uses, so a missing asset never renders as a
 * broken image.
 */
export default function ImageCard({
  image,
  aspect,
  sizes,
  priority = false,
  className,
}: ImageCardProps) {
  const [loaded, setLoaded] = useState(false);
  const [failed, setFailed] = useState(false);
  const reduce = useReducedMotion();

  return (
    <div
      className={cn(
        "group relative w-full overflow-hidden rounded-[var(--radius-hero)] bg-linear-to-br from-brand/20 via-brand/10 to-accent/10 ring-1 ring-inset ring-black/5 shadow-[0_30px_70px_-45px_rgb(8_21_64/0.8)]",
        aspect,
        className,
      )}
    >
      {!failed ? (
        <Image
          src={image.src}
          alt={image.alt}
          fill
          sizes={sizes}
          priority={priority}
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={cn(
            "object-cover transition-[transform,opacity] duration-[900ms] ease-[var(--ease-out-soft)]",
            loaded ? "opacity-100" : "opacity-0",
            !reduce && "group-hover:scale-[1.06]",
          )}
        />
      ) : (
        <p className="absolute inset-x-6 top-1/2 -translate-y-1/2 text-center text-xs leading-relaxed text-ink-dim">
          {image.alt}
        </p>
      )}
    </div>
  );
}
