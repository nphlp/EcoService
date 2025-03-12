import { AccountModel, RelatedAccountModel } from "@actions/zod-generated";
import { Account, Prisma } from "@prisma/client";
import { z } from "zod";

/** Represents the Account's model with relations */
export type AccountType = z.infer<typeof RelatedAccountModel>;

/** Represents the Account's unique identifier */
export type AccountId = Pick<Account, "id">;

/** Represents common Account properties without system-managed fields */
export type AccountCommon = Omit<Account, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a Account */
export type AccountUpdate = {
    id: Account["id"];
    data: AccountCommon;
};

/** Represents system-managed timestamp fields */
export type AccountTimestamps = Pick<Account, "createdAt" | "updatedAt">;

/** Find one options for Accounts */
export type SelectAccountProps = Pick<Prisma.AccountFindUniqueArgs, "where" | "select">;

/** Find many options for Accounts */
export type SelectAccountListProps = Pick<Prisma.AccountFindManyArgs, "orderBy" | "take" | "skip" | "where" | "select">;

/** Count options for Accounts */
export type SelectAccountAmountProps = Pick<Prisma.AccountCountArgs, "where">;
