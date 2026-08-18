import { OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/mysql-client';
export declare class MysqlService extends PrismaClient implements OnModuleDestroy {
    private readonly logger;
    private connected;
    ensureConnected(): Promise<void>;
    onModuleDestroy(): Promise<void>;
}
