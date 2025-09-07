import { Prisma } from "@prisma/client";
import { InternalArgs } from "@prisma/client/runtime/library";

// ============== Utils ============== //

type Payload = Prisma.$VerificationPayload<InternalArgs>;

type Flatten<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

// ============== Model ============== //

/**
 * Verification native fields only
 */
export type VerificationFields = Flatten<Payload["scalars"]>;

/**
 * Verification relations fields only
 */
export type VerificationRelations = {
    [K in keyof Payload["objects"]]: Payload["objects"][K] extends Array<infer T>
        ? T extends { scalars: unknown }
            ? Flatten<T["scalars"]>[]
            : never
        : Payload["objects"][K] extends { scalars: unknown }
          ? Flatten<Payload["objects"][K]["scalars"]>
          : never;
};

/**
 * Verification native and relations fields
 */
export type VerificationComplete = Flatten<VerificationFields & VerificationRelations>;

/**
 * Verification count type
 */
export type VerificationCount = number;

// ============== Mutations ============== //

// Create
export type VerificationCreateProps = Prisma.VerificationCreateArgs;
export type VerificationCreateResponse<T extends VerificationCreateProps> = Prisma.VerificationGetPayload<T>;

// Upsert
export type VerificationUpsertProps = Prisma.VerificationUpsertArgs;
export type VerificationUpsertResponse<T extends VerificationUpsertProps> = Prisma.VerificationGetPayload<T>;

// Update
export type VerificationUpdateProps = Prisma.VerificationUpdateArgs;
export type VerificationUpdateResponse<T extends VerificationUpdateProps> = Prisma.VerificationGetPayload<T>;

// Delete
export type VerificationDeleteProps = Prisma.VerificationDeleteArgs;
export type VerificationDeleteResponse<T extends VerificationDeleteProps> = Prisma.VerificationGetPayload<T>;

// Create Many
export type VerificationCreateManyProps = Prisma.VerificationCreateManyArgs;
export type VerificationCreateManyResponse = { count: number };

// Update Many
export type VerificationUpdateManyProps = Prisma.VerificationUpdateManyArgs;
export type VerificationUpdateManyResponse = { count: number };

// Delete Many
export type VerificationDeleteManyProps = Prisma.VerificationDeleteManyArgs;
export type VerificationDeleteManyResponse = { count: number };
