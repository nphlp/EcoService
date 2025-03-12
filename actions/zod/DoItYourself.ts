import { DoItYourselfCommon, DoItYourselfId, DoItYourselfTimestamps, DoItYourselfUpdate } from "@actions/types/DoItYourself";
import { DoItYourselfModel } from "@actions/zod-generated";
import { strictObject, z, ZodString, ZodType } from "zod";

export const doItYourselfIdSchema: ZodString = z.string().nanoid();

export const doItYourselfIdObjectSchema: ZodType<DoItYourselfId> = strictObject({
    id: z.string().nanoid(),
});

export const doItYourselfCommonSchema: ZodType<DoItYourselfCommon> = DoItYourselfModel.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const doItYourselfTimestampsSchema: ZodType<DoItYourselfTimestamps> = strictObject({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const doItYourselfUpdateSchema: ZodType<DoItYourselfUpdate> = strictObject({
    id: doItYourselfIdSchema,
    data: doItYourselfCommonSchema,
});
