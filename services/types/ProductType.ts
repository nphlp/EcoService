import { Prisma } from "@prisma/client";
import { InternalArgs } from "@prisma/client/runtime/library";

// ============== Utils ============== //

type Payload = Prisma.$ProductPayload<InternalArgs>;

type Flatten<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

// ============== Model ============== //

/**
 * Product native fields only
 */
export type ProductFields = Flatten<Payload["scalars"]>;

/**
 * Product relations fields only
 */
export type ProductRelations = {
    [K in keyof Payload["objects"]]: Payload["objects"][K] extends Array<infer T>
        ? T extends { scalars: unknown }
            ? Flatten<T["scalars"]>[]
            : never
        : Payload["objects"][K] extends { scalars: unknown }
          ? Flatten<Payload["objects"][K]["scalars"]>
          : never;
};

/**
 * Product native and relations fields
 */
export type ProductComplete = Flatten<ProductFields & ProductRelations>;

/**
 * Product count type
 */
export type ProductCount = number;

// ============== Mutations ============== //

// Create
export type ProductCreateProps = Prisma.ProductCreateArgs;
export type ProductCreateResponse<T extends ProductCreateProps> = Prisma.ProductGetPayload<T>;

// Upsert
export type ProductUpsertProps = Prisma.ProductUpsertArgs;
export type ProductUpsertResponse<T extends ProductUpsertProps> = Prisma.ProductGetPayload<T>;

// Update
export type ProductUpdateProps = Prisma.ProductUpdateArgs;
export type ProductUpdateResponse<T extends ProductUpdateProps> = Prisma.ProductGetPayload<T>;

// Delete
export type ProductDeleteProps = Prisma.ProductDeleteArgs;
export type ProductDeleteResponse<T extends ProductDeleteProps> = Prisma.ProductGetPayload<T>;

// Create Many
export type ProductCreateManyProps = Prisma.ProductCreateManyArgs;
export type ProductCreateManyResponse = { count: number };

// Update Many
export type ProductUpdateManyProps = Prisma.ProductUpdateManyArgs;
export type ProductUpdateManyResponse = { count: number };

// Delete Many
export type ProductDeleteManyProps = Prisma.ProductDeleteManyArgs;
export type ProductDeleteManyResponse = { count: number };
