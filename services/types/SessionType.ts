// ============== Types ============== //

import { Session, Prisma } from "@prisma/client";

// ============== Model Types ============== //

export type SessionModel = Session;
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
