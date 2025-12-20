import { Fruit } from "@prisma/client/client";
import { oRPC_bypass_http as oRPC } from "@test/mocks/orpc";
import { describe, expect, it, vi } from "vitest";

// Node Modules mocks
vi.mock("server-only", async () => import("@test/mocks/modules/server-only"));
vi.mock("next/cache", async () => import("@test/mocks/modules/next-cache"));
vi.mock("@lib/auth-server", async () => import("@test/mocks/modules/auth-server"));

// PrismaInstance mock
vi.mock("@lib/prisma", () => {
    type FruitWithUser = Fruit & {
        User: { id: string; name: string; lastname: string | null; email: string };
    };

    const users = [
        { id: "userId", name: "User", lastname: "Debug", email: "user@test.com" },
        { id: "adminId", name: "Admin", lastname: "Debug", email: "admin@test.com" },
        { id: "vendorId", name: "Vendor", lastname: "Debug", email: "vendor@test.com" },
    ];

    const data: FruitWithUser[] = [
        {
            id: "fruitId1",
            name: "Apple",
            description: "A red fruit",
            userId: "userId",
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-01"),
            User: users[0],
        },
        {
            id: "fruitId2",
            name: "Banana",
            description: "A yellow fruit",
            userId: "adminId",
            createdAt: new Date("2024-01-02"),
            updatedAt: new Date("2024-01-02"),
            User: users[1],
        },
        {
            id: "fruitId3",
            name: "Cherry",
            description: "A small red fruit",
            userId: "vendorId",
            createdAt: new Date("2024-01-03"),
            updatedAt: new Date("2024-01-03"),
            User: users[2],
        },
    ];

    const findUnique = async ({ where }: { where: { id: string }; include?: object }) => {
        return data.find((fruit) => fruit.id === where.id) ?? null;
    };

    return {
        default: {
            fruit: { findUnique },
        },
    };
});

/**
 * Test `GET /fruit/{id}` endpoint (public)
 */
const oRpcFruitFindUnique = oRPC.fruit.findUnique;

describe("GET /fruit/{id} (public)", () => {
    it("Returns fruit by id", async () => {
        // Execute function
        const fruit = await oRpcFruitFindUnique({ id: "fruitId1" });

        // Expect fruit object
        expect(fruit).toBeDefined();
        expect(fruit?.id).toBe("fruitId1");
        expect(fruit?.name).toBe("Apple");
    });

    it("Returns null for non-existent id", async () => {
        // Execute function
        const fruit = await oRpcFruitFindUnique({ id: "nonExistentId" });

        // Expect null
        expect(fruit).toBeNull();
    });
});

describe("GET /fruit/{id} (params)", () => {
    it("Returns fruit with User relation", async () => {
        // Execute function
        const fruit = await oRpcFruitFindUnique({ id: "fruitId1" });

        // Expect fruit with User
        expect(fruit).toBeDefined();
        expect(fruit?.User).toBeDefined();
        expect(fruit?.User.id).toBe("userId");
        expect(fruit?.User.name).toBe("User");
        expect(fruit?.User.email).toBe("user@test.com");
    });

    it("Get Apple", async () => {
        // Execute function
        const fruit = await oRpcFruitFindUnique({ id: "fruitId1" });

        // Expect Apple fruit
        expect(fruit).toBeDefined();
        expect(fruit?.name).toBe("Apple");
        expect(fruit?.description).toBe("A red fruit");
        expect(fruit?.userId).toBe("userId");
    });

    it("Get Banana", async () => {
        // Execute function
        const fruit = await oRpcFruitFindUnique({ id: "fruitId2" });

        // Expect Banana fruit
        expect(fruit).toBeDefined();
        expect(fruit?.name).toBe("Banana");
        expect(fruit?.description).toBe("A yellow fruit");
        expect(fruit?.userId).toBe("adminId");
    });

    it("Get Cherry", async () => {
        // Execute function
        const fruit = await oRpcFruitFindUnique({ id: "fruitId3" });

        // Expect Cherry fruit
        expect(fruit).toBeDefined();
        expect(fruit?.name).toBe("Cherry");
        expect(fruit?.description).toBe("A small red fruit");
        expect(fruit?.userId).toBe("vendorId");
    });
});
