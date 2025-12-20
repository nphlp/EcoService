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

    const update = async ({
        data: input,
        where,
    }: {
        data: { title?: string; status?: Status };
        where: { id: string };
    }) => {
        const task = data.find((t) => t.id === where.id);
        if (!task) return null;

        const updatedTask: Task = {
            ...task,
            title: input.title ?? task.title,
            status: input.status ?? task.status,
            updatedAt: new Date(),
        };

        return updatedTask;
    };

    return {
        default: {
            task: { findUnique, update },
        },
    };
});

/**
 * Test `PUT /tasks/{id}` endpoint permissions
 */
const oRpcTaskUpdate = oRPC.task.update;

describe("PUT /tasks/{id} (permissions)", () => {
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
        await expect(oRpcTaskUpdate({ id: "taskId1", title: "Updated" })).rejects.toThrow();
    });

    it("Role user -> own task", async () => {
        // Set user session
        setMockSession("USER");

        // Execute function (user updating own task)
        const task = await oRpcTaskUpdate({ id: "taskId1", title: "Updated User Task" });

        // Expect updated task object
        expect(task).toBeDefined();
        expect(task.id).toBe("taskId1");
        expect(task.title).toBe("Updated User Task");
    });

    it("Role user -> other task", async () => {
        // Set user session
        setMockSession("USER");

        // Expect unauthorized error (not owner or admin)
        await expect(oRpcTaskUpdate({ id: "taskId2", title: "Updated" })).rejects.toThrow();
    });

    it("Role vendor -> own task", async () => {
        // Set vendor session
        setMockSession("VENDOR");

        // Execute function (vendor updating own task)
        const task = await oRpcTaskUpdate({ id: "taskId3", title: "Updated Vendor Task" });

        // Expect updated task object
        expect(task).toBeDefined();
        expect(task.id).toBe("taskId3");
        expect(task.title).toBe("Updated Vendor Task");
    });

    it("Role vendor -> other task", async () => {
        // Set vendor session
        setMockSession("VENDOR");

        // Expect unauthorized error (not owner or admin)
        await expect(oRpcTaskUpdate({ id: "taskId1", title: "Updated" })).rejects.toThrow();
    });

    it("Role admin -> own task", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function (admin updating own task)
        const task = await oRpcTaskUpdate({ id: "taskId2", title: "Updated Admin Task" });

        // Expect updated task object
        expect(task).toBeDefined();
        expect(task.id).toBe("taskId2");
        expect(task.title).toBe("Updated Admin Task");
    });

    it("Role admin -> other task", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function (admin updating other user's task)
        const task = await oRpcTaskUpdate({ id: "taskId1", title: "Admin Updated This" });

        // Expect updated task object
        expect(task).toBeDefined();
        expect(task.id).toBe("taskId1");
        expect(task.title).toBe("Admin Updated This");
    });
});

describe("PUT /tasks/{id} (params)", () => {
    it("Task not found", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Expect not found error
        await expect(oRpcTaskUpdate({ id: "nonExistentId", title: "Updated" })).rejects.toThrow();
    });

    it("Update title only", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const task = await oRpcTaskUpdate({ id: "taskId1", title: "New Title" });

        // Expect only title to be updated
        expect(task).toBeDefined();
        expect(task.title).toBe("New Title");
        expect(task.status).toBe("TODO");
    });

    it("Update status only", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const task = await oRpcTaskUpdate({ id: "taskId1", status: "IN_PROGRESS" });

        // Expect only status to be updated
        expect(task).toBeDefined();
        expect(task.title).toBe("User Task");
        expect(task.status).toBe("IN_PROGRESS");
    });

    it("Update title and status", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const task = await oRpcTaskUpdate({ id: "taskId1", title: "Completed Task", status: "DONE" });

        // Expect both to be updated
        expect(task).toBeDefined();
        expect(task.title).toBe("Completed Task");
        expect(task.status).toBe("DONE");
    });
});
