"use server";

import { promises as fs } from "fs";
import { StringToSlug } from "./StringToSlug";
import { ImageValidationProps, ImageUploadsProps, ImageValidationReturn } from "@actions/types/Image";
import { FileExists } from "./FileExists";

export const ImageValidation = async (props: ImageValidationProps): Promise<ImageValidationReturn> => {
    try {
        const { imageFile } = props;

        if (!imageFile) {
            return { status: false, message: "No file selected." };
        }

        // Image metadata
        const imageExtension = imageFile.name.split(".").pop() ?? imageFile.type.replace("image/", "");
        const imageSize = imageFile.size;

        // Image rules
        const imageAcceptedExtensionList = ["png", "jpg", "jpeg", "webp"];
        const imageAcceptedSize = 1 * 1024 * 1024; // 1MB

        if (!imageAcceptedExtensionList.includes(imageExtension)) {
            return { status: false, message: "Invalid file format." };
        }

        if (imageSize > imageAcceptedSize) {
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
