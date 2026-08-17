import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';
export declare const ARTICLE_SORTS: readonly ["latest", "oldest", "popular", "trending"];
export type ArticleSort = (typeof ARTICLE_SORTS)[number];
export declare class QueryArticlesDto extends PaginationQueryDto {
    category?: string;
    search?: string;
    tag?: string;
    author?: string;
    sort?: ArticleSort;
    featured?: boolean;
    exclude?: string;
}
