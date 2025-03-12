import {
    SelectAddressAmountProps,
    SelectAddressListProps,
    SelectAddressProps,
} from "@actions/types/Address";
import { addressIdSchema } from "@actions/zod/Address";
import { strictObject, z, ZodType } from "zod";

export const selectAddressUniqueSchema: ZodType<SelectAddressProps> = strictObject({
    where: strictObject({
        id: addressIdSchema,
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }),
    select: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});

export const selectAddressListSchema: ZodType<SelectAddressListProps> = strictObject({
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

export const selectAddressAmountSchema: ZodType<SelectAddressAmountProps> = strictObject({
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});
