"use client";

import { combo } from "@lib/combo";
import { Image as ImageTemplate } from "lucide-react";
import Image from "next/image";

type ImageRatioProps = {
    src: string | null;
    alt: string;
    /** Define width or height */
    className?: string;
    loading?: "eager" | "lazy";
    priority?: boolean;
};

export default function ImageRatio(props: ImageRatioProps) {
    const { src, alt, className, loading = "eager", priority = false } = props;

    if (!src) {
        return (
            <div className={combo("relative aspect-[3/2] overflow-hidden", className)}>
                <ImageTemplate className="size-full" />
            </div>
        );
    }

    return (
        <div className={combo("relative aspect-[3/2] overflow-hidden", className)}>
            <Image
                src={src}
                alt={alt}
                className="object-cover"
                sizes="100%"
                fill
                loading={loading}
                onMouseDown={(e) => e.preventDefault()}
                priority={priority ? true : false}
            />
        </div>
    );
}
