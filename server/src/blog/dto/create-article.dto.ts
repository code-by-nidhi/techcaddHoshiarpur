import { Type } from 'class-transformer';
import {
  ArrayMaxSize,
  IsArray,
  IsBoolean,
  IsIn,
  IsISO8601,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export const ARTICLE_STATUSES = ['draft', 'published', 'archived'] as const;
export type ArticleStatus = (typeof ARTICLE_STATUSES)[number];

/**
 * Write contract for an article — the shape an admin panel will POST.
 *
 * Deliberately absent: `slug`, `readingTime` and `views`. The first two are
 * derived server-side so they can never disagree with the title and content,
 * and view counts are not something a client gets to assert.
 */
export class CreateArticleDto {
  @IsString()
  @MinLength(8)
  @MaxLength(160)
  title: string;

  @IsString()
  @MinLength(20)
  @MaxLength(320)
  excerpt: string;

  @IsString()
  @MinLength(50)
  content: string;

  @IsString()
  @MaxLength(512)
  featuredImage: string;

  /** Category slug. */
  @IsString()
  @MaxLength(96)
  category: string;

  /** Author slug. */
  @IsString()
  @MaxLength(96)
  author: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(12)
  @IsString({ each: true })
  tags?: string[];

  @IsOptional()
  @IsIn(ARTICLE_STATUSES)
  status?: ArticleStatus = 'published';

  @IsOptional()
  @IsISO8601()
  publishedAt?: string;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  featured?: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  trending?: boolean;

  @IsOptional()
  @IsString()
  @MaxLength(160)
  seoTitle?: string;

  @IsOptional()
  @IsString()
  @MaxLength(320)
  seoDescription?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(20)
  @IsString({ each: true })
  seoKeywords?: string[];
}
