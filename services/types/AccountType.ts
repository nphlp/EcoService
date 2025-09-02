// ============== Types ============== //

import { Account, Prisma } from "@prisma/client";

// ============== Model Types ============== //

export type AccountModel = Account;
export type AccountCount = number;

// ============== Props Types ============== //

// Single mutations
export type AccountCreateProps = Prisma.AccountCreateArgs;
export type AccountUpsertProps = Prisma.AccountUpsertArgs;
export type AccountUpdateProps = Prisma.AccountUpdateArgs;
export type AccountDeleteProps = Prisma.AccountDeleteArgs;

// Multiple mutations
export type AccountCreateManyProps = Prisma.AccountCreateManyArgs;
export type AccountUpdateManyProps = Prisma.AccountUpdateManyArgs;
export type AccountDeleteManyProps = Prisma.AccountDeleteManyArgs;

// Single queries
export type AccountFindFirstProps = Prisma.AccountFindFirstArgs;
export type AccountFindUniqueProps = Prisma.AccountFindUniqueArgs;
export type AccountFindManyProps = Prisma.AccountFindManyArgs;

// Multiple queries
export type AccountCountProps = Prisma.AccountCountArgs;

// ============== Response Types ============== //

// Single mutations
export type AccountCreateResponse<T extends AccountCreateProps> = Prisma.AccountGetPayload<T>;
export type AccountUpsertResponse<T extends AccountUpsertProps> = Prisma.AccountGetPayload<T>;
export type AccountUpdateResponse<T extends AccountUpdateProps> = Prisma.AccountGetPayload<T>;
export type AccountDeleteResponse<T extends AccountDeleteProps> = Prisma.AccountGetPayload<T>;

// Multiple mutations
export type AccountCreateManyResponse = { count: number };
export type AccountUpdateManyResponse = { count: number };
export type AccountDeleteManyResponse = { count: number };

// Single queries
export type AccountFindFirstResponse<T extends AccountFindFirstProps> = Prisma.AccountGetPayload<T> | null;
export type AccountFindUniqueResponse<T extends AccountFindUniqueProps> = Prisma.AccountGetPayload<T> | null;
export type AccountFindManyResponse<T extends AccountFindManyProps> = Prisma.AccountGetPayload<T>[];

// Aggregate queries
export type AccountCountResponse = AccountCount;
