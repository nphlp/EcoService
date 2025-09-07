import { Prisma } from "@prisma/client";
import { InternalArgs } from "@prisma/client/runtime/library";

// ============== Utils ============== //

type Payload = Prisma.$CategoryPayload<InternalArgs>;

type Flatten<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

// ============== Model ============== //

/**
 * Category native fields only
 */
export type CategoryFields = Flatten<Payload["scalars"]>;

/**
 * Category relations fields only
 */
export type CategoryRelations = {
    [K in keyof Payload["objects"]]: Payload["objects"][K] extends Array<infer T>
        ? T extends { scalars: unknown }
            ? Flatten<T["scalars"]>[]
            : never
        : Payload["objects"][K] extends { scalars: unknown }
          ? Flatten<Payload["objects"][K]["scalars"]>
          : never;
};

/**
 * Category native and relations fields
 */
export type CategoryComplete = Flatten<CategoryFields & CategoryRelations>;

/**
 * Category count type
 */
export type CategoryCount = number;

// ============== Mutations ============== //

// Create
export type CategoryCreateProps = Prisma.CategoryCreateArgs;
export type CategoryCreateResponse<T extends CategoryCreateProps> = Prisma.CategoryGetPayload<T>;

// Upsert
export type CategoryUpsertProps = Prisma.CategoryUpsertArgs;
export type CategoryUpsertResponse<T extends CategoryUpsertProps> = Prisma.CategoryGetPayload<T>;

// Update
export type CategoryUpdateProps = Prisma.CategoryUpdateArgs;
export type CategoryUpdateResponse<T extends CategoryUpdateProps> = Prisma.CategoryGetPayload<T>;

// Delete
export type CategoryDeleteProps = Prisma.CategoryDeleteArgs;
export type CategoryDeleteResponse<T extends CategoryDeleteProps> = Prisma.CategoryGetPayload<T>;

// Create Many
export type CategoryCreateManyProps = Prisma.CategoryCreateManyArgs;
export type CategoryCreateManyResponse = { count: number };

// Update Many
export type CategoryUpdateManyProps = Prisma.CategoryUpdateManyArgs;
export type CategoryUpdateManyResponse = { count: number };

// Delete Many
export type CategoryDeleteManyProps = Prisma.CategoryDeleteManyArgs;
export type CategoryDeleteManyResponse = { count: number };
