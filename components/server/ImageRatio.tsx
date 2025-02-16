import { combo } from "@lib/combo";
import Image from "next/image";

type ImageRatioProps = {
    src: string;
    alt: string;
    /** Define width or height */
    className?: string;
}

export default function ImageRatio(props: ImageRatioProps) {
    const { src, alt, className } = props;

    return (
        <div className={combo("relative aspect-[3/2] overflow-hidden", className)}>
            <Image src={src} alt={alt} objectFit="cover" fill />
        </div>
    );
}
