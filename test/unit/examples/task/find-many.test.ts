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
        {
            id: "taskId4",
            title: "Another User Task",
            status: "TODO" as Status,
            userId: "userId",
            createdAt: new Date("2024-01-04"),
            updatedAt: new Date("2024-01-04"),
        },
    ];

    const findMany = async ({
        take,
        skip,
        orderBy,
        where,
    }: {
        take?: number;
        skip?: number;
        orderBy?: { updatedAt?: "asc" | "desc" };
        where?: { title?: { contains?: string }; userId?: string };
    }) => {
        let result = [...data];

        // Filter by userId
        if (where?.userId) {
            result = result.filter((task) => task.userId === where.userId);
        }

        // Filter by search
        if (where?.title?.contains) {
            const search = where.title.contains.toLowerCase();
            result = result.filter((task) => task.title.toLowerCase().includes(search));
        }

        // Sort
        if (orderBy?.updatedAt) {
            result.sort((a, b) =>
                orderBy.updatedAt === "asc"
                    ? a.updatedAt.getTime() - b.updatedAt.getTime()
                    : b.updatedAt.getTime() - a.updatedAt.getTime(),
            );
        }

        // Pagination
        const start = skip ?? 0;
        const end = take ? start + take : undefined;
        result = result.slice(start, end);

        return result;
    };

    return {
        default: {
            task: { findMany },
        },
    };
});

/**
 * Test `GET /tasks` endpoint permissions
 */
const oRpcTaskFindMany = oRPC.task.findMany;

describe("GET /tasks (permissions)", () => {
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
        await expect(oRpcTaskFindMany()).rejects.toThrow();
    });

    it("Role user -> own tasks only", async () => {
        // Set user session
        setMockSession("USER");

        // Execute function
        const tasks = await oRpcTaskFindMany();

        // Expect only user's own tasks
        expect(tasks).toBeDefined();
        expect(tasks.length).toBe(2);
        expect(tasks.every((t) => t.userId === "userId")).toBe(true);
    });

    it("Role vendor -> own tasks only", async () => {
        // Set vendor session
        setMockSession("VENDOR");

        // Execute function
        const tasks = await oRpcTaskFindMany();

        // Expect only vendor's own tasks
        expect(tasks).toBeDefined();
        expect(tasks.length).toBe(1);
        expect(tasks[0].userId).toBe("vendorId");
    });

    it("Role admin -> all tasks", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const tasks = await oRpcTaskFindMany();

        // Expect all tasks (no userId filter)
        expect(tasks).toBeDefined();
        expect(tasks.length).toBe(4);
    });

    it("Role admin -> filter by userId", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function with userId filter
        const tasks = await oRpcTaskFindMany({ userId: "userId" });

        // Expect only user's tasks
        expect(tasks).toBeDefined();
        expect(tasks.length).toBe(2);
        expect(tasks.every((t) => t.userId === "userId")).toBe(true);
    });

    it("Role user -> userId filter ignored", async () => {
        // Set user session
        setMockSession("USER");

        // Execute function with userId filter (should be ignored)
        const tasks = await oRpcTaskFindMany({ userId: "adminId" });

        // Expect only user's own tasks (filter ignored)
        expect(tasks).toBeDefined();
        expect(tasks.length).toBe(2);
        expect(tasks.every((t) => t.userId === "userId")).toBe(true);
    });
});

describe("GET /tasks (params)", () => {
    it("Search by title", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const tasks = await oRpcTaskFindMany({ search: "Admin" });

        // Expect filtered results
        expect(tasks).toBeDefined();
        expect(tasks.length).toBe(1);
        expect(tasks[0].title).toBe("Admin Task");
    });

    it("Search by partial title", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const tasks = await oRpcTaskFindMany({ search: "Task" });

        // Expect all tasks containing "Task"
        expect(tasks).toBeDefined();
        expect(tasks.length).toBe(4);
    });

    it("Take 2", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const tasks = await oRpcTaskFindMany({ take: 2 });

        // Expect 2 tasks
        expect(tasks).toBeDefined();
        expect(tasks.length).toBe(2);
    });

    it("Skip 1", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const tasks = await oRpcTaskFindMany({ skip: 1 });

        // Expect 3 tasks (skipped first)
        expect(tasks).toBeDefined();
        expect(tasks.length).toBe(3);
    });

    it("Order by updatedAt asc", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const tasks = await oRpcTaskFindMany({ updatedAt: "asc" });

        // Expect sorted by updatedAt ascending
        expect(tasks).toBeDefined();
        expect(tasks[0].id).toBe("taskId1");
        expect(tasks[3].id).toBe("taskId4");
    });

    it("Order by updatedAt desc", async () => {
        // Set admin session
        setMockSession("ADMIN");

        // Execute function
        const tasks = await oRpcTaskFindMany({ updatedAt: "desc" });

        // Expect sorted by updatedAt descending
        expect(tasks).toBeDefined();
        expect(tasks[0].id).toBe("taskId4");
        expect(tasks[3].id).toBe("taskId1");
    });
});
