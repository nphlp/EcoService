import { Prisma } from "@prisma/client";
import { InternalArgs } from "@prisma/client/runtime/library";

// ============== Utils ============== //

type Payload = Prisma.$UserPayload<InternalArgs>;

type Flatten<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

// ============== Model ============== //

/**
 * User native fields only
 */
export type UserFields = Flatten<Payload["scalars"]>;

/**
 * User relations fields only
 */
export type UserRelations = {
    [K in keyof Payload["objects"]]: Payload["objects"][K] extends Array<infer T>
        ? T extends { scalars: unknown }
            ? Flatten<T["scalars"]>[]
            : never
        : Payload["objects"][K] extends { scalars: unknown }
          ? Flatten<Payload["objects"][K]["scalars"]>
          : never;
};

/**
 * User native and relations fields
 */
export type UserComplete = Flatten<UserFields & UserRelations>;

/**
 * User count type
 */
export type UserCount = number;

// ============== Mutations ============== //

// Create
export type UserCreateProps = Prisma.UserCreateArgs;
export type UserCreateResponse<T extends UserCreateProps> = Prisma.UserGetPayload<T>;

// Upsert
export type UserUpsertProps = Prisma.UserUpsertArgs;
export type UserUpsertResponse<T extends UserUpsertProps> = Prisma.UserGetPayload<T>;

// Update
export type UserUpdateProps = Prisma.UserUpdateArgs;
export type UserUpdateResponse<T extends UserUpdateProps> = Prisma.UserGetPayload<T>;

// Delete
export type UserDeleteProps = Prisma.UserDeleteArgs;
export type UserDeleteResponse<T extends UserDeleteProps> = Prisma.UserGetPayload<T>;

// Create Many
export type UserCreateManyProps = Prisma.UserCreateManyArgs;
export type UserCreateManyResponse = { count: number };

// Update Many
export type UserUpdateManyProps = Prisma.UserUpdateManyArgs;
export type UserUpdateManyResponse = { count: number };

// Delete Many
export type UserDeleteManyProps = Prisma.UserDeleteManyArgs;
export type UserDeleteManyResponse = { count: number };
