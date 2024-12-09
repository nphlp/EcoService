"use server";

export const fileToBase64 = async (file: File): Promise<string> => {
    try {
        const base64 = btoa(file as unknown as string);
        return base64;
    } catch (error) {
        throw new Error("fileToBase64 -> " + (error as Error).message);
    }
};

export const base64ToFile = async (base64: string): Promise<File> => {
    try {
        const file = atob(base64);
        return file as unknown as File;
    } catch (error) {
        throw new Error("base64ToFile -> " + (error as Error).message);
    }
};
