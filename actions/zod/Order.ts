import { OrderCommon, OrderId, OrderTimestamps, OrderUpdate } from "@actions/types/Order";
import { OrderModel } from "@actions/zod-generated";
import { strictObject, z, ZodString, ZodType } from "zod";

export const orderIdSchema: ZodString = z.string().nanoid();

export const orderIdObjectSchema: ZodType<OrderId> = strictObject({
    id: z.string().nanoid(),
});

export const orderCommonSchema: ZodType<OrderCommon> = OrderModel.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const orderTimestampsSchema: ZodType<OrderTimestamps> = strictObject({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const orderUpdateSchema: ZodType<OrderUpdate> = strictObject({
    id: orderIdSchema,
    data: orderCommonSchema,
});
