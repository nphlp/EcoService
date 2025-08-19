"use client";

import ImageCropperModalClient from "@comps/UI/cropper";
import { useState } from "react";

export default function Client() {
    const [image, setImage] = useState<File>();
    const [croppedImage, setCroppedImage] = useState("");
    const [imageFile, setImageFile] = useState<File>();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setImage(file);
        }
        console.log({ croppedImage, imageFile });
    };

    return (
        <div>
            <h1>Image Cropper</h1>
            <input type="file" accept="image/*" onChange={handleChange} />
            <ImageCropperModalClient imageFile={image} setCroppedImage={setCroppedImage} setImageFile={setImageFile} />
        </div>
    );
}
