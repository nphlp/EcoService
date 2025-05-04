// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { SessionCreateArgsSchema, SessionDeleteArgsSchema, SessionFindFirstArgsSchema, SessionFindManyArgsSchema, SessionFindUniqueArgsSchema, SessionOrderByWithRelationInputSchema, SessionSchema, SessionUpdateArgsSchema, SessionUpsertArgsSchema, SessionWhereInputSchema, SessionWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type SessionModel = z.infer<typeof SessionSchema>;
export type SessionCount = number;

// ============== Props Types ============== //

export type CreateSessionProps = Prisma.SessionCreateArgs;
export type UpsertSessionProps = Prisma.SessionUpsertArgs;
export type UpdateSessionProps = Prisma.SessionUpdateArgs;
export type DeleteSessionProps = Prisma.SessionDeleteArgs;
export type FindFirstSessionProps = Prisma.SessionFindFirstArgs;
export type FindUniqueSessionProps = Prisma.SessionFindUniqueArgs;
export type FindManySessionProps = Prisma.SessionFindManyArgs;
export type CountSessionProps = Prisma.SessionCountArgs;

// ============== Schema Types ============== //

export const createSessionSchema: ZodType<CreateSessionProps> = SessionCreateArgsSchema;
export const upsertSessionSchema: ZodType<UpsertSessionProps> = SessionUpsertArgsSchema;
export const updateSessionSchema: ZodType<UpdateSessionProps> = SessionUpdateArgsSchema;
export const deleteSessionSchema: ZodType<DeleteSessionProps> = SessionDeleteArgsSchema;
export const selectFirstSessionSchema: ZodType<FindFirstSessionProps> = SessionFindFirstArgsSchema;
export const selectUniqueSessionSchema: ZodType<FindUniqueSessionProps> = SessionFindUniqueArgsSchema;
export const selectManySessionSchema: ZodType<FindManySessionProps> = SessionFindManyArgsSchema;
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

export type CreateSessionResponse<T extends CreateSessionProps> = Prisma.SessionGetPayload<T>;
export type UpsertSessionResponse<T extends UpsertSessionProps> = Prisma.SessionGetPayload<T>;
export type UpdateSessionResponse<T extends UpdateSessionProps> = Prisma.SessionGetPayload<T>;
export type DeleteSessionResponse<T extends DeleteSessionProps> = Prisma.SessionGetPayload<T>;
export type FindFirstSessionResponse<T extends FindFirstSessionProps> = Prisma.SessionGetPayload<T> | null;
export type FindUniqueSessionResponse<T extends FindUniqueSessionProps> = Prisma.SessionGetPayload<T> | null;
export type FindManySessionResponse<T extends FindManySessionProps> = Prisma.SessionGetPayload<T>[];
export type CountSessionResponse = SessionCount;
