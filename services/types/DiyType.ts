import { Prisma } from "@prisma/client";
import { InternalArgs } from "@prisma/client/runtime/library";

// ============== Utils ============== //

type Payload = Prisma.$DiyPayload<InternalArgs>;

type Flatten<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

// ============== Model ============== //

/**
 * Diy native fields only
 */
export type DiyFields = Flatten<Payload["scalars"]>;

/**
 * Diy relations fields only
 */
export type DiyRelations = {
    [K in keyof Payload["objects"]]: Payload["objects"][K] extends Array<infer T>
        ? T extends { scalars: unknown }
            ? Flatten<T["scalars"]>[]
            : never
        : Payload["objects"][K] extends { scalars: unknown }
          ? Flatten<Payload["objects"][K]["scalars"]>
          : never;
};

/**
 * Diy native and relations fields
 */
export type DiyComplete = Flatten<DiyFields & DiyRelations>;

/**
 * Diy count type
 */
export type DiyCount = number;

// ============== Mutations ============== //

// Create
export type DiyCreateProps = Prisma.DiyCreateArgs;
export type DiyCreateResponse<T extends DiyCreateProps> = Prisma.DiyGetPayload<T>;

// Upsert
export type DiyUpsertProps = Prisma.DiyUpsertArgs;
export type DiyUpsertResponse<T extends DiyUpsertProps> = Prisma.DiyGetPayload<T>;

// Update
export type DiyUpdateProps = Prisma.DiyUpdateArgs;
export type DiyUpdateResponse<T extends DiyUpdateProps> = Prisma.DiyGetPayload<T>;

// Delete
export type DiyDeleteProps = Prisma.DiyDeleteArgs;
export type DiyDeleteResponse<T extends DiyDeleteProps> = Prisma.DiyGetPayload<T>;

// Create Many
export type DiyCreateManyProps = Prisma.DiyCreateManyArgs;
export type DiyCreateManyResponse = { count: number };

// Update Many
export type DiyUpdateManyProps = Prisma.DiyUpdateManyArgs;
export type DiyUpdateManyResponse = { count: number };

// Delete Many
export type DiyDeleteManyProps = Prisma.DiyDeleteManyArgs;
export type DiyDeleteManyResponse = { count: number };
