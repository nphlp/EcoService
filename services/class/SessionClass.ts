import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { SessionCount, SessionCountProps, SessionCountResponse, SessionCreateManyProps, SessionCreateManyResponse, SessionCreateProps, SessionCreateResponse, SessionDeleteManyProps, SessionDeleteManyResponse, SessionDeleteProps, SessionDeleteResponse, SessionFindFirstProps, SessionFindFirstResponse, SessionFindManyProps, SessionFindManyResponse, SessionFindUniqueProps, SessionFindUniqueResponse, SessionUpdateManyProps, SessionUpdateManyResponse, SessionUpdateProps, SessionUpdateResponse, SessionUpsertProps, SessionUpsertResponse } from "@services/types/SessionType";
import { ResponseFormat } from "@utils/FetchConfig";

export default class SessionService {

    // ========== Single mutations ========== //

    static async create<T extends SessionCreateProps>(props: T): Promise<ResponseFormat<SessionCreateResponse<T>>> {
        try {
            const session = await PrismaInstance.session.create(props);
            return { data: session as SessionCreateResponse<T> };
        } catch (error) {
            return SessionService.error("create", error);
        }
    }

    static async upsert<T extends SessionUpsertProps>(props: T): Promise<ResponseFormat<SessionUpsertResponse<T>>> {
        try {
            const session = await PrismaInstance.session.upsert(props);
            return { data: session as SessionUpsertResponse<T> };
        } catch (error) {
            return SessionService.error("upsert", error);
        }
    }

    static async update<T extends SessionUpdateProps>(props: T): Promise<ResponseFormat<SessionUpdateResponse<T>>> {
        try {
            const session = await PrismaInstance.session.update(props);
            return { data: session as SessionUpdateResponse<T> };
        } catch (error) {
            return SessionService.error("update", error);
        }
    }

    static async delete<T extends SessionDeleteProps>(props: T): Promise<ResponseFormat<SessionDeleteResponse<T>>> {
        try {
            const session = await PrismaInstance.session.delete(props);
            return { data: session as SessionDeleteResponse<T> };
        } catch (error) {
            return SessionService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: SessionCreateManyProps): Promise<ResponseFormat<SessionCreateManyResponse>> {
        try {
            const result = await PrismaInstance.session.createMany(props);
            return { data: result };
        } catch (error) {
            return SessionService.error("createMany", error);
        }
    }

    static async updateMany(props: SessionUpdateManyProps): Promise<ResponseFormat<SessionUpdateManyResponse>> {
        try {
            const result = await PrismaInstance.session.updateMany(props);
            return { data: result };
        } catch (error) {
            return SessionService.error("updateMany", error);
        }
    }

    static async deleteMany(props: SessionDeleteManyProps): Promise<ResponseFormat<SessionDeleteManyResponse>> {
        try {
            const result = await PrismaInstance.session.deleteMany(props);
            return { data: result };
        } catch (error) {
            return SessionService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends SessionFindFirstProps>(props: T): Promise<ResponseFormat<SessionFindFirstResponse<T>>> {
        try {
            const session = await PrismaInstance.session.findFirst(props);
            return { data: session as SessionFindFirstResponse<T> };
        } catch (error) {
            return SessionService.error("findFirst", error);
        }
    }

    static async findUnique<T extends SessionFindUniqueProps>(props: T): Promise<ResponseFormat<SessionFindUniqueResponse<T>>> {
        try {
            const session = await PrismaInstance.session.findUnique(props);
            return { data: session as SessionFindUniqueResponse<T> };
        } catch (error) {
            return SessionService.error("findUnique", error);
        }
    }

    static async findMany<T extends SessionFindManyProps>(props: T): Promise<ResponseFormat<SessionFindManyResponse<T>>> {
        try {
            const sessionList = await PrismaInstance.session.findMany(props);
            return { data: sessionList as SessionFindManyResponse<T> };
        } catch (error) {
            return SessionService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: SessionCountProps): Promise<ResponseFormat<SessionCountResponse>> {
        try {
            const sessionAmount: SessionCount = await PrismaInstance.session.count(props);
            return { data: sessionAmount };
        } catch (error) {
            return SessionService.error("count", error);
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
