import PrismaInstance from "@lib/prisma";
import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { SearchParamsCached, SearchParamsType } from "./components/queryParamsConfig";

// Image metadata
export const alt = "Eco Service Icon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

type ImageProps = {
    searchParams: Promise<SearchParamsType>;
};

// Image generation
export default async function Image(props: ImageProps) {
    const { searchParams } = props;
    const { category } = await SearchParamsCached.parse(searchParams);

    const categoryData = await PrismaInstance.category.findUnique({
        where: { slug: category },
    });

    const logo = await readFile(join(process.cwd(), "public/icon-512x512.png"));

    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 128,
                    fontFamily: "Inter",
                    background: "#0E073B",
                    color: "#FFFFFF",
                    height: "100%",
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <img
                    src={`data:image/png;base64,${logo.toString("base64")}`}
                    width="512"
                    height="512"
                    alt="Eco Service Icon"
                />
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                    <h1>{categoryData?.name}</h1>
                    <p>{categoryData?.description}</p>
                </div>
            </div>
        ),
        {
            ...size,
        },
    );
}
