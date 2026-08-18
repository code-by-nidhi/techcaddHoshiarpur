"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const throttler_1 = require("@nestjs/throttler");
const authors_module_1 = require("./authors/authors.module");
const blog_module_1 = require("./blog/blog.module");
const bookings_module_1 = require("./bookings/bookings.module");
const categories_module_1 = require("./categories/categories.module");
const newsletter_module_1 = require("./newsletter/newsletter.module");
const prisma_module_1 = require("./prisma/prisma.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            throttler_1.ThrottlerModule.forRoot([
                {
                    name: 'newsletter',
                    ttl: Number(process.env.NEWSLETTER_RATE_TTL ?? 60) * 1000,
                    limit: Number(process.env.NEWSLETTER_RATE_LIMIT ?? 5),
                },
            ]),
            prisma_module_1.PrismaModule,
            blog_module_1.BlogModule,
            categories_module_1.CategoriesModule,
            authors_module_1.AuthorsModule,
            newsletter_module_1.NewsletterModule,
            bookings_module_1.BookingsModule,
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map