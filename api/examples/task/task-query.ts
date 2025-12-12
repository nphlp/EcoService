import { os } from "@orpc/server";
import { Prisma } from "@prisma/client/client";
import { notFound, unauthorized } from "next/navigation";
import "server-only";
import { z } from "zod";
import { tag } from "@/api/cache";
import { requiresSession } from "../permission";
import { taskFindFirstCached, taskFindManyCached, taskFindUniqueCached } from "./task-cached";
import { taskOutputSchema } from "./task-schema";

const findMany = os
    .route({
        method: "GET",
        path: "/tasks",
        summary: "TASK Find Many",
        description: "Permission: owner | admin",
    })
    .input(
        z
            .object({
                // Search
                search: z.string().optional().describe("Search term to filter tasks by title"),
                // Filtering
                userId: z.string().optional().describe("Filter by user ID (admin right)"),
                // Sorting
                updatedAt: z.enum(Prisma.SortOrder).optional().describe("Sort order for updatedAt"),
                // Pagination
                take: z.number().min(1).max(1000).optional().describe("Number of tasks to take"),
                skip: z.number().min(0).optional().describe("Number of tasks to skip"),
                // Cache tags
                cacheTags: z.array(z.string()).optional().describe("Array of cache tags"),
            })
            .optional(),
    )
    .output(z.array(taskOutputSchema))
    .use(requiresSession)
    .handler(async ({ input, context }) => {
        const { session, isAdmin } = context;

        // Admin can filter by userId, User can only see their own tasks
        const userIdFilter = isAdmin ? input?.userId : session.user.id;

        // Get task list
        const tasks = await taskFindManyCached(
            {
                take: input?.take,
                skip: input?.skip,
                orderBy: { updatedAt: input?.updatedAt },
                where: {
                    title: { contains: input?.search },
                    userId: userIdFilter,
                },
            },
            [
                // Default cache tags
                tag("task"),
                tag("task", "findMany"),
                tag("task", "findMany", userIdFilter),
                tag("task", "findMany", input),
                // Provided cache tags
                ...(input?.cacheTags ?? []),
            ],
        );

        return tasks;
    });

const findUnique = os
    .route({
        method: "GET",
        path: "/tasks/{id}",
        summary: "TASK Find Unique",
        description: "Permission: owner | admin",
    })
    .input(
        z.object({
            id: z.string().describe("Task ID"),
            // Cache tags
            cacheTags: z.array(z.string()).optional().describe("Array of cache tags"),
        }),
    )
    .output(taskOutputSchema.nullable())
    .use(requiresSession)
    .handler(async ({ input, context }) => {
        const { isOwnerOrAdmin } = context;

        // Check if task exists
        const task = await taskFindUniqueCached({ where: { id: input.id } }, [
            // Default cache tags
            tag("task"),
            tag("task", "findUnique"),
            tag("task", "findUnique", input.id),
            tag("task", "findUnique", input),
            // Provided cache tags
            ...(input?.cacheTags ?? []),
        ]);

        // If task not found, return 404
        if (!task) notFound();

        // Check if user session is authorized to access this task
        if (!isOwnerOrAdmin(task.userId)) unauthorized();

        return task;
    });

const findFirst = os
    .route({
        method: "GET",
        path: "/tasks/first",
        summary: "TASK Find First",
        description: "Permission: owner | admin",
    })
    .input(
        z.object({
            title: z.string().describe("Task title"),
            // Cache tags
            cacheTags: z.array(z.string()).optional().describe("Array of cache tags"),
        }),
    )
    .output(taskOutputSchema.nullable())
    .use(requiresSession)
    .handler(async ({ input, context }) => {
        const { isOwnerOrAdmin } = context;

        // Check if task exists
        const task = await taskFindFirstCached({ where: { title: input.title } }, [
            // Default cache tags
            tag("task"),
            tag("task", "findFirst"),
            tag("task", "findFirst", input),
            // Provided cache tags
            ...(input?.cacheTags ?? []),
        ]);

        // If task not found, return 404
        if (!task) notFound();

        // Check if user session is authorized to access this task
        if (!isOwnerOrAdmin(task.userId)) unauthorized();

        return task;
    });

export const taskQueries = {
    findMany,
    findUnique,
    findFirst,
};

export default taskQueries;
