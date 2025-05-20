// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { AddressCreateArgsSchema, AddressCreateManyArgsSchema, AddressDeleteArgsSchema, AddressDeleteManyArgsSchema, AddressFindFirstArgsSchema, AddressFindManyArgsSchema, AddressFindUniqueArgsSchema, AddressOrderByWithRelationInputSchema, AddressSchema, AddressUpdateArgsSchema, AddressUpdateManyArgsSchema, AddressUpsertArgsSchema, AddressWhereInputSchema, AddressWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type AddressModel = z.infer<typeof AddressSchema>;
export type AddressCount = number;

// ============== Props Types ============== //

// Single mutations
export type AddressCreateProps = Prisma.AddressCreateArgs;
export type AddressUpsertProps = Prisma.AddressUpsertArgs;
export type AddressUpdateProps = Prisma.AddressUpdateArgs;
export type AddressDeleteProps = Prisma.AddressDeleteArgs;

// Multiple mutations
export type AddressCreateManyProps = Prisma.AddressCreateManyArgs;
export type AddressUpdateManyProps = Prisma.AddressUpdateManyArgs;
export type AddressDeleteManyProps = Prisma.AddressDeleteManyArgs;

// Single queries
export type AddressFindFirstProps = Prisma.AddressFindFirstArgs;
export type AddressFindUniqueProps = Prisma.AddressFindUniqueArgs;
export type AddressFindManyProps = Prisma.AddressFindManyArgs;

// Multiple queries
export type AddressCountProps = Prisma.AddressCountArgs;

// ============== Schema Types ============== //

// Single mutations
export const AddressCreateSchema: ZodType<AddressCreateProps> = AddressCreateArgsSchema;
export const AddressUpsertSchema: ZodType<AddressUpsertProps> = AddressUpsertArgsSchema;
export const AddressUpdateSchema: ZodType<AddressUpdateProps> = AddressUpdateArgsSchema;
export const AddressDeleteSchema: ZodType<AddressDeleteProps> = AddressDeleteArgsSchema;

// Multiple mutations
export const AddressCreateManySchema: ZodType<AddressCreateManyProps> = AddressCreateManyArgsSchema;
export const AddressUpdateManySchema: ZodType<AddressUpdateManyProps> = AddressUpdateManyArgsSchema;
export const AddressDeleteManySchema: ZodType<AddressDeleteManyProps> = AddressDeleteManyArgsSchema;

// Single queries
export const AddressFindFirstSchema: ZodType<AddressFindFirstProps> = AddressFindFirstArgsSchema;
export const AddressFindUniqueSchema: ZodType<AddressFindUniqueProps> = AddressFindUniqueArgsSchema;
export const AddressFindManySchema: ZodType<AddressFindManyProps> = AddressFindManyArgsSchema;

// Aggregate queries
export const AddressCountSchema: ZodType<AddressCountProps> =  z.object({
    where: z.lazy(() => AddressWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => AddressOrderByWithRelationInputSchema),
        z.array(z.lazy(() => AddressOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => AddressWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.string(), z.boolean())]).optional()
});

// ============== Response Types ============== //

// Single mutations
export type AddressCreateResponse<T extends AddressCreateProps> = Prisma.AddressGetPayload<T>;
export type AddressUpsertResponse<T extends AddressUpsertProps> = Prisma.AddressGetPayload<T>;
export type AddressUpdateResponse<T extends AddressUpdateProps> = Prisma.AddressGetPayload<T>;
export type AddressDeleteResponse<T extends AddressDeleteProps> = Prisma.AddressGetPayload<T>;

// Multiple mutations
export type AddressCreateManyResponse = { count: number };
export type AddressUpdateManyResponse = { count: number };
export type AddressDeleteManyResponse = { count: number };

// Single queries
export type AddressFindFirstResponse<T extends AddressFindFirstProps> = Prisma.AddressGetPayload<T> | null;
export type AddressFindUniqueResponse<T extends AddressFindUniqueProps> = Prisma.AddressGetPayload<T> | null;
export type AddressFindManyResponse<T extends AddressFindManyProps> = Prisma.AddressGetPayload<T>[];

// Aggregate queries
export type AddressCountResponse = AddressCount;
