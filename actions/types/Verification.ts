import { Prisma, Verification } from "@prisma/client";
import { z, ZodString, ZodType } from "zod";

// ============================ //
// ==== Verification Types ==== //
// ============================ //

/** Represents a complete verification entity */
export type VerificationType = Verification;

/** Represents the verification's unique identifier */
export type VerificationId = Pick<Verification, "id">;

/** Represents common verification properties without system-managed fields */
export type VerificationCommon = Omit<Verification, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a verification */
export type VerificationUpdate = {
    id: Verification["id"];
    data: VerificationCommon;
};

/** Represents system-managed timestamp fields */
export type VerificationTimestamps = Pick<Verification, "createdAt" | "updatedAt">;

/** Find many options for verifications */
export type SelectVerificationListProps = Pick<Prisma.VerificationFindManyArgs, "orderBy" | "take" | "skip" | "where">;

/** Count options for verifications */
export type SelectVerificationAmountProps = Pick<Prisma.VerificationCountArgs, "where">;

// ===================== //
// ==== Zod Schemas ==== //
// ===================== //

/** Schema for validating verification UUID */
export const verificationIdSchema: ZodString = z.string().nanoid();

/** Schema for validating verification ID object structure */
export const verificationIdObjectSchema: ZodType<VerificationId> = z.object({
    id: z.string().nanoid(),
});

/** Schema for validating common verification properties */
export const verificationCommonSchema: ZodType<VerificationCommon> = z.object({
    identifier: z.string(),
    value: z.string(),
    expiresAt: z.date(),
});

/** Schema for validating timestamp fields */
export const verificationTimestampsSchema: ZodType<VerificationTimestamps> = z.object({
    createdAt: z.date(),
    updatedAt: z.date(),
});

/** Schema for validating verification update operations */
export const verificationUpdateSchema: ZodType<VerificationUpdate> = z.object({
    id: verificationIdSchema,
    data: verificationCommonSchema,
});

export const selectVerificationListSchema: ZodType<SelectVerificationListProps> = z.object({
    orderBy: z
        .object({
            // Types to validate
        })
        .optional(),
    take: z.number().min(1).max(100).optional(),
    skip: z.number().min(0).optional(),
    where: z
        .object({
            // Types to validate
        })
        .optional(),
});

export const selectVerificationAmountSchema: ZodType<SelectVerificationAmountProps> = z.object({
    where: z
        .object({
            // Types to validate
        })
        .optional(),
});
