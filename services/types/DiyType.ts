// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { DiyCreateArgsSchema, DiyCreateManyArgsSchema, DiyDeleteArgsSchema, DiyDeleteManyArgsSchema, DiyFindFirstArgsSchema, DiyFindManyArgsSchema, DiyFindUniqueArgsSchema, DiyOrderByWithRelationInputSchema, DiySchema, DiyUpdateArgsSchema, DiyUpdateManyArgsSchema, DiyUpsertArgsSchema, DiyWhereInputSchema, DiyWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type DiyModel = z.infer<typeof DiySchema>;
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

// ============== Schema Types ============== //

// Single mutations
export const DiyCreateSchema: ZodType<DiyCreateProps> = DiyCreateArgsSchema;
export const DiyUpsertSchema: ZodType<DiyUpsertProps> = DiyUpsertArgsSchema;
export const DiyUpdateSchema: ZodType<DiyUpdateProps> = DiyUpdateArgsSchema;
export const DiyDeleteSchema: ZodType<DiyDeleteProps> = DiyDeleteArgsSchema;

// Multiple mutations
export const DiyCreateManySchema: ZodType<DiyCreateManyProps> = DiyCreateManyArgsSchema;
export const DiyUpdateManySchema: ZodType<DiyUpdateManyProps> = DiyUpdateManyArgsSchema;
export const DiyDeleteManySchema: ZodType<DiyDeleteManyProps> = DiyDeleteManyArgsSchema;

// Single queries
export const DiyFindFirstSchema: ZodType<DiyFindFirstProps> = DiyFindFirstArgsSchema;
export const DiyFindUniqueSchema: ZodType<DiyFindUniqueProps> = DiyFindUniqueArgsSchema;
export const DiyFindManySchema: ZodType<DiyFindManyProps> = DiyFindManyArgsSchema;

// Aggregate queries
export const DiyCountSchema: ZodType<DiyCountProps> =  z.object({
    where: z.lazy(() => DiyWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => DiyOrderByWithRelationInputSchema),
        z.array(z.lazy(() => DiyOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => DiyWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.string(), z.boolean())]).optional()
});

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
