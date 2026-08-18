import { Injectable, Logger, OnModuleDestroy, ServiceUnavailableException } from '@nestjs/common';

import { PrismaClient } from '@prisma/mysql-client';

/**
 * The MySQL client, used by the demo-booking module.
 *
 * Unlike the blog's client this one does NOT connect on boot. MySQL is a
 * separate service that may be down or unconfigured, and an eager `$connect`
 * would take the whole API — blog included — down with it. Instead the first
 * query connects, a failure is reported as a 503 on that one endpoint, and the
 * next request tries again.
 */
@Injectable()
export class MysqlService extends PrismaClient implements OnModuleDestroy {
  private readonly logger = new Logger(MysqlService.name);
  private connected = false;

  /** Call before any query. Throws a clean 503 if MySQL cannot be reached. */
  async ensureConnected(): Promise<void> {
    if (this.connected) return;

    try {
      await this.$connect();
      this.connected = true;
      this.logger.log('MySQL connected');
    } catch (error) {
      this.logger.error(
        'MySQL unavailable — is the service running and MYSQL_DATABASE_URL correct?',
        error instanceof Error ? error.message : String(error),
      );

      throw new ServiceUnavailableException(
        'Booking service is temporarily unavailable. Please call us instead.',
      );
    }
  }

  async onModuleDestroy(): Promise<void> {
    if (this.connected) await this.$disconnect();
  }
}
