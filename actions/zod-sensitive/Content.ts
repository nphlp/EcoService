import {
    SelectContentAmountProps,
    SelectContentListProps,
    SelectContentProps,
} from "@actions/types/Content";
import { contentIdSchema } from "@actions/zod/Content";
import { strictObject, z, ZodType } from "zod";

export const selectContentUniqueSchema: ZodType<SelectContentProps> = strictObject({
    where: strictObject({
        id: contentIdSchema,
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }),
    select: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});

export const selectContentListSchema: ZodType<SelectContentListProps> = strictObject({
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

export const selectContentAmountSchema: ZodType<SelectContentAmountProps> = strictObject({
    where: strictObject({
        // TODO: choose allowed filters for select request
        // WARNING: this schema protect request from frontend
    }).optional(),
});
