import SessionService from "@services/class/SessionClass";
import { SessionCountProps, SessionFindFirstProps, SessionFindManyProps, SessionFindUniqueProps } from "@services/types/SessionType";

export const SessionFindManyServer = async <T extends SessionFindManyProps>(params: T) => {
    const { data, error } = await SessionService.findMany<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const SessionFindFirstServer = async <T extends SessionFindFirstProps>(params: T) => {
    const { data, error } = await SessionService.findFirst<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const SessionFindUniqueServer = async <T extends SessionFindUniqueProps>(params: T) => {
    const { data, error } = await SessionService.findUnique<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const SessionCountServer = async (params: SessionCountProps) => {
    const { data, error } = await SessionService.count(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
}; 