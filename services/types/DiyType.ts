// ============== Types ============== //

import { Prisma } from "@services/prisma";
import { DiyCreateArgsSchema, DiyDeleteArgsSchema, DiyFindManyArgsSchema, DiyFindUniqueArgsSchema, DiyOrderByWithRelationInputSchema, DiySchema, DiyUpdateArgsSchema, DiyUpsertArgsSchema, DiyWhereInputSchema, DiyWhereUniqueInputSchema, DiyWithRelationsSchema } from "@services/schemas";
import DiyIncludeSchema from "@services/schemas/inputTypeSchemas/DiyIncludeSchema";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type DiyModel = z.infer<typeof DiySchema>;
export type DiyRelationsOptional = z.infer<typeof DiySchema> & z.infer<typeof DiyIncludeSchema>;
export type DiyRelationsComplete = z.infer<typeof DiyWithRelationsSchema>;
export type DiyCount = number;

// ============== Props Types ============== //

export type CreateDiyProps = Prisma.DiyCreateArgs;
export type UpsertDiyProps = Prisma.DiyUpsertArgs;
export type UpdateDiyProps = Prisma.DiyUpdateArgs;
export type DeleteDiyProps = Prisma.DiyDeleteArgs;
export type FindUniqueDiyProps = Prisma.DiyFindUniqueArgs;
export type FindManyDiyProps = Prisma.DiyFindManyArgs;
export type CountDiyProps = Prisma.DiyCountArgs;

// ============== Schema Types ============== //

export const createDiySchema: ZodType<CreateDiyProps> = DiyCreateArgsSchema;
export const upsertDiySchema: ZodType<UpsertDiyProps> = DiyUpsertArgsSchema;
export const updateDiySchema: ZodType<UpdateDiyProps> = DiyUpdateArgsSchema;
export const deleteDiySchema: ZodType<DeleteDiyProps> = DiyDeleteArgsSchema;
export const selectDiySchema: ZodType<FindUniqueDiyProps> = DiyFindUniqueArgsSchema;
export const selectManyDiySchema: ZodType<FindManyDiyProps> = DiyFindManyArgsSchema;
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

export type CreateDiyResponse<T extends CreateDiyProps> = Prisma.DiyGetPayload<T>;
export type UpsertDiyResponse<T extends UpsertDiyProps> = Prisma.DiyGetPayload<T>;
export type UpdateDiyResponse<T extends UpdateDiyProps> = Prisma.DiyGetPayload<T>;
export type DeleteDiyResponse<T extends DeleteDiyProps> = Prisma.DiyGetPayload<T>;
export type FindUniqueDiyResponse<T extends FindUniqueDiyProps> = Prisma.DiyGetPayload<T> | null;
export type FindManyDiyResponse<T extends FindManyDiyProps> = Prisma.DiyGetPayload<T>[];
export type CountDiyResponse = DiyCount;
