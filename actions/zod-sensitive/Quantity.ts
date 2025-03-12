import {
    SelectQuantityAmountProps,
    SelectQuantityListProps,
    SelectQuantityProps,
} from "@actions/types/Quantity";
import { quantityIdSchema } from "@actions/zod/Quantity";
import { strictObject, z, ZodType } from "zod";

export const selectQuantityUniqueSchema: ZodType<SelectQuantityProps> = strictObject({
    where: strictObject({
        id: quantityIdSchema,
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }),
    select: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});

export const selectQuantityListSchema: ZodType<SelectQuantityListProps> = strictObject({
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

export const selectQuantityAmountSchema: ZodType<SelectQuantityAmountProps> = strictObject({
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});
