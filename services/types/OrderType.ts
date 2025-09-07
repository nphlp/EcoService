import { Prisma } from "@prisma/client";
import { InternalArgs } from "@prisma/client/runtime/library";

// ============== Utils ============== //

type Payload = Prisma.$OrderPayload<InternalArgs>;

type Flatten<T> = T extends infer U ? { [K in keyof U]: U[K] } : never;

// ============== Model ============== //

/**
 * Order native fields only
 */
export type OrderFields = Flatten<Payload["scalars"]>;

/**
 * Order relations fields only
 */
export type OrderRelations = {
    [K in keyof Payload["objects"]]: Payload["objects"][K] extends Array<infer T>
        ? T extends { scalars: unknown }
            ? Flatten<T["scalars"]>[]
            : never
        : Payload["objects"][K] extends { scalars: unknown }
          ? Flatten<Payload["objects"][K]["scalars"]>
          : never;
};

/**
 * Order native and relations fields
 */
export type OrderComplete = Flatten<OrderFields & OrderRelations>;

/**
 * Order count type
 */
export type OrderCount = number;

// ============== Mutations ============== //

// Create
export type OrderCreateProps = Prisma.OrderCreateArgs;
export type OrderCreateResponse<T extends OrderCreateProps> = Prisma.OrderGetPayload<T>;

// Upsert
export type OrderUpsertProps = Prisma.OrderUpsertArgs;
export type OrderUpsertResponse<T extends OrderUpsertProps> = Prisma.OrderGetPayload<T>;

// Update
export type OrderUpdateProps = Prisma.OrderUpdateArgs;
export type OrderUpdateResponse<T extends OrderUpdateProps> = Prisma.OrderGetPayload<T>;

// Delete
export type OrderDeleteProps = Prisma.OrderDeleteArgs;
export type OrderDeleteResponse<T extends OrderDeleteProps> = Prisma.OrderGetPayload<T>;

// Create Many
export type OrderCreateManyProps = Prisma.OrderCreateManyArgs;
export type OrderCreateManyResponse = { count: number };

// Update Many
export type OrderUpdateManyProps = Prisma.OrderUpdateManyArgs;
export type OrderUpdateManyResponse = { count: number };

// Delete Many
export type OrderDeleteManyProps = Prisma.OrderDeleteManyArgs;
export type OrderDeleteManyResponse = { count: number };
