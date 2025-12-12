import { Fruit } from "@prisma/client/client";
import z, { ZodType } from "zod";

const fruitOutputSchema: ZodType<Fruit> = z.object({
    id: z.string().describe("Unique ID of the fruit (nanoid)"),
    name: z.string().describe("Name of the fruit"),
    description: z.string().describe("Description of the fruit"),
    userId: z.string().describe("ID of the user who created the fruit"),
    createdAt: z.date().describe("Creation date"),
    updatedAt: z.date().describe("Last update date"),
});

const fruitWithUserOutputSchema = z.object({
    id: z.string().describe("Unique ID of the fruit (nanoid)"),
    name: z.string().describe("Name of the fruit"),
    description: z.string().describe("Description of the fruit"),
    userId: z.string().describe("ID of the user who created the fruit"),
    createdAt: z.date().describe("Creation date"),
    updatedAt: z.date().describe("Last update date"),
    User: z.object({
        id: z.string().describe("User ID"),
        name: z.string().describe("User name"),
        lastname: z.string().nullable().describe("User lastname"),
        email: z.string().describe("User email"),
    }),
});

const fruitCreateInputSchema = z.object({
    name: z
        .string()
        .min(2, "Le nom doit contenir au moins 2 caractères")
        .max(50, "Le nom ne peut pas dépasser 50 caractères")
        .describe("Name of the fruit"),
    description: z
        .string()
        .min(10, "La description doit contenir au moins 10 caractères")
        .max(500, "La description ne peut pas dépasser 500 caractères")
        .describe("Description of the fruit"),
    updateTags: z.array(z.string()).optional().describe("Array of update tags"),
    revalidateTags: z.array(z.string()).optional().describe("Array of revalidation tags"),
    revalidatePaths: z.array(z.string()).optional().describe("Array of revalidation paths"),
});

export {
    // Input schema
    fruitCreateInputSchema,
    // Output schema
    fruitOutputSchema,
    fruitWithUserOutputSchema,
};
