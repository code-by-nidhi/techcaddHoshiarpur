import { BlogService } from './blog.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { QueryArticlesDto } from './dto/query-articles.dto';
import { UpdateArticleDto } from './dto/update-article.dto';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    list(query: QueryArticlesDto): Promise<import("../common/dto/pagination-query.dto").PaginatedResult<import("./blog.types").ArticleSummary>>;
    featured(): Promise<import("./blog.types").ArticleSummary | null>;
    trending(limit: number): Promise<import("./blog.types").ArticleSummary[]>;
    editorsPicks(limit: number, exclude?: string): Promise<import("./blog.types").ArticleSummary[]>;
    related(slug: string, limit: number): Promise<import("./blog.types").ArticleSummary[]>;
    bySlug(slug: string): Promise<import("./blog.types").ArticleDetail>;
    create(dto: CreateArticleDto): Promise<import("./blog.types").ArticleDetail>;
    update(id: string, dto: UpdateArticleDto): Promise<import("./blog.types").ArticleDetail>;
    remove(id: string): Promise<void>;
}
