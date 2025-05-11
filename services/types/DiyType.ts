// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { DiyCreateArgsSchema, DiyCreateManyArgsSchema, DiyDeleteArgsSchema, DiyDeleteManyArgsSchema, DiyFindFirstArgsSchema, DiyFindManyArgsSchema, DiyFindUniqueArgsSchema, DiyOrderByWithRelationInputSchema, DiySchema, DiyUpdateArgsSchema, DiyUpdateManyArgsSchema, DiyUpsertArgsSchema, DiyWhereInputSchema, DiyWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type DiyModel = z.infer<typeof DiySchema>;
export type DiyCount = number;

// ============== Props Types ============== //

// Single mutations
export type CreateDiyProps = Prisma.DiyCreateArgs;
export type UpsertDiyProps = Prisma.DiyUpsertArgs;
export type UpdateDiyProps = Prisma.DiyUpdateArgs;
export type DeleteDiyProps = Prisma.DiyDeleteArgs;

// Multiple mutations
export type CreateManyDiyProps = Prisma.DiyCreateManyArgs;
export type UpdateManyDiyProps = Prisma.DiyUpdateManyArgs;
export type DeleteManyDiyProps = Prisma.DiyDeleteManyArgs;

// Single queries
export type FindFirstDiyProps = Prisma.DiyFindFirstArgs;
export type FindUniqueDiyProps = Prisma.DiyFindUniqueArgs;
export type FindManyDiyProps = Prisma.DiyFindManyArgs;

// Multiple queries
export type CountDiyProps = Prisma.DiyCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const createDiySchema: ZodType<CreateDiyProps> = DiyCreateArgsSchema;
export const upsertDiySchema: ZodType<UpsertDiyProps> = DiyUpsertArgsSchema;
export const updateDiySchema: ZodType<UpdateDiyProps> = DiyUpdateArgsSchema;
export const deleteDiySchema: ZodType<DeleteDiyProps> = DiyDeleteArgsSchema;

// Multiple mutations
export const createManyDiySchema: ZodType<CreateManyDiyProps> = DiyCreateManyArgsSchema;
export const updateManyDiySchema: ZodType<UpdateManyDiyProps> = DiyUpdateManyArgsSchema;
export const deleteManyDiySchema: ZodType<DeleteManyDiyProps> = DiyDeleteManyArgsSchema;

// Single queries
export const selectFirstDiySchema: ZodType<FindFirstDiyProps> = DiyFindFirstArgsSchema;
export const selectUniqueDiySchema: ZodType<FindUniqueDiyProps> = DiyFindUniqueArgsSchema;
export const selectManyDiySchema: ZodType<FindManyDiyProps> = DiyFindManyArgsSchema;

// Aggregate queries
export const countDiySchema: ZodType<CountDiyProps> =  z.object({
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
export type CreateDiyResponse<T extends CreateDiyProps> = Prisma.DiyGetPayload<T>;
export type UpsertDiyResponse<T extends UpsertDiyProps> = Prisma.DiyGetPayload<T>;
export type UpdateDiyResponse<T extends UpdateDiyProps> = Prisma.DiyGetPayload<T>;
export type DeleteDiyResponse<T extends DeleteDiyProps> = Prisma.DiyGetPayload<T>;

// Multiple mutations
export type CreateManyDiyResponse = { count: number };
export type UpdateManyDiyResponse = { count: number };
export type DeleteManyDiyResponse = { count: number };

// Single queries
export type FindFirstDiyResponse<T extends FindFirstDiyProps> = Prisma.DiyGetPayload<T> | null;
export type FindUniqueDiyResponse<T extends FindUniqueDiyProps> = Prisma.DiyGetPayload<T> | null;
export type FindManyDiyResponse<T extends FindManyDiyProps> = Prisma.DiyGetPayload<T>[];

// Aggregate queries
export type CountDiyResponse = DiyCount;
