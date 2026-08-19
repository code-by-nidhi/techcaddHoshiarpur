import Link from "next/link";
import { FileSearch } from "lucide-react";

/** Shown when a slug does not resolve — a wrong link, or an unpublished article. */
export default function ArticleNotFound() {
  return (
    <section className="surface-dark flex min-h-[70vh] items-center bg-royal-deep">
      <div className="shell text-center">
        <span
          aria-hidden="true"
          className="chip-border mx-auto grid size-16 place-content-center rounded-2xl bg-[var(--ctx-chip-bg)] text-[var(--ctx-chip-fg)]"
        >
          <FileSearch className="size-7" strokeWidth={1.75} />
        </span>

        <h1 className="type-h2 mx-auto mt-7 max-w-xl">That article isn&apos;t here.</h1>

        <p className="type-lead mx-auto mt-5 max-w-lg text-ink-muted">
          The link may be out of date, or the piece may not be published yet. The rest of the blog
          is still worth your time.
        </p>

        <Link
          href="/blog"
          className="mt-9 inline-flex rounded-full bg-[#050B1F] px-7 py-3.5 text-sm font-semibold text-white transition-shadow duration-300 hover:shadow-[0_18px_40px_-16px_rgb(255_255_255/0.6)]"
        >
          Browse all articles
        </Link>
      </div>
    </section>
  );
}
