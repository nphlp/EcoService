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

    const findFirst = async ({ where }: { where: { title: string } }) => {
        return data.find((task) => task.title === where.title) ?? null;
    };

    return {
        default: {
            task: { findFirst },
        },
    };
});

/**
 * Test `GET /tasks/first` endpoint permissions
 */
const oRpcTaskFindFirst = oRPC.task.findFirst;

describe("GET /tasks/first (permissions)", () => {
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
        await expect(oRpcTaskFindFirst({ title: "User Task" })).rejects.toThrow();
    });

    it("Role user -> own task", async () => {
        // Set user session
        setMockSession("USER");

        // Execute function (user searching for own task)
        const task = await oRpcTaskFindFirst({ title: "User Task" });

        // Expect task object
        expect(task).toBeDefined();
        expect(task?.id).toBe("taskId1");
        expect(task?.userId).toBe("userId");
    });

    it("Role user -> other task", async () => {
        // Set user session
        setMockSession("USER");

        // Expect unauthorized error (not owner or admin)
        await expect(oRpcTaskFindFirst({ title: "Admin Task" })).rejects.toThrow();
    });

    it("Role vendor -> own task", async () => {
        // Set vendor session
        setMockSession("VENDOR");

        // Execute function (vendor searching for own task)
        const task = await oRpcTaskFindFirst({ title: "Vendor Task" });

        // Expect task object
        expect(task).toBeDefined();
        expect(task?.id).toBe("taskId3");
        expect(task?.userId).toBe("vendorId");
    });

    it("Role vendor -> other task", async () => {
        // Set vendor session
        setMockSession("VENDOR");

        // Expect unauthorized error (not owner or admin)
        await expect(oRpcTaskFindFirst({ title: "User Task" })).rejects.toThrow();
    });

    it("Role admin -> own task", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function (admin searching for own task)
        const task = await oRpcTaskFindFirst({ title: "Admin Task" });

        // Expect task object
        expect(task).toBeDefined();
        expect(task?.id).toBe("taskId2");
        expect(task?.userId).toBe("adminId");
    });

    it("Role admin -> other task", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function (admin searching for other user's task)
        const task = await oRpcTaskFindFirst({ title: "User Task" });

        // Expect task object (admin can access any task)
        expect(task).toBeDefined();
        expect(task?.id).toBe("taskId1");
        expect(task?.userId).toBe("userId");
    });
});

describe("GET /tasks/first (params)", () => {
    it("Task not found", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Expect not found error
        await expect(oRpcTaskFindFirst({ title: "Non Existent Task" })).rejects.toThrow();
    });

    it("Find User Task", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const task = await oRpcTaskFindFirst({ title: "User Task" });

        // Expect task object
        expect(task).toBeDefined();
        expect(task?.id).toBe("taskId1");
        expect(task?.title).toBe("User Task");
        expect(task?.status).toBe("TODO");
    });

    it("Find Admin Task", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const task = await oRpcTaskFindFirst({ title: "Admin Task" });

        // Expect task object
        expect(task).toBeDefined();
        expect(task?.id).toBe("taskId2");
        expect(task?.title).toBe("Admin Task");
        expect(task?.status).toBe("DONE");
    });

    it("Find Vendor Task", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const task = await oRpcTaskFindFirst({ title: "Vendor Task" });

        // Expect task object
        expect(task).toBeDefined();
        expect(task?.id).toBe("taskId3");
        expect(task?.title).toBe("Vendor Task");
        expect(task?.status).toBe("IN_PROGRESS");
    });
});
