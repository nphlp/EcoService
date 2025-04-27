"use client";

import { combo } from "@lib/combo";
import { base64ToUrl } from "@utils/base64";
import { CircleUserRound } from "lucide-react";
import Image from "next/image";

type ImageProfileProps = {
    image: string | null;
    name: string;
    className?: string;
    classTemplate?: string;
};

export default function ImageProfile(props: ImageProfileProps) {
    const { image, name, className, classTemplate } = props;

    return (
        <div className={combo("relative aspect-square size-7 overflow-hidden rounded-full", className)}>
            {image ? (
                <Image src={base64ToUrl(image)} alt={`Avatar de ${name}`} className="object-cover" sizes="100%" fill />
            ) : (
                <CircleUserRound className={combo("size-full stroke-[1.5px]", classTemplate)} />
            )}
        </div>
    );
}
