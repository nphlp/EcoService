import { PrismaClient } from "@services/prisma";

const prismaClientSingleton = () => {
    return new PrismaClient();
};

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
