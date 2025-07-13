import ArticleService from "@services/class/ArticleClass";
import { ArticleCountProps, ArticleFindFirstProps, ArticleFindManyProps, ArticleFindUniqueProps } from "@services/types/ArticleType";

export const ArticleFindManyServer = async <T extends ArticleFindManyProps>(params: T) => {
    const { data, error } = await ArticleService.findMany<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const ArticleFindFirstServer = async <T extends ArticleFindFirstProps>(params: T) => {
    const { data, error } = await ArticleService.findFirst<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const ArticleFindUniqueServer = async <T extends ArticleFindUniqueProps>(params: T) => {
    const { data, error } = await ArticleService.findUnique<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const ArticleCountServer = async (params: ArticleCountProps) => {
    const { data, error } = await ArticleService.count(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
}; 