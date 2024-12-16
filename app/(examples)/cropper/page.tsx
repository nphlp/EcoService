"use client";

import { useState } from "react";
import ImageCropperModalClient from "../../../components/client/Cropper";
import Image from "next/image";

export default function CropperPage() {
    const [imageFile, setImageFile] = useState<File | undefined>();
    const [croppedImage, setCroppedImage] = useState<string>("");

    return (
        <>
            <ImageCropperModalClient
                imageFile={imageFile}
                setImageFile={setImageFile}
                setCroppedImage={setCroppedImage}
            />

            <div className="flex size-96 items-center justify-center overflow-hidden rounded-lg border-2 border-gray-300">
                {croppedImage ? (
                    <div className="size-full">
                        <Image
                            src={croppedImage}
                            alt="Cropped image"
                            height="100"
                            width="100"
                            layout="responsive"
                        />
                    </div>
                ) : (
                    <div>Cropped image preview.</div>
                )}
            </div>

            <label id="import-picture" className="mx-6 flex flex-col gap-1">
                <div>
                    <span>Profile picture</span>
                </div>
                <input
                    className="h-6 cursor-pointer rounded border text-xs ring-teal-400 ring-offset-2 transition-all duration-150 file:pointer-events-none file:h-6 file:cursor-pointer file:border-none file:text-xs file:transition-all file:duration-150 hover:bg-gray-50 hover:file:bg-gray-200 focus:ring-2"
                    name="profilePicture"
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files?.[0])}
                />
            </label>
        </>
    );
}
