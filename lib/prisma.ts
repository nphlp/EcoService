import { PrismaClient } from "@prisma/client";

// const { MYSQL_DATABASE, MYSQL_USER, MYSQL_PASSWORD, MYSQL_HOST, MYSQL_PORT } = process.env;

// const DATABASE_URL = `mysql://${MYSQL_USER}:${MYSQL_PASSWORD}@${MYSQL_HOST}:${MYSQL_PORT}/${MYSQL_DATABASE}`;

const prismaClientSingleton = () => new PrismaClient();

declare const globalThis: {
    prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

/**
 * A singleton instance of the Prisma client to prevent
 * multiple instances of the Prisma client from being created.
 */
const PrismaInstance = globalThis.prismaGlobal ?? prismaClientSingleton();

export default PrismaInstance;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = PrismaInstance;
