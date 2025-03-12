import {
    SelectVerificationAmountProps,
    SelectVerificationListProps,
    SelectVerificationProps,
} from "@actions/types/Verification";
import { verificationIdSchema } from "@actions/zod/Verification";
import { strictObject, z, ZodType } from "zod";

export const selectVerificationUniqueSchema: ZodType<SelectVerificationProps> = strictObject({
    where: strictObject({
        id: verificationIdSchema,
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }),
    select: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});

export const selectVerificationListSchema: ZodType<SelectVerificationListProps> = strictObject({
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

export const selectVerificationAmountSchema: ZodType<SelectVerificationAmountProps> = strictObject({
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});
