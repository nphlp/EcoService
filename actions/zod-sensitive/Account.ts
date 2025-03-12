import {
    SelectAccountAmountProps,
    SelectAccountListProps,
    SelectAccountProps,
} from "@actions/types/Account";
import { accountIdSchema } from "@actions/zod/Account";
import { strictObject, z, ZodType } from "zod";

export const selectAccountUniqueSchema: ZodType<SelectAccountProps> = strictObject({
    where: strictObject({
        id: accountIdSchema,
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }),
    select: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});

export const selectAccountListSchema: ZodType<SelectAccountListProps> = strictObject({
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

export const selectAccountAmountSchema: ZodType<SelectAccountAmountProps> = strictObject({
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});
