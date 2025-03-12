import { QuantityCommon, QuantityId, QuantityTimestamps, QuantityUpdate } from "@actions/types/Quantity";
import { QuantityModel } from "@actions/zod-generated";
import { strictObject, z, ZodString, ZodType } from "zod";

export const quantityIdSchema: ZodString = z.string().nanoid();

export const quantityIdObjectSchema: ZodType<QuantityId> = strictObject({
    id: z.string().nanoid(),
});

export const quantityCommonSchema: ZodType<QuantityCommon> = QuantityModel.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const quantityTimestampsSchema: ZodType<QuantityTimestamps> = strictObject({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const quantityUpdateSchema: ZodType<QuantityUpdate> = strictObject({
    id: quantityIdSchema,
    data: quantityCommonSchema,
});
