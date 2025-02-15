export type ImageExtension = "png" | "jpg" | "jpeg" | "webp";

export interface ImageValidationProps {
    imageFile: File;
}

export type ImageValidationReturn = {
    status: boolean;
    message: string;
} & ({
    // If status is true
    status: true;
    message: "Image file accepted.";
    imageExtension: string;
} | {
    // If status is false
    status: false;
    message: "No file selected." | "Invalid file format." | "Image file too large.";
    imageExtension?: never;
})

export interface ImageUploadsProps {
    imageFile: File;
    imageName: string;
    folderName: string;
};