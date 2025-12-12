import { os } from "@orpc/server";
import "server-only";
import { userCreate, userDeleting, userUpdate } from "./user-action";
import { userCreateInputSchema, userDeleteInputSchema, userOutputSchema, userUpdateInputSchema } from "./user-schema";

export const create = os
    .route({
        method: "POST",
        path: "/users",
        summary: "USER Create",
        description: "Permission: admin",
    })
    .input(userCreateInputSchema)
    .output(userOutputSchema)
    .handler(async ({ input }) => {
        const [error, data] = await userCreate(input);
        if (error) throw error;
        return data;
    });

export const update = os
    .route({
        method: "PUT",
        path: "/users/{id}",
        summary: "USER Update",
        description: "Permission: owner | admin",
    })
    .input(userUpdateInputSchema)
    .output(userOutputSchema)
    .handler(async ({ input }) => {
        const [error, data] = await userUpdate(input);
        if (error) throw error;
        return data;
    });

export const deleting = os
    .route({
        method: "DELETE",
        path: "/users/{id}",
        summary: "USER Delete",
        description: "Permission: admin",
    })
    .input(userDeleteInputSchema)
    .output(userOutputSchema)
    .handler(async ({ input }) => {
        const [error, data] = await userDeleting(input);
        if (error) throw error;
        return data;
    });

const userMutations = {
    create,
    update,
    delete: deleting,
};

export default userMutations;
