import { CategoryCommon, CategoryId, CategoryTimestamps, CategoryUpdate } from "@actions/types/Category";
import { CategoryModel } from "@actions/zod-generated";
import { strictObject, z, ZodString, ZodType } from "zod";

export const categoryIdSchema: ZodString = z.string().nanoid();

export const categoryIdObjectSchema: ZodType<CategoryId> = strictObject({
    id: z.string().nanoid(),
});

export const categoryCommonSchema: ZodType<CategoryCommon> = CategoryModel.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const categoryTimestampsSchema: ZodType<CategoryTimestamps> = strictObject({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const categoryUpdateSchema: ZodType<CategoryUpdate> = strictObject({
    id: categoryIdSchema,
    data: categoryCommonSchema,
});
