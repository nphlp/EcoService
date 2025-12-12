import { os } from "@orpc/server";
import "server-only";
import { fruitCreate } from "./fruit-action";
import { fruitCreateInputSchema, fruitOutputSchema } from "./fruit-schema";

export const create = os
    .route({
        method: "POST",
        path: "/fruits",
        summary: "FRUIT Create",
        description: "Permission: authenticated",
    })
    .input(fruitCreateInputSchema)
    .output(fruitOutputSchema)
    .handler(async ({ input }) => {
        const [error, data] = await fruitCreate(input);
        if (error) throw error;
        return data;
    });

const fruitMutations = {
    create,
};

export default fruitMutations;
