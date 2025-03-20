/**
 * Classe de service pour les opérations CRUD sur les orders
 * 
 * Ce fichier centralise toute la logique d'accès aux données pour les orders.
 * Il utilise les schémas Zod générés par zod-prisma-types pour la validation des données.
 * Chaque méthode retourne soit les données demandées, soit une erreur formatée.
 * 
 * Les types sont définis pour correspondre aux opérations Prisma (create, update, delete, etc.)
 * et suivent une nomenclature cohérente avec l'API Prisma.
 */
import { ResponseFormat } from "@app/api/Routes";
import PrismaInstance from "@lib/prisma";
import { Prisma } from "@prisma/client";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    Order,
    OrderCreateArgsSchema,
    OrderDeleteArgsSchema,
    OrderFindManyArgsSchema,
    OrderFindUniqueArgsSchema,
    OrderOrderByWithRelationInputSchema,
    OrderSchema,
    OrderUpdateArgsSchema,
    OrderUpsertArgsSchema,
    OrderWhereInputSchema,
    OrderWhereUniqueInputSchema,
    OrderWithRelationsSchema
} from "@services/schemas";
import { OrderIncludeSchema } from "@services/schemas/inputTypeSchemas/OrderIncludeSchema";
import { z, ZodError, ZodType } from "zod";

// ============== Types ============== //

export type OrderModel = z.infer<typeof OrderSchema>;

export type OrderRelationsOptional = z.infer<typeof OrderSchema> & z.infer<typeof OrderIncludeSchema>;

export type OrderRelationsComplete = z.infer<typeof OrderWithRelationsSchema>;

export type OrderCount = number;

// ============== Schema Types ============== //

const createOrderSchema: ZodType<Prisma.OrderCreateArgs> = OrderCreateArgsSchema;

const upsertOrderSchema: ZodType<Prisma.OrderUpsertArgs> = OrderUpsertArgsSchema;

const updateOrderSchema: ZodType<Prisma.OrderUpdateArgs> = OrderUpdateArgsSchema;

const deleteOrderSchema: ZodType<Prisma.OrderDeleteArgs> = OrderDeleteArgsSchema;

const selectOrderSchema: ZodType<Prisma.OrderFindUniqueArgs> = OrderFindUniqueArgsSchema;

const selectManyOrderSchema: ZodType<Prisma.OrderFindManyArgs> = OrderFindManyArgsSchema;

/**
 * Définition du schéma pour OrderCountArgs
 * 
 * Ce schéma correspond au type Prisma.OrderCountArgs qui est défini comme:
 * Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
 *   select?: OrderCountAggregateInputType | true
 * }
 */
const countOrderSchema: ZodType<Prisma.OrderCountArgs> = z.object({
    where: z.lazy(() => OrderWhereInputSchema).optional(),
    orderBy: z.union([
        z.lazy(() => OrderOrderByWithRelationInputSchema),
        z.array(z.lazy(() => OrderOrderByWithRelationInputSchema))
    ]).optional(),
    cursor: z.lazy(() => OrderWhereUniqueInputSchema).optional(),
    take: z.number().optional(),
    skip: z.number().optional(),
    select: z.union([z.literal(true), z.record(z.boolean())]).optional()
});

// ============== CRUD Props Types ============== //

export type CreateOrderProps = z.infer<typeof createOrderSchema>;

export type UpsertOrderProps = z.infer<typeof upsertOrderSchema>;

export type UpdateOrderProps = z.infer<typeof updateOrderSchema>;

export type DeleteOrderProps = z.infer<typeof deleteOrderSchema>;

export type FindUniqueOrderProps = z.infer<typeof selectOrderSchema>;

export type FindManyOrderProps = z.infer<typeof selectManyOrderSchema>;

export type CountOrderProps = z.infer<typeof countOrderSchema>;

// ============== CRUD Response Types ============== //

export type CreateOrderResponse = OrderModel;

export type UpsertOrderResponse = OrderModel;

export type UpdateOrderResponse = OrderModel;

export type DeleteOrderResponse = OrderModel;

export type FindUniqueOrderResponse = OrderRelationsOptional | null;

export type FindManyOrderResponse = OrderRelationsOptional[];

export type CountOrderResponse = OrderCount;

// ============== Services ============== //

/**
 * Service pour les opérations de base de données sur les orders
 */
export class OrderService {
    /**
     * Crée un(e) nouveau/nouvelle order
     * @param props Propriétés du/de la order
     * @returns Order créé(e) ou erreur
     */
    static async create(props: CreateOrderProps): Promise<ResponseFormat<CreateOrderResponse>> {
        try {
            const { data, include, omit, select } = createOrderSchema.parse(props);

            const order: Order = await PrismaInstance.order.create({
                data,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: order };
        } catch (error) {
            console.error("OrderService -> Create -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("OrderService -> Create -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("OrderService -> Create -> Prisma error -> " + error.message);
                throw new Error("OrderService -> Create -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to create order..." };
        }
    }

    static async upsert(props: UpsertOrderProps): Promise<ResponseFormat<UpsertOrderResponse>> {
        try {
            const { create, update, where, include, omit, select } = upsertOrderSchema.parse(props);

            const order: Order = await PrismaInstance.order.upsert({
                create,
                update,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: order };
        } catch (error) {
            console.error("OrderService -> Upsert -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("OrderService -> Upsert -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("OrderService -> Upsert -> Prisma error -> " + error.message);
                throw new Error("OrderService -> Upsert -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to upsert order..." };
        }
    }

    /**
     * Met à jour un(e) order
     * @param props ID du/de la order et nouvelles données
     * @returns Order mis(e) à jour ou erreur
     */
    static async update(props: UpdateOrderProps): Promise<ResponseFormat<UpdateOrderResponse>> {
        try {
            const { data, where, include, omit, select } = updateOrderSchema.parse(props);

            const order: Order = await PrismaInstance.order.update({
                data,
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: order };
        } catch (error) {
            console.error("OrderService -> Update -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("OrderService -> Update -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("OrderService -> Update -> Prisma error -> " + error.message);
                throw new Error("OrderService -> Update -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to update order..." };
        }
    }

    /**
     * Supprime un(e) order
     * @param props ID du/de la order
     * @returns Order supprimé(e) ou erreur
     */
    static async delete(props: DeleteOrderProps): Promise<ResponseFormat<DeleteOrderResponse>> {
        try {
            const { where, include, omit, select } = deleteOrderSchema.parse(props);

            const order: Order = await PrismaInstance.order.delete({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: order };
        } catch (error) {
            console.error("OrderService -> Delete -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("OrderService -> Delete -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("OrderService -> Delete -> Prisma error -> " + error.message);
                throw new Error("OrderService -> Delete -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to delete order..." };
        }
    }

    /**
     * Récupère un(e) order par ID ou autre filtre
     */
    static async findUnique(props: FindUniqueOrderProps): Promise<ResponseFormat<FindUniqueOrderResponse>> {
        try {
            const { where, include, omit, select } = selectOrderSchema.parse(props);

            const order: OrderRelationsOptional | null = await PrismaInstance.order.findUnique({
                where,
                ...(include && { include }),
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: order };
        } catch (error) {
            console.error("OrderService -> FindUnique -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("OrderService -> FindUnique -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("OrderService -> FindUnique -> Prisma error -> " + error.message);
                throw new Error("OrderService -> FindUnique -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find order..." };
        }
    }

    /**
     * Récupère une liste de orders avec filtres
     */
    static async findMany(props: FindManyOrderProps): Promise<ResponseFormat<FindManyOrderResponse>> {
        try {
            const {
                cursor,
                distinct,
                include,
                omit,
                orderBy,
                select,
                skip = 0,
                take = 10,
                where,
            } = selectManyOrderSchema.parse(props);

            const orderList: OrderRelationsOptional[] = await PrismaInstance.order.findMany({
                ...(cursor && { cursor }),
                ...(distinct && { distinct }),
                ...(include && { include }),
                ...(omit && { omit }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: orderList };
        } catch (error) {
            console.error("OrderService -> FindMany -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("OrderService -> FindMany -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("OrderService -> FindMany -> Prisma error -> " + error.message);
                throw new Error("OrderService -> FindMany -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to find orders..." };
        }
    }

    /**
     * Compte les orders avec filtres
     */
    static async count(props: CountOrderProps): Promise<ResponseFormat<CountOrderResponse>> {
        try {
            const { cursor, orderBy, select, skip, take, where } = countOrderSchema.parse(props);

            const orderAmount: OrderCount = await PrismaInstance.order.count({
                ...(cursor && { cursor }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: orderAmount };
        } catch (error) {
            console.error("OrderService -> Count -> " + (error as Error).message);
            if (process.env.NODE_ENV === "development") {
                if (error instanceof ZodError)
                    throw new Error("OrderService -> Count -> Invalid Zod params -> " + error.message);
                if (error instanceof PrismaClientKnownRequestError)
                    throw new Error("OrderService -> Count -> Prisma error -> " + error.message);
                throw new Error("OrderService -> Count -> " + (error as Error).message);
            }
            // TODO: add logging
            return { error: "Unable to count orders..." };
        }
    }
}
