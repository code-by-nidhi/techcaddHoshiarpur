import { Injectable, Logger, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

/**
 * The single data-access client, owned by Nest's lifecycle.
 *
 * Repositories depend on this rather than instantiating their own client:
 * every `new PrismaClient()` opens its own connection pool, which is how a
 * NestJS app ends up exhausting a database's connection limit under load.
 */
@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  private readonly logger = new Logger(PrismaService.name);

  async onModuleInit(): Promise<void> {
    await this.$connect();
    this.logger.log('Database connected');
  }

  async onModuleDestroy(): Promise<void> {
    await this.$disconnect();
  }
}
