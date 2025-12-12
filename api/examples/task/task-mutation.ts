import { os } from "@orpc/server";
import "server-only";
import { taskCreate, taskDeleting, taskUpdate } from "./task-action";
import { taskCreateInputSchema, taskDeleteInputSchema, taskOutputSchema, taskUpdateInputSchema } from "./task-schema";

export const create = os
    .route({
        method: "POST",
        path: "/tasks",
        summary: "TASK Create",
        description: "Permission: authenticated",
    })
    .input(taskCreateInputSchema)
    .output(taskOutputSchema)
    .handler(async ({ input }) => {
        const [error, data] = await taskCreate(input);
        if (error) throw error;
        return data;
    });

export const update = os
    .route({
        method: "PUT",
        path: "/tasks/{id}",
        summary: "TASK Update",
        description: "Permission: owner | admin",
    })
    .input(taskUpdateInputSchema)
    .output(taskOutputSchema)
    .handler(async ({ input }) => {
        const [error, data] = await taskUpdate(input);
        if (error) throw error;
        return data;
    });

export const deleting = os
    .route({
        method: "DELETE",
        path: "/tasks/{id}",
        summary: "TASK Delete",
        description: "Permission: owner | admin",
    })
    .input(taskDeleteInputSchema)
    .output(taskOutputSchema)
    .handler(async ({ input }) => {
        const [error, data] = await taskDeleting(input);
        if (error) throw error;
        return data;
    });

const taskMutations = {
    create,
    update,
    delete: deleting,
};

export default taskMutations;
