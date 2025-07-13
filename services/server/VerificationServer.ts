import VerificationService from "@services/class/VerificationClass";
import { VerificationCountProps, VerificationFindFirstProps, VerificationFindManyProps, VerificationFindUniqueProps } from "@services/types/VerificationType";

export const VerificationFindManyServer = async <T extends VerificationFindManyProps>(params: T) => {
    const { data, error } = await VerificationService.findMany<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const VerificationFindFirstServer = async <T extends VerificationFindFirstProps>(params: T) => {
    const { data, error } = await VerificationService.findFirst<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const VerificationFindUniqueServer = async <T extends VerificationFindUniqueProps>(params: T) => {
    const { data, error } = await VerificationService.findUnique<T>(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
};

export const VerificationCountServer = async (params: VerificationCountProps) => {
    const { data, error } = await VerificationService.count(params);
    if (error || data === undefined) throw new Error(error ?? "Something went wrong...");
    return data;
}; 