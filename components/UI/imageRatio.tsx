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
    /** Disable blur placeholder */
    noBlur?: boolean;
};

/**
 * Helper pour générer l'URL de blur automatiquement
 * Les images blur sont générées automatiquement à partir des WebP
 * en exécutant le script: ./scripts/blur-images.sh auto
 */
const getBlurDataURL = (imagePath: string): string => {
    return imagePath.replace("/illustration/", "/illustration-blur/");
};

export default function ImageRatio(props: ImageRatioProps) {
    const { src, alt, className, loading = "eager", priority = false, noBlur = false } = props;

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
                priority={priority}
                {...(!noBlur && {
                    placeholder: "blur" as const,
                    blurDataURL: getBlurDataURL(src),
                })}
            />
        </div>
    );
}
