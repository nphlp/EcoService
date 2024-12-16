import { Image as ImageTemplate } from "lucide-react";
import Image from "next/image";
import fs from "fs";
import path from "path";

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
