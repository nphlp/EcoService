import { VerificationModel } from "@actions/zod-generated";
import { Verification, Prisma } from "@prisma/client";
import { z } from "zod";

/** Represents the Verification's model  */
export type VerificationType = z.infer<typeof VerificationModel>;

/** Represents the Verification's unique identifier */
export type VerificationId = Pick<Verification, "id">;

/** Represents common Verification properties without system-managed fields */
export type VerificationCommon = Omit<Verification, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a Verification */
export type VerificationUpdate = {
    id: Verification["id"];
    data: VerificationCommon;
};

/** Represents system-managed timestamp fields */
export type VerificationTimestamps = Pick<Verification, "createdAt" | "updatedAt">;

/** Find one options for Verifications */
export type SelectVerificationProps = Pick<Prisma.VerificationFindUniqueArgs, "where" | "select">;

/** Find many options for Verifications */
export type SelectVerificationListProps = Pick<Prisma.VerificationFindManyArgs, "orderBy" | "take" | "skip" | "where" | "select">;

/** Count options for Verifications */
export type SelectVerificationAmountProps = Pick<Prisma.VerificationCountArgs, "where">;
