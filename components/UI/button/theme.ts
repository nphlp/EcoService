import { combo } from "@lib/combo";
import { mergeStylesAndStructure } from "../../../lib/mergeStyles";
import { ButtonClassName } from "./button";

export type ButtonVariant = "default" | "outline" | "ghost" | "underline" | "none";

type StructureType = {
    [key in keyof ButtonClassName]-?: ButtonClassName[key];
};

export type StylesType = {
    [key in ButtonVariant]: StructureType;
};

const structure: StructureType = {
    button: combo(
        // Layout
        "flex flex-row items-center justify-center gap-2",
        // Width
        "w-fit",
    ),
    isLoading: combo(""),
    isDisabled: combo(""),
    loader: combo(""),
};

export const styles: StylesType = {
    default: {
        button: combo(
            // Normal
            "text-white bg-black",
            // Hover
            "hover:bg-gray-700",
            // Padding
            "px-4 py-1.5",
            // Rounded
            "rounded-lg",
        ),
        isLoading: combo("hover:bg-black"),
        isDisabled: combo("bg-gray-700 text-gray-300", "hover:bg-gray-700 hover:text-gray-300"),
        loader: combo("bg-white"),
    },
    outline: {
        button: combo(
            // Normal
            "border border-gray-300 bg-white text-gray-800",
            // Hover
            "hover:border-gray-500 hover:bg-gray-100",
            // Focus
            "focus:border-gray-500",
            // Padding
            "px-4 py-1.5",
            // Rounded
            "rounded-lg",
        ),
        isLoading: combo("hover:border-gray-300 hover:bg-white"),
        isDisabled: combo("border-gray-100 text-gray-300", "hover:bg-white hover:text-gray-300"),
        loader: combo(""),
    },
    ghost: {
        button: combo(
            // Normal
            "bg-white text-gray-800",
            // Hover
            "hover:bg-gray-100 hover:text-black",
            // Padding
            "px-4 py-1.5",
            // Rounded
            "rounded-lg",
        ),
        isLoading: combo("hover:bg-white hover:text-gray-800"),
        isDisabled: combo("bg-white text-gray-400", "hover:bg-white hover:text-gray-400"),
        loader: combo(""),
    },
    underline: {
        button: combo(
            // Normal
            "text-black",
            // Hover
            "hover:underline",
            // Rounded
            "rounded px-1",
        ),
        isLoading: combo("hover:text-black hover:underline"),
        isDisabled: combo("text-gray-400 hover:no-underline"),
        loader: combo(""),
    },
    none: {
        button: combo(""),
        isLoading: combo(""),
        isDisabled: combo(""),
        loader: combo(""),
    },
};

export const theme = mergeStylesAndStructure(structure, styles);
