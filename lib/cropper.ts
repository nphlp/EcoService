export const createImage = (url: string): Promise<HTMLImageElement> => {
    return new Promise((resolve, reject) => {
        const image = new Image() as HTMLImageElement;
        image.addEventListener("load", () => resolve(image));
        image.addEventListener("error", (error) => reject(error));
        image.setAttribute("crossOrigin", "anonymous"); // needed to avoid cross-origin issues on CodeSandbox
        image.src = url;
    });
};

export async function getCroppedImg(
    imageSrc: string,
    pixelCrop: { x: number; y: number; width: number; height: number },
    rotation = 0,
    flip = { horizontal: false, vertical: false }
): Promise<string | null> {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return null;
    }

    const rotRad = (rotation * Math.PI) / 180;

    // calculate bounding box of the rotated image
    const { width: bBoxWidth, height: bBoxHeight } = {
        width: Math.abs(Math.cos(rotRad) * image.width) + Math.abs(Math.sin(rotRad) * image.height),
        height: Math.abs(Math.sin(rotRad) * image.width) + Math.abs(Math.cos(rotRad) * image.height),
    };

    // set canvas size to match the bounding box
    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    // translate canvas context to a central location to allow rotating and flipping around the center
    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);

    // draw rotated image
    ctx.drawImage(image, 0, 0);

    const croppedCanvas = document.createElement("canvas");

    const croppedCtx = croppedCanvas.getContext("2d");

    if (!croppedCtx) {
        return null;
    }

    // Set the size of the cropped canvas
    croppedCanvas.width = pixelCrop.width;
    croppedCanvas.height = pixelCrop.height;

    // Draw the cropped image onto the new canvas
    croppedCtx.drawImage(
        canvas,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height
    );

    // As Base64 string
    // return croppedCanvas.toDataURL('image/jpeg');

    // As a blob
    return new Promise((resolve) => {
        croppedCanvas.toBlob((file) => {
            resolve(URL.createObjectURL(file as Blob));
        }, "image/png");
    });
}

export async function getRotatedImage(imageSrc: string, rotation = 0) {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return null;
    }

    const orientationChanged = rotation === 90 || rotation === -90 || rotation === 270 || rotation === -270;
    if (orientationChanged) {
        canvas.width = image.height;
        canvas.height = image.width;
    } else {
        canvas.width = image.width;
        canvas.height = image.height;
    }

    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((rotation * Math.PI) / 180);
    ctx.drawImage(image, -image.width / 2, -image.height / 2);

    return new Promise((resolve) => {
        canvas.toBlob((file) => {
            resolve(URL.createObjectURL(file as Blob));
        }, "image/png");
    });
}
