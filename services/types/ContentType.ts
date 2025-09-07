import { Prisma } from "@prisma/client";
import { InternalArgs } from "@prisma/client/runtime/library";

// ============== Utils ============== //

type Payload = Prisma.$ContentPayload<InternalArgs>;

type Flatten<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

// ============== Model ============== //

/**
 * Content native fields only
 */
export type ContentFields = Flatten<Payload["scalars"]>;

/**
 * Content relations fields only
 */
export type ContentRelations = {
    [K in keyof Payload["objects"]]: Payload["objects"][K] extends Array<infer T>
        ? T extends { scalars: unknown }
            ? Flatten<T["scalars"]>[]
            : never
        : Payload["objects"][K] extends { scalars: unknown }
          ? Flatten<Payload["objects"][K]["scalars"]>
          : never;
};

/**
 * Content native and relations fields
 */
export type ContentComplete = Flatten<ContentFields & ContentRelations>;

/**
 * Content count type
 */
export type ContentCount = number;

// ============== Mutations ============== //

// Create
export type ContentCreateProps = Prisma.ContentCreateArgs;
export type ContentCreateResponse<T extends ContentCreateProps> = Prisma.ContentGetPayload<T>;

// Upsert
export type ContentUpsertProps = Prisma.ContentUpsertArgs;
export type ContentUpsertResponse<T extends ContentUpsertProps> = Prisma.ContentGetPayload<T>;

// Update
export type ContentUpdateProps = Prisma.ContentUpdateArgs;
export type ContentUpdateResponse<T extends ContentUpdateProps> = Prisma.ContentGetPayload<T>;

// Delete
export type ContentDeleteProps = Prisma.ContentDeleteArgs;
export type ContentDeleteResponse<T extends ContentDeleteProps> = Prisma.ContentGetPayload<T>;

// Create Many
export type ContentCreateManyProps = Prisma.ContentCreateManyArgs;
export type ContentCreateManyResponse = { count: number };

// Update Many
export type ContentUpdateManyProps = Prisma.ContentUpdateManyArgs;
export type ContentUpdateManyResponse = { count: number };

// Delete Many
export type ContentDeleteManyProps = Prisma.ContentDeleteManyArgs;
export type ContentDeleteManyResponse = { count: number };
