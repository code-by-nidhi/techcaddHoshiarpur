import { Injectable, NotFoundException } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import type { AuthorDetail, AuthorSummary } from '../blog/blog.types';

@Injectable()
export class AuthorsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<AuthorSummary[]> {
    const rows = await this.prisma.author.findMany({ orderBy: { name: 'asc' } });

    return rows.map((row) => ({
      id: row.id,
      name: row.name,
      slug: row.slug,
      avatar: row.avatar,
      role: row.role,
    }));
  }

  async findBySlug(slug: string): Promise<AuthorDetail> {
    const row = await this.prisma.author.findUnique({
      where: { slug },
      include: {
        _count: { select: { articles: { where: { status: 'published' } } } },
      },
    });

    if (!row) throw new NotFoundException(`No author "${slug}"`);

    return {
      id: row.id,
      name: row.name,
      slug: row.slug,
      avatar: row.avatar,
      role: row.role,
      bio: row.bio,
      // stored as a JSON string because SQLite has no JSON column; parsing
      // failures degrade to "no links" rather than breaking the author page
      socialLinks: this.parseSocialLinks(row.socialLinks),
      articleCount: row._count.articles,
    };
  }

  private parseSocialLinks(raw: string): Record<string, string> {
    try {
      const parsed: unknown = JSON.parse(raw);
      return parsed && typeof parsed === 'object' ? (parsed as Record<string, string>) : {};
    } catch {
      return {};
    }
  }
}
