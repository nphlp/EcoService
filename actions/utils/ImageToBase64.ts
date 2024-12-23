"use server";

export const fileToBase64 = async (file: File): Promise<string> => {
    try {
        return btoa(file);
    } catch (error) {
        throw new Error("fileToBase64 -> " + (error as Error).message);
    }
};

export const base64ToFile = async (base64: string): Promise<File> => {
    try {
        return atob(base64);
    } catch (error) {
        throw new Error("base64ToFile -> " + (error as Error).message);
    }
};
