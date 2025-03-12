import { VerificationCommon, VerificationId, VerificationTimestamps, VerificationUpdate } from "@actions/types/Verification";
import { VerificationModel } from "@actions/zod-generated";
import { strictObject, z, ZodString, ZodType } from "zod";

export const verificationIdSchema: ZodString = z.string().nanoid();

export const verificationIdObjectSchema: ZodType<VerificationId> = strictObject({
    id: z.string().nanoid(),
});

export const verificationCommonSchema: ZodType<VerificationCommon> = VerificationModel.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});

export const verificationTimestampsSchema: ZodType<VerificationTimestamps> = strictObject({
    createdAt: z.date(),
    updatedAt: z.date(),
});

export const verificationUpdateSchema: ZodType<VerificationUpdate> = strictObject({
    id: verificationIdSchema,
    data: verificationCommonSchema,
});
