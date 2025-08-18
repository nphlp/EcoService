import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

// Image metadata
export const alt = "Eco Service Icon";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Image generation
export default async function Image() {
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
            </div>
        ),
        {
            ...size,
        },
    );
}
