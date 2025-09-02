import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { OrderCount, OrderCountProps, OrderCountResponse, OrderCreateManyProps, OrderCreateManyResponse, OrderCreateProps, OrderCreateResponse, OrderDeleteManyProps, OrderDeleteManyResponse, OrderDeleteProps, OrderDeleteResponse, OrderFindFirstProps, OrderFindFirstResponse, OrderFindManyProps, OrderFindManyResponse, OrderFindUniqueProps, OrderFindUniqueResponse, OrderUpdateManyProps, OrderUpdateManyResponse, OrderUpdateProps, OrderUpdateResponse, OrderUpsertProps, OrderUpsertResponse } from "@services/types/OrderType";
import { ResponseFormat } from "@utils/FetchConfig";

export default class OrderService {

    // ========== Single mutations ========== //

    static async create<T extends OrderCreateProps>(props: T): Promise<ResponseFormat<OrderCreateResponse<T>>> {
        try {
            const order = await PrismaInstance.order.create(props);
            return { data: order as OrderCreateResponse<T> };
        } catch (error) {
            return OrderService.error("create", error);
        }
    }

    static async upsert<T extends OrderUpsertProps>(props: T): Promise<ResponseFormat<OrderUpsertResponse<T>>> {
        try {
            const order = await PrismaInstance.order.upsert(props);
            return { data: order as OrderUpsertResponse<T> };
        } catch (error) {
            return OrderService.error("upsert", error);
        }
    }

    static async update<T extends OrderUpdateProps>(props: T): Promise<ResponseFormat<OrderUpdateResponse<T>>> {
        try {
            const order = await PrismaInstance.order.update(props);
            return { data: order as OrderUpdateResponse<T> };
        } catch (error) {
            return OrderService.error("update", error);
        }
    }

    static async delete<T extends OrderDeleteProps>(props: T): Promise<ResponseFormat<OrderDeleteResponse<T>>> {
        try {
            const order = await PrismaInstance.order.delete(props);
            return { data: order as OrderDeleteResponse<T> };
        } catch (error) {
            return OrderService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: OrderCreateManyProps): Promise<ResponseFormat<OrderCreateManyResponse>> {
        try {
            const result = await PrismaInstance.order.createMany(props);
            return { data: result };
        } catch (error) {
            return OrderService.error("createMany", error);
        }
    }

    static async updateMany(props: OrderUpdateManyProps): Promise<ResponseFormat<OrderUpdateManyResponse>> {
        try {
            const result = await PrismaInstance.order.updateMany(props);
            return { data: result };
        } catch (error) {
            return OrderService.error("updateMany", error);
        }
    }

    static async deleteMany(props: OrderDeleteManyProps): Promise<ResponseFormat<OrderDeleteManyResponse>> {
        try {
            const result = await PrismaInstance.order.deleteMany(props);
            return { data: result };
        } catch (error) {
            return OrderService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends OrderFindFirstProps>(props: T): Promise<ResponseFormat<OrderFindFirstResponse<T>>> {
        try {
            const order = await PrismaInstance.order.findFirst(props);
            return { data: order as OrderFindFirstResponse<T> };
        } catch (error) {
            return OrderService.error("findFirst", error);
        }
    }

    static async findUnique<T extends OrderFindUniqueProps>(props: T): Promise<ResponseFormat<OrderFindUniqueResponse<T>>> {
        try {
            const order = await PrismaInstance.order.findUnique(props);
            return { data: order as OrderFindUniqueResponse<T> };
        } catch (error) {
            return OrderService.error("findUnique", error);
        }
    }

    static async findMany<T extends OrderFindManyProps>(props: T): Promise<ResponseFormat<OrderFindManyResponse<T>>> {
        try {
            const orderList = await PrismaInstance.order.findMany(props);
            return { data: orderList as OrderFindManyResponse<T> };
        } catch (error) {
            return OrderService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: OrderCountProps): Promise<ResponseFormat<OrderCountResponse>> {
        try {
            const orderAmount: OrderCount = await PrismaInstance.order.count(props);
            return { data: orderAmount };
        } catch (error) {
            return OrderService.error("count", error);
        }
    }

    // ========== Error handling ========== //

    static async error(methodName: string, error: unknown): Promise<{error: string}> {
        if (process.env.NODE_ENV === "development") {
            const serviceName = this.constructor.name;
            const message = (error as Error).message;
            if (error instanceof PrismaClientKnownRequestError){
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
