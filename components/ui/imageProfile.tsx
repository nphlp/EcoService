"use client";

import { combo } from "@lib/combo";
import { base64ToUrl } from "@utils/base64";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";

type ImageProfileProps = {
    imageBase64: string | null;
    name: string;
    className?: string;
    classTemplate?: string;
};

export default function ImageProfile(props: ImageProfileProps) {
    const { imageBase64, name, className, classTemplate } = props;

    const imageUrl = imageBase64 ? base64ToUrl(imageBase64) : null;

    return (
        <div className={combo("relative aspect-square size-7 overflow-hidden rounded-full", className)}>
            {imageUrl ? (
                <Image src={imageUrl} alt={`Avatar de ${name}`} className="object-cover" sizes="100%" fill />
            ) : (
                <CircleUserRound className={combo("size-full stroke-[1.5px]", classTemplate)} />
            )}
        </div>
    );
}
