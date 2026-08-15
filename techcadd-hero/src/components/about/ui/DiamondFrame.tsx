"use client";

import Image from "next/image";
import { useState } from "react";

import type { AboutImage } from "@/data/about";
import { cn } from "@/lib/utils";

interface DiamondFrameProps {
  image: AboutImage;
  /** Corner rounding of the rotated square, as a percentage utility. */
  radius?: string;
  /** Draws the two concentric outlines around the frame. */
  outlines?: boolean;
  priority?: boolean;
  sizes: string;
}

/**
 * A square frame rotated 45°, with the photograph counter-rotated inside it so
 * the subject stays upright.
 *
 * The inner scale of √2 (1.42) is what stops the corners of the rotated frame
 * from cutting into empty space: a square rotated 45° needs its content
 * enlarged by that factor to cover the frame completely.
 */
export default function DiamondFrame({
  image,
  radius = "rounded-[12%]",
  outlines = false,
  priority = false,
  sizes,
}: DiamondFrameProps) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="relative aspect-square w-full">
      {outlines ? (
        <>
          <span
            aria-hidden="true"
            className="diamond-ring absolute -inset-[7%] rotate-45 rounded-[14%]"
          />
          <span
            aria-hidden="true"
            className="diamond-ring absolute -inset-[14%] rotate-45 rounded-[16%] opacity-50"
          />
        </>
      ) : null}

      <div
        className={cn(
          "relative size-full rotate-45 overflow-hidden bg-linear-to-br from-brand/30 to-accent/20 shadow-[0_40px_90px_-45px_rgb(8_21_64/0.9)]",
          radius,
        )}
      >
        {/* counter-rotated, so the photograph itself is never on the diagonal */}
        <div className="absolute inset-0 -rotate-45 scale-[1.42]">
          {!failed ? (
            <Image
              src={image.src}
              alt={image.alt}
              fill
              sizes={sizes}
              priority={priority}
              onError={() => setFailed(true)}
              className="object-cover"
            />
          ) : (
            <span className="sr-only">{image.alt}</span>
          )}
        </div>
      </div>
    </div>
  );
}
