// ============== Types ============== //

import { User, Prisma } from "@prisma/client";

// ============== Model Types ============== //

export type UserModel = User;
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
