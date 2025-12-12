"use server";

import PrismaInstance from "@lib/prisma";
import { os } from "@orpc/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { notFound, unauthorized } from "next/navigation";
import { tag } from "@/api/cache";
import { requiresSession } from "../permission";
import { taskCreateInputSchema, taskDeleteInputSchema, taskOutputSchema, taskUpdateInputSchema } from "./task-schema";

export const taskCreate = os
    .input(taskCreateInputSchema)
    .output(taskOutputSchema)
    .use(requiresSession)
    .handler(async ({ input, context }) => {
        const { session, isAdmin } = context;

        // Admin can create tasks for any user, User creates for themselves
        const userIdOwner = isAdmin ? (input.userId ?? session.user.id) : session.user.id;

        // Create the task
        const task = await PrismaInstance.task.create({
            data: {
                title: input.title,
                status: input.status,
                userId: userIdOwner,
            },
        });

        // Update cache
        revalidateTag(tag("task", "findMany"), { expire: 0 });
        revalidateTag(tag("task", "findMany", userIdOwner), { expire: 0 });

        // Provided invalidation
        input.updateTags?.map((t) => revalidateTag(t, { expire: 0 }));
        // Provided revalidation with stale
        input.revalidateTags?.map((t) => revalidateTag(t, "max"));
        // Provided path refresh
        input.revalidatePaths?.map((p) => revalidatePath(p));

        return task;
    })
    .actionable();

export const taskUpdate = os
    .input(taskUpdateInputSchema)
    .output(taskOutputSchema)
    .use(requiresSession)
    .handler(async ({ input, context }) => {
        const { isOwnerOrAdmin } = context;

        // Check if task exists
        const taskExists = await PrismaInstance.task.findUnique({ where: { id: input.id } });
        if (!taskExists) notFound();

        // Check if user session is authorized to mutate this task
        if (!isOwnerOrAdmin(taskExists.userId)) unauthorized();

        // Update the task
        const task = await PrismaInstance.task.update({
            data: {
                title: input.title,
                status: input.status,
            },
            where: { id: input.id },
        });

        // Update cache
        revalidateTag(tag("task", "findMany"), { expire: 0 });
        revalidateTag(tag("task", "findMany", taskExists.userId), { expire: 0 });
        revalidateTag(tag("task", "findUnique", input.id), { expire: 0 });

        // Provided invalidation
        input.updateTags?.map((t) => revalidateTag(t, { expire: 0 }));
        // Provided revalidation with stale
        input.revalidateTags?.map((t) => revalidateTag(t, "max"));
        // Provided path refresh
        input.revalidatePaths?.map((p) => revalidatePath(p));

        return task;
    })
    .actionable();

export const taskDeleting = os
    .input(taskDeleteInputSchema)
    .output(taskOutputSchema)
    .use(requiresSession)
    .handler(async ({ input, context }) => {
        const { isOwnerOrAdmin } = context;

        // Check if task exists
        const taskExists = await PrismaInstance.task.findUnique({ where: { id: input.id } });
        if (!taskExists) notFound();

        // Check if user session is authorized to delete this task
        if (!isOwnerOrAdmin(taskExists.userId)) unauthorized();

        // Delete the task
        const task = await PrismaInstance.task.delete({ where: { id: input.id } });

        // Update cache
        revalidateTag(tag("task", "findMany"), { expire: 0 });
        revalidateTag(tag("task", "findMany", taskExists.userId), { expire: 0 });
        revalidateTag(tag("task", "findUnique", input.id), { expire: 0 });

        // Provided invalidation
        input.updateTags?.map((t) => revalidateTag(t, { expire: 0 }));
        // Provided revalidation with stale
        input.revalidateTags?.map((t) => revalidateTag(t, "max"));
        // Provided path refresh
        input.revalidatePaths?.map((p) => revalidatePath(p));

        return task;
    })
    .actionable();
