// ============== Types ============== //

import { Verification, Prisma } from "@prisma/client";

// ============== Model Types ============== //

export type VerificationModel = Verification;
export type VerificationCount = number;

// ============== Props Types ============== //

// Single mutations
export type VerificationCreateProps = Prisma.VerificationCreateArgs;
export type VerificationUpsertProps = Prisma.VerificationUpsertArgs;
export type VerificationUpdateProps = Prisma.VerificationUpdateArgs;
export type VerificationDeleteProps = Prisma.VerificationDeleteArgs;

// Multiple mutations
export type VerificationCreateManyProps = Prisma.VerificationCreateManyArgs;
export type VerificationUpdateManyProps = Prisma.VerificationUpdateManyArgs;
export type VerificationDeleteManyProps = Prisma.VerificationDeleteManyArgs;

// Single queries
export type VerificationFindFirstProps = Prisma.VerificationFindFirstArgs;
export type VerificationFindUniqueProps = Prisma.VerificationFindUniqueArgs;
export type VerificationFindManyProps = Prisma.VerificationFindManyArgs;

// Multiple queries
export type VerificationCountProps = Prisma.VerificationCountArgs;

// ============== Response Types ============== //

// Single mutations
export type VerificationCreateResponse<T extends VerificationCreateProps> = Prisma.VerificationGetPayload<T>;
export type VerificationUpsertResponse<T extends VerificationUpsertProps> = Prisma.VerificationGetPayload<T>;
export type VerificationUpdateResponse<T extends VerificationUpdateProps> = Prisma.VerificationGetPayload<T>;
export type VerificationDeleteResponse<T extends VerificationDeleteProps> = Prisma.VerificationGetPayload<T>;

// Multiple mutations
export type VerificationCreateManyResponse = { count: number };
export type VerificationUpdateManyResponse = { count: number };
export type VerificationDeleteManyResponse = { count: number };

// Single queries
export type VerificationFindFirstResponse<T extends VerificationFindFirstProps> = Prisma.VerificationGetPayload<T> | null;
export type VerificationFindUniqueResponse<T extends VerificationFindUniqueProps> = Prisma.VerificationGetPayload<T> | null;
export type VerificationFindManyResponse<T extends VerificationFindManyProps> = Prisma.VerificationGetPayload<T>[];

// Aggregate queries
export type VerificationCountResponse = VerificationCount;
