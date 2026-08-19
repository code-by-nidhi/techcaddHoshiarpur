"use client";

import Link from "next/link";
import { RefreshCw, ServerCrash } from "lucide-react";
import { useEffect } from "react";

/**
 * Route-level error boundary.
 *
 * The likely cause in practice is the blog API being unreachable, so the copy
 * says that plainly and offers a retry rather than a generic apology.
 */
export default function BlogError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[blog] route error:", error);
  }, [error]);

  return (
    <section className="surface-dark flex min-h-[70vh] items-center bg-royal-deep">
      <div className="shell text-center">
        <span
          aria-hidden="true"
          className="chip-border mx-auto grid size-16 place-content-center rounded-2xl bg-[var(--ctx-chip-bg)] text-[var(--ctx-chip-fg)]"
        >
          <ServerCrash className="size-7" strokeWidth={1.75} />
        </span>

        <h1 className="type-h2 mx-auto mt-7 max-w-xl">We couldn&apos;t load the blog.</h1>

        <p className="type-lead mx-auto mt-5 max-w-lg text-ink-muted">
          The articles service didn&apos;t respond. This is usually temporary — try again in a
          moment.
        </p>

        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={reset}
            className="inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-royal-deep transition-shadow duration-300 hover:shadow-[0_18px_40px_-16px_rgb(255_255_255/0.6)]"
          >
            <RefreshCw aria-hidden="true" className="size-4" />
            Try again
          </button>

          <Link
            href="/"
            className="chip-border rounded-full bg-white/10 px-7 py-3.5 text-sm font-semibold text-ink backdrop-blur-md transition-colors hover:bg-white/15"
          >
            Back to home
          </Link>
        </div>
      </div>
    </section>
  );
}
