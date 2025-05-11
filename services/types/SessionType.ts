// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { SessionCreateArgsSchema, SessionCreateManyArgsSchema, SessionDeleteArgsSchema, SessionDeleteManyArgsSchema, SessionFindFirstArgsSchema, SessionFindManyArgsSchema, SessionFindUniqueArgsSchema, SessionOrderByWithRelationInputSchema, SessionSchema, SessionUpdateArgsSchema, SessionUpdateManyArgsSchema, SessionUpsertArgsSchema, SessionWhereInputSchema, SessionWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type SessionModel = z.infer<typeof SessionSchema>;
export type SessionCount = number;

// ============== Props Types ============== //

// Single mutations
export type CreateSessionProps = Prisma.SessionCreateArgs;
export type UpsertSessionProps = Prisma.SessionUpsertArgs;
export type UpdateSessionProps = Prisma.SessionUpdateArgs;
export type DeleteSessionProps = Prisma.SessionDeleteArgs;

// Multiple mutations
export type CreateManySessionProps = Prisma.SessionCreateManyArgs;
export type UpdateManySessionProps = Prisma.SessionUpdateManyArgs;
export type DeleteManySessionProps = Prisma.SessionDeleteManyArgs;

// Single queries
export type FindFirstSessionProps = Prisma.SessionFindFirstArgs;
export type FindUniqueSessionProps = Prisma.SessionFindUniqueArgs;
export type FindManySessionProps = Prisma.SessionFindManyArgs;

// Multiple queries
export type CountSessionProps = Prisma.SessionCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const createSessionSchema: ZodType<CreateSessionProps> = SessionCreateArgsSchema;
export const upsertSessionSchema: ZodType<UpsertSessionProps> = SessionUpsertArgsSchema;
export const updateSessionSchema: ZodType<UpdateSessionProps> = SessionUpdateArgsSchema;
export const deleteSessionSchema: ZodType<DeleteSessionProps> = SessionDeleteArgsSchema;

// Multiple mutations
export const createManySessionSchema: ZodType<CreateManySessionProps> = SessionCreateManyArgsSchema;
export const updateManySessionSchema: ZodType<UpdateManySessionProps> = SessionUpdateManyArgsSchema;
export const deleteManySessionSchema: ZodType<DeleteManySessionProps> = SessionDeleteManyArgsSchema;

// Single queries
export const selectFirstSessionSchema: ZodType<FindFirstSessionProps> = SessionFindFirstArgsSchema;
export const selectUniqueSessionSchema: ZodType<FindUniqueSessionProps> = SessionFindUniqueArgsSchema;
export const selectManySessionSchema: ZodType<FindManySessionProps> = SessionFindManyArgsSchema;

// Aggregate queries
export const countSessionSchema: ZodType<CountSessionProps> =  z.object({
    where: z.lazy(() => SessionWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => SessionOrderByWithRelationInputSchema),
        z.array(z.lazy(() => SessionOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => SessionWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.string(), z.boolean())]).optional()
});

// ============== Response Types ============== //

// Single mutations
export type CreateSessionResponse<T extends CreateSessionProps> = Prisma.SessionGetPayload<T>;
export type UpsertSessionResponse<T extends UpsertSessionProps> = Prisma.SessionGetPayload<T>;
export type UpdateSessionResponse<T extends UpdateSessionProps> = Prisma.SessionGetPayload<T>;
export type DeleteSessionResponse<T extends DeleteSessionProps> = Prisma.SessionGetPayload<T>;

// Multiple mutations
export type CreateManySessionResponse = { count: number };
export type UpdateManySessionResponse = { count: number };
export type DeleteManySessionResponse = { count: number };

// Single queries
export type FindFirstSessionResponse<T extends FindFirstSessionProps> = Prisma.SessionGetPayload<T> | null;
export type FindUniqueSessionResponse<T extends FindUniqueSessionProps> = Prisma.SessionGetPayload<T> | null;
export type FindManySessionResponse<T extends FindManySessionProps> = Prisma.SessionGetPayload<T>[];

// Aggregate queries
export type CountSessionResponse = SessionCount;
