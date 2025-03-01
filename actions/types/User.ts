import { $Enums, Prisma, User } from "@prisma/client";
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

/** Find many options for users */
export type SelectUserListProps = Pick<Prisma.UserFindManyArgs, "orderBy" | "take" | "skip" | "where">;

/** Count options for users */
export type SelectUserAmountProps = Pick<Prisma.UserCountArgs, "where">;

// ===================== //
// ==== Zod Schemas ==== //
// ===================== //

/** Schema for validating user UUID */
export const userIdSchema: ZodString = z.string().nanoid();

/** Schema for validating user ID object structure */
export const userIdObjectSchema: ZodType<UserId> = z.object({
    id: z.string().nanoid(),
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

export const selectUserListSchema: ZodType<SelectUserListProps> = z.object({
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

export const selectUserAmountSchema: ZodType<SelectUserAmountProps> = z.object({
    where: z
        .object({
            // Types to validate
        })
        .optional(),
});
