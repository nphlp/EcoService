import { ProductCommon, ProductId, ProductTimestamps, ProductUpdate } from "@actions/types/Product";
import { ProductModel } from "@actions/zod-generated";
import { strictObject, z, ZodString, ZodType } from "zod";

export const productIdSchema: ZodString = z.string().nanoid();

export const productIdObjectSchema: ZodType<ProductId> = strictObject({
    id: z.string().nanoid(),
});

export const productCommonSchema: ZodType<ProductCommon> = ProductModel.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const productTimestampsSchema: ZodType<ProductTimestamps> = strictObject({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const productUpdateSchema: ZodType<ProductUpdate> = strictObject({
    id: productIdSchema,
    data: productCommonSchema,
});
