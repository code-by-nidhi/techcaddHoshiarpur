"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MysqlService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MysqlService = void 0;
const common_1 = require("@nestjs/common");
const mysql_client_1 = require("@prisma/mysql-client");
let MysqlService = MysqlService_1 = class MysqlService extends mysql_client_1.PrismaClient {
    logger = new common_1.Logger(MysqlService_1.name);
    connected = false;
    async ensureConnected() {
        if (this.connected)
            return;
        try {
            await this.$connect();
            this.connected = true;
            this.logger.log('MySQL connected');
        }
        catch (error) {
            this.logger.error('MySQL unavailable — is the service running and MYSQL_DATABASE_URL correct?', error instanceof Error ? error.message : String(error));
            throw new common_1.ServiceUnavailableException('Booking service is temporarily unavailable. Please call us instead.');
        }
    }
    async onModuleDestroy() {
        if (this.connected)
            await this.$disconnect();
    }
};
exports.MysqlService = MysqlService;
exports.MysqlService = MysqlService = MysqlService_1 = __decorate([
    (0, common_1.Injectable)()
], MysqlService);
//# sourceMappingURL=mysql.service.js.map