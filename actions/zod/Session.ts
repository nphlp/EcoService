import { SessionCommon, SessionId, SessionTimestamps, SessionUpdate } from "@actions/types/Session";
import { SessionModel } from "@actions/zod-generated";
import { strictObject, z, ZodString, ZodType } from "zod";

export const sessionIdSchema: ZodString = z.string().nanoid();

export const sessionIdObjectSchema: ZodType<SessionId> = strictObject({
    id: z.string().nanoid(),
});

export const sessionCommonSchema: ZodType<SessionCommon> = SessionModel.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const sessionTimestampsSchema: ZodType<SessionTimestamps> = strictObject({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const sessionUpdateSchema: ZodType<SessionUpdate> = strictObject({
    id: sessionIdSchema,
    data: sessionCommonSchema,
});
