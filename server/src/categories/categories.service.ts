import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { slugify } from '../common/utils/slugify';
import type { CategorySummary } from '../blog/blog.types';
import type { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(private readonly prisma: PrismaService) {}

  /**
   * Every category with a count of its published articles.
   *
   * The count comes from the same query rather than a request per pill, and it
   * is what lets the filter row show "AI & Data 4" without the frontend
   * fetching the articles first.
   */
  async findAll(): Promise<CategorySummary[]> {
    const rows = await this.prisma.category.findMany({
      orderBy: [{ position: 'asc' }, { name: 'asc' }],
      include: {
        _count: { select: { articles: { where: { status: 'published' } } } },
      },
    });

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      description: row.description,
      articleCount: row._count.articles,
    }));
  }

  async findBySlug(slug: string): Promise<CategorySummary> {
    const row = await this.prisma.category.findUnique({ where: { slug } });
    if (!row) throw new NotFoundException(`No category "${slug}"`);

    return { id: row.id, name: row.name, slug: row.slug, description: row.description };
  }

  async create(dto: CreateCategoryDto): Promise<CategorySummary> {
    const slug = slugify(dto.name);

    const clash = await this.prisma.category.findUnique({ where: { slug } });
    if (clash) throw new ConflictException(`Category "${slug}" already exists`);

    const row = await this.prisma.category.create({
      data: {
        name: dto.name,
        slug,
        description: dto.description ?? '',
        image: dto.image ?? null,
        position: dto.position ?? 99,
      },
    });

    return { id: row.id, name: row.name, slug: row.slug, description: row.description };
  }
}
