import { AddressCommon, AddressId, AddressTimestamps, AddressUpdate } from "@actions/types/Address";
import { AddressModel } from "@actions/zod-generated";
import { strictObject, z, ZodString, ZodType } from "zod";

export const addressIdSchema: ZodString = z.string().nanoid();

export const addressIdObjectSchema: ZodType<AddressId> = strictObject({
    id: z.string().nanoid(),
});

export const addressCommonSchema: ZodType<AddressCommon> = AddressModel.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const addressTimestampsSchema: ZodType<AddressTimestamps> = strictObject({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const addressUpdateSchema: ZodType<AddressUpdate> = strictObject({
    id: addressIdSchema,
    data: addressCommonSchema,
});
