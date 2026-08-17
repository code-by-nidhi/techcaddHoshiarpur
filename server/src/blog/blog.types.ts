/**
 * The API's public shapes.
 *
 * Prisma rows are not returned directly: they carry foreign keys, draft
 * content and internal columns the frontend has no business knowing about.
 * Everything crossing the wire is mapped into one of these.
 */

export interface AuthorSummary {
  id: string;
  name: string;
  slug: string;
  avatar: string;
  role: string;
}

export interface AuthorDetail extends AuthorSummary {
  bio: string;
  socialLinks: Record<string, string>;
  articleCount: number;
}

export interface CategorySummary {
  id: string;
  name: string;
  slug: string;
  description: string;
  articleCount?: number;
}

export interface TagSummary {
  id: string;
  name: string;
  slug: string;
}

export interface ArticleSummary {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  featuredImage: string;
  readingTime: number;
  views: number;
  featured: boolean;
  trending: boolean;
  publishedAt: string | null;
  category: CategorySummary;
  author: AuthorSummary;
  tags: TagSummary[];
}

export interface ArticleDetail extends ArticleSummary {
  content: string;
  updatedAt: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}
