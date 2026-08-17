import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsIn, IsOptional, IsString, MaxLength } from 'class-validator';

import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export const ARTICLE_SORTS = ['latest', 'oldest', 'popular', 'trending'] as const;
export type ArticleSort = (typeof ARTICLE_SORTS)[number];

/**
 * Everything the blog index can ask for. Each field is optional, so
 * `GET /api/blog/posts` on its own returns the latest published articles.
 */
export class QueryArticlesDto extends PaginationQueryDto {
  /** Category slug, e.g. `ai-data`. "all" is accepted and means no filter. */
  @IsOptional()
  @IsString()
  @MaxLength(96)
  category?: string;

  /** Free text across title, excerpt, content, category, tag and author. */
  @IsOptional()
  @IsString()
  @MaxLength(120)
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  search?: string;

  @IsOptional()
  @IsString()
  @MaxLength(96)
  tag?: string;

  @IsOptional()
  @IsString()
  @MaxLength(96)
  author?: string;

  @IsOptional()
  @IsIn(ARTICLE_SORTS)
  sort?: ArticleSort = 'latest';

  @IsOptional()
  @Type(() => Boolean)
  @Transform(({ value }) => value === true || value === 'true')
  @IsBoolean()
  featured?: boolean;

  /** Slug to leave out — used when a page already shows an article above the grid. */
  @IsOptional()
  @IsString()
  @MaxLength(96)
  exclude?: string;
}
