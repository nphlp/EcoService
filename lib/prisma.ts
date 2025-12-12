import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client/client";
import dotenv from "dotenv";

dotenv.config({ quiet: true });

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) throw new Error("DATABASE_URL environment variable is not defined");

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

/**
 * A singleton instance of the Prisma client to prevent
 * multiple instances of the Prisma client from being created.
 */
const PrismaInstance = globalForPrisma.prisma ?? new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = PrismaInstance;

export default PrismaInstance;
