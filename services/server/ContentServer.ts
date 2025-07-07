import ContentService from "@services/class/ContentClass";
import { ContentCountProps, ContentFindFirstProps, ContentFindManyProps, ContentFindUniqueProps } from "@services/types/ContentType";

export const ContentFindManyServer = async <T extends ContentFindManyProps>(params: T) => {
    const { data, error } = await ContentService.findMany<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const ContentFindFirstServer = async <T extends ContentFindFirstProps>(params: T) => {
    const { data, error } = await ContentService.findFirst<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const ContentFindUniqueServer = async <T extends ContentFindUniqueProps>(params: T) => {
    const { data, error } = await ContentService.findUnique<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const ContentCountServer = async (params: ContentCountProps) => {
    const { data, error } = await ContentService.count(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
}; 