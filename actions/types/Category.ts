import { Category } from "@prisma/client";
import { z, ZodString, ZodType } from "zod";

// ======================== //
// ==== Category Types ==== //
// ======================== //

/** Represents a complete category entity */
export type CategoryType = Category;

/** Represents the category's unique identifier */
export type CategoryId = Pick<Category, "id">;

/** Represents common category properties without system-managed fields */
export type CategoryCommon = Omit<Category, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a category */
export type CategoryUpdate = {
  id: Category["id"];
  data: CategoryCommon;
};

/** Represents system-managed timestamp fields */
export type CategoryTimestamps = Pick<Category, "createdAt" | "updatedAt">;

// ===================== //
// ==== Zod Schemas ==== //
// ===================== //

export const categoryIdSchema: ZodString = z.string();

export const categoryIdObjectSchema: ZodType<CategoryId> = z.object({
  id: z.string(),
});

export const categoryCommonSchema: ZodType<CategoryCommon> = z.object({
  name: z.string(),
  description: z.string(),
});

export const categoryTimestampsSchema: ZodType<CategoryTimestamps> = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const categoryUpdateSchema: ZodType<CategoryUpdate> = z.object({
  id: categoryIdSchema,
  data: categoryCommonSchema,
});
