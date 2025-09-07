import { Prisma } from "@prisma/client";
import { InternalArgs } from "@prisma/client/runtime/library";

// ============== Utils ============== //

type Payload = Prisma.$AddressPayload<InternalArgs>;

type Flatten<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

// ============== Model ============== //

/**
 * Address native fields only
 */
export type AddressFields = Flatten<Payload["scalars"]>;

/**
 * Address relations fields only
 */
export type AddressRelations = {
    [K in keyof Payload["objects"]]: Payload["objects"][K] extends Array<infer T>
        ? T extends { scalars: unknown }
            ? Flatten<T["scalars"]>[]
            : never
        : Payload["objects"][K] extends { scalars: unknown }
          ? Flatten<Payload["objects"][K]["scalars"]>
          : never;
};

/**
 * Address native and relations fields
 */
export type AddressComplete = Flatten<AddressFields & AddressRelations>;

/**
 * Address count type
 */
export type AddressCount = number;

// ============== Mutations ============== //

// Create
export type AddressCreateProps = Prisma.AddressCreateArgs;
export type AddressCreateResponse<T extends AddressCreateProps> = Prisma.AddressGetPayload<T>;

// Upsert
export type AddressUpsertProps = Prisma.AddressUpsertArgs;
export type AddressUpsertResponse<T extends AddressUpsertProps> = Prisma.AddressGetPayload<T>;

// Update
export type AddressUpdateProps = Prisma.AddressUpdateArgs;
export type AddressUpdateResponse<T extends AddressUpdateProps> = Prisma.AddressGetPayload<T>;

// Delete
export type AddressDeleteProps = Prisma.AddressDeleteArgs;
export type AddressDeleteResponse<T extends AddressDeleteProps> = Prisma.AddressGetPayload<T>;

// Create Many
export type AddressCreateManyProps = Prisma.AddressCreateManyArgs;
export type AddressCreateManyResponse = { count: number };

// Update Many
export type AddressUpdateManyProps = Prisma.AddressUpdateManyArgs;
export type AddressUpdateManyResponse = { count: number };

// Delete Many
export type AddressDeleteManyProps = Prisma.AddressDeleteManyArgs;
export type AddressDeleteManyResponse = { count: number };
