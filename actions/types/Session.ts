import { Session } from "@prisma/client";
import { z, ZodString, ZodType } from "zod";

// ======================= //
// ==== Session Types ==== //
// ======================= //

/** Represents a complete session entity */
export type SessionType = Session;

/** Represents the session's unique identifier */
export type SessionId = Pick<Session, "id">;

/** Represents common session properties */
export type SessionCommon = Omit<Session, "id" | "createdAt" | "updatedAt">;

/** Represents data structure for updating a session */
export type SessionUpdate = {
  id: Session["id"];
  data: SessionCommon;
};

/** Represents system-managed timestamp fields */
export type SessionTimestamps = Pick<Session, "createdAt" | "updatedAt">;

// ===================== //
// ==== Zod Schemas ==== //
// ===================== //

export const sessionIdSchema: ZodString = z.string();
export const sessionIdObjectSchema: ZodType<SessionId> = z.object({ id: z.string() });

export const sessionCommonSchema: ZodType<SessionCommon> =
  z.object({
    token: z.string(),
    expiresAt: z.date(),
    ipAddress: z.string().nullable(),
    userAgent: z.string().nullable(),
    userId: z.string(),
  });

export const sessionTimestampsSchema: ZodType<SessionTimestamps> = z.object({
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const sessionUpdateSchema: ZodType<SessionUpdate> = z.object({
  id: sessionIdSchema,
  data: sessionCommonSchema,
});
