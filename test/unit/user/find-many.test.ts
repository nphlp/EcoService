import { User } from "@prisma/client/client";
import { oRPC_bypass_http as oRPC } from "@test/mocks/orpc";
import { setMockSession } from "@test/mocks/session";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Node Modules mocks
vi.mock("server-only", async () => import("@test/mocks/modules/server-only"));
vi.mock("next/cache", async () => import("@test/mocks/modules/next-cache"));
vi.mock("@lib/auth-server", async () => import("@test/mocks/modules/auth-server"));

// PrismaInstance mock
vi.mock("@lib/prisma", () => {
    const data: User[] = [
        {
            id: "adminId",
            name: "Admin",
            lastname: "Debug",
            email: "admin@test.com",
            emailVerified: true,
            image: null,
            role: "ADMIN",
            createdAt: new Date(),
            updatedAt: new Date(),
            phone: null,
            stripeId: null,
            stripeConnectId: null,
            isOnboarded: false,
            isSeller: false,
        },
        {
            id: "vendorId",
            name: "Vendor",
            lastname: "Debug",
            email: "vendor@test.com",
            emailVerified: true,
            image: null,
            role: "VENDOR",
            createdAt: new Date(),
            updatedAt: new Date(),
            phone: null,
            stripeId: null,
            stripeConnectId: null,
            isOnboarded: false,
            isSeller: false,
        },
        {
            id: "employeeId",
            name: "Employee",
            lastname: "Debug",
            email: "employee@test.com",
            emailVerified: true,
            image: null,
            role: "EMPLOYEE",
            createdAt: new Date(),
            updatedAt: new Date(),
            phone: null,
            stripeId: null,
            stripeConnectId: null,
            isOnboarded: false,
            isSeller: false,
        },
    ];

    const findMany = async ({ take, skip }: { take?: number; skip?: number }) => {
        const start = skip ?? 0;
        const end = take ? start + take : undefined;

        return data.slice(start, end);
    };

    return {
        default: {
            user: { findMany },
        },
    };
});

/**
 * Test `/users` endpoint permissions
 */
const oRpcUserFindMany = oRPC.user.findMany;

describe("GET /users (permissions)", () => {
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
        await expect(oRpcUserFindMany()).rejects.toThrow();
    });

    it("Role employee", async () => {
        // Set employee session
        setMockSession("EMPLOYEE");

        // Expect unauthorized error (not admin)
        await expect(oRpcUserFindMany()).rejects.toThrow();
    });

    it("Role vendor", async () => {
        // Set vendor session
        setMockSession("VENDOR");

        // Expect unauthorized error (not admin)
        await expect(oRpcUserFindMany()).rejects.toThrow();
    });

    it("Role admin", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const users = await oRpcUserFindMany();

        // Expect array of user objects
        expect(users).toBeDefined();
        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBe(3);
    });
});

describe("GET /users (params)", () => {
    it("Take 2", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const users = await oRpcUserFindMany({ take: 2 });

        // Expect array of user objects
        expect(users).toBeDefined();
        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBe(2);

        // Expect first two users
        expect(users[0].id).toBe("adminId");
        expect(users[1].id).toBe("vendorId");
    });

    it("Skip 1", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const users = await oRpcUserFindMany({ skip: 1 });

        // Expect array of user objects
        expect(users).toBeDefined();
        expect(Array.isArray(users)).toBe(true);
        expect(users.length).toBe(2);

        // Expect users after skipping first
        expect(users[0].id).toBe("vendorId");
        expect(users[1].id).toBe("employeeId");
    });
});
