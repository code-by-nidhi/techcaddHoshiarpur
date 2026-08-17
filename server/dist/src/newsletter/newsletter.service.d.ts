import { PrismaService } from '../prisma/prisma.service';
import type { SubscribeDto } from './dto/subscribe.dto';
export interface SubscribeResult {
    status: 'subscribed' | 'already-subscribed' | 'resubscribed';
    message: string;
}
export declare class NewsletterService {
    private readonly prisma;
    private readonly logger;
    constructor(prisma: PrismaService);
    subscribe(dto: SubscribeDto): Promise<SubscribeResult>;
}
