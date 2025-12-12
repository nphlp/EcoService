import { $Enums, Task } from "@prisma/client/client";
import z, { ZodType } from "zod";

const taskCreateInputSchema = z.object({
    title: z.string().min(1, "Title is required").describe("Task title"),
    status: z
        .enum($Enums.Status)
        .optional()
        .default("TODO")
        .describe("Task status : TODO (default), IN_PROGRESS, DONE"),
    userId: z.string().optional().describe("User ID owner of the task (admin right)"),
    updateTags: z.array(z.string()).optional().describe("Array of update tags"),
    revalidateTags: z.array(z.string()).optional().describe("Array of revalidation tags"),
    revalidatePaths: z.array(z.string()).optional().describe("Array of revalidation paths"),
});

const taskUpdateInputSchema = z.object({
    id: z.string().describe("Task ID"),
    title: z.string().min(1, "Title cannot be empty").optional().describe("Task title"),
    status: z.enum($Enums.Status).optional().describe("Task status"),
    updateTags: z.array(z.string()).optional().describe("Array of update tags"),
    revalidateTags: z.array(z.string()).optional().describe("Array of revalidation tags"),
    revalidatePaths: z.array(z.string()).optional().describe("Array of revalidation paths"),
});

const taskDeleteInputSchema = z.object({
    id: z.string().describe("Task ID"),
    updateTags: z.array(z.string()).optional().describe("Array of update tags"),
    revalidateTags: z.array(z.string()).optional().describe("Array of revalidation tags"),
    revalidatePaths: z.array(z.string()).optional().describe("Array of revalidation paths"),
});

const taskOutputSchema: ZodType<Task> = z.object({
    id: z.string().describe("Unique ID of the task (nanoid)"),
    title: z.string().describe("Title of the task"),
    status: z.enum($Enums.Status).describe("Status of the task: TODO, IN_PROGRESS, DONE"),
    userId: z.string().describe("Unique ID of the user who owns the task"),
    createdAt: z.date().describe("Creation date"),
    updatedAt: z.date().describe("Last update date"),
});

export {
    // Input schema
    taskCreateInputSchema,
    taskUpdateInputSchema,
    taskDeleteInputSchema,
    // Output schema
    taskOutputSchema,
};
