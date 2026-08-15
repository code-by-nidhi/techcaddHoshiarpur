import { cn } from "@/lib/utils";

import ScrollReveal from "./ScrollReveal";

interface SectionHeadingProps {
  /** Wired to the section's `aria-labelledby`. */
  id: string;
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div className={cn(centered && "mx-auto max-w-2xl text-center", className)}>
      {eyebrow ? (
        <ScrollReveal>
          <p
            className={cn(
              "type-eyebrow flex items-center gap-2.5 text-eyebrow",
              centered && "justify-center",
            )}
          >
            <span aria-hidden="true" className="h-px w-6 bg-eyebrow/60" />
            {eyebrow}
          </p>
        </ScrollReveal>
      ) : null}

      <ScrollReveal delay={0.06}>
        <h2 id={id} className="type-h2 mt-4">
          {title}
        </h2>
      </ScrollReveal>

      {description ? (
        <ScrollReveal delay={0.12}>
          <p className={cn("type-lead mt-5 text-ink-muted", centered && "mx-auto")}>
            {description}
          </p>
        </ScrollReveal>
      ) : null}
    </div>
  );
}
