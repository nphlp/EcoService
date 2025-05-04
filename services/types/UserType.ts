// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { UserCreateArgsSchema, UserDeleteArgsSchema, UserFindFirstArgsSchema, UserFindManyArgsSchema, UserFindUniqueArgsSchema, UserOrderByWithRelationInputSchema, UserSchema, UserUpdateArgsSchema, UserUpsertArgsSchema, UserWhereInputSchema, UserWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type UserModel = z.infer<typeof UserSchema>;
export type UserCount = number;

// ============== Props Types ============== //

export type CreateUserProps = Prisma.UserCreateArgs;
export type UpsertUserProps = Prisma.UserUpsertArgs;
export type UpdateUserProps = Prisma.UserUpdateArgs;
export type DeleteUserProps = Prisma.UserDeleteArgs;
export type FindFirstUserProps = Prisma.UserFindFirstArgs;
export type FindUniqueUserProps = Prisma.UserFindUniqueArgs;
export type FindManyUserProps = Prisma.UserFindManyArgs;
export type CountUserProps = Prisma.UserCountArgs;

// ============== Schema Types ============== //

export const createUserSchema: ZodType<CreateUserProps> = UserCreateArgsSchema;
export const upsertUserSchema: ZodType<UpsertUserProps> = UserUpsertArgsSchema;
export const updateUserSchema: ZodType<UpdateUserProps> = UserUpdateArgsSchema;
export const deleteUserSchema: ZodType<DeleteUserProps> = UserDeleteArgsSchema;
export const selectFirstUserSchema: ZodType<FindFirstUserProps> = UserFindFirstArgsSchema;
export const selectUniqueUserSchema: ZodType<FindUniqueUserProps> = UserFindUniqueArgsSchema;
export const selectManyUserSchema: ZodType<FindManyUserProps> = UserFindManyArgsSchema;
export const countUserSchema: ZodType<CountUserProps> =  z.object({
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

export type CreateUserResponse<T extends CreateUserProps> = Prisma.UserGetPayload<T>;
export type UpsertUserResponse<T extends UpsertUserProps> = Prisma.UserGetPayload<T>;
export type UpdateUserResponse<T extends UpdateUserProps> = Prisma.UserGetPayload<T>;
export type DeleteUserResponse<T extends DeleteUserProps> = Prisma.UserGetPayload<T>;
export type FindFirstUserResponse<T extends FindFirstUserProps> = Prisma.UserGetPayload<T> | null;
export type FindUniqueUserResponse<T extends FindUniqueUserProps> = Prisma.UserGetPayload<T> | null;
export type FindManyUserResponse<T extends FindManyUserProps> = Prisma.UserGetPayload<T>[];
export type CountUserResponse = UserCount;
