"use client";

import Image from "next/image";

export const ImgClient = (props: { src: string; alt: string }) => {
    const { src, alt } = props;

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