"use server";

import { ImageUploadsProps, ImageValidationProps, ImageValidationReturn } from "@actions/(examples)/Image";
import { promises as fs } from "fs";
import { FileExists } from "./FileExists";
import { StringToSlug } from "./StringToSlug";

export const ImageValidation = async (props: ImageValidationProps): Promise<ImageValidationReturn> => {
    try {
        const { imageFile } = props;

        if (!imageFile) {
            return { status: false, message: "No file selected." };
        }

        // Image extension
        const imageExtension = imageFile.name.split(".").pop() ?? imageFile.type.replace("image/", "");

        const imageAllowedExtensionList = ["png", "jpg", "jpeg", "webp"];

        if (!imageAllowedExtensionList.includes(imageExtension)) {
            return { status: false, message: "Invalid file format." };
        }
        
        // Image size
        const imageSize = imageFile.size;
        const imageLimitSize = 1 * 1024 * 1024; // 1MB

        if (imageSize > imageLimitSize) {
            return { status: false, message: "Image file too large." };
        }

        return {
            status: true,
            message: "Image file accepted.",
            imageExtension,
        };
    } catch (error) {
        throw new Error("ImageValidation -> " + (error as Error).message);
    }
};

export const ImageUploads = async (props: ImageUploadsProps): Promise<string | null> => {
    try {
        const { imageFile, imageName, folderName } = props;

        const { status, imageExtension } = await ImageValidation({ imageFile });

        if (!status) {
            throw new Error("Invalid image file.");
        }

        const imageSlugedName = await StringToSlug(imageName);

        const imageSlugedNameWithExtension = imageSlugedName + "." + imageExtension;

        // Convert image to buffer
        const imageBuffer = await imageFile.arrayBuffer();

        // Create image path
        const imageFilePath = `/${folderName}/${imageSlugedNameWithExtension}`;

        // Check if folder exists
        const isPathAlreadyUsed = await FileExists(imageFilePath, "public");

        if (isPathAlreadyUsed) {
            return null;
        }

        // Import image to public folder
        await fs.writeFile(`${process.cwd()}/public/${imageFilePath}`, Buffer.from(imageBuffer));

        return imageFilePath;
    } catch (error) {
        throw new Error("ImageUploads -> " + (error as Error).message);
    }
};
