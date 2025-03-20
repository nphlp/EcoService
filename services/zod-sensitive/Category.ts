import { CountCategoryProps, FindManyCategoryProps, FindUniqueCategoryProps } from "@class/CategoryClass";
import { strictObject, z, ZodType } from "zod";

export const selectCategoryUniqueSchema: ZodType<FindUniqueCategoryProps> = strictObject({
    where: strictObject({
        id: z.string().nanoid(),
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }),
    select: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});

export const selectCategoryListSchema: ZodType<FindManyCategoryProps> = strictObject({
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

export const selectCategoryAmountSchema: ZodType<CountCategoryProps> = strictObject({
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});
