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
    const create = async ({ data: input }: { data: { title: string; status?: Status; userId: string } }) => {
        const newTask: Task = {
            id: "newTaskId",
            title: input.title,
            status: input.status ?? "TODO",
            userId: input.userId,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        return newTask;
    };

    return {
        default: {
            task: { create },
        },
    };
});

/**
 * Test `POST /tasks` endpoint permissions
 */
const oRpcTaskCreate = oRPC.task.create;

describe("POST /tasks (permissions)", () => {
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
        await expect(oRpcTaskCreate({ title: "New Task" })).rejects.toThrow();
    });

    it("Role user", async () => {
        // Set user session
        setMockSession("USER");

        // Execute function
        const task = await oRpcTaskCreate({ title: "User New Task" });

        // Expect task object
        expect(task).toBeDefined();
        expect(task.title).toBe("User New Task");
        expect(task.userId).toBe("userId");
    });

    it("Role vendor", async () => {
        // Set vendor session
        setMockSession("VENDOR");

        // Execute function
        const task = await oRpcTaskCreate({ title: "Vendor New Task" });

        // Expect task object
        expect(task).toBeDefined();
        expect(task.title).toBe("Vendor New Task");
        expect(task.userId).toBe("vendorId");
    });

    it("Role admin", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const task = await oRpcTaskCreate({ title: "Admin New Task" });

        // Expect task object
        expect(task).toBeDefined();
        expect(task.title).toBe("Admin New Task");
        expect(task.userId).toBe("adminId");
    });
});

describe("POST /tasks (params)", () => {
    it("Create with title only (default status TODO)", async () => {
        // Set user session
        setMockSession("USER");

        // Execute function
        const task = await oRpcTaskCreate({ title: "Simple Task" });

        // Expect task with default status
        expect(task).toBeDefined();
        expect(task.title).toBe("Simple Task");
        expect(task.status).toBe("TODO");
    });

    it("Create with title and status IN_PROGRESS", async () => {
        // Set user session
        setMockSession("USER");

        // Execute function
        const task = await oRpcTaskCreate({ title: "In Progress Task", status: "IN_PROGRESS" });

        // Expect task with specified status
        expect(task).toBeDefined();
        expect(task.title).toBe("In Progress Task");
        expect(task.status).toBe("IN_PROGRESS");
    });

    it("Create with title and status DONE", async () => {
        // Set user session
        setMockSession("USER");

        // Execute function
        const task = await oRpcTaskCreate({ title: "Done Task", status: "DONE" });

        // Expect task with specified status
        expect(task).toBeDefined();
        expect(task.title).toBe("Done Task");
        expect(task.status).toBe("DONE");
    });

    it("Admin can specify userId", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function with userId
        const task = await oRpcTaskCreate({ title: "Task for User", userId: "userId" });

        // Expect task with specified userId
        expect(task).toBeDefined();
        expect(task.title).toBe("Task for User");
        expect(task.userId).toBe("userId");
    });

    it("User cannot specify userId (ignored)", async () => {
        // Set user session
        setMockSession("USER");

        // Execute function with userId (should be ignored)
        const task = await oRpcTaskCreate({ title: "My Task", userId: "adminId" });

        // Expect task with session userId (not the specified one)
        expect(task).toBeDefined();
        expect(task.userId).toBe("userId");
    });

    it("Vendor cannot specify userId (ignored)", async () => {
        // Set vendor session
        setMockSession("VENDOR");

        // Execute function with userId (should be ignored)
        const task = await oRpcTaskCreate({ title: "My Task", userId: "adminId" });

        // Expect task with session userId (not the specified one)
        expect(task).toBeDefined();
        expect(task.userId).toBe("vendorId");
    });
});
