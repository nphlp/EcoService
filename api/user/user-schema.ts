import { $Enums, User } from "@prisma/client/client";
import "server-only";
import { ZodType, z } from "zod";

const userCreateInputSchema = z.object({
    name: z.string().min(1, "Name is required").describe("Firstname"),
    lastname: z.string().optional().describe("Lastname"),
    email: z.string().describe("Email address"),
    image: z.string().optional().describe("Profile image URL"),
    role: z.enum($Enums.Role).optional().describe("User role: ADMIN, USER (default)"),
    updateTags: z.array(z.string()).optional().describe("Array of update tags"),
    revalidateTags: z.array(z.string()).optional().describe("Array of revalidation tags"),
    revalidatePaths: z.array(z.string()).optional().describe("Array of revalidation paths"),
});

const userUpdateInputSchema = z.object({
    id: z.string().describe("User ID"),
    name: z.string().min(1, "Name is required").optional().describe("Firstname"),
    lastname: z.string().nullable().optional().describe("Lastname"),
    image: z.string().nullable().optional().describe("Profile image URL"),
    role: z.enum($Enums.Role).optional().describe("User role: ADMIN, USER"),
    updateTags: z.array(z.string()).optional().describe("Array of update tags"),
    revalidateTags: z.array(z.string()).optional().describe("Array of revalidation tags"),
    revalidatePaths: z.array(z.string()).optional().describe("Array of revalidation paths"),
});

const userDeleteInputSchema = z.object({
    id: z.string().describe("User ID"),
    updateTags: z.array(z.string()).optional().describe("Array of update tags"),
    revalidateTags: z.array(z.string()).optional().describe("Array of revalidation tags"),
    revalidatePaths: z.array(z.string()).optional().describe("Array of revalidation paths"),
});

const userOutputSchema: ZodType<User> = z.object({
    id: z.string().describe("Unique ID of the user (nanoid)"),
    name: z.string().describe("Firstname of the user"),
    lastname: z.string().nullable().describe("Lastname of the user"),
    email: z.string().describe("Email address"),
    emailVerified: z.boolean().describe("Email verification status (boolean)"),
    image: z.string().nullable().describe("Profile image URL"),
    role: z.enum($Enums.Role).describe("User role: ADMIN, USER (default)"),
    createdAt: z.date().describe("Creation date"),
    updatedAt: z.date().describe("Last update date"),
});

export {
    // Input schema
    userCreateInputSchema,
    userUpdateInputSchema,
    userDeleteInputSchema,
    // Output schema
    userOutputSchema,
};
