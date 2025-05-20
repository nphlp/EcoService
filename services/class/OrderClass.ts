import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { OrderCount, OrderCountProps, OrderCountResponse, OrderCountSchema, OrderCreateManyProps, OrderCreateManyResponse, OrderCreateManySchema, OrderCreateProps, OrderCreateResponse, OrderCreateSchema, OrderDeleteManyProps, OrderDeleteManyResponse, OrderDeleteManySchema, OrderDeleteProps, OrderDeleteResponse, OrderDeleteSchema, OrderFindFirstProps, OrderFindFirstResponse, OrderFindFirstSchema, OrderFindManyProps, OrderFindManyResponse, OrderFindManySchema, OrderFindUniqueProps, OrderFindUniqueResponse, OrderFindUniqueSchema, OrderUpdateManyProps, OrderUpdateManyResponse, OrderUpdateManySchema, OrderUpdateProps, OrderUpdateResponse, OrderUpdateSchema, OrderUpsertProps, OrderUpsertResponse, OrderUpsertSchema } from "@services/types/OrderType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class OrderService {

    // ========== Single mutations ========== //

    static async create<T extends OrderCreateProps>(props: T): Promise<ResponseFormat<OrderCreateResponse<T>>> {
        try {
            const parsedProps = OrderCreateSchema.parse(props);
            const order = await PrismaInstance.order.create(parsedProps);
            return { data: order as OrderCreateResponse<T> };
        } catch (error) {
            return OrderService.error("create", error);
        }
    }

    static async upsert<T extends OrderUpsertProps>(props: T): Promise<ResponseFormat<OrderUpsertResponse<T>>> {
        try {
            const parsedProps = OrderUpsertSchema.parse(props);
            const order = await PrismaInstance.order.upsert(parsedProps);
            return { data: order as OrderUpsertResponse<T> };
        } catch (error) {
            return OrderService.error("upsert", error);
        }
    }

    static async update<T extends OrderUpdateProps>(props: T): Promise<ResponseFormat<OrderUpdateResponse<T>>> {
        try {
            const parsedProps = OrderUpdateSchema.parse(props);
            const order = await PrismaInstance.order.update(parsedProps);
            return { data: order as OrderUpdateResponse<T> };
        } catch (error) {
            return OrderService.error("update", error);
        }
    }

    static async delete<T extends OrderDeleteProps>(props: T): Promise<ResponseFormat<OrderDeleteResponse<T>>> {
        try {
            const parsedProps = OrderDeleteSchema.parse(props);
            const order = await PrismaInstance.order.delete(parsedProps);
            return { data: order as OrderDeleteResponse<T> };
        } catch (error) {
            return OrderService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: OrderCreateManyProps): Promise<ResponseFormat<OrderCreateManyResponse>> {
        try {
            const parsedProps = OrderCreateManySchema.parse(props);
            const result = await PrismaInstance.order.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return OrderService.error("createMany", error);
        }
    }

    static async updateMany(props: OrderUpdateManyProps): Promise<ResponseFormat<OrderUpdateManyResponse>> {
        try {
            const parsedProps = OrderUpdateManySchema.parse(props);
            const result = await PrismaInstance.order.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return OrderService.error("updateMany", error);
        }
    }

    static async deleteMany(props: OrderDeleteManyProps): Promise<ResponseFormat<OrderDeleteManyResponse>> {
        try {
            const parsedProps = OrderDeleteManySchema.parse(props);
            const result = await PrismaInstance.order.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return OrderService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends OrderFindFirstProps>(props: T): Promise<ResponseFormat<OrderFindFirstResponse<T>>> {
        try {
            const parsedProps = OrderFindFirstSchema.parse(props);
            const order = await PrismaInstance.order.findFirst(parsedProps);
            return { data: order as OrderFindFirstResponse<T> };
        } catch (error) {
            return OrderService.error("findFirst", error);
        }
    }

    static async findUnique<T extends OrderFindUniqueProps>(props: T): Promise<ResponseFormat<OrderFindUniqueResponse<T>>> {
        try {
            const parsedProps = OrderFindUniqueSchema.parse(props);
            const order = await PrismaInstance.order.findUnique(parsedProps);
            return { data: order as OrderFindUniqueResponse<T> };
        } catch (error) {
            return OrderService.error("findUnique", error);
        }
    }

    static async findMany<T extends OrderFindManyProps>(props: T): Promise<ResponseFormat<OrderFindManyResponse<T>>> {
        try {
            const parsedProps = OrderFindManySchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const orderList = await PrismaInstance.order.findMany({ skip, take, ...parsedProps });
            return { data: orderList as OrderFindManyResponse<T> };
        } catch (error) {
            return OrderService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: OrderCountProps): Promise<ResponseFormat<OrderCountResponse>> {
        try {
            const parsedProps = OrderCountSchema.parse(props);
            const orderAmount: OrderCount = await PrismaInstance.order.count(parsedProps);
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
