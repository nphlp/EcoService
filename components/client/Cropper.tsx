"use client";

import { useEffect, useState } from "react";
import Cropper, { Area } from "react-easy-crop";
import { getCroppedImg } from "../../lib/cropper";
import ButtonClient from "./Button";

type ImageCropperModalClientProps = {
    imageFile: File | undefined;
    setImageFile: (imageFile: File | undefined) => void;
    setCroppedImage: (croppedImage: string) => void;
};

export default function ImageCropperModalClient(
    props: ImageCropperModalClientProps
) {
    const { imageFile, setImageFile, setCroppedImage } = props;

    const [imageString, setImageString] = useState<string>("");

    const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    });
    const [zoom, setZoom] = useState(1);
    const [rotate, setRotate] = useState(0);

    const imageToString = async (file: File) => {
        // Create a new FileReader
        const reader = new FileReader();
        // Read the file as data url
        reader.readAsDataURL(file);
        // When the file is read, set the image string
        reader.onloadend = (reading) =>
            setImageString(reading.target?.result as string);
    };

    useEffect(() => {
        if (!imageFile) return;
        imageToString(imageFile);
    }, [imageFile]);

    const onCropComplete = (croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    };

    const saveImage = async () => {
        const croppedImage = await getCroppedImg(
            imageString,
            croppedAreaPixels,
            rotate
        );
        setCroppedImage(croppedImage as string);
        setImageFile(undefined);
    };

    if (!imageFile) return null;

    return (
        <div className="absolute flex size-[600px] flex-col items-center justify-center gap-4 rounded-xl border bg-white p-6 shadow-xl">
            <p className="text-xl font-bold">Resize module</p>
            <Cropper
                // Overriding
                style={{
                    containerStyle: { position: "relative" },
                    mediaStyle: {},
                    cropAreaStyle: {},
                }}
                // Add classes to the elements
                classes={{
                    containerClassName: "size-full rounded-lg",
                    mediaClassName: "",
                    cropAreaClassName: "",
                }}
                image={imageString}
                aspect={1}
                onCropComplete={onCropComplete}
                zoom={zoom}
                onZoomChange={setZoom}
                rotation={rotate}
                onRotationChange={setRotate}
                crop={crop}
                onCropChange={setCrop}
            />
            <div className="flex flex-col gap-2">
                <div className="flex flex-row gap-6">
                    <label id="zoom">
                        <div>Zoom</div>
                        <input
                            type="range"
                            min={1}
                            max={5}
                            step={0.1}
                            value={zoom}
                            onChange={(e) => setZoom(Number(e.target.value))}
                        />
                    </label>
                    <label id="rotate">
                        <div>Rotate</div>
                        <input
                            type="range"
                            min={0}
                            max={360}
                            step={1}
                            value={rotate}
                            onChange={(e) => setRotate(Number(e.target.value))}
                        />
                    </label>
                </div>
                <div className="flex flex-row gap-3">
                    <ButtonClient type="button" label="cancel-crop" className="w-1/2" variant="outline" onClick={() => setImageFile(undefined)}>
                        Cancel
                    </ButtonClient>
                    <ButtonClient type="button" label="crop-image" className="w-1/2" onClick={saveImage}>
                        Crop image
                    </ButtonClient>
                </div>
            </div>
        </div>
    );
}
