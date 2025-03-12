import { AccountCommon, AccountId, AccountTimestamps, AccountUpdate } from "@actions/types/Account";
import { AccountModel } from "@actions/zod-generated";
import { strictObject, z, ZodString, ZodType } from "zod";

export const accountIdSchema: ZodString = z.string().nanoid();

export const accountIdObjectSchema: ZodType<AccountId> = strictObject({
    id: z.string().nanoid(),
});

export const accountCommonSchema: ZodType<AccountCommon> = AccountModel.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const accountTimestampsSchema: ZodType<AccountTimestamps> = strictObject({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const accountUpdateSchema: ZodType<AccountUpdate> = strictObject({
    id: accountIdSchema,
    data: accountCommonSchema,
});
