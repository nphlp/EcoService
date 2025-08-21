import { combo } from "@lib/combo";
import { mergeStylesAndStructure } from "../themes/utils";
import { ModalClassName } from "./modal";

export type ModalVariant = "default" | "dark" | "none";

type StructureType = {
    [key in keyof ModalClassName]-?: ModalClassName[key];
};

export type StylesType = {
    [key in ModalVariant]: StructureType;
};

const structure: StructureType = {
    component: combo(
        // Position
        "absolute top-0 left-0 z-50 h-screen w-screen",
        // Layout
        "flex flex-col items-center justify-center",
    ),
    backgroundButton: combo("absolute h-screen w-screen"),
    backgroundBlur: combo("absolute h-screen w-screen"),
    backgroundColor: combo("absolute h-screen w-screen"),
    card: combo(
        // Position
        "relative z-50",
        // Size and padding
        "px-12 py-5",
    ),
    crossButton: combo(
        // Position
        "absolute top-2 right-2",
        // Spacing
        "p-0.5",
        // Outline
        "outline-none focus:ring-2 ring-teal-300",
        "transition-all duration-150",
        // Accessibility
        "cursor-pointer",
        // Border and radius
        "rounded-lg",
    ),
    crossIcon: combo(""),
};

export const styles: StylesType = {
    default: {
        component: combo(""),
        backgroundButton: combo(""),
        backgroundBlur: combo("backdrop-blur-[1.5px]"),
        backgroundColor: combo("bg-black/50"),
        card: combo(
            // Background and backdrop
            "bg-white text-black shadow-md",
            // Border and radius
            "rounded-xl border border-gray-300",
        ),
        crossButton: combo("bg-transparent hover:bg-gray-200 focus:bg-gray-100"),
        crossIcon: combo("stroke-[2.2px] text-black"),
    },
    dark: {
        component: combo(""),
        backgroundButton: combo(""),
        backgroundBlur: combo("backdrop-blur-[1.5px]"),
        backgroundColor: combo("bg-black/50"),
        card: combo(
            // Background and backdrop
            "bg-black text-white shadow-md",
            // Border and radius
            "rounded-xl border border-gray-700",
        ),
        crossButton: combo("bg-transparent hover:bg-gray-700 focus:bg-gray-800"),
        crossIcon: combo("stroke-[2.2px] text-white"),
    },
    none: {
        component: combo(""),
        backgroundButton: combo(""),
        backgroundBlur: combo(""),
        backgroundColor: combo(""),
        card: combo(""),
        crossButton: combo(""),
        crossIcon: combo(""),
    },
};

export const theme = mergeStylesAndStructure(structure, styles);
