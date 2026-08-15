import { cn } from "@/lib/utils";

interface TechBackgroundProps {
  /**
   * `hero` is the full treatment (wash, grid and glows), `subtle` drops the
   * glows for sections that sit next to a busier one, `panel` is scaled for
   * the inside of a card rather than a whole section.
   */
  variant?: "hero" | "subtle" | "panel";
  /** Light sections need a far weaker grid than navy ones. */
  tone?: "dark" | "light";
}

/** Decorative backdrop. Absolutely positioned, so its section must be `isolate`. */
export default function TechBackground({
  variant = "hero",
  tone = "dark",
}: TechBackgroundProps) {
  const light = tone === "light";
  const line = light ? "rgb(15 23 42 / 4%)" : "rgb(255 255 255 / 5%)";
  const cell = variant === "panel" ? "48px" : "64px";

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute inset-0 -z-10 overflow-hidden",
        variant === "panel" && "rounded-[var(--radius-hero)]",
      )}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
          backgroundSize: `${cell} ${cell}`,
          maskImage:
            "radial-gradient(ellipse 90% 70% at 50% 35%, #000 35%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 90% 70% at 50% 35%, #000 35%, transparent 80%)",
        }}
      />

      {variant !== "subtle" ? (
        <>
          <div
            className={cn(
              "absolute -top-24 -left-20 size-[26rem] rounded-full blur-[120px]",
              light ? "bg-brand/8" : "bg-brand/25",
            )}
          />
          <div
            className={cn(
              "absolute -right-24 bottom-0 size-[28rem] rounded-full blur-[130px]",
              light ? "bg-accent/8" : "bg-accent/15",
            )}
          />
        </>
      ) : null}
    </div>
  );
}
