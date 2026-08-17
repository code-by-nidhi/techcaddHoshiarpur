import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';

import { SubscribeDto } from './dto/subscribe.dto';
import { NewsletterService } from './newsletter.service';

@Controller('newsletter')
export class NewsletterController {
  constructor(private readonly newsletterService: NewsletterService) {}

  /**
   * POST /api/newsletter/subscribe
   *
   * The one unauthenticated write in the API, so it is the one endpoint behind
   * the rate limiter — five attempts a minute per IP by default, configurable
   * through NEWSLETTER_RATE_LIMIT / NEWSLETTER_RATE_TTL.
   */
  @Post('subscribe')
  @UseGuards(ThrottlerGuard)
  @HttpCode(HttpStatus.OK)
  subscribe(@Body() dto: SubscribeDto) {
    return this.newsletterService.subscribe(dto);
  }
}
