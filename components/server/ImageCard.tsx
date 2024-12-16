import { Image as ImageTemplate } from "lucide-react";
import Image from "next/image";
import Card from "./Card";
import fs from "fs";
import path from "path";

export const ImageCard = (props: { children: React.ReactNode }) => {
    const { children } = props;
    return <Card className="w-fit overflow-hidden p-0">{children}</Card>;
};

const fileExists = (filePath: string) => {
    return fs.existsSync(path.resolve(filePath));
};

export const Img = (props: { src: string; alt: string }) => {
    const { src, alt } = props;

    const absolutePath = path.join(process.cwd(), "public", src);

    if (!fileExists(absolutePath)) {
        return <ImageTemplate width={300} height={200} />;
    }

    return (
        <div className="flex aspect-[3/2]">
            <Image
                src={src}
                alt={alt}
                width={300}
                height={200}
                className="object-cover"
            />
        </div>
    );
};

export const Title = (props: { children: React.ReactNode }) => {
    const { children } = props;
    return <h2 className="text-lg font-bold">{children}</h2>;
};

export const Text = (props: { children: React.ReactNode }) => {
    const { children } = props;
    return <p className="text-wrap text-sm">{children}</p>;
};
