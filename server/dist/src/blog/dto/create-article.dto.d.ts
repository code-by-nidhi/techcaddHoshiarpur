export declare const ARTICLE_STATUSES: readonly ["draft", "published", "archived"];
export type ArticleStatus = (typeof ARTICLE_STATUSES)[number];
export declare class CreateArticleDto {
    title: string;
    excerpt: string;
    content: string;
    featuredImage: string;
    category: string;
    author: string;
    tags?: string[];
    status?: ArticleStatus;
    publishedAt?: string;
    featured?: boolean;
    trending?: boolean;
    seoTitle?: string;
    seoDescription?: string;
    seoKeywords?: string[];
}
