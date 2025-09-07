import { Prisma } from "@prisma/client";
import { InternalArgs } from "@prisma/client/runtime/library";

// ============== Utils ============== //

type Payload = Prisma.$SessionPayload<InternalArgs>;

type Flatten<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

// ============== Model ============== //

/**
 * Session native fields only
 */
export type SessionFields = Flatten<Payload["scalars"]>;

/**
 * Session relations fields only
 */
export type SessionRelations = {
    [K in keyof Payload["objects"]]: Payload["objects"][K] extends Array<infer T>
        ? T extends { scalars: unknown }
            ? Flatten<T["scalars"]>[]
            : never
        : Payload["objects"][K] extends { scalars: unknown }
          ? Flatten<Payload["objects"][K]["scalars"]>
          : never;
};

/**
 * Session native and relations fields
 */
export type SessionComplete = Flatten<SessionFields & SessionRelations>;

/**
 * Session count type
 */
export type SessionCount = number;

// ============== Mutations ============== //

// Create
export type SessionCreateProps = Prisma.SessionCreateArgs;
export type SessionCreateResponse<T extends SessionCreateProps> = Prisma.SessionGetPayload<T>;

// Upsert
export type SessionUpsertProps = Prisma.SessionUpsertArgs;
export type SessionUpsertResponse<T extends SessionUpsertProps> = Prisma.SessionGetPayload<T>;

// Update
export type SessionUpdateProps = Prisma.SessionUpdateArgs;
export type SessionUpdateResponse<T extends SessionUpdateProps> = Prisma.SessionGetPayload<T>;

// Delete
export type SessionDeleteProps = Prisma.SessionDeleteArgs;
export type SessionDeleteResponse<T extends SessionDeleteProps> = Prisma.SessionGetPayload<T>;

// Create Many
export type SessionCreateManyProps = Prisma.SessionCreateManyArgs;
export type SessionCreateManyResponse = { count: number };

// Update Many
export type SessionUpdateManyProps = Prisma.SessionUpdateManyArgs;
export type SessionUpdateManyResponse = { count: number };

// Delete Many
export type SessionDeleteManyProps = Prisma.SessionDeleteManyArgs;
export type SessionDeleteManyResponse = { count: number };
