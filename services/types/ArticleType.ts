import { Prisma } from "@prisma/client";
import { InternalArgs } from "@prisma/client/runtime/library";

// ============== Utils ============== //

type Payload = Prisma.$ArticlePayload<InternalArgs>;

type Flatten<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

// ============== Model ============== //

/**
 * Article native fields only
 */
export type ArticleFields = Flatten<Payload["scalars"]>;

/**
 * Article relations fields only
 */
export type ArticleRelations = {
    [K in keyof Payload["objects"]]: Payload["objects"][K] extends Array<infer T>
        ? T extends { scalars: unknown }
            ? Flatten<T["scalars"]>[]
            : never
        : Payload["objects"][K] extends { scalars: unknown }
          ? Flatten<Payload["objects"][K]["scalars"]>
          : never;
};

/**
 * Article native and relations fields
 */
export type ArticleComplete = Flatten<ArticleFields & ArticleRelations>;

/**
 * Article count type
 */
export type ArticleCount = number;

// ============== Mutations ============== //

// Create
export type ArticleCreateProps = Prisma.ArticleCreateArgs;
export type ArticleCreateResponse<T extends ArticleCreateProps> = Prisma.ArticleGetPayload<T>;

// Upsert
export type ArticleUpsertProps = Prisma.ArticleUpsertArgs;
export type ArticleUpsertResponse<T extends ArticleUpsertProps> = Prisma.ArticleGetPayload<T>;

// Update
export type ArticleUpdateProps = Prisma.ArticleUpdateArgs;
export type ArticleUpdateResponse<T extends ArticleUpdateProps> = Prisma.ArticleGetPayload<T>;

// Delete
export type ArticleDeleteProps = Prisma.ArticleDeleteArgs;
export type ArticleDeleteResponse<T extends ArticleDeleteProps> = Prisma.ArticleGetPayload<T>;

// Create Many
export type ArticleCreateManyProps = Prisma.ArticleCreateManyArgs;
export type ArticleCreateManyResponse = { count: number };

// Update Many
export type ArticleUpdateManyProps = Prisma.ArticleUpdateManyArgs;
export type ArticleUpdateManyResponse = { count: number };

// Delete Many
export type ArticleDeleteManyProps = Prisma.ArticleDeleteManyArgs;
export type ArticleDeleteManyResponse = { count: number };
