import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import ArticleCard from "@/components/blog/ArticleCard";
import AuthorAvatar from "@/components/blog/AuthorAvatar";
import CareerCTA from "@/components/blog/CareerCTA";
import NewsletterSection from "@/components/blog/NewsletterSection";
import { BlogApiError, getArticles, getAuthor, safely } from "@/lib/blog/api";
import type { Article, AuthorDetail } from "@/lib/blog/types";

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;

  try {
    const author = await getAuthor(slug);

    return {
      title: `${author.name} — ${author.role}`,
      description: author.bio,
      alternates: { canonical: `/blog/author/${author.slug}` },
      openGraph: { type: "profile", title: author.name, description: author.bio },
    };
  } catch {
    return { title: "Author not found" };
  }
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;

  let author: AuthorDetail;
  try {
    author = await getAuthor(slug);
  } catch (error) {
    if (error instanceof BlogApiError && error.status === 404) notFound();
    throw error;
  }

  const articles = await safely(getArticles({ author: slug, limit: 12 }), {
    data: [] as Article[],
    meta: { page: 1, limit: 12, total: 0, totalPages: 1, hasMore: false },
  });

  const socials = Object.entries(author.socialLinks);

  return (
    <>
      <header className="surface-dark relative isolate overflow-hidden bg-royal-deep pt-32 pb-20 sm:pt-36">
        <div
          aria-hidden="true"
          className="absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(46rem 28rem at 50% -10%, #14306e 0%, #0c1c56 52%, #14245C 88%)",
          }}
        />

        <div className="shell">
          <nav aria-label="Breadcrumb" className="text-xs text-ink-dim">
            <Link href="/blog" className="transition-colors hover:text-ink">
              Blog
            </Link>
            <span aria-hidden="true" className="mx-1.5">
              /
            </span>
            <span aria-current="page" className="text-ink-muted">
              {author.name}
            </span>
          </nav>

          <div className="mt-10 flex flex-col items-start gap-6 sm:flex-row sm:items-center">
            <AuthorAvatar author={author} size={56} className="sm:size-20" />

            <div>
              <p className="type-eyebrow text-eyebrow">{author.role}</p>
              <h1 className="type-h2 mt-3">{author.name}</h1>
              <p className="type-lead mt-4 max-w-2xl text-ink-dim">{author.bio}</p>

              <div className="mt-6 flex flex-wrap items-center gap-3 text-sm">
                <span className="text-ink-muted">
                  {author.articleCount} article{author.articleCount === 1 ? "" : "s"}
                </span>

                {socials.map(([network, href]) => (
                  <a
                    key={network}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="chip-border rounded-full bg-[var(--ctx-chip-bg)] px-4 py-1.5 text-xs font-semibold text-ink-muted capitalize transition-colors hover:bg-brand hover:text-white"
                  >
                    {network}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      <section
        aria-labelledby="author-articles-heading"
        className="surface-light section-y bg-paper"
      >
        <div className="shell">
          <h2 id="author-articles-heading" className="type-h3 text-ink">
            Articles by {author.name}
          </h2>

          {articles.data.length === 0 ? (
            <p className="type-body mt-6 text-ink-muted">
              Nothing published here yet. <Link href="/blog" className="font-semibold text-brand">Browse the blog</Link>.
            </p>
          ) : (
            <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {articles.data.map((article, index) => (
                <ArticleCard key={article.id} article={article} priority={index < 3} />
              ))}
            </div>
          )}
        </div>
      </section>

      <NewsletterSection />
      <CareerCTA />
    </>
  );
}
