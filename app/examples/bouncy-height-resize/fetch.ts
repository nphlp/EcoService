import { Prisma } from "@prisma/client";

export type ProductResponse = Prisma.ProductGetPayload<typeof selectProductFetch>;

export const selectProductFetch = {
    select: { name: true },
};
