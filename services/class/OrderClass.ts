import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { OrderCount, CountOrderProps, CountOrderResponse, CreateOrderProps, CreateOrderResponse, DeleteOrderProps, DeleteOrderResponse, FindManyOrderProps, FindManyOrderResponse, FindUniqueOrderProps, FindUniqueOrderResponse, UpdateOrderProps, UpdateOrderResponse, UpsertOrderProps, UpsertOrderResponse, countOrderSchema, createOrderSchema, deleteOrderSchema, selectOrderSchema, selectManyOrderSchema, updateOrderSchema, upsertOrderSchema } from "@services/types/OrderType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class OrderService {
    static async create<T extends CreateOrderProps>(props: T): Promise<ResponseFormat<CreateOrderResponse<T>>> {
        try {
            const { data, omit, select } = createOrderSchema.parse(props);

            const order = await PrismaInstance.order.create({
                data,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: order as CreateOrderResponse<T> };
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

    static async upsert<T extends UpsertOrderProps>(props: T): Promise<ResponseFormat<UpsertOrderResponse<T>>> {
        try {
            const { create, update, where, omit, select } = upsertOrderSchema.parse(props);

            const order = await PrismaInstance.order.upsert({
                create,
                update,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: order as UpsertOrderResponse<T> };
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

    static async update<T extends UpdateOrderProps>(props: T): Promise<ResponseFormat<UpdateOrderResponse<T>>> {
        try {
            const { data, where, omit, select } = updateOrderSchema.parse(props);

            const order = await PrismaInstance.order.update({
                data,
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: order as UpdateOrderResponse<T> };
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

    static async delete<T extends DeleteOrderProps>(props: T): Promise<ResponseFormat<DeleteOrderResponse<T>>> {
        try {
            const { where, omit, select } = deleteOrderSchema.parse(props);

            const order = await PrismaInstance.order.delete({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: order as DeleteOrderResponse<T> };
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

    static async findUnique<T extends FindUniqueOrderProps>(props: T): Promise<ResponseFormat<FindUniqueOrderResponse<T>>> {
        try {
            const { where, omit, select } = selectOrderSchema.parse(props);

            const order = await PrismaInstance.order.findUnique({
                where,
                
                ...(omit && { omit }),
                ...(select && { select }),
            });

            return { data: order as FindUniqueOrderResponse<T> };
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

    static async findMany<T extends FindManyOrderProps>(props: T): Promise<ResponseFormat<FindManyOrderResponse<T>>> {
        try {
            const {
                cursor,
                distinct,
                
                omit,
                orderBy,
                select,
                skip = 0,
                take = 10,
                where,
            } = selectManyOrderSchema.parse(props);

            const orderList = await PrismaInstance.order.findMany({
                ...(cursor && { cursor }),
                ...(distinct && { distinct }),
                
                ...(omit && { omit }),
                ...(orderBy && { orderBy }),
                ...(select && { select }),
                ...(skip && { skip }),
                ...(take && { take }),
                ...(where && { where }),
            });

            return { data: orderList as FindManyOrderResponse<T> };
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
