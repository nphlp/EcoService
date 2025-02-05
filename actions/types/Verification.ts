"use server";

import { Verification } from "@prisma/client";
import { z, ZodString, ZodType } from "zod";

// ============================ //
// ==== Verification Types ==== //
// ============================ //

/** Represents a complete verification entity */
export type VerificationType = Verification;

/** Represents the verification's unique identifier */
export type VerificationId = Pick<Verification, "id">;

/** Represents common verification properties */
export type VerificationCommon = Omit<Verification, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a verification */
export type VerificationUpdate = {
  id: Verification["id"];
  data: VerificationCommon;
};

/** Represents system-managed timestamp fields */
export type VerificationTimestamps = Pick<Verification, "createdAt" | "updatedAt">;

// ===================== //
// ==== Zod Schemas ==== //
// ===================== //

export const verificationIdSchema: ZodString = z.string();
export const verificationIdObjectSchema: ZodType<VerificationId> = z.object({
  id: z.string(),
});

export const verificationCommonSchema: ZodType<VerificationCommon> = z.object({
  identifier: z.string(),
  value: z.string(),
  expiresAt: z.date(),
});

export const verificationTimestampsSchema: ZodType<VerificationTimestamps> = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const verificationUpdateSchema: ZodType<VerificationUpdate> = z.object({
  id: verificationIdSchema,
  data: verificationCommonSchema,
});
