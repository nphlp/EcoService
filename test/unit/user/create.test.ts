import { Role, User } from "@prisma/client/client";
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
        },
        {
            id: "managerId",
            name: "Manager",
            lastname: "Debug",
            email: "manager@test.com",
            emailVerified: true,
            image: null,
            role: "MANAGER",
            createdAt: new Date(),
            updatedAt: new Date(),
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
        },
    ];

    const findUnique = async ({ where }: { where: { id?: string; email?: string } }) => {
        if (where.id) return data.find((user) => user.id === where.id) ?? null;
        if (where.email) return data.find((user) => user.email === where.email) ?? null;
        return null;
    };

    const create = async ({
        data: input,
    }: {
        data: { name: string; lastname?: string; email: string; emailVerified: boolean; image?: string; role?: string };
    }) => {
        const newUser: User = {
            id: "newUserId",
            name: input.name,
            lastname: input.lastname ?? null,
            email: input.email,
            emailVerified: input.emailVerified,
            image: input.image ?? null,
            role: (input.role ?? "EMPLOYEE") as Role,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        data.push(newUser);

        return newUser;
    };

    return {
        default: {
            user: { findUnique, create },
        },
    };
});

/**
 * Test `POST /users` endpoint permissions
 */
const oRpcUserCreate = oRPC.user.create;

describe("POST /users (permissions)", () => {
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
        await expect(oRpcUserCreate({ name: "New", email: "new@test.com" })).rejects.toThrow();
    });

    it("Role employee", async () => {
        // Set employee session
        setMockSession("EMPLOYEE");

        // Expect unauthorized error (not admin)
        await expect(oRpcUserCreate({ name: "New", email: "new@test.com" })).rejects.toThrow();
    });

    it("Role manager", async () => {
        // Set manager session
        setMockSession("MANAGER");

        // Expect unauthorized error (not admin)
        await expect(oRpcUserCreate({ name: "New", email: "new@test.com" })).rejects.toThrow();
    });

    it("Role admin", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const user = await oRpcUserCreate({ name: "New", email: "new@test.com" });

        // Expect user object
        expect(user).toBeDefined();
        expect(user.name).toBe("New");
        expect(user.email).toBe("new@test.com");
    });
});

describe("POST /users (params)", () => {
    it("Email already exists", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Expect error (email already exists)
        await expect(oRpcUserCreate({ name: "Duplicate", email: "admin@test.com" })).rejects.toThrow();
    });

    it("Create with minimal data", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const user = await oRpcUserCreate({ name: "Minimal", email: "minimal@test.com" });

        // Expect user object with defaults
        expect(user).toBeDefined();
        expect(user.name).toBe("Minimal");
        expect(user.email).toBe("minimal@test.com");
        expect(user.lastname).toBeNull();
        expect(user.image).toBeNull();
        expect(user.role).toBe("EMPLOYEE");
        expect(user.emailVerified).toBe(false);
    });

    it("Create with full data", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const user = await oRpcUserCreate({
            name: "Full",
            lastname: "Data",
            email: "full@test.com",
            image: "https://example.com/image.jpg",
            role: "MANAGER",
        });

        // Expect user object with all fields
        expect(user).toBeDefined();
        expect(user.name).toBe("Full");
        expect(user.lastname).toBe("Data");
        expect(user.email).toBe("full@test.com");
        expect(user.image).toBe("https://example.com/image.jpg");
        expect(user.role).toBe("MANAGER");
        expect(user.emailVerified).toBe(false);
    });

    it("Create admin user", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const user = await oRpcUserCreate({
            name: "NewAdmin",
            email: "newadmin@test.com",
            role: "ADMIN",
        });

        // Expect admin user object
        expect(user).toBeDefined();
        expect(user.name).toBe("NewAdmin");
        expect(user.role).toBe("ADMIN");
    });
});
