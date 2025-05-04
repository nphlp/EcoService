import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { OrderCount, CountOrderProps, CountOrderResponse, CreateOrderProps, CreateOrderResponse, DeleteOrderProps, DeleteOrderResponse, FindManyOrderProps, FindManyOrderResponse, FindUniqueOrderProps, FindUniqueOrderResponse, UpdateOrderProps, UpdateOrderResponse, UpsertOrderProps, UpsertOrderResponse, countOrderSchema, createOrderSchema, deleteOrderSchema, selectFirstOrderSchema, selectManyOrderSchema, selectUniqueOrderSchema, updateOrderSchema, upsertOrderSchema, FindFirstOrderProps, FindFirstOrderResponse } from "@services/types/OrderType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class OrderService {
    static async create<T extends CreateOrderProps>(props: T): Promise<ResponseFormat<CreateOrderResponse<T>>> {
        try {
            const parsedProps = createOrderSchema.parse(props);
            const order = await PrismaInstance.order.create(parsedProps);
            return { data: order as CreateOrderResponse<T> };
        } catch (error) {
            return OrderService.error("create", error);
        }
    }

    static async upsert<T extends UpsertOrderProps>(props: T): Promise<ResponseFormat<UpsertOrderResponse<T>>> {
        try {
            const parsedProps = upsertOrderSchema.parse(props);
            const order = await PrismaInstance.order.upsert(parsedProps);
            return { data: order as UpsertOrderResponse<T> };
        } catch (error) {
            return OrderService.error("upsert", error);
        }
    }

    static async update<T extends UpdateOrderProps>(props: T): Promise<ResponseFormat<UpdateOrderResponse<T>>> {
        try {
            const parsedProps = updateOrderSchema.parse(props);
            const order = await PrismaInstance.order.update(parsedProps);
            return { data: order as UpdateOrderResponse<T> };
        } catch (error) {
            return OrderService.error("update", error);
        }
    }

    static async delete<T extends DeleteOrderProps>(props: T): Promise<ResponseFormat<DeleteOrderResponse<T>>> {
        try {
            const parsedProps = deleteOrderSchema.parse(props);
            const order = await PrismaInstance.order.delete(parsedProps);
            return { data: order as DeleteOrderResponse<T> };
        } catch (error) {
            return OrderService.error("delete", error);
        }
    }

    static async findFirst<T extends FindFirstOrderProps>(props: T): Promise<ResponseFormat<FindFirstOrderResponse<T>>> {
        try {
            const parsedProps = selectFirstOrderSchema.parse(props);
            const order = await PrismaInstance.order.findFirst(parsedProps);
            return { data: order as FindFirstOrderResponse<T> };
        } catch (error) {
            return OrderService.error("findFirst", error);
        }
    }

    static async findUnique<T extends FindUniqueOrderProps>(props: T): Promise<ResponseFormat<FindUniqueOrderResponse<T>>> {
        try {
            const parsedProps = selectUniqueOrderSchema.parse(props);
            const order = await PrismaInstance.order.findUnique(parsedProps);
            return { data: order as FindUniqueOrderResponse<T> };
        } catch (error) {
            return OrderService.error("findUnique", error);
        }
    }

    static async findMany<T extends FindManyOrderProps>(props: T): Promise<ResponseFormat<FindManyOrderResponse<T>>> {
        try {
            const parsedProps = selectManyOrderSchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const orderList = await PrismaInstance.order.findMany({ skip, take, ...parsedProps });
            return { data: orderList as FindManyOrderResponse<T> };
        } catch (error) {
            return OrderService.error("findMany", error);
        }
    }

    static async count(props: CountOrderProps): Promise<ResponseFormat<CountOrderResponse>> {
        try {
            const parsedProps = countOrderSchema.parse(props);
            const orderAmount: OrderCount = await PrismaInstance.order.count(parsedProps);
            return { data: orderAmount };
        } catch (error) {
            return OrderService.error("count", error);
        }
    }

    static async error(methodName: string, error: unknown): Promise<{error: string}> {
        if (process.env.NODE_ENV === "development") {
            const serviceName = this.constructor.name;
            const message = (error as Error).message;
            if (error instanceof ZodError){
                const zodMessage = serviceName + " -> " + methodName + " -> Invalid Zod params -> " + error.message;
                console.error(zodMessage);
                throw new Error(zodMessage);
            } else if (error instanceof PrismaClientKnownRequestError){
                const prismaMessage = serviceName + " -> " + methodName + " -> Prisma error -> " + error.message;
                console.error(prismaMessage);
                throw new Error(prismaMessage);
            } else {
                const errorMessage = serviceName + " -> " + methodName + " -> " + message;
                console.error(errorMessage);
                throw new Error(errorMessage);
            }
        }
        // TODO: add logging
        return { error: "Something went wrong..." };
    }
}
