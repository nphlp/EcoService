import { decodeBase64, encodeBase64 } from "@oslojs/encoding";

/**
 * Convert a File object to a base64 string
 * @usage Usefull to upload an image file to a server, and store it in the database in base64 string format
 */
export const fileToBase64 = async (image: File): Promise<string | null> => {
    try {
        const arrayBuffer = await image.arrayBuffer();
        const uint8Array = new Uint8Array(arrayBuffer);
        return encodeBase64(uint8Array);
    } catch (error) {
        console.error("Erreur lors de l'encodage du fichier:", error);
        return null;
    }
};

/**
 * Convert a base64 string to a File object
 * @usage Usefull to retrieve and download a file that was stored in base64 format
 */
export const base64ToFile = (base64: string): File | null => {
    try {
        const uint8Array = decodeBase64(base64);
        return new File([uint8Array], "image.jpeg", { type: "image/jpeg" });
    } catch (error) {
        console.error("Erreur lors du décodage du fichier:", error);
        return null;
    }
};

/**
 * Convert a base64 string to an object URL
 * @usage Usefull to display an image in a browser, like a profile picture in <Image /> component
 */
export const base64ToUrl = (base64: string): string | null => {
    try {
        const uint8Array = decodeBase64(base64);
        const blob = new Blob([uint8Array], { type: "image/jpeg" });
        return URL.createObjectURL(blob);
    } catch (error) {
        console.error("Erreur lors du décodage du fichier:", error);
        return null;
    }
};
