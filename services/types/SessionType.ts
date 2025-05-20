// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { SessionCreateArgsSchema, SessionCreateManyArgsSchema, SessionDeleteArgsSchema, SessionDeleteManyArgsSchema, SessionFindFirstArgsSchema, SessionFindManyArgsSchema, SessionFindUniqueArgsSchema, SessionOrderByWithRelationInputSchema, SessionSchema, SessionUpdateArgsSchema, SessionUpdateManyArgsSchema, SessionUpsertArgsSchema, SessionWhereInputSchema, SessionWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type SessionModel = z.infer<typeof SessionSchema>;
export type SessionCount = number;

// ============== Props Types ============== //

// Single mutations
export type SessionCreateProps = Prisma.SessionCreateArgs;
export type SessionUpsertProps = Prisma.SessionUpsertArgs;
export type SessionUpdateProps = Prisma.SessionUpdateArgs;
export type SessionDeleteProps = Prisma.SessionDeleteArgs;

// Multiple mutations
export type SessionCreateManyProps = Prisma.SessionCreateManyArgs;
export type SessionUpdateManyProps = Prisma.SessionUpdateManyArgs;
export type SessionDeleteManyProps = Prisma.SessionDeleteManyArgs;

// Single queries
export type SessionFindFirstProps = Prisma.SessionFindFirstArgs;
export type SessionFindUniqueProps = Prisma.SessionFindUniqueArgs;
export type SessionFindManyProps = Prisma.SessionFindManyArgs;

// Multiple queries
export type SessionCountProps = Prisma.SessionCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const SessionCreateSchema: ZodType<SessionCreateProps> = SessionCreateArgsSchema;
export const SessionUpsertSchema: ZodType<SessionUpsertProps> = SessionUpsertArgsSchema;
export const SessionUpdateSchema: ZodType<SessionUpdateProps> = SessionUpdateArgsSchema;
export const SessionDeleteSchema: ZodType<SessionDeleteProps> = SessionDeleteArgsSchema;

// Multiple mutations
export const SessionCreateManySchema: ZodType<SessionCreateManyProps> = SessionCreateManyArgsSchema;
export const SessionUpdateManySchema: ZodType<SessionUpdateManyProps> = SessionUpdateManyArgsSchema;
export const SessionDeleteManySchema: ZodType<SessionDeleteManyProps> = SessionDeleteManyArgsSchema;

// Single queries
export const SessionFindFirstSchema: ZodType<SessionFindFirstProps> = SessionFindFirstArgsSchema;
export const SessionFindUniqueSchema: ZodType<SessionFindUniqueProps> = SessionFindUniqueArgsSchema;
export const SessionFindManySchema: ZodType<SessionFindManyProps> = SessionFindManyArgsSchema;

// Aggregate queries
export const SessionCountSchema: ZodType<SessionCountProps> =  z.object({
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
export type SessionCreateResponse<T extends SessionCreateProps> = Prisma.SessionGetPayload<T>;
export type SessionUpsertResponse<T extends SessionUpsertProps> = Prisma.SessionGetPayload<T>;
export type SessionUpdateResponse<T extends SessionUpdateProps> = Prisma.SessionGetPayload<T>;
export type SessionDeleteResponse<T extends SessionDeleteProps> = Prisma.SessionGetPayload<T>;

// Multiple mutations
export type SessionCreateManyResponse = { count: number };
export type SessionUpdateManyResponse = { count: number };
export type SessionDeleteManyResponse = { count: number };

// Single queries
export type SessionFindFirstResponse<T extends SessionFindFirstProps> = Prisma.SessionGetPayload<T> | null;
export type SessionFindUniqueResponse<T extends SessionFindUniqueProps> = Prisma.SessionGetPayload<T> | null;
export type SessionFindManyResponse<T extends SessionFindManyProps> = Prisma.SessionGetPayload<T>[];

// Aggregate queries
export type SessionCountResponse = SessionCount;
