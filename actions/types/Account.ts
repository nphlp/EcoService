"use server";

import { Account } from "@prisma/client";
import { z, ZodString, ZodType } from "zod";

// ======================= //
// ==== Account Types ==== //
// ======================= //

/** Represents a complete account entity */
export type AccountType = Account;

/** Represents the account's unique identifier */
export type AccountId = Pick<Account, "id">;

/** Represents common account properties */
export type AccountCommon = Omit<Account, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating an account */
export type AccountUpdate = {
  id: Account["id"];
  data: AccountCommon;
};

/** Represents system-managed timestamp fields */
export type AccountTimestamps = Pick<Account, "createdAt" | "updatedAt">;

// ===================== //
// ==== Zod Schemas ==== //
// ===================== //

export const accountIdSchema: ZodString = z.string();
export const accountIdObjectSchema: ZodType<AccountId> = z.object({ id: z.string() });

export const accountCommonSchema: ZodType<AccountCommon> = z.object({
  accountId: z.string(),
  providerId: z.string(),
  userId: z.string(),
  accessToken: z.string().nullable(),
  refreshToken: z.string().nullable(),
  accessTokenExpiresAt: z.date().nullable(),
  refreshTokenExpiresAt: z.date().nullable(),
  scope: z.string().nullable(),
  password: z.string().nullable(),
});

export const accountTimestampsSchema: ZodType<AccountTimestamps> = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const accountUpdateSchema: ZodType<AccountUpdate> = z.object({
  id: accountIdSchema,
  data: accountCommonSchema,
});
