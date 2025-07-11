export type ProcessResponse<T> = {
    data?: T;
    status: boolean;
    message: string;
};
