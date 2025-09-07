import { Prisma } from "@prisma/client";
import { InternalArgs } from "@prisma/client/runtime/library";

// ============== Utils ============== //

type Payload = Prisma.$AccountPayload<InternalArgs>;

type Flatten<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

// ============== Model ============== //

/**
 * Account native fields only
 */
export type AccountFields = Flatten<Payload["scalars"]>;

/**
 * Account relations fields only
 */
export type AccountRelations = {
    [K in keyof Payload["objects"]]: Payload["objects"][K] extends Array<infer T>
        ? T extends { scalars: unknown }
            ? Flatten<T["scalars"]>[]
            : never
        : Payload["objects"][K] extends { scalars: unknown }
          ? Flatten<Payload["objects"][K]["scalars"]>
          : never;
};

/**
 * Account native and relations fields
 */
export type AccountComplete = Flatten<AccountFields & AccountRelations>;

/**
 * Account count type
 */
export type AccountCount = number;

// ============== Mutations ============== //

// Create
export type AccountCreateProps = Prisma.AccountCreateArgs;
export type AccountCreateResponse<T extends AccountCreateProps> = Prisma.AccountGetPayload<T>;

// Upsert
export type AccountUpsertProps = Prisma.AccountUpsertArgs;
export type AccountUpsertResponse<T extends AccountUpsertProps> = Prisma.AccountGetPayload<T>;

// Update
export type AccountUpdateProps = Prisma.AccountUpdateArgs;
export type AccountUpdateResponse<T extends AccountUpdateProps> = Prisma.AccountGetPayload<T>;

// Delete
export type AccountDeleteProps = Prisma.AccountDeleteArgs;
export type AccountDeleteResponse<T extends AccountDeleteProps> = Prisma.AccountGetPayload<T>;

// Create Many
export type AccountCreateManyProps = Prisma.AccountCreateManyArgs;
export type AccountCreateManyResponse = { count: number };

// Update Many
export type AccountUpdateManyProps = Prisma.AccountUpdateManyArgs;
export type AccountUpdateManyResponse = { count: number };

// Delete Many
export type AccountDeleteManyProps = Prisma.AccountDeleteManyArgs;
export type AccountDeleteManyResponse = { count: number };
