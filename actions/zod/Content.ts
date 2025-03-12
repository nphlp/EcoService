import { ContentCommon, ContentId, ContentTimestamps, ContentUpdate } from "@actions/types/Content";
import { ContentModel } from "@actions/zod-generated";
import { strictObject, z, ZodString, ZodType } from "zod";

export const contentIdSchema: ZodString = z.string().nanoid();

export const contentIdObjectSchema: ZodType<ContentId> = strictObject({
    id: z.string().nanoid(),
});

export const contentCommonSchema: ZodType<ContentCommon> = ContentModel.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const contentTimestampsSchema: ZodType<ContentTimestamps> = strictObject({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const contentUpdateSchema: ZodType<ContentUpdate> = strictObject({
    id: contentIdSchema,
    data: contentCommonSchema,
});
