"use server";

import { User, $Enums } from "@prisma/client";
import { z, ZodString, ZodType } from "zod";

// ==================== //
// ==== User Types ==== //
// ==================== //

/** Represents a complete user entity */
export type UserType = User;

/** Represents the user's unique identifier */
export type UserId = Pick<User, "id">;

/** Represents common user properties without system-managed fields */
export type UserCommon = Omit<User, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a user */
export type UserUpdate = {
    id: User["id"];
    data: UserCommon;
};

/** Represents system-managed timestamp fields */
export type UserTimestamps = Pick<User, "createdAt" | "updatedAt">;

// ===================== //
// ==== Zod Schemas ==== //
// ===================== //

/** Schema for validating user UUID */
export const userIdSchema: ZodString = z.string().uuid();

/** Schema for validating user ID object structure */
export const userIdObjectSchema: ZodType<UserId> = z.object({
    id: z.string().uuid(),
});

/** Schema for validating common user properties */
export const userCommonSchema: ZodType<UserCommon> = z.object({
    name: z.string(),
    email: z.string().email(),
    emailVerified: z.boolean(),
    image: z.string().url(),
    phone: z.string(),
    stripeId: z.string(),
    stripeConnectId: z.string(),
    isOnboarded: z.boolean(),
    isSeller: z.boolean(),
    role: z.nativeEnum($Enums.Role),
});

/** Schema for validating timestamp fields */
export const userTimestampsSchema: ZodType<UserTimestamps> = z.object({
    createdAt: z.date(),
    updatedAt: z.date(),
});

/** Schema for validating user update operations */
export const userUpdateSchema: ZodType<UserUpdate> = z.object({
    id: userIdSchema,
    data: userCommonSchema,
});
