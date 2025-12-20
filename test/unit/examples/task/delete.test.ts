import { Status, Task } from "@prisma/client/client";
import { oRPC_bypass_http as oRPC } from "@test/mocks/orpc";
import { setMockSession } from "@test/mocks/session";
import { beforeEach, describe, expect, it, vi } from "vitest";

// Node Modules mocks
vi.mock("server-only", async () => import("@test/mocks/modules/server-only"));
vi.mock("next/cache", async () => import("@test/mocks/modules/next-cache"));
vi.mock("@lib/auth-server", async () => import("@test/mocks/modules/auth-server"));

// PrismaInstance mock
const createInitialData = (): Task[] => [
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

let data: Task[] = createInitialData();

// Reset data before each test
beforeEach(() => {
    data = createInitialData();
});

vi.mock("@lib/prisma", () => {
    const findUnique = async ({ where }: { where: { id: string } }) => {
        return data.find((task) => task.id === where.id) ?? null;
    };

    const deleting = async ({ where }: { where: { id: string } }) => {
        const index = data.findIndex((t) => t.id === where.id);
        if (index === -1) return null;

        const deletedTask = data[index];
        data.splice(index, 1);

        return deletedTask;
    };

    return {
        default: {
            task: { findUnique, delete: deleting },
        },
    };
});

/**
 * Test `DELETE /tasks/{id}` endpoint permissions
 */
const oRpcTaskDelete = oRPC.task.delete;

describe("DELETE /tasks/{id} (permissions)", () => {
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
        await expect(oRpcTaskDelete({ id: "taskId1" })).rejects.toThrow();
    });

    it("Role user -> own task", async () => {
        // Set user session
        setMockSession("USER");

        // Execute function (user deleting own task)
        const task = await oRpcTaskDelete({ id: "taskId1" });

        // Expect deleted task object
        expect(task).toBeDefined();
        expect(task.id).toBe("taskId1");
    });

    it("Role user -> other task", async () => {
        // Set user session
        setMockSession("USER");

        // Expect unauthorized error (not owner or admin)
        await expect(oRpcTaskDelete({ id: "taskId2" })).rejects.toThrow();
    });

    it("Role vendor -> own task", async () => {
        // Set vendor session
        setMockSession("VENDOR");

        // Execute function (vendor deleting own task)
        const task = await oRpcTaskDelete({ id: "taskId3" });

        // Expect deleted task object
        expect(task).toBeDefined();
        expect(task.id).toBe("taskId3");
    });

    it("Role vendor -> other task", async () => {
        // Set vendor session
        setMockSession("VENDOR");

        // Expect unauthorized error (not owner or admin)
        await expect(oRpcTaskDelete({ id: "taskId1" })).rejects.toThrow();
    });

    it("Role admin -> own task", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function (admin deleting own task)
        const task = await oRpcTaskDelete({ id: "taskId2" });

        // Expect deleted task object
        expect(task).toBeDefined();
        expect(task.id).toBe("taskId2");
    });

    it("Role admin -> other task", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function (admin deleting other user's task)
        const task = await oRpcTaskDelete({ id: "taskId1" });

        // Expect deleted task object (admin can delete any task)
        expect(task).toBeDefined();
        expect(task.id).toBe("taskId1");
    });
});

describe("DELETE /tasks/{id} (params)", () => {
    it("Task not found", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Expect not found error
        await expect(oRpcTaskDelete({ id: "nonExistentId" })).rejects.toThrow();
    });

    it("Delete user task", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const task = await oRpcTaskDelete({ id: "taskId1" });

        // Expect deleted task object
        expect(task).toBeDefined();
        expect(task.id).toBe("taskId1");
        expect(task.title).toBe("User Task");
        expect(task.userId).toBe("userId");
    });

    it("Delete vendor task", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const task = await oRpcTaskDelete({ id: "taskId3" });

        // Expect deleted task object
        expect(task).toBeDefined();
        expect(task.id).toBe("taskId3");
        expect(task.title).toBe("Vendor Task");
        expect(task.userId).toBe("vendorId");
    });
});
