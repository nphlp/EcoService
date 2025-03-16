import { SelectProductAmountProps, SelectProductListProps, SelectProductProps } from "@actions/types/Product";
import { productIdSchema } from "@actions/zod/Product";
import { strictObject, z, ZodType } from "zod";

export const selectProductUniqueSchema: ZodType<SelectProductProps> = strictObject({
    where: strictObject({
        id: productIdSchema.optional(),
        name: z.string().optional(),
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).required().refine(
        (data) => data.id !== undefined || data.name !== undefined,
        { message: "At least one of the fields 'id' or 'name' must be provided" }
    ),
    select: strictObject({
        id: z.boolean().optional(),
        name: z.boolean().optional(),
        description: z.boolean().optional(),
        image: z.boolean().optional(),
        price: z.boolean().optional(),
        stock: z.boolean().optional(),
        Vendor: strictObject({
            select: strictObject({
                name: z.boolean().optional(),
            }),
        }).optional(),
        Category: strictObject({
            select: strictObject({
                name: z.boolean().optional(),
            }),
        }).optional(),
    }).optional(),
});

export const selectProductListSchema: ZodType<SelectProductListProps> = strictObject({
    orderBy: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
        price: z.enum(["asc", "desc"]).optional(),
        createdAt: z.enum(["asc", "desc"]).optional(),
    }).optional(),
    take: z.number().min(1).max(100).optional(),
    skip: z.number().min(0).optional(),
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
        categoryId: z.string().optional(),
        name: strictObject({
            contains: z.string(),
        }).optional(),
    }).optional(),
});

export const selectProductAmountSchema: ZodType<SelectProductAmountProps> = strictObject({
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
        categoryId: z.string().optional(),
        name: strictObject({
            contains: z.string(),
        }).optional(),
    }).optional(),
});
