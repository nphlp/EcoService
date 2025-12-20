import { Status, Task } from "@prisma/client/client";
import { oRPC_bypass_http as oRPC } from "@test/mocks/orpc";
import { setMockSession } from "@test/mocks/session";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Node Modules mocks
vi.mock("server-only", async () => import("@test/mocks/modules/server-only"));
vi.mock("next/cache", async () => import("@test/mocks/modules/next-cache"));
vi.mock("@lib/auth-server", async () => import("@test/mocks/modules/auth-server"));

// PrismaInstance mock
vi.mock("@lib/prisma", () => {
    const data: Task[] = [
        {
            id: "taskId1",
            title: "User Task",
            status: "TODO" as Status,
            userId: "userId",
            createdAt: new Date("2024-01-01"),
            updatedAt: new Date("2024-01-01"),
        },
        {
            id: "taskId2",
            title: "Admin Task",
            status: "DONE" as Status,
            userId: "adminId",
            createdAt: new Date("2024-01-02"),
            updatedAt: new Date("2024-01-02"),
        },
        {
            id: "taskId3",
            title: "Vendor Task",
            status: "IN_PROGRESS" as Status,
            userId: "vendorId",
            createdAt: new Date("2024-01-03"),
            updatedAt: new Date("2024-01-03"),
        },
    ];

    const findUnique = async ({ where }: { where: { id: string } }) => {
        return data.find((task) => task.id === where.id) ?? null;
    };

    return {
        default: {
            task: { findUnique },
        },
    };
});

/**
 * Test `GET /tasks/{id}` endpoint permissions
 */
const oRpcTaskFindUnique = oRPC.task.findUnique;

describe("GET /tasks/{id} (permissions)", () => {
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
        await expect(oRpcTaskFindUnique({ id: "taskId1" })).rejects.toThrow();
    });

    it("Role user -> own task", async () => {
        // Set user session
        setMockSession("USER");

        // Execute function (user accessing own task)
        const task = await oRpcTaskFindUnique({ id: "taskId1" });

        // Expect task object
        expect(task).toBeDefined();
        expect(task?.id).toBe("taskId1");
        expect(task?.userId).toBe("userId");
    });

    it("Role user -> other task", async () => {
        // Set user session
        setMockSession("USER");

        // Expect unauthorized error (not owner or admin)
        await expect(oRpcTaskFindUnique({ id: "taskId2" })).rejects.toThrow();
    });

    it("Role vendor -> own task", async () => {
        // Set vendor session
        setMockSession("VENDOR");

        // Execute function (vendor accessing own task)
        const task = await oRpcTaskFindUnique({ id: "taskId3" });

        // Expect task object
        expect(task).toBeDefined();
        expect(task?.id).toBe("taskId3");
        expect(task?.userId).toBe("vendorId");
    });

    it("Role vendor -> other task", async () => {
        // Set vendor session
        setMockSession("VENDOR");

        // Expect unauthorized error (not owner or admin)
        await expect(oRpcTaskFindUnique({ id: "taskId1" })).rejects.toThrow();
    });

    it("Role admin -> own task", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function (admin accessing own task)
        const task = await oRpcTaskFindUnique({ id: "taskId2" });

        // Expect task object
        expect(task).toBeDefined();
        expect(task?.id).toBe("taskId2");
        expect(task?.userId).toBe("adminId");
    });

    it("Role admin -> other task", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function (admin accessing other user's task)
        const task = await oRpcTaskFindUnique({ id: "taskId1" });

        // Expect task object (admin can access any task)
        expect(task).toBeDefined();
        expect(task?.id).toBe("taskId1");
        expect(task?.userId).toBe("userId");
    });
});

describe("GET /tasks/{id} (params)", () => {
    it("Task not found", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Expect not found error
        await expect(oRpcTaskFindUnique({ id: "nonExistentId" })).rejects.toThrow();
    });

    it("Get user task", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const task = await oRpcTaskFindUnique({ id: "taskId1" });

        // Expect task object
        expect(task).toBeDefined();
        expect(task?.id).toBe("taskId1");
        expect(task?.title).toBe("User Task");
        expect(task?.status).toBe("TODO");
    });

    it("Get admin task", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const task = await oRpcTaskFindUnique({ id: "taskId2" });

        // Expect task object
        expect(task).toBeDefined();
        expect(task?.id).toBe("taskId2");
        expect(task?.title).toBe("Admin Task");
        expect(task?.status).toBe("DONE");
    });

    it("Get vendor task", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const task = await oRpcTaskFindUnique({ id: "taskId3" });

        // Expect task object
        expect(task).toBeDefined();
        expect(task?.id).toBe("taskId3");
        expect(task?.title).toBe("Vendor Task");
        expect(task?.status).toBe("IN_PROGRESS");
    });
});
