/**
 * Skeleton primitives.
 *
 * Every placeholder on the site is the same thing — a pulsing block in the
 * shape of the content that will replace it — and these are that block, so the
 * route-level `loading.tsx` files read as layout rather than as a wall of
 * repeated utility classes.
 *
 * Colour comes from `--ctx-chip-bg`, which `surface-dark` and `surface-light`
 * each redefine (see globals.css). A skeleton therefore takes the tone of the
 * band it sits in without being told which one it is — the one exception is
 * `tone`, for the bands that set their navy background directly rather than
 * through a surface class, which is most of the marketing pages.
 *
 * These are decorative by definition: the real content is what the reader
 * wants, and a screen reader announcing two dozen empty boxes is worse than
 * silence. Each block is `aria-hidden`, and `SkeletonPage` carries the single
 * `aria-busy` region that stands for the lot.
 */
import type { ReactNode } from "react";

type Tone = "auto" | "dark" | "light";

/** Background for a given tone. `auto` defers to the surrounding surface. */
const toneBg: Record<Tone, string> = {
  auto: "bg-[var(--ctx-chip-bg)]",
  dark: "bg-white/10",
  light: "bg-slate-200/80",
};

/**
 * One pulsing block. Pass the shape in `className` — `h-*`, `w-*` and a
 * radius — exactly as you would size the real element.
 */
export function Skeleton({
  className = "",
  tone = "auto",
}: {
  className?: string;
  tone?: Tone;
}) {
  return (
    <div aria-hidden className={`animate-pulse ${toneBg[tone]} ${className}`} />
  );
}

/** A line of text. `w` is how much of the column the line fills. */
export function SkeletonText({
  w = "w-full",
  tone = "auto",
  className = "",
}: {
  w?: string;
  tone?: Tone;
  className?: string;
}) {
  return <Skeleton tone={tone} className={`h-4 rounded-full ${w} ${className}`} />;
}

/** A heading, sized to the `clamp()` headings the marketing pages use. */
export function SkeletonHeading({
  w = "w-3/4",
  tone = "auto",
  className = "",
}: {
  w?: string;
  tone?: Tone;
  className?: string;
}) {
  return (
    <Skeleton tone={tone} className={`h-10 rounded-2xl sm:h-12 ${w} ${className}`} />
  );
}

/**
 * The card shape the catalogue grids use: image block over two or three lines.
 * `ratio` matches whatever aspect the real card's image carries.
 */
export function SkeletonCard({
  ratio = "aspect-[4/3]",
  tone = "auto",
  lines = 2,
}: {
  ratio?: string;
  tone?: Tone;
  lines?: number;
}) {
  return (
    <div
      aria-hidden
      className="overflow-hidden rounded-[22px] border border-slate-200/70 bg-white"
    >
      <Skeleton tone={tone} className={`w-full ${ratio}`} />
      <div className="flex flex-col gap-3 p-5">
        <SkeletonText tone={tone} w="w-2/3" className="h-5" />
        {Array.from({ length: lines }, (_, i) => (
          <SkeletonText key={i} tone={tone} w={i === lines - 1 ? "w-4/5" : "w-full"} className="h-3" />
        ))}
      </div>
    </div>
  );
}

/**
 * The dark hero band every inner page opens with: breadcrumb, eyebrow,
 * heading, then a couple of lines of standfirst. The padding matches the real
 * heroes' `pt-[calc(var(--nav-h)+3rem)]` so the fold lands in the same place.
 */
export function SkeletonPageHero({ lines = 2 }: { lines?: number }) {
  return (
    <section className="relative overflow-x-clip bg-[#101E52] pb-16 pt-[calc(var(--nav-h)+3rem)] lg:pb-20">
      <div className="relative mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
        <Skeleton tone="dark" className="h-3 w-52 rounded-full" />
        <Skeleton tone="dark" className="mt-8 h-3 w-28 rounded-full" />
        <SkeletonHeading tone="dark" w="w-full max-w-3xl" className="mt-4" />
        <div className="mt-5 flex max-w-2xl flex-col gap-2.5">
          {Array.from({ length: lines }, (_, i) => (
            <SkeletonText key={i} tone="dark" w={i === lines - 1 ? "w-3/5" : "w-full"} className="h-3.5" />
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * The wrapper every `loading.tsx` returns. It owns the one live region for the
 * whole placeholder — `aria-busy` plus a label saying what is on its way — so
 * assistive tech hears "loading courses", not two dozen anonymous boxes.
 */
export function SkeletonPage({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div aria-busy="true" aria-live="polite" aria-label={label}>
      {children}
    </div>
  );
}
