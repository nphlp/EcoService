import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { VerificationCount, VerificationCountProps, VerificationCountResponse, VerificationCreateManyProps, VerificationCreateManyResponse, VerificationCreateProps, VerificationCreateResponse, VerificationDeleteManyProps, VerificationDeleteManyResponse, VerificationDeleteProps, VerificationDeleteResponse, VerificationFindFirstProps, VerificationFindFirstResponse, VerificationFindManyProps, VerificationFindManyResponse, VerificationFindUniqueProps, VerificationFindUniqueResponse, VerificationUpdateManyProps, VerificationUpdateManyResponse, VerificationUpdateProps, VerificationUpdateResponse, VerificationUpsertProps, VerificationUpsertResponse } from "@services/types/VerificationType";
import { ResponseFormat } from "@utils/FetchConfig";

export default class VerificationService {

    // ========== Single mutations ========== //

    static async create<T extends VerificationCreateProps>(props: T): Promise<ResponseFormat<VerificationCreateResponse<T>>> {
        try {
            const verification = await PrismaInstance.verification.create(props);
            return { data: verification as VerificationCreateResponse<T> };
        } catch (error) {
            return VerificationService.error("create", error);
        }
    }

    static async upsert<T extends VerificationUpsertProps>(props: T): Promise<ResponseFormat<VerificationUpsertResponse<T>>> {
        try {
            const verification = await PrismaInstance.verification.upsert(props);
            return { data: verification as VerificationUpsertResponse<T> };
        } catch (error) {
            return VerificationService.error("upsert", error);
        }
    }

    static async update<T extends VerificationUpdateProps>(props: T): Promise<ResponseFormat<VerificationUpdateResponse<T>>> {
        try {
            const verification = await PrismaInstance.verification.update(props);
            return { data: verification as VerificationUpdateResponse<T> };
        } catch (error) {
            return VerificationService.error("update", error);
        }
    }

    static async delete<T extends VerificationDeleteProps>(props: T): Promise<ResponseFormat<VerificationDeleteResponse<T>>> {
        try {
            const verification = await PrismaInstance.verification.delete(props);
            return { data: verification as VerificationDeleteResponse<T> };
        } catch (error) {
            return VerificationService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: VerificationCreateManyProps): Promise<ResponseFormat<VerificationCreateManyResponse>> {
        try {
            const result = await PrismaInstance.verification.createMany(props);
            return { data: result };
        } catch (error) {
            return VerificationService.error("createMany", error);
        }
    }

    static async updateMany(props: VerificationUpdateManyProps): Promise<ResponseFormat<VerificationUpdateManyResponse>> {
        try {
            const result = await PrismaInstance.verification.updateMany(props);
            return { data: result };
        } catch (error) {
            return VerificationService.error("updateMany", error);
        }
    }

    static async deleteMany(props: VerificationDeleteManyProps): Promise<ResponseFormat<VerificationDeleteManyResponse>> {
        try {
            const result = await PrismaInstance.verification.deleteMany(props);
            return { data: result };
        } catch (error) {
            return VerificationService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends VerificationFindFirstProps>(props: T): Promise<ResponseFormat<VerificationFindFirstResponse<T>>> {
        try {
            const verification = await PrismaInstance.verification.findFirst(props);
            return { data: verification as VerificationFindFirstResponse<T> };
        } catch (error) {
            return VerificationService.error("findFirst", error);
        }
    }

    static async findUnique<T extends VerificationFindUniqueProps>(props: T): Promise<ResponseFormat<VerificationFindUniqueResponse<T>>> {
        try {
            const verification = await PrismaInstance.verification.findUnique(props);
            return { data: verification as VerificationFindUniqueResponse<T> };
        } catch (error) {
            return VerificationService.error("findUnique", error);
        }
    }

    static async findMany<T extends VerificationFindManyProps>(props: T): Promise<ResponseFormat<VerificationFindManyResponse<T>>> {
        try {
            const verificationList = await PrismaInstance.verification.findMany(props);
            return { data: verificationList as VerificationFindManyResponse<T> };
        } catch (error) {
            return VerificationService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: VerificationCountProps): Promise<ResponseFormat<VerificationCountResponse>> {
        try {
            const verificationAmount: VerificationCount = await PrismaInstance.verification.count(props);
            return { data: verificationAmount };
        } catch (error) {
            return VerificationService.error("count", error);
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
