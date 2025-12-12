"use server";

import PrismaInstance from "@lib/prisma";
import { os } from "@orpc/server";
import { revalidatePath, revalidateTag } from "next/cache";
import { tag } from "@/api/cache";
import { requiresSession } from "../permission";
import { fruitCreateInputSchema, fruitOutputSchema } from "./fruit-schema";

export const fruitCreate = os
    .input(fruitCreateInputSchema)
    .output(fruitOutputSchema)
    .use(requiresSession)
    .handler(async ({ input, context }) => {
        const { session } = context;

        // Create the fruit
        const fruit = await PrismaInstance.fruit.create({
            data: {
                name: input.name,
                description: input.description,
                userId: session.user.id,
            },
        });

        // Update cache
        revalidateTag(tag("fruit"), { expire: 0 });
        revalidateTag(tag("fruit", "findMany"), { expire: 0 });

        // Provided invalidation
        input.updateTags?.map((t) => revalidateTag(t, { expire: 0 }));
        // Provided revalidation with stale
        input.revalidateTags?.map((t) => revalidateTag(t, "max"));
        // Provided path refresh
        input.revalidatePaths?.map((p) => revalidatePath(p));

        return fruit;
    })
    .actionable();
