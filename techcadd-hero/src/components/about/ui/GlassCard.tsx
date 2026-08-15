import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface GlassCardProps {
  children: ReactNode;
  /** Heavier blur and a more present edge, for cards that sit over imagery. */
  strong?: boolean;
  /** Lifts and warms its border on hover. */
  interactive?: boolean;
  className?: string;
}

/**
 * Frosted panel. Its colours come from the surrounding `surface-light` /
 * `surface-dark` context rather than from props, so the same card works on
 * white and on navy without a variant.
 */
export default function GlassCard({
  children,
  strong = false,
  interactive = false,
  className,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        strong ? "glass-card-strong" : "glass-card",
        interactive && "glass-card-interactive",
        className,
      )}
    >
      {children}
    </div>
  );
}
