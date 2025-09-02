// ============== Types ============== //

import { Quantity, Prisma } from "@prisma/client";

// ============== Model Types ============== //

export type QuantityModel = Quantity;
export type QuantityCount = number;

// ============== Props Types ============== //

// Single mutations
export type QuantityCreateProps = Prisma.QuantityCreateArgs;
export type QuantityUpsertProps = Prisma.QuantityUpsertArgs;
export type QuantityUpdateProps = Prisma.QuantityUpdateArgs;
export type QuantityDeleteProps = Prisma.QuantityDeleteArgs;

// Multiple mutations
export type QuantityCreateManyProps = Prisma.QuantityCreateManyArgs;
export type QuantityUpdateManyProps = Prisma.QuantityUpdateManyArgs;
export type QuantityDeleteManyProps = Prisma.QuantityDeleteManyArgs;

// Single queries
export type QuantityFindFirstProps = Prisma.QuantityFindFirstArgs;
export type QuantityFindUniqueProps = Prisma.QuantityFindUniqueArgs;
export type QuantityFindManyProps = Prisma.QuantityFindManyArgs;

// Multiple queries
export type QuantityCountProps = Prisma.QuantityCountArgs;

// ============== Response Types ============== //

// Single mutations
export type QuantityCreateResponse<T extends QuantityCreateProps> = Prisma.QuantityGetPayload<T>;
export type QuantityUpsertResponse<T extends QuantityUpsertProps> = Prisma.QuantityGetPayload<T>;
export type QuantityUpdateResponse<T extends QuantityUpdateProps> = Prisma.QuantityGetPayload<T>;
export type QuantityDeleteResponse<T extends QuantityDeleteProps> = Prisma.QuantityGetPayload<T>;

// Multiple mutations
export type QuantityCreateManyResponse = { count: number };
export type QuantityUpdateManyResponse = { count: number };
export type QuantityDeleteManyResponse = { count: number };

// Single queries
export type QuantityFindFirstResponse<T extends QuantityFindFirstProps> = Prisma.QuantityGetPayload<T> | null;
export type QuantityFindUniqueResponse<T extends QuantityFindUniqueProps> = Prisma.QuantityGetPayload<T> | null;
export type QuantityFindManyResponse<T extends QuantityFindManyProps> = Prisma.QuantityGetPayload<T>[];

// Aggregate queries
export type QuantityCountResponse = QuantityCount;
