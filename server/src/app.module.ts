import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';

import { AuthorsModule } from './authors/authors.module';
import { BlogModule } from './blog/blog.module';
import { CategoriesModule } from './categories/categories.module';
import { NewsletterModule } from './newsletter/newsletter.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    /*
     * Registered globally but applied per route: only the newsletter endpoint
     * carries the guard, since it is the one endpoint that writes on an
     * unauthenticated POST.
     */
    ThrottlerModule.forRoot([
      {
        name: 'newsletter',
        ttl: Number(process.env.NEWSLETTER_RATE_TTL ?? 60) * 1000,
        limit: Number(process.env.NEWSLETTER_RATE_LIMIT ?? 5),
      },
    ]),
    PrismaModule,
    BlogModule,
    CategoriesModule,
    AuthorsModule,
    NewsletterModule,
  ],
})
export class AppModule {}
