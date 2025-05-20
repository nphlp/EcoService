// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { AccountCreateArgsSchema, AccountCreateManyArgsSchema, AccountDeleteArgsSchema, AccountDeleteManyArgsSchema, AccountFindFirstArgsSchema, AccountFindManyArgsSchema, AccountFindUniqueArgsSchema, AccountOrderByWithRelationInputSchema, AccountSchema, AccountUpdateArgsSchema, AccountUpdateManyArgsSchema, AccountUpsertArgsSchema, AccountWhereInputSchema, AccountWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type AccountModel = z.infer<typeof AccountSchema>;
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

// ============== Schema Types ============== //

// Single mutations
export const AccountCreateSchema: ZodType<AccountCreateProps> = AccountCreateArgsSchema;
export const AccountUpsertSchema: ZodType<AccountUpsertProps> = AccountUpsertArgsSchema;
export const AccountUpdateSchema: ZodType<AccountUpdateProps> = AccountUpdateArgsSchema;
export const AccountDeleteSchema: ZodType<AccountDeleteProps> = AccountDeleteArgsSchema;

// Multiple mutations
export const AccountCreateManySchema: ZodType<AccountCreateManyProps> = AccountCreateManyArgsSchema;
export const AccountUpdateManySchema: ZodType<AccountUpdateManyProps> = AccountUpdateManyArgsSchema;
export const AccountDeleteManySchema: ZodType<AccountDeleteManyProps> = AccountDeleteManyArgsSchema;

// Single queries
export const AccountFindFirstSchema: ZodType<AccountFindFirstProps> = AccountFindFirstArgsSchema;
export const AccountFindUniqueSchema: ZodType<AccountFindUniqueProps> = AccountFindUniqueArgsSchema;
export const AccountFindManySchema: ZodType<AccountFindManyProps> = AccountFindManyArgsSchema;

// Aggregate queries
export const AccountCountSchema: ZodType<AccountCountProps> =  z.object({
    where: z.lazy(() => AccountWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => AccountOrderByWithRelationInputSchema),
        z.array(z.lazy(() => AccountOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => AccountWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.string(), z.boolean())]).optional()
});

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
