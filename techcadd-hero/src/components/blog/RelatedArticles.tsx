import ArticleCard from "./ArticleCard";

import type { Article } from "@/lib/blog/types";

/** "Continue reading" — the three the API judged closest to this piece. */
export default function RelatedArticles({ articles }: { articles: Article[] }) {
  if (articles.length === 0) return null;

  return (
    <section
      aria-labelledby="related-heading"
      className="surface-light section-y relative isolate bg-mist"
    >
      <div className="shell">
        <p className="type-eyebrow flex items-center gap-2.5 text-eyebrow">
          <span aria-hidden="true" className="h-px w-6 bg-eyebrow/60" />
          Continue reading
        </p>

        <h2 id="related-heading" className="type-h2 mt-4">
          More from the TechCADD blog
        </h2>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      </div>
    </section>
  );
}
