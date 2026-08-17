import { Injectable, Logger } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import type { SubscribeDto } from './dto/subscribe.dto';

export interface SubscribeResult {
  status: 'subscribed' | 'already-subscribed' | 'resubscribed';
  message: string;
}

@Injectable()
export class NewsletterService {
  private readonly logger = new Logger(NewsletterService.name);

  constructor(private readonly prisma: PrismaService) {}

  /**
   * Subscribe an address.
   *
   * Idempotent by design: submitting the same address twice is a success, not
   * an error. A 409 here would tell an attacker which addresses are on the
   * list, and would read as a failure to a reader who simply forgot they had
   * already signed up.
   */
  async subscribe(dto: SubscribeDto): Promise<SubscribeResult> {
    const existing = await this.prisma.newsletterSubscriber.findUnique({
      where: { email: dto.email },
    });

    if (existing?.status === 'active') {
      return {
        status: 'already-subscribed',
        message: "You're already on the list — thanks for reading.",
      };
    }

    if (existing) {
      await this.prisma.newsletterSubscriber.update({
        where: { email: dto.email },
        data: { status: 'active', source: dto.source ?? 'blog' },
      });

      return { status: 'resubscribed', message: 'Welcome back. You are subscribed again.' };
    }

    await this.prisma.newsletterSubscriber.create({
      data: { email: dto.email, source: dto.source ?? 'blog' },
    });

    this.logger.log(`New newsletter subscriber via ${dto.source ?? 'blog'}`);

    return { status: 'subscribed', message: "You're subscribed. Look out for the next issue." };
  }
}
