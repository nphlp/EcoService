import { Category, Prisma } from "@prisma/client";
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

/** Find many options for categories */
export type SelectCategoryListProps = Pick<
    Prisma.CategoryFindManyArgs,
    "orderBy" | "take" | "skip" | "where"
>;

/** Count options for categories */
export type SelectCategoryAmountProps = Pick<Prisma.CategoryCountArgs, "where">;

// ===================== //
// ==== Zod Schemas ==== //
// ===================== //

export const categoryIdSchema: ZodString = z.string().nanoid();

export const categoryIdObjectSchema: ZodType<CategoryId> = z.object({
    id: z.string().nanoid(),
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

export const selectCategoryListSchema: ZodType<SelectCategoryListProps> =
    z.object({
        orderBy: z.object({
            name: z.enum(["asc", "desc"]),
        }).optional(),
        take: z.number().min(1).max(100).optional(),
        skip: z.number().min(0).optional(),
        where: z.object({
            name: z.string(),
        }).optional(),
    });

export const selectCategoryAmountSchema: ZodType<SelectCategoryAmountProps> = z.object({
    where: z
        .object({
            // Types to validate
        })
        .optional(),
});
