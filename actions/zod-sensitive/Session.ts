import {
    SelectSessionAmountProps,
    SelectSessionListProps,
    SelectSessionProps,
} from "@actions/types/Session";
import { sessionIdSchema } from "@actions/zod/Session";
import { strictObject, z, ZodType } from "zod";

export const selectSessionUniqueSchema: ZodType<SelectSessionProps> = strictObject({
    where: strictObject({
        id: sessionIdSchema,
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }),
    select: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});

export const selectSessionListSchema: ZodType<SelectSessionListProps> = strictObject({
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

export const selectSessionAmountSchema: ZodType<SelectSessionAmountProps> = strictObject({
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});
