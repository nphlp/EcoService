// ============== Types ============== //

import { Diy, Prisma } from "@prisma/client";

// ============== Model Types ============== //

export type DiyModel = Diy;
export type DiyCount = number;

// ============== Props Types ============== //

// Single mutations
export type DiyCreateProps = Prisma.DiyCreateArgs;
export type DiyUpsertProps = Prisma.DiyUpsertArgs;
export type DiyUpdateProps = Prisma.DiyUpdateArgs;
export type DiyDeleteProps = Prisma.DiyDeleteArgs;

// Multiple mutations
export type DiyCreateManyProps = Prisma.DiyCreateManyArgs;
export type DiyUpdateManyProps = Prisma.DiyUpdateManyArgs;
export type DiyDeleteManyProps = Prisma.DiyDeleteManyArgs;

// Single queries
export type DiyFindFirstProps = Prisma.DiyFindFirstArgs;
export type DiyFindUniqueProps = Prisma.DiyFindUniqueArgs;
export type DiyFindManyProps = Prisma.DiyFindManyArgs;

// Multiple queries
export type DiyCountProps = Prisma.DiyCountArgs;

// ============== Response Types ============== //

// Single mutations
export type DiyCreateResponse<T extends DiyCreateProps> = Prisma.DiyGetPayload<T>;
export type DiyUpsertResponse<T extends DiyUpsertProps> = Prisma.DiyGetPayload<T>;
export type DiyUpdateResponse<T extends DiyUpdateProps> = Prisma.DiyGetPayload<T>;
export type DiyDeleteResponse<T extends DiyDeleteProps> = Prisma.DiyGetPayload<T>;

// Multiple mutations
export type DiyCreateManyResponse = { count: number };
export type DiyUpdateManyResponse = { count: number };
export type DiyDeleteManyResponse = { count: number };

// Single queries
export type DiyFindFirstResponse<T extends DiyFindFirstProps> = Prisma.DiyGetPayload<T> | null;
export type DiyFindUniqueResponse<T extends DiyFindUniqueProps> = Prisma.DiyGetPayload<T> | null;
export type DiyFindManyResponse<T extends DiyFindManyProps> = Prisma.DiyGetPayload<T>[];

// Aggregate queries
export type DiyCountResponse = DiyCount;
