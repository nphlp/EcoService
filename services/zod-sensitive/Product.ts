import { CountProductProps, FindManyProductProps, FindUniqueProductProps } from "@services/types";
import { strictObject, z, ZodType } from "zod";

export const selectProductUniqueSchema: ZodType<FindUniqueProductProps> = strictObject({
    where: strictObject({
        id: z.string().nanoid(),
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
        name: z.string().optional(),
    }),
    select: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});

export const selectProductListSchema: ZodType<FindManyProductProps> = strictObject({
    orderBy: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
        price: z.enum(["asc", "desc"]),
    }).optional(),
    take: z.number().min(1).max(100).optional(),
    skip: z.number().min(0).optional(),
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
        categoryId: z.string().optional(),
        name: strictObject({
                contains: z.string(),
            })
            .optional(),
    }).optional(),
});

export const selectProductAmountSchema: ZodType<CountProductProps> = strictObject({
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
        categoryId: z.string().optional(),
        name: strictObject({
                contains: z.string(),
            })
            .optional(),
    }).optional(),
});
