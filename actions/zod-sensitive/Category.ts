import {
    SelectCategoryAmountProps,
    SelectCategoryListProps,
    SelectCategoryProps,
} from "@actions/types/Category";
import { categoryIdSchema } from "@actions/zod/Category";
import { strictObject, z, ZodType } from "zod";

export const selectCategoryUniqueSchema: ZodType<SelectCategoryProps> = strictObject({
    where: strictObject({
        id: categoryIdSchema,
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }),
    select: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});

export const selectCategoryListSchema: ZodType<SelectCategoryListProps> = strictObject({
    orderBy: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
        name: z.enum(["asc", "desc"]),
    }).optional(),
    take: z.number().min(1).max(100).optional(),
    skip: z.number().min(0).optional(),
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});

export const selectCategoryAmountSchema: ZodType<SelectCategoryAmountProps> = strictObject({
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});
