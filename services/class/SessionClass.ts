import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { SessionCount, SessionCountProps, SessionCountResponse, SessionCountSchema, SessionCreateManyProps, SessionCreateManyResponse, SessionCreateManySchema, SessionCreateProps, SessionCreateResponse, SessionCreateSchema, SessionDeleteManyProps, SessionDeleteManyResponse, SessionDeleteManySchema, SessionDeleteProps, SessionDeleteResponse, SessionDeleteSchema, SessionFindFirstProps, SessionFindFirstResponse, SessionFindFirstSchema, SessionFindManyProps, SessionFindManyResponse, SessionFindManySchema, SessionFindUniqueProps, SessionFindUniqueResponse, SessionFindUniqueSchema, SessionUpdateManyProps, SessionUpdateManyResponse, SessionUpdateManySchema, SessionUpdateProps, SessionUpdateResponse, SessionUpdateSchema, SessionUpsertProps, SessionUpsertResponse, SessionUpsertSchema } from "@services/types/SessionType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class SessionService {

    // ========== Single mutations ========== //

    static async create<T extends SessionCreateProps>(props: T): Promise<ResponseFormat<SessionCreateResponse<T>>> {
        try {
            const parsedProps = SessionCreateSchema.parse(props);
            const session = await PrismaInstance.session.create(parsedProps);
            return { data: session as SessionCreateResponse<T> };
        } catch (error) {
            return SessionService.error("create", error);
        }
    }

    static async upsert<T extends SessionUpsertProps>(props: T): Promise<ResponseFormat<SessionUpsertResponse<T>>> {
        try {
            const parsedProps = SessionUpsertSchema.parse(props);
            const session = await PrismaInstance.session.upsert(parsedProps);
            return { data: session as SessionUpsertResponse<T> };
        } catch (error) {
            return SessionService.error("upsert", error);
        }
    }

    static async update<T extends SessionUpdateProps>(props: T): Promise<ResponseFormat<SessionUpdateResponse<T>>> {
        try {
            const parsedProps = SessionUpdateSchema.parse(props);
            const session = await PrismaInstance.session.update(parsedProps);
            return { data: session as SessionUpdateResponse<T> };
        } catch (error) {
            return SessionService.error("update", error);
        }
    }

    static async delete<T extends SessionDeleteProps>(props: T): Promise<ResponseFormat<SessionDeleteResponse<T>>> {
        try {
            const parsedProps = SessionDeleteSchema.parse(props);
            const session = await PrismaInstance.session.delete(parsedProps);
            return { data: session as SessionDeleteResponse<T> };
        } catch (error) {
            return SessionService.error("delete", error);
        }
    }

    // ========== Multiple mutations ========== //

    static async createMany(props: SessionCreateManyProps): Promise<ResponseFormat<SessionCreateManyResponse>> {
        try {
            const parsedProps = SessionCreateManySchema.parse(props);
            const result = await PrismaInstance.session.createMany(parsedProps);
            return { data: result };
        } catch (error) {
            return SessionService.error("createMany", error);
        }
    }

    static async updateMany(props: SessionUpdateManyProps): Promise<ResponseFormat<SessionUpdateManyResponse>> {
        try {
            const parsedProps = SessionUpdateManySchema.parse(props);
            const result = await PrismaInstance.session.updateMany(parsedProps);
            return { data: result };
        } catch (error) {
            return SessionService.error("updateMany", error);
        }
    }

    static async deleteMany(props: SessionDeleteManyProps): Promise<ResponseFormat<SessionDeleteManyResponse>> {
        try {
            const parsedProps = SessionDeleteManySchema.parse(props);
            const result = await PrismaInstance.session.deleteMany(parsedProps);
            return { data: result };
        } catch (error) {
            return SessionService.error("deleteMany", error);
        }
    }

    // ========== Single queries ========== //

    static async findFirst<T extends SessionFindFirstProps>(props: T): Promise<ResponseFormat<SessionFindFirstResponse<T>>> {
        try {
            const parsedProps = SessionFindFirstSchema.parse(props);
            const session = await PrismaInstance.session.findFirst(parsedProps);
            return { data: session as SessionFindFirstResponse<T> };
        } catch (error) {
            return SessionService.error("findFirst", error);
        }
    }

    static async findUnique<T extends SessionFindUniqueProps>(props: T): Promise<ResponseFormat<SessionFindUniqueResponse<T>>> {
        try {
            const parsedProps = SessionFindUniqueSchema.parse(props);
            const session = await PrismaInstance.session.findUnique(parsedProps);
            return { data: session as SessionFindUniqueResponse<T> };
        } catch (error) {
            return SessionService.error("findUnique", error);
        }
    }

    static async findMany<T extends SessionFindManyProps>(props: T): Promise<ResponseFormat<SessionFindManyResponse<T>>> {
        try {
            const parsedProps = SessionFindManySchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const sessionList = await PrismaInstance.session.findMany({ skip, take, ...parsedProps });
            return { data: sessionList as SessionFindManyResponse<T> };
        } catch (error) {
            return SessionService.error("findMany", error);
        }
    }

    // ========== Aggregate queries ========== //

    static async count(props: SessionCountProps): Promise<ResponseFormat<SessionCountResponse>> {
        try {
            const parsedProps = SessionCountSchema.parse(props);
            const sessionAmount: SessionCount = await PrismaInstance.session.count(parsedProps);
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
