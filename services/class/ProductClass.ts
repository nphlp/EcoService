import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { ProductCount, ProductCountProps, ProductCountResponse, ProductCreateManyProps, ProductCreateManyResponse, ProductCreateProps, ProductCreateResponse, ProductDeleteManyProps, ProductDeleteManyResponse, ProductDeleteProps, ProductDeleteResponse, ProductFindFirstProps, ProductFindFirstResponse, ProductFindManyProps, ProductFindManyResponse, ProductFindUniqueProps, ProductFindUniqueResponse, ProductUpdateManyProps, ProductUpdateManyResponse, ProductUpdateProps, ProductUpdateResponse, ProductUpsertProps, ProductUpsertResponse } from "@services/types/ProductType";
import { ResponseFormat } from "@utils/FetchConfig";

export default class ProductService {

    // ========== Single mutations ========== //

    static async create<T extends ProductCreateProps>(props: T): Promise<ResponseFormat<ProductCreateResponse<T>>> {
        try {
            const product = await PrismaInstance.product.create(props);
            return { data: product as ProductCreateResponse<T> };
        } catch (error) {
            return ProductService.error("create", error);
        }
    }

    static async upsert<T extends ProductUpsertProps>(props: T): Promise<ResponseFormat<ProductUpsertResponse<T>>> {
        try {
            const product = await PrismaInstance.product.upsert(props);
            return { data: product as ProductUpsertResponse<T> };
        } catch (error) {
            return ProductService.error("upsert", error);
        }
    }

    static async update<T extends ProductUpdateProps>(props: T): Promise<ResponseFormat<ProductUpdateResponse<T>>> {
        try {
            const product = await PrismaInstance.product.update(props);
            return { data: product as ProductUpdateResponse<T> };
        } catch (error) {
            return ProductService.error("update", error);
        }
    }

    static async delete<T extends ProductDeleteProps>(props: T): Promise<ResponseFormat<ProductDeleteResponse<T>>> {
        try {
            const product = await PrismaInstance.product.delete(props);
            return { data: product as ProductDeleteResponse<T> };
        } catch (error) {
            return ProductService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: ProductCreateManyProps): Promise<ResponseFormat<ProductCreateManyResponse>> {
        try {
            const result = await PrismaInstance.product.createMany(props);
            return { data: result };
        } catch (error) {
            return ProductService.error("createMany", error);
        }
    }

    static async updateMany(props: ProductUpdateManyProps): Promise<ResponseFormat<ProductUpdateManyResponse>> {
        try {
            const result = await PrismaInstance.product.updateMany(props);
            return { data: result };
        } catch (error) {
            return ProductService.error("updateMany", error);
        }
    }

    static async deleteMany(props: ProductDeleteManyProps): Promise<ResponseFormat<ProductDeleteManyResponse>> {
        try {
            const result = await PrismaInstance.product.deleteMany(props);
            return { data: result };
        } catch (error) {
            return ProductService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends ProductFindFirstProps>(props: T): Promise<ResponseFormat<ProductFindFirstResponse<T>>> {
        try {
            const product = await PrismaInstance.product.findFirst(props);
            return { data: product as ProductFindFirstResponse<T> };
        } catch (error) {
            return ProductService.error("findFirst", error);
        }
    }

    static async findUnique<T extends ProductFindUniqueProps>(props: T): Promise<ResponseFormat<ProductFindUniqueResponse<T>>> {
        try {
            const product = await PrismaInstance.product.findUnique(props);
            return { data: product as ProductFindUniqueResponse<T> };
        } catch (error) {
            return ProductService.error("findUnique", error);
        }
    }

    static async findMany<T extends ProductFindManyProps>(props: T): Promise<ResponseFormat<ProductFindManyResponse<T>>> {
        try {
            const productList = await PrismaInstance.product.findMany(props);
            return { data: productList as ProductFindManyResponse<T> };
        } catch (error) {
            return ProductService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: ProductCountProps): Promise<ResponseFormat<ProductCountResponse>> {
        try {
            const productAmount: ProductCount = await PrismaInstance.product.count(props);
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
