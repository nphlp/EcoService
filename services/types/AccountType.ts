// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { AccountCreateArgsSchema, AccountDeleteArgsSchema, AccountFindFirstArgsSchema, AccountFindManyArgsSchema, AccountFindUniqueArgsSchema, AccountOrderByWithRelationInputSchema, AccountSchema, AccountUpdateArgsSchema, AccountUpsertArgsSchema, AccountWhereInputSchema, AccountWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type AccountModel = z.infer<typeof AccountSchema>;
export type AccountCount = number;

// ============== Props Types ============== //

export type CreateAccountProps = Prisma.AccountCreateArgs;
export type UpsertAccountProps = Prisma.AccountUpsertArgs;
export type UpdateAccountProps = Prisma.AccountUpdateArgs;
export type DeleteAccountProps = Prisma.AccountDeleteArgs;
export type FindFirstAccountProps = Prisma.AccountFindFirstArgs;
export type FindUniqueAccountProps = Prisma.AccountFindUniqueArgs;
export type FindManyAccountProps = Prisma.AccountFindManyArgs;
export type CountAccountProps = Prisma.AccountCountArgs;

// ============== Schema Types ============== //

export const createAccountSchema: ZodType<CreateAccountProps> = AccountCreateArgsSchema;
export const upsertAccountSchema: ZodType<UpsertAccountProps> = AccountUpsertArgsSchema;
export const updateAccountSchema: ZodType<UpdateAccountProps> = AccountUpdateArgsSchema;
export const deleteAccountSchema: ZodType<DeleteAccountProps> = AccountDeleteArgsSchema;
export const selectFirstAccountSchema: ZodType<FindFirstAccountProps> = AccountFindFirstArgsSchema;
export const selectUniqueAccountSchema: ZodType<FindUniqueAccountProps> = AccountFindUniqueArgsSchema;
export const selectManyAccountSchema: ZodType<FindManyAccountProps> = AccountFindManyArgsSchema;
export const countAccountSchema: ZodType<CountAccountProps> =  z.object({
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

export type CreateAccountResponse<T extends CreateAccountProps> = Prisma.AccountGetPayload<T>;
export type UpsertAccountResponse<T extends UpsertAccountProps> = Prisma.AccountGetPayload<T>;
export type UpdateAccountResponse<T extends UpdateAccountProps> = Prisma.AccountGetPayload<T>;
export type DeleteAccountResponse<T extends DeleteAccountProps> = Prisma.AccountGetPayload<T>;
export type FindFirstAccountResponse<T extends FindFirstAccountProps> = Prisma.AccountGetPayload<T> | null;
export type FindUniqueAccountResponse<T extends FindUniqueAccountProps> = Prisma.AccountGetPayload<T> | null;
export type FindManyAccountResponse<T extends FindManyAccountProps> = Prisma.AccountGetPayload<T>[];
export type CountAccountResponse = AccountCount;
