/**
 * The API's response shapes, mirrored for the frontend.
 *
 * Hand-written rather than generated: the client depends on the HTTP contract,
 * not on the server's Prisma models, and keeping them separate is what allows
 * the API to change its storage without the site knowing.
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

export interface Article {
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

export interface ArticleDetail extends Article {
  content: string;
  updatedAt: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
}

export interface PageMeta {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasMore: boolean;
}

export interface Paginated<T> {
  data: T[];
  meta: PageMeta;
}

export interface ArticleQuery {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  tag?: string;
  author?: string;
  sort?: "latest" | "oldest" | "popular" | "trending";
  exclude?: string;
}

export interface SubscribeResponse {
  status: "subscribed" | "already-subscribed" | "resubscribed";
  message: string;
}
