import { Fruit } from "@prisma/client/client";
import { oRPC_bypass_http as oRPC } from "@test/mocks/orpc";
import { setMockSession } from "@test/mocks/session";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Node Modules mocks
vi.mock("server-only", async () => import("@test/mocks/modules/server-only"));
vi.mock("next/cache", async () => import("@test/mocks/modules/next-cache"));
vi.mock("@lib/auth-server", async () => import("@test/mocks/modules/auth-server"));

// PrismaInstance mock
vi.mock("@lib/prisma", () => {
    const create = async ({ data: input }: { data: { name: string; description: string; userId: string } }) => {
        const newFruit: Fruit = {
            id: "newFruitId",
            name: input.name,
            description: input.description,
            userId: input.userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        return newFruit;
    };

    return {
        default: {
            fruit: { create },
        },
    };
});

/**
 * Test `POST /fruits` endpoint permissions
 */
const oRpcFruitCreate = oRPC.fruit.create;

describe("POST /fruits (permissions)", () => {
    /**
     * Reset session before each test
     */
    beforeEach(() => {
        setMockSession(null);
    });

    it("Role visitor", async () => {
        // Set no session (visitor)
        setMockSession(null);

        // Expect unauthorized error (not logged in)
        await expect(
            oRpcFruitCreate({ name: "Orange", description: "A citrus fruit with vitamin C" }),
        ).rejects.toThrow();
    });

    it("Role user", async () => {
        // Set user session
        setMockSession("USER");

        // Execute function
        const fruit = await oRpcFruitCreate({ name: "Orange", description: "A citrus fruit with vitamin C" });

        // Expect fruit object
        expect(fruit).toBeDefined();
        expect(fruit.name).toBe("Orange");
        expect(fruit.userId).toBe("userId");
    });

    it("Role vendor", async () => {
        // Set vendor session
        setMockSession("VENDOR");

        // Execute function
        const fruit = await oRpcFruitCreate({ name: "Mango", description: "A tropical fruit from Asia" });

        // Expect fruit object
        expect(fruit).toBeDefined();
        expect(fruit.name).toBe("Mango");
        expect(fruit.userId).toBe("vendorId");
    });

    it("Role admin", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const fruit = await oRpcFruitCreate({ name: "Kiwi", description: "A small fuzzy fruit from New Zealand" });

        // Expect fruit object
        expect(fruit).toBeDefined();
        expect(fruit.name).toBe("Kiwi");
        expect(fruit.userId).toBe("adminId");
    });
});

describe("POST /fruits (params)", () => {
    it("Create with name and description", async () => {
        // Set user session
        setMockSession("USER");

        // Execute function
        const fruit = await oRpcFruitCreate({
            name: "Strawberry",
            description: "A red berry with seeds on the outside",
        });

        // Expect fruit object with all fields
        expect(fruit).toBeDefined();
        expect(fruit.id).toBe("newFruitId");
        expect(fruit.name).toBe("Strawberry");
        expect(fruit.description).toBe("A red berry with seeds on the outside");
        expect(fruit.userId).toBe("userId");
        expect(fruit.createdAt).toBeDefined();
        expect(fruit.updatedAt).toBeDefined();
    });

    it("UserId is auto-assigned from session", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const fruit = await oRpcFruitCreate({
            name: "Pineapple",
            description: "A tropical fruit with spiky skin",
        });

        // Expect userId to be adminId (from session)
        expect(fruit.userId).toBe("adminId");
    });
});
