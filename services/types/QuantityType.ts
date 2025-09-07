import { Prisma } from "@prisma/client";
import { InternalArgs } from "@prisma/client/runtime/library";

// ============== Utils ============== //

type Payload = Prisma.$QuantityPayload<InternalArgs>;

type Flatten<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

// ============== Model ============== //

/**
 * Quantity native fields only
 */
export type QuantityFields = Flatten<Payload["scalars"]>;

/**
 * Quantity relations fields only
 */
export type QuantityRelations = {
    [K in keyof Payload["objects"]]: Payload["objects"][K] extends Array<infer T>
        ? T extends { scalars: unknown }
            ? Flatten<T["scalars"]>[]
            : never
        : Payload["objects"][K] extends { scalars: unknown }
          ? Flatten<Payload["objects"][K]["scalars"]>
          : never;
};

/**
 * Quantity native and relations fields
 */
export type QuantityComplete = Flatten<QuantityFields & QuantityRelations>;

/**
 * Quantity count type
 */
export type QuantityCount = number;

// ============== Mutations ============== //

// Create
export type QuantityCreateProps = Prisma.QuantityCreateArgs;
export type QuantityCreateResponse<T extends QuantityCreateProps> = Prisma.QuantityGetPayload<T>;

// Upsert
export type QuantityUpsertProps = Prisma.QuantityUpsertArgs;
export type QuantityUpsertResponse<T extends QuantityUpsertProps> = Prisma.QuantityGetPayload<T>;

// Update
export type QuantityUpdateProps = Prisma.QuantityUpdateArgs;
export type QuantityUpdateResponse<T extends QuantityUpdateProps> = Prisma.QuantityGetPayload<T>;

// Delete
export type QuantityDeleteProps = Prisma.QuantityDeleteArgs;
export type QuantityDeleteResponse<T extends QuantityDeleteProps> = Prisma.QuantityGetPayload<T>;

// Create Many
export type QuantityCreateManyProps = Prisma.QuantityCreateManyArgs;
export type QuantityCreateManyResponse = { count: number };

// Update Many
export type QuantityUpdateManyProps = Prisma.QuantityUpdateManyArgs;
export type QuantityUpdateManyResponse = { count: number };

// Delete Many
export type QuantityDeleteManyProps = Prisma.QuantityDeleteManyArgs;
export type QuantityDeleteManyResponse = { count: number };
