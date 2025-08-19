import { combo } from "@lib/combo";
import { LoaderCircle } from "lucide-react";

export type LoaderColor = "white" | "gray" | "black" | "primary";

type LoaderProps = {
    className?: string;
    color?: LoaderColor;
};

/**
 * Loader component
 * @example
 * ```tsx
 * <Loader color="white" />
 * ```
 */
export default function Loader(props: LoaderProps) {
    const { color = "gray", className } = props;

    const colorMap: Record<LoaderColor, string> = {
        white: "stroke-gray-300",
        gray: "stroke-gray-500",
        black: "stroke-gray-700",
        primary: "stroke-primary",
    };

    return <LoaderCircle className={combo(colorMap[color], "size-6 animate-spin stroke-2", className)} />;
}
