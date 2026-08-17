import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { BlogService } from './blog.service';
import { CreateArticleDto } from './dto/create-article.dto';
import { QueryArticlesDto } from './dto/query-articles.dto';
import { UpdateArticleDto } from './dto/update-article.dto';

/**
 * Read endpoints are public. The three write endpoints are the surface a future
 * admin panel will use; they are deliberately shaped and validated now, and an
 * auth guard is the only thing that needs adding when that panel arrives.
 */
@Controller('blog')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  /** GET /api/blog/posts?page=1&limit=9&category=ai-data&search=python&sort=latest */
  @Get('posts')
  list(@Query() query: QueryArticlesDto) {
    return this.blogService.list(query);
  }

  /** GET /api/blog/featured */
  @Get('featured')
  featured() {
    return this.blogService.findFeatured();
  }

  /** GET /api/blog/trending?limit=5 */
  @Get('trending')
  trending(@Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number) {
    return this.blogService.findTrending(Math.min(limit, 10));
  }

  /** GET /api/blog/editors-picks?limit=3&exclude=some-slug */
  @Get('editors-picks')
  editorsPicks(
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number,
    @Query('exclude') exclude?: string,
  ) {
    return this.blogService.findEditorsPicks(Math.min(limit, 6), exclude);
  }

  /** GET /api/blog/posts/:slug/related?limit=3 */
  @Get('posts/:slug/related')
  related(
    @Param('slug') slug: string,
    @Query('limit', new DefaultValuePipe(3), ParseIntPipe) limit: number,
  ) {
    return this.blogService.findRelated(slug, Math.min(limit, 6));
  }

  /** GET /api/blog/posts/:slug */
  @Get('posts/:slug')
  bySlug(@Param('slug') slug: string) {
    return this.blogService.findBySlug(slug);
  }

  /** POST /api/blog/posts */
  @Post('posts')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() dto: CreateArticleDto) {
    return this.blogService.create(dto);
  }

  /** PATCH /api/blog/posts/:id */
  @Patch('posts/:id')
  update(@Param('id') id: string, @Body() dto: UpdateArticleDto) {
    return this.blogService.update(id, dto);
  }

  /** DELETE /api/blog/posts/:id */
  @Delete('posts/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.blogService.remove(id);
  }
}
