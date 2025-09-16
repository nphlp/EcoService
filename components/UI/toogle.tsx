import { combo } from "@lib/combo";
import { motion } from "motion/react";

type ToggleProps = {
    config?: {
        height?: number;
        width?: number;
        padding?: number;
        border?: number;
    };
    setValue: (value: boolean) => void;
    value: boolean;
};

export default function Toggle(props: ToggleProps) {
    const { setValue, value, config = {} } = props;

    const { height = 20, width = 36, padding = 2, border = 1 } = config;

    // Toggle button size
    const toggleSize = height - padding * 2 - border * 2;

    // Toggle button translation distance
    const translationWidth = width - toggleSize - padding * 2 - border * 2;

    const handleClick = () => {
        setValue(!value);
    };

    return (
        <button
            type="button"
            onClick={handleClick}
            style={{
                height: `${height}px`,
                width: `${width}px`,
                borderWidth: `${border}px`,
            }}
            className={combo(
                // Position
                "relative",
                // Color
                "group",
                "bg-gray-50",
                // Border
                "border border-gray-300",
                "rounded-full",
                // Shadow
                "inset-shadow-[0_0_3px_rgba(0,0,0,0.1)]",
                // Accessibility
                "cursor-pointer",
            )}
        >
            <motion.div
                initial={{
                    translateX: value ? translationWidth : 0,
                }}
                animate={{
                    translateX: value ? translationWidth : 0,
                }}
                style={{
                    top: `${padding}px`,
                    left: `${padding}px`,
                    height: `${toggleSize}px`,
                    width: `${toggleSize}px`,
                }}
                className={combo(
                    // Position
                    "absolute",
                    // Color
                    "bg-gray-900",
                    "group-hover:bg-gray-800",
                    // Border
                    "rounded-full",
                    // Shadow
                    "inset-shadow-[2px_2px_0px_rgba(255,255,255,0.2)]",
                )}
            />
        </button>
    );
}
