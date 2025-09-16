"use client";

import { combo } from "@lib/combo";
import { Image as ImageTemplate } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export type ImageRatioProps = {
    src: string | null;
    alt: string;
    /** Define width or height */
    className?: string;
    /**
     * Image loading strategy
     * - "preloaded": l'image est pré-chargée lorsque le lien de la page est visible
     * - "onPageLoad": l'image est chargée en priorité lors du chargement de la page
     * - "whenIsVisible": l'image est chargée lorsque qu'elle est visible à l'écran
     */
    mode: "preloaded" | "onPageLoad" | "whenIsVisible";
    /** Disable blur placeholder */
    noBlur?: boolean;
};

/**
 * Helper pour générer l'URL de blur automatiquement
 * Les images blur sont générées automatiquement à partir des WebP
 * en exécutant le script: ./scripts/blur-images.sh
 */
const getBlurDataURL = (imagePath: string): string => {
    const segments = imagePath.split("/");

    const filename = segments.pop();
    const directory = segments.pop();
    const path = segments.join("/");
    const blurUrl = `${path}/${directory}/.blur/${filename}`;

    return blurUrl;
};

export default function ImageRatio(props: ImageRatioProps) {
    const { src, alt, className, mode, noBlur = false } = props;
    const [isLoaded, setIsLoaded] = useState(false);

    if (!src) {
        return (
            <div className={combo("relative aspect-[3/2] overflow-hidden", className)}>
                <ImageTemplate className="size-full" />
            </div>
        );
    }

    type LoadingStrategy = {
        loading?: "eager" | "lazy";
        priority?: boolean;
    };

    const loadingStrategy: LoadingStrategy = (() => {
        switch (mode) {
            case "preloaded":
                return { priority: true };
            case "onPageLoad":
                return { loading: "eager" };
            case "whenIsVisible":
                return { loading: "lazy" };
        }
    })();

    const hasBlurEffect = !noBlur && mode === "whenIsVisible";

    return (
        <div className={combo("relative aspect-[3/2] overflow-hidden", className)}>
            {/* Image nette en arrière-plan */}
            <Image
                src={src}
                alt={alt}
                className={combo(
                    "object-cover blur-[0px] transition-all duration-150",
                    hasBlurEffect && !isLoaded && "blur-[10px]",
                )}
                // Size based on parent
                sizes="100%"
                fill
                // Loading priority
                loading={loadingStrategy?.loading}
                priority={loadingStrategy?.priority}
                // Blur effect management
                onLoad={() => setIsLoaded(true)}
                // Disable drag and drop
                onMouseDown={(e) => e.preventDefault()}
            />

            {/* Image blur au premier plan qui disparaît */}
            {hasBlurEffect ? (
                <Image
                    src={getBlurDataURL(src)}
                    alt={alt + " (loading)"}
                    className={combo("object-cover blur-[10px]", isLoaded ? "opacity-0" : "opacity-100")}
                    // Size based on parent
                    sizes="100%"
                    fill
                    // Loading priority
                    priority
                    // Disable drag and drop
                    onMouseDown={(e) => e.preventDefault()}
                />
            ) : null}
        </div>
    );
}
