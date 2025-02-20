import { combo } from "@lib/combo";
import Image from "next/image";

type ImageRatioProps = {
    src: string;
    alt: string;
    /** Define width or height */
    className?: string;
    loading?: "eager" | "lazy";
}

export default function ImageRatio(props: ImageRatioProps) {
    const { src, alt, className, loading = "eager" } = props;

    return (
        <div className={combo("relative aspect-[3/2] overflow-hidden", className)}>
            <Image src={src} alt={alt} className="object-cover" fill loading={loading}/>
        </div>
    );
}
