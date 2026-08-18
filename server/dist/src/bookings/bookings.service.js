"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var BookingsService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const mysql_service_1 = require("../mysql/mysql.service");
let BookingsService = BookingsService_1 = class BookingsService {
    mysql;
    logger = new common_1.Logger(BookingsService_1.name);
    constructor(mysql) {
        this.mysql = mysql;
    }
    async create(dto) {
        await this.mysql.ensureConnected();
        const booking = await this.mysql.demoBooking.create({
            data: {
                name: dto.name,
                phone: dto.phone,
                email: dto.email ?? null,
                course: dto.course ?? null,
                preferredDate: dto.preferredDate ?? null,
                message: dto.message ?? null,
                source: dto.source ?? 'navbar',
            },
        });
        this.logger.log(`Demo booking #${booking.id} received from ${booking.source}`);
        return {
            id: booking.id,
            status: 'received',
            message: "Booked. A counsellor will call you within one working day.",
        };
    }
    async findAll(limit = 50) {
        await this.mysql.ensureConnected();
        return this.mysql.demoBooking.findMany({
            orderBy: { createdAt: 'desc' },
            take: Math.min(limit, 200),
        });
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = BookingsService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [mysql_service_1.MysqlService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map