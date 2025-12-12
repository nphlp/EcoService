import { os } from "@orpc/server";
import "server-only";
import { z } from "zod";
import { tag } from "@/api/cache";
import { basketFindManyCached } from "./basket-cached";
import { basketWithQuantitiesSchema } from "./basket-schema";

const findManyByUser = os
    .route({
        method: "GET",
        path: "/baskets/user/{userId}",
        summary: "BASKET Find Many By User",
        description: "Permission: public",
    })
    .input(
        z.object({
            userId: z.string().describe("User ID to filter baskets"),
            cacheTags: z.array(z.string()).optional().describe("Array of cache tags"),
        }),
    )
    .output(z.array(basketWithQuantitiesSchema))
    .handler(async ({ input }) => {
        const baskets = await basketFindManyCached(
            {
                where: { userId: input.userId },
                orderBy: { createdAt: "desc" },
                include: {
                    Quantity: {
                        include: {
                            Fruit: {
                                select: {
                                    id: true,
                                    name: true,
                                    description: true,
                                },
                            },
                        },
                    },
                },
            },
            [
                tag("basket"),
                tag("basket", "findMany"),
                tag("basket", "findMany", input.userId),
                ...(input.cacheTags ?? []),
            ],
        );

        return baskets;
    });

export const basketQueries = {
    findManyByUser,
};

export default basketQueries;
