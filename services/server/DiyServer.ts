import DiyService from "@services/class/DiyClass";
import { DiyCountProps, DiyFindFirstProps, DiyFindManyProps, DiyFindUniqueProps } from "@services/types/DiyType";

export const DiyFindManyServer = async <T extends DiyFindManyProps>(params: T) => {
    const { data, error } = await DiyService.findMany<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const DiyFindFirstServer = async <T extends DiyFindFirstProps>(params: T) => {
    const { data, error } = await DiyService.findFirst<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const DiyFindUniqueServer = async <T extends DiyFindUniqueProps>(params: T) => {
    const { data, error } = await DiyService.findUnique<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const DiyCountServer = async (params: DiyCountProps) => {
    const { data, error } = await DiyService.count(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
}; 