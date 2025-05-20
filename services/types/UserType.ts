// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { UserCreateArgsSchema, UserCreateManyArgsSchema, UserDeleteArgsSchema, UserDeleteManyArgsSchema, UserFindFirstArgsSchema, UserFindManyArgsSchema, UserFindUniqueArgsSchema, UserOrderByWithRelationInputSchema, UserSchema, UserUpdateArgsSchema, UserUpdateManyArgsSchema, UserUpsertArgsSchema, UserWhereInputSchema, UserWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type UserModel = z.infer<typeof UserSchema>;
export type UserCount = number;

// ============== Props Types ============== //

// Single mutations
export type UserCreateProps = Prisma.UserCreateArgs;
export type UserUpsertProps = Prisma.UserUpsertArgs;
export type UserUpdateProps = Prisma.UserUpdateArgs;
export type UserDeleteProps = Prisma.UserDeleteArgs;

// Multiple mutations
export type UserCreateManyProps = Prisma.UserCreateManyArgs;
export type UserUpdateManyProps = Prisma.UserUpdateManyArgs;
export type UserDeleteManyProps = Prisma.UserDeleteManyArgs;

// Single queries
export type UserFindFirstProps = Prisma.UserFindFirstArgs;
export type UserFindUniqueProps = Prisma.UserFindUniqueArgs;
export type UserFindManyProps = Prisma.UserFindManyArgs;

// Multiple queries
export type UserCountProps = Prisma.UserCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const UserCreateSchema: ZodType<UserCreateProps> = UserCreateArgsSchema;
export const UserUpsertSchema: ZodType<UserUpsertProps> = UserUpsertArgsSchema;
export const UserUpdateSchema: ZodType<UserUpdateProps> = UserUpdateArgsSchema;
export const UserDeleteSchema: ZodType<UserDeleteProps> = UserDeleteArgsSchema;

// Multiple mutations
export const UserCreateManySchema: ZodType<UserCreateManyProps> = UserCreateManyArgsSchema;
export const UserUpdateManySchema: ZodType<UserUpdateManyProps> = UserUpdateManyArgsSchema;
export const UserDeleteManySchema: ZodType<UserDeleteManyProps> = UserDeleteManyArgsSchema;

// Single queries
export const UserFindFirstSchema: ZodType<UserFindFirstProps> = UserFindFirstArgsSchema;
export const UserFindUniqueSchema: ZodType<UserFindUniqueProps> = UserFindUniqueArgsSchema;
export const UserFindManySchema: ZodType<UserFindManyProps> = UserFindManyArgsSchema;

// Aggregate queries
export const UserCountSchema: ZodType<UserCountProps> =  z.object({
    where: z.lazy(() => UserWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => UserOrderByWithRelationInputSchema),
        z.array(z.lazy(() => UserOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => UserWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.string(), z.boolean())]).optional()
});

// ============== Response Types ============== //

// Single mutations
export type UserCreateResponse<T extends UserCreateProps> = Prisma.UserGetPayload<T>;
export type UserUpsertResponse<T extends UserUpsertProps> = Prisma.UserGetPayload<T>;
export type UserUpdateResponse<T extends UserUpdateProps> = Prisma.UserGetPayload<T>;
export type UserDeleteResponse<T extends UserDeleteProps> = Prisma.UserGetPayload<T>;

// Multiple mutations
export type UserCreateManyResponse = { count: number };
export type UserUpdateManyResponse = { count: number };
export type UserDeleteManyResponse = { count: number };

// Single queries
export type UserFindFirstResponse<T extends UserFindFirstProps> = Prisma.UserGetPayload<T> | null;
export type UserFindUniqueResponse<T extends UserFindUniqueProps> = Prisma.UserGetPayload<T> | null;
export type UserFindManyResponse<T extends UserFindManyProps> = Prisma.UserGetPayload<T>[];

// Aggregate queries
export type UserCountResponse = UserCount;
