import { Basket } from "@prisma/client/client";
import { oRPC_bypass_http as oRPC } from "@test/mocks/orpc";
import { describe, expect, it, vi } from "vitest";

// Node Modules mocks
vi.mock("server-only", async () => import("@test/mocks/modules/server-only"));
vi.mock("next/cache", async () => import("@test/mocks/modules/next-cache"));
vi.mock("@lib/auth-server", async () => import("@test/mocks/modules/auth-server"));

// PrismaInstance mock
vi.mock("@lib/prisma", () => {
    type BasketWithQuantities = Basket & {
        Quantity: {
            id: string;
            quantity: number;
            fruitId: string;
            Fruit: { id: string; name: string; description: string };
        }[];
    };

    const data: BasketWithQuantities[] = [
        {
            id: "basketId1",
            userId: "userId",
            createdAt: new Date("2024-01-03"),
            updatedAt: new Date("2024-01-03"),
            Quantity: [
                {
                    id: "quantityId1",
                    quantity: 2,
                    fruitId: "fruitId1",
                    Fruit: { id: "fruitId1", name: "Apple", description: "A red fruit" },
                },
                {
                    id: "quantityId2",
                    quantity: 3,
                    fruitId: "fruitId2",
                    Fruit: { id: "fruitId2", name: "Banana", description: "A yellow fruit" },
                },
            ],
        },
        {
            id: "basketId2",
            userId: "userId",
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-01"),
            Quantity: [
                {
                    id: "quantityId3",
                    quantity: 1,
                    fruitId: "fruitId3",
                    Fruit: { id: "fruitId3", name: "Cherry", description: "A small red fruit" },
                },
            ],
        },
        {
            id: "basketId3",
            userId: "adminId",
            createdAt: new Date("2024-01-02"),
            updatedAt: new Date("2024-01-02"),
            Quantity: [],
        },
    ];

    const findMany = async ({
        where,
        orderBy,
    }: {
        where?: { userId?: string };
        orderBy?: { createdAt?: "asc" | "desc" };
        include?: object;
    }) => {
        let result = [...data];

        // Filter by userId
        if (where?.userId) {
            result = result.filter((basket) => basket.userId === where.userId);
        }

        // Sort by createdAt
        if (orderBy?.createdAt) {
            result.sort((a, b) =>
                orderBy.createdAt === "asc"
                    ? a.createdAt.getTime() - b.createdAt.getTime()
                    : b.createdAt.getTime() - a.createdAt.getTime(),
            );
        }

        return result;
    };

    return {
        default: {
            basket: { findMany },
        },
    };
});

/**
 * Test `GET /baskets/user/{userId}` endpoint (public)
 */
const oRpcBasketFindManyByUser = oRPC.basket.findManyByUser;

describe("GET /baskets/user/{userId} (public)", () => {
    it("Returns baskets for user", async () => {
        // Execute function
        const baskets = await oRpcBasketFindManyByUser({ userId: "userId" });

        // Expect array of basket objects
        expect(baskets).toBeDefined();
        expect(Array.isArray(baskets)).toBe(true);
        expect(baskets.length).toBe(2);
        expect(baskets.every((b) => b.userId === "userId")).toBe(true);
    });

    it("Returns baskets for admin", async () => {
        // Execute function
        const baskets = await oRpcBasketFindManyByUser({ userId: "adminId" });

        // Expect array of basket objects
        expect(baskets).toBeDefined();
        expect(baskets.length).toBe(1);
        expect(baskets[0].userId).toBe("adminId");
    });

    it("Returns empty array for user without baskets", async () => {
        // Execute function
        const baskets = await oRpcBasketFindManyByUser({ userId: "vendorId" });

        // Expect empty array
        expect(baskets).toBeDefined();
        expect(baskets.length).toBe(0);
    });
});

describe("GET /baskets/user/{userId} (params)", () => {
    it("Returns baskets ordered by createdAt desc", async () => {
        // Execute function
        const baskets = await oRpcBasketFindManyByUser({ userId: "userId" });

        // Expect sorted by createdAt descending (most recent first)
        expect(baskets).toBeDefined();
        expect(baskets[0].id).toBe("basketId1");
        expect(baskets[1].id).toBe("basketId2");
    });

    it("Returns baskets with Quantity relation", async () => {
        // Execute function
        const baskets = await oRpcBasketFindManyByUser({ userId: "userId" });

        // Expect Quantity array
        expect(baskets[0].Quantity).toBeDefined();
        expect(Array.isArray(baskets[0].Quantity)).toBe(true);
        expect(baskets[0].Quantity.length).toBe(2);
    });

    it("Returns Quantity with Fruit relation", async () => {
        // Execute function
        const baskets = await oRpcBasketFindManyByUser({ userId: "userId" });

        // Expect Fruit in Quantity
        const quantity = baskets[0].Quantity[0];
        expect(quantity.Fruit).toBeDefined();
        expect(quantity.Fruit.id).toBe("fruitId1");
        expect(quantity.Fruit.name).toBe("Apple");
        expect(quantity.Fruit.description).toBe("A red fruit");
    });

    it("Returns basket with empty Quantity array", async () => {
        // Execute function
        const baskets = await oRpcBasketFindManyByUser({ userId: "adminId" });

        // Expect empty Quantity array
        expect(baskets[0].Quantity).toBeDefined();
        expect(baskets[0].Quantity.length).toBe(0);
    });

    it("Returns correct quantity values", async () => {
        // Execute function
        const baskets = await oRpcBasketFindManyByUser({ userId: "userId" });

        // Expect correct quantity values
        expect(baskets[0].Quantity[0].quantity).toBe(2);
        expect(baskets[0].Quantity[1].quantity).toBe(3);
        expect(baskets[1].Quantity[0].quantity).toBe(1);
    });
});
