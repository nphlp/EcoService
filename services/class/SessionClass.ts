import PrismaInstance from "@lib/prisma";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { SessionCount, CountSessionProps, CountSessionResponse, CreateSessionProps, CreateSessionResponse, DeleteSessionProps, DeleteSessionResponse, FindManySessionProps, FindManySessionResponse, FindUniqueSessionProps, FindUniqueSessionResponse, UpdateSessionProps, UpdateSessionResponse, UpsertSessionProps, UpsertSessionResponse, countSessionSchema, createSessionSchema, deleteSessionSchema, selectFirstSessionSchema, selectManySessionSchema, selectUniqueSessionSchema, updateSessionSchema, upsertSessionSchema, FindFirstSessionProps, FindFirstSessionResponse } from "@services/types/SessionType";
import { ResponseFormat } from "@utils/FetchConfig";
import { ZodError } from "zod";

export default class SessionService {
    static async create<T extends CreateSessionProps>(props: T): Promise<ResponseFormat<CreateSessionResponse<T>>> {
        try {
            const parsedProps = createSessionSchema.parse(props);
            const session = await PrismaInstance.session.create(parsedProps);
            return { data: session as CreateSessionResponse<T> };
        } catch (error) {
            return SessionService.error("create", error);
        }
    }

    static async upsert<T extends UpsertSessionProps>(props: T): Promise<ResponseFormat<UpsertSessionResponse<T>>> {
        try {
            const parsedProps = upsertSessionSchema.parse(props);
            const session = await PrismaInstance.session.upsert(parsedProps);
            return { data: session as UpsertSessionResponse<T> };
        } catch (error) {
            return SessionService.error("upsert", error);
        }
    }

    static async update<T extends UpdateSessionProps>(props: T): Promise<ResponseFormat<UpdateSessionResponse<T>>> {
        try {
            const parsedProps = updateSessionSchema.parse(props);
            const session = await PrismaInstance.session.update(parsedProps);
            return { data: session as UpdateSessionResponse<T> };
        } catch (error) {
            return SessionService.error("update", error);
        }
    }

    static async delete<T extends DeleteSessionProps>(props: T): Promise<ResponseFormat<DeleteSessionResponse<T>>> {
        try {
            const parsedProps = deleteSessionSchema.parse(props);
            const session = await PrismaInstance.session.delete(parsedProps);
            return { data: session as DeleteSessionResponse<T> };
        } catch (error) {
            return SessionService.error("delete", error);
        }
    }

    static async findFirst<T extends FindFirstSessionProps>(props: T): Promise<ResponseFormat<FindFirstSessionResponse<T>>> {
        try {
            const parsedProps = selectFirstSessionSchema.parse(props);
            const session = await PrismaInstance.session.findFirst(parsedProps);
            return { data: session as FindFirstSessionResponse<T> };
        } catch (error) {
            return SessionService.error("findFirst", error);
        }
    }

    static async findUnique<T extends FindUniqueSessionProps>(props: T): Promise<ResponseFormat<FindUniqueSessionResponse<T>>> {
        try {
            const parsedProps = selectUniqueSessionSchema.parse(props);
            const session = await PrismaInstance.session.findUnique(parsedProps);
            return { data: session as FindUniqueSessionResponse<T> };
        } catch (error) {
            return SessionService.error("findUnique", error);
        }
    }

    static async findMany<T extends FindManySessionProps>(props: T): Promise<ResponseFormat<FindManySessionResponse<T>>> {
        try {
            const parsedProps = selectManySessionSchema.parse(props);
            const { skip = 0, take = 10 } = parsedProps;
            const sessionList = await PrismaInstance.session.findMany({ skip, take, ...parsedProps });
            return { data: sessionList as FindManySessionResponse<T> };
        } catch (error) {
            return SessionService.error("findMany", error);
        }
    }

    static async count(props: CountSessionProps): Promise<ResponseFormat<CountSessionResponse>> {
        try {
            const parsedProps = countSessionSchema.parse(props);
            const sessionAmount: SessionCount = await PrismaInstance.session.count(parsedProps);
            return { data: sessionAmount };
        } catch (error) {
            return SessionService.error("count", error);
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
