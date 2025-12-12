import { os } from "@orpc/server";
import { Prisma } from "@prisma/client/client";
import projection from "@utils/projection";
import "server-only";
import { z } from "zod";
import { tag } from "@/api/cache";
import { fruitFindManyCached, fruitFindUniqueCached } from "./fruit-cached";
import { fruitOutputSchema, fruitWithUserOutputSchema } from "./fruit-schema";

const findMany = os
    .route({
        method: "GET",
        path: "/fruits",
        summary: "FRUIT Find Many",
        description: "Permission: public",
    })
    .input(
        z
            .object({
                // Search
                search: z.string().optional().describe("Search term to filter fruits by name"),
                // Sorting
                name: z.enum(Prisma.SortOrder).optional().describe("Sort order for name"),
                updatedAt: z.enum(Prisma.SortOrder).optional().describe("Sort order for updatedAt"),
                // Pagination
                take: z.number().min(1).max(1000).optional().describe("Number of fruits to take"),
                skip: z.number().min(0).optional().describe("Number of fruits to skip"),
                // Cache tags
                cacheTags: z.array(z.string()).optional().describe("Array of cache tags"),
            })
            .optional(),
    )
    .output(z.array(z.intersection(fruitOutputSchema, z.object({ inBasketCount: z.number() }))))
    .handler(async ({ input }) => {
        // Get fruit list
        const fruitsRaw = await fruitFindManyCached(
            {
                take: input?.take,
                skip: input?.skip,
                orderBy: {
                    ...(input?.name && { name: input.name }),
                    ...(input?.updatedAt && { updatedAt: input.updatedAt }),
                },
                where: {
                    ...(input?.search && {
                        name: { contains: input.search, mode: "insensitive" },
                    }),
                },
                // Count how many baskets contain each fruit
                // For "inBasketCount" field
                include: {
                    _count: {
                        select: {
                            Quantities: true,
                        },
                    },
                },
            },
            [
                // Default cache tags
                tag("fruit"),
                tag("fruit", "findMany"),
                tag("fruit", "findMany", input),
                // Provided cache tags
                ...(input?.cacheTags ?? []),
            ],
        );

        const fruits = fruitsRaw.map((fruit) => ({
            ...projection(fruit, ["id", "name", "description", "userId", "createdAt", "updatedAt"]),
            inBasketCount: fruit._count.Quantities,
        }));

        return fruits;
    });

const findUnique = os
    .route({
        method: "GET",
        path: "/fruit/{id}",
        summary: "FRUIT Find Unique",
        description: "Permission: public",
    })
    .input(
        z.object({
            id: z.string().describe("Unique ID of the fruit"),
            cacheTags: z.array(z.string()).optional().describe("Array of cache tags"),
        }),
    )
    .output(fruitWithUserOutputSchema.nullable())
    .handler(async ({ input }) => {
        // Get fruit by ID with user information
        const fruit = await fruitFindUniqueCached(
            {
                where: { id: input.id },
                include: {
                    User: {
                        select: {
                            id: true,
                            name: true,
                            lastname: true,
                            email: true,
                        },
                    },
                },
            },
            [
                // Default cache tags
                tag("fruit"),
                tag("fruit", "findUnique"),
                tag("fruit", "findUnique", input.id),
                // Provided cache tags
                ...(input.cacheTags ?? []),
            ],
        );

        return fruit;
    });

export const fruitQueries = {
    findMany,
    findUnique,
};

export default fruitQueries;
