// ============== Types ============== //

import { Address, Prisma } from "@prisma/client";

// ============== Model Types ============== //

export type AddressModel = Address;
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
