import {
    SelectOrderAmountProps,
    SelectOrderListProps,
    SelectOrderProps,
} from "@actions/types/Order";
import { orderIdSchema } from "@actions/zod/Order";
import { strictObject, z, ZodType } from "zod";

export const selectOrderUniqueSchema: ZodType<SelectOrderProps> = strictObject({
    where: strictObject({
        id: orderIdSchema,
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }),
    select: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});

export const selectOrderListSchema: ZodType<SelectOrderListProps> = strictObject({
    orderBy: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
    take: z.number().min(1).max(100).optional(),
    skip: z.number().min(0).optional(),
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});

export const selectOrderAmountSchema: ZodType<SelectOrderAmountProps> = strictObject({
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});
