import Card from "@comps/server/Card";
import { combo } from "@lib/combo";
import { Image as ImageTemplate } from "lucide-react";
import Image from "next/image";
import { ReactNode } from "react";

export const ImageCard = (props: { className?: string; children: ReactNode }) => {
    const { className, children } = props;
    return <Card className={combo("w-fit overflow-hidden p-0", className)}>{children}</Card>;
};

export const Img = (props: { src: string | null; alt: string; height?: number; width?: number }) => {
    const { src, height, width, alt } = props;

    if (!src) {
        return <ImageTemplate width={300} height={200} />;
    }

    return (
        <div className="flex aspect-[3/2]">
            <Image src={src} alt={alt} width={width ?? 300} height={height ?? 200} className="object-cover" />
        </div>
    );
};

export const Content = (props: { children: ReactNode }) => {
    const { children } = props;
    return <div className="w-[300px] space-y-1 p-4">{children}</div>;
};

export const Title = (props: { children: ReactNode }) => {
    const { children } = props;
    return <h2 className="text-lg font-bold">{children}</h2>;
};

export const Text = (props: { children: ReactNode }) => {
    const { children } = props;
    return <p className="line-clamp-3 text-wrap text-sm">{children}</p>;
};
