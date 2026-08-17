import { Suspense } from "react";

import TechBackground from "@/components/about/ui/TechBackground";

import SearchBar from "./SearchBar";

/**
 * The publication's masthead.
 *
 * Same navy identity as the site's other heroes, deliberately shorter: the
 * featured article below overlaps its lower edge, and a full-height hero would
 * push the first story off the fold.
 */
export default function BlogHero({ articleCount }: { articleCount: number }) {
  return (
    <section
      aria-labelledby="blog-heading"
      className="surface-dark relative isolate overflow-hidden bg-royal-deep px-0 pt-32 pb-28 sm:pt-36 sm:pb-32 lg:pt-40 lg:pb-36"
    >
      <TechBackground variant="hero" />

      <div className="shell text-center">
        <p className="type-eyebrow inline-flex items-center gap-2.5 text-eyebrow">
          <span aria-hidden="true" className="h-px w-6 bg-eyebrow/60" />
          TechCADD Blog
          <span aria-hidden="true" className="h-px w-6 bg-eyebrow/60" />
        </p>

        <h1 id="blog-heading" className="type-display mx-auto mt-6 max-w-4xl">
          Insights that help you <span className="text-brand-bright">learn, build</span> &amp; get
          hired.
        </h1>

        <p className="type-lead mx-auto mt-6 max-w-2xl text-ink-dim">
          Practical guides, career insights, technology trends and expert advice from the people who
          train and work with tomorrow&apos;s developers.
        </p>

        <div className="mt-10">
          {/* useSearchParams needs a boundary, or the whole route opts out of
              static rendering */}
          <Suspense
            fallback={<div className="mx-auto h-14 w-full max-w-xl rounded-full bg-white/5" />}
          >
            <SearchBar />
          </Suspense>
        </div>

        <p className="mt-5 text-sm text-ink-dim">
          {articleCount} article{articleCount === 1 ? "" : "s"} on AI, development, security and
          careers
        </p>
      </div>
    </section>
  );
}
