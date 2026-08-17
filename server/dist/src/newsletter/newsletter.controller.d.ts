import { SubscribeDto } from './dto/subscribe.dto';
import { NewsletterService } from './newsletter.service';
export declare class NewsletterController {
    private readonly newsletterService;
    constructor(newsletterService: NewsletterService);
    subscribe(dto: SubscribeDto): Promise<import("./newsletter.service").SubscribeResult>;
}
