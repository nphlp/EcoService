import { Fruit } from "@prisma/client/client";
import { oRPC_bypass_http as oRPC } from "@test/mocks/orpc";
import { describe, expect, it, vi } from "vitest";

// Node Modules mocks
vi.mock("server-only", async () => import("@test/mocks/modules/server-only"));
vi.mock("next/cache", async () => import("@test/mocks/modules/next-cache"));
vi.mock("@lib/auth-server", async () => import("@test/mocks/modules/auth-server"));

// PrismaInstance mock
vi.mock("@lib/prisma", () => {
    const data: (Fruit & { _count: { Quantities: number } })[] = [
        {
            id: "fruitId1",
            name: "Apple",
            description: "A red fruit",
            userId: "userId",
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-01"),
            _count: { Quantities: 2 },
        },
        {
            id: "fruitId2",
            name: "Banana",
            description: "A yellow fruit",
            userId: "adminId",
            createdAt: new Date("2024-01-02"),
            updatedAt: new Date("2024-01-02"),
            _count: { Quantities: 1 },
        },
        {
            id: "fruitId3",
            name: "Cherry",
            description: "A small red fruit",
            userId: "vendorId",
            createdAt: new Date("2024-01-03"),
            updatedAt: new Date("2024-01-03"),
            _count: { Quantities: 0 },
        },
    ];

    const findMany = async ({
        take,
        skip,
        orderBy,
        where,
    }: {
        take?: number;
        skip?: number;
        orderBy?: { name?: "asc" | "desc"; updatedAt?: "asc" | "desc" };
        where?: { name?: { contains: string; mode: string } };
        include?: { _count: { select: { Quantities: boolean } } };
    }) => {
        let result = [...data];

        // Filter by search
        if (where?.name?.contains) {
            const search = where.name.contains.toLowerCase();
            result = result.filter((fruit) => fruit.name.toLowerCase().includes(search));
        }

        // Sort
        if (orderBy?.name) {
            result.sort((a, b) =>
                orderBy.name === "asc" ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name),
            );
        }
        if (orderBy?.updatedAt) {
            result.sort((a, b) =>
                orderBy.updatedAt === "asc"
                    ? a.updatedAt.getTime() - b.updatedAt.getTime()
                    : b.updatedAt.getTime() - a.updatedAt.getTime(),
            );
        }

        // Pagination
        const start = skip ?? 0;
        const end = take ? start + take : undefined;
        result = result.slice(start, end);

        return result;
    };

    return {
        default: {
            fruit: { findMany },
        },
    };
});

/**
 * Test `GET /fruits` endpoint (public)
 */
const oRpcFruitFindMany = oRPC.fruit.findMany;

describe("GET /fruits (public)", () => {
    it("Returns all fruits", async () => {
        // Execute function
        const fruits = await oRpcFruitFindMany();

        // Expect array of fruit objects
        expect(fruits).toBeDefined();
        expect(Array.isArray(fruits)).toBe(true);
        expect(fruits.length).toBe(3);
    });

    it("Returns fruits with inBasketCount", async () => {
        // Execute function
        const fruits = await oRpcFruitFindMany();

        // Expect inBasketCount field
        expect(fruits[0].inBasketCount).toBe(2);
        expect(fruits[1].inBasketCount).toBe(1);
        expect(fruits[2].inBasketCount).toBe(0);
    });
});

describe("GET /fruits (params)", () => {
    it("Search by name", async () => {
        // Execute function
        const fruits = await oRpcFruitFindMany({ search: "apple" });

        // Expect filtered results
        expect(fruits).toBeDefined();
        expect(fruits.length).toBe(1);
        expect(fruits[0].name).toBe("Apple");
    });

    it("Search by partial name", async () => {
        // Execute function
        const fruits = await oRpcFruitFindMany({ search: "an" });

        // Expect filtered results (Banana contains "an")
        expect(fruits).toBeDefined();
        expect(fruits.length).toBe(1);
        expect(fruits[0].name).toBe("Banana");
    });

    it("Search no results", async () => {
        // Execute function
        const fruits = await oRpcFruitFindMany({ search: "xyz" });

        // Expect empty array
        expect(fruits).toBeDefined();
        expect(fruits.length).toBe(0);
    });

    it("Take 2", async () => {
        // Execute function
        const fruits = await oRpcFruitFindMany({ take: 2 });

        // Expect 2 fruits
        expect(fruits).toBeDefined();
        expect(fruits.length).toBe(2);
    });

    it("Skip 1", async () => {
        // Execute function
        const fruits = await oRpcFruitFindMany({ skip: 1 });

        // Expect 2 fruits (skipped first)
        expect(fruits).toBeDefined();
        expect(fruits.length).toBe(2);
        expect(fruits[0].id).toBe("fruitId2");
    });

    it("Take 1, Skip 1", async () => {
        // Execute function
        const fruits = await oRpcFruitFindMany({ take: 1, skip: 1 });

        // Expect 1 fruit (second one)
        expect(fruits).toBeDefined();
        expect(fruits.length).toBe(1);
        expect(fruits[0].id).toBe("fruitId2");
    });

    it("Order by name asc", async () => {
        // Execute function
        const fruits = await oRpcFruitFindMany({ name: "asc" });

        // Expect sorted by name ascending
        expect(fruits).toBeDefined();
        expect(fruits[0].name).toBe("Apple");
        expect(fruits[1].name).toBe("Banana");
        expect(fruits[2].name).toBe("Cherry");
    });

    it("Order by name desc", async () => {
        // Execute function
        const fruits = await oRpcFruitFindMany({ name: "desc" });

        // Expect sorted by name descending
        expect(fruits).toBeDefined();
        expect(fruits[0].name).toBe("Cherry");
        expect(fruits[1].name).toBe("Banana");
        expect(fruits[2].name).toBe("Apple");
    });

    it("Order by updatedAt asc", async () => {
        // Execute function
        const fruits = await oRpcFruitFindMany({ updatedAt: "asc" });

        // Expect sorted by updatedAt ascending
        expect(fruits).toBeDefined();
        expect(fruits[0].id).toBe("fruitId1");
        expect(fruits[2].id).toBe("fruitId3");
    });

    it("Order by updatedAt desc", async () => {
        // Execute function
        const fruits = await oRpcFruitFindMany({ updatedAt: "desc" });

        // Expect sorted by updatedAt descending
        expect(fruits).toBeDefined();
        expect(fruits[0].id).toBe("fruitId3");
        expect(fruits[2].id).toBe("fruitId1");
    });
});
