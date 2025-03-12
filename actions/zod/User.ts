import { UserCommon, UserId, UserTimestamps, UserUpdate } from "@actions/types/User";
import { UserModel } from "@actions/zod-generated";
import { strictObject, z, ZodString, ZodType } from "zod";

export const userIdSchema: ZodString = z.string().nanoid();

export const userIdObjectSchema: ZodType<UserId> = strictObject({
    id: z.string().nanoid(),
});

export const userCommonSchema: ZodType<UserCommon> = UserModel.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const userTimestampsSchema: ZodType<UserTimestamps> = strictObject({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const userUpdateSchema: ZodType<UserUpdate> = strictObject({
    id: userIdSchema,
    data: userCommonSchema,
});
