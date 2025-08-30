import { combo } from "@lib/combo";
import { mergeStylesAndStructure } from "../../../lib/mergeStyles";
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
        // Scroll
        "overflow-auto",
    ),
    subComponent: combo(
        // Layout
        "flex flex-col items-center justify-center min-h-full relative",
    ),
    cardContainer: combo("p-7"),
    card: combo(
        // Position
        "relative z-50",
        // Size and padding
        "px-12 py-5",
    ),
    backgroundButton: combo("absolute inset-0"),
    backgroundBlur: combo("absolute inset-0"),
    backgroundColor: combo("absolute inset-0"),
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
        subComponent: combo(""),
        cardContainer: combo(""),
        card: combo(
            // Background and backdrop
            "bg-white text-black shadow-md",
            // Border and radius
            "rounded-xl border border-gray-300",
        ),
        backgroundButton: combo(""),
        backgroundBlur: combo("backdrop-blur-[1.5px]"),
        backgroundColor: combo("bg-black/50"),
        crossButton: combo("bg-transparent hover:bg-gray-200 focus:bg-gray-100"),
        crossIcon: combo("stroke-[2.2px] text-black"),
    },
    dark: {
        component: combo(""),
        subComponent: combo(""),
        cardContainer: combo(""),
        card: combo(
            // Background and backdrop
            "bg-black text-white shadow-md",
            // Border and radius
            "rounded-xl border border-gray-700",
        ),
        backgroundButton: combo(""),
        backgroundBlur: combo("backdrop-blur-[1.5px]"),
        backgroundColor: combo("bg-black/50"),
        crossButton: combo("bg-transparent hover:bg-gray-700 focus:bg-gray-800"),
        crossIcon: combo("stroke-[2.2px] text-white"),
    },
    none: {
        component: combo(""),
        subComponent: combo(""),
        cardContainer: combo(""),
        card: combo(""),
        backgroundButton: combo(""),
        backgroundBlur: combo(""),
        backgroundColor: combo(""),
        crossButton: combo(""),
        crossIcon: combo(""),
    },
};

export const theme = mergeStylesAndStructure(structure, styles);
