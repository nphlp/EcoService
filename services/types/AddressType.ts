// ============== Types ============== //

import { Prisma } from "@prisma/client";
import { AddressCreateArgsSchema, AddressDeleteArgsSchema, AddressFindFirstArgsSchema, AddressFindManyArgsSchema, AddressFindUniqueArgsSchema, AddressOrderByWithRelationInputSchema, AddressSchema, AddressUpdateArgsSchema, AddressUpsertArgsSchema, AddressWhereInputSchema, AddressWhereUniqueInputSchema,  } from "@prisma/zod";
import { z, ZodType } from "zod";

// ============== Model Types ============== //

export type AddressModel = z.infer<typeof AddressSchema>;
export type AddressCount = number;

// ============== Props Types ============== //

export type CreateAddressProps = Prisma.AddressCreateArgs;
export type UpsertAddressProps = Prisma.AddressUpsertArgs;
export type UpdateAddressProps = Prisma.AddressUpdateArgs;
export type DeleteAddressProps = Prisma.AddressDeleteArgs;
export type FindFirstAddressProps = Prisma.AddressFindFirstArgs;
export type FindUniqueAddressProps = Prisma.AddressFindUniqueArgs;
export type FindManyAddressProps = Prisma.AddressFindManyArgs;
export type CountAddressProps = Prisma.AddressCountArgs;

// ============== Schema Types ============== //

export const createAddressSchema: ZodType<CreateAddressProps> = AddressCreateArgsSchema;
export const upsertAddressSchema: ZodType<UpsertAddressProps> = AddressUpsertArgsSchema;
export const updateAddressSchema: ZodType<UpdateAddressProps> = AddressUpdateArgsSchema;
export const deleteAddressSchema: ZodType<DeleteAddressProps> = AddressDeleteArgsSchema;
export const selectFirstAddressSchema: ZodType<FindFirstAddressProps> = AddressFindFirstArgsSchema;
export const selectUniqueAddressSchema: ZodType<FindUniqueAddressProps> = AddressFindUniqueArgsSchema;
export const selectManyAddressSchema: ZodType<FindManyAddressProps> = AddressFindManyArgsSchema;
export const countAddressSchema: ZodType<CountAddressProps> =  z.object({
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

export type CreateAddressResponse<T extends CreateAddressProps> = Prisma.AddressGetPayload<T>;
export type UpsertAddressResponse<T extends UpsertAddressProps> = Prisma.AddressGetPayload<T>;
export type UpdateAddressResponse<T extends UpdateAddressProps> = Prisma.AddressGetPayload<T>;
export type DeleteAddressResponse<T extends DeleteAddressProps> = Prisma.AddressGetPayload<T>;
export type FindFirstAddressResponse<T extends FindFirstAddressProps> = Prisma.AddressGetPayload<T> | null;
export type FindUniqueAddressResponse<T extends FindUniqueAddressProps> = Prisma.AddressGetPayload<T> | null;
export type FindManyAddressResponse<T extends FindManyAddressProps> = Prisma.AddressGetPayload<T>[];
export type CountAddressResponse = AddressCount;
