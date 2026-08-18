import { PrismaClient } from "@prisma/client";

/**
 * The application's single Prisma client.
 *
 * Next.js re-evaluates modules on every hot reload in development, so a plain
 * `new PrismaClient()` at module scope would open a fresh connection pool on
 * each edit until MySQL refuses new connections. Stashing the instance on
 * `globalThis` survives the reload; in production the module is evaluated once
 * and the global is never used.
 *
 * Import this — never construct a client inside a request handler.
 */

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    // Queries are noisy and can contain personal data; warnings and errors are
    // what you actually want in a server log.
    log: process.env.NODE_ENV === "development" ? ["warn", "error"] : ["error"],
  });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
