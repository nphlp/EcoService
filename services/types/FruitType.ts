import { Prisma } from "@prisma/client";
import { InternalArgs } from "@prisma/client/runtime/library";

// ============== Utils ============== //

type Payload = Prisma.$FruitPayload<InternalArgs>;

type Flatten<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

// ============== Model ============== //

/**
 * Fruit native fields only
 */
export type FruitFields = Flatten<Payload["scalars"]>;

/**
 * Fruit relations fields only
 */
export type FruitRelations = {
    [K in keyof Payload["objects"]]: Payload["objects"][K] extends Array<infer T>
        ? T extends { scalars: unknown }
            ? Flatten<T["scalars"]>[]
            : never
        : Payload["objects"][K] extends { scalars: unknown }
          ? Flatten<Payload["objects"][K]["scalars"]>
          : never;
};

/**
 * Fruit native and relations fields
 */
export type FruitComplete = Flatten<FruitFields & FruitRelations>;

/**
 * Fruit count type
 */
export type FruitCount = number;

// ============== Mutations ============== //

// Create
export type FruitCreateProps = Prisma.FruitCreateArgs;
export type FruitCreateResponse<T extends FruitCreateProps> = Prisma.FruitGetPayload<T>;

// Upsert
export type FruitUpsertProps = Prisma.FruitUpsertArgs;
export type FruitUpsertResponse<T extends FruitUpsertProps> = Prisma.FruitGetPayload<T>;

// Update
export type FruitUpdateProps = Prisma.FruitUpdateArgs;
export type FruitUpdateResponse<T extends FruitUpdateProps> = Prisma.FruitGetPayload<T>;

// Delete
export type FruitDeleteProps = Prisma.FruitDeleteArgs;
export type FruitDeleteResponse<T extends FruitDeleteProps> = Prisma.FruitGetPayload<T>;

// Create Many
export type FruitCreateManyProps = Prisma.FruitCreateManyArgs;
export type FruitCreateManyResponse = { count: number };

// Update Many
export type FruitUpdateManyProps = Prisma.FruitUpdateManyArgs;
export type FruitUpdateManyResponse = { count: number };

// Delete Many
export type FruitDeleteManyProps = Prisma.FruitDeleteManyArgs;
export type FruitDeleteManyResponse = { count: number };
