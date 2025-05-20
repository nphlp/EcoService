import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ProductCount, ProductCountProps, ProductCountResponse, ProductCountSchema, ProductCreateManyProps, ProductCreateManyResponse, ProductCreateManySchema, ProductCreateProps, ProductCreateResponse, ProductCreateSchema, ProductDeleteManyProps, ProductDeleteManyResponse, ProductDeleteManySchema, ProductDeleteProps, ProductDeleteResponse, ProductDeleteSchema, ProductFindFirstProps, ProductFindFirstResponse, ProductFindFirstSchema, ProductFindManyProps, ProductFindManyResponse, ProductFindManySchema, ProductFindUniqueProps, ProductFindUniqueResponse, ProductFindUniqueSchema, ProductUpdateManyProps, ProductUpdateManyResponse, ProductUpdateManySchema, ProductUpdateProps, ProductUpdateResponse, ProductUpdateSchema, ProductUpsertProps, ProductUpsertResponse, ProductUpsertSchema } from "@services/types/ProductType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class ProductService {

    // ========== Single mutations ========== //

    static async create<T extends ProductCreateProps>(props: T): Promise<ResponseFormat<ProductCreateResponse<T>>> {
        try {
            const parsedProps = ProductCreateSchema.parse(props);
            const product = await PrismaInstance.product.create(parsedProps);
            return { data: product as ProductCreateResponse<T> };
        } catch (error) {
            return ProductService.error("create", error);
        }
    }

    static async upsert<T extends ProductUpsertProps>(props: T): Promise<ResponseFormat<ProductUpsertResponse<T>>> {
        try {
            const parsedProps = ProductUpsertSchema.parse(props);
            const product = await PrismaInstance.product.upsert(parsedProps);
            return { data: product as ProductUpsertResponse<T> };
        } catch (error) {
            return ProductService.error("upsert", error);
        }
    }

    static async update<T extends ProductUpdateProps>(props: T): Promise<ResponseFormat<ProductUpdateResponse<T>>> {
        try {
            const parsedProps = ProductUpdateSchema.parse(props);
            const product = await PrismaInstance.product.update(parsedProps);
            return { data: product as ProductUpdateResponse<T> };
        } catch (error) {
            return ProductService.error("update", error);
        }
    }

    static async delete<T extends ProductDeleteProps>(props: T): Promise<ResponseFormat<ProductDeleteResponse<T>>> {
        try {
            const parsedProps = ProductDeleteSchema.parse(props);
            const product = await PrismaInstance.product.delete(parsedProps);
            return { data: product as ProductDeleteResponse<T> };
        } catch (error) {
            return ProductService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: ProductCreateManyProps): Promise<ResponseFormat<ProductCreateManyResponse>> {
        try {
            const parsedProps = ProductCreateManySchema.parse(props);
            const result = await PrismaInstance.product.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return ProductService.error("createMany", error);
        }
    }

    static async updateMany(props: ProductUpdateManyProps): Promise<ResponseFormat<ProductUpdateManyResponse>> {
        try {
            const parsedProps = ProductUpdateManySchema.parse(props);
            const result = await PrismaInstance.product.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return ProductService.error("updateMany", error);
        }
    }

    static async deleteMany(props: ProductDeleteManyProps): Promise<ResponseFormat<ProductDeleteManyResponse>> {
        try {
            const parsedProps = ProductDeleteManySchema.parse(props);
            const result = await PrismaInstance.product.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return ProductService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends ProductFindFirstProps>(props: T): Promise<ResponseFormat<ProductFindFirstResponse<T>>> {
        try {
            const parsedProps = ProductFindFirstSchema.parse(props);
            const product = await PrismaInstance.product.findFirst(parsedProps);
            return { data: product as ProductFindFirstResponse<T> };
        } catch (error) {
            return ProductService.error("findFirst", error);
        }
    }

    static async findUnique<T extends ProductFindUniqueProps>(props: T): Promise<ResponseFormat<ProductFindUniqueResponse<T>>> {
        try {
            const parsedProps = ProductFindUniqueSchema.parse(props);
            const product = await PrismaInstance.product.findUnique(parsedProps);
            return { data: product as ProductFindUniqueResponse<T> };
        } catch (error) {
            return ProductService.error("findUnique", error);
        }
    }

    static async findMany<T extends ProductFindManyProps>(props: T): Promise<ResponseFormat<ProductFindManyResponse<T>>> {
        try {
            const parsedProps = ProductFindManySchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const productList = await PrismaInstance.product.findMany({ skip, take, ...parsedProps });
            return { data: productList as ProductFindManyResponse<T> };
        } catch (error) {
            return ProductService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: ProductCountProps): Promise<ResponseFormat<ProductCountResponse>> {
        try {
            const parsedProps = ProductCountSchema.parse(props);
            const productAmount: ProductCount = await PrismaInstance.product.count(parsedProps);
            return { data: productAmount };
        } catch (error) {
            return ProductService.error("count", error);
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
