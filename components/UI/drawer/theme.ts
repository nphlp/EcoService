import { combo } from "@lib/combo";
import { mergeStylesAndStructure } from "@lib/merge-styles";
import { DrawerClassName } from "./drawer";

export type DrawerVariant = "default" | "dark" | "none";

type StructureType = {
    [key in keyof DrawerClassName]-?: DrawerClassName[key];
};

export type StylesType = {
    [key in DrawerVariant]: StructureType;
};

const structure: StructureType = {
    component: combo(
        // Position
        "fixed top-0 left-0 z-50 h-dvh w-screen",
        // Layout
        "flex flex-row",
        // Scroll
        "overflow-hidden",
    ),
    drawer: combo(
        // Position
        "absolute top-0 right-0 bottom-0",
        // Spacing
        "p-5",
    ),
    backgroundButton: combo("absolute inset-0"),
    backgroundBlur: combo("absolute inset-0"),
    backgroundColor: combo("absolute inset-0"),
    closeButton: combo(
        // Position
        "absolute top-3 right-3",
        // Spacing
        "p-1",
        // Outline
        "outline-none focus:ring-2 ring-teal-300",
        "transition-all duration-150",
        // Accessibility
        "cursor-pointer",
        // Border and radius
        "rounded-lg",
    ),
    closeIcon: combo("size-7"),
};

export const styles: StylesType = {
    default: {
        component: combo(""),
        drawer: combo(
            // Background
            "bg-gray-100",
        ),
        backgroundButton: combo(""),
        backgroundBlur: combo("backdrop-blur-[1.5px]"),
        backgroundColor: combo("bg-black/50"),
        closeButton: combo("bg-transparent hover:bg-gray-200 focus:bg-gray-100"),
        closeIcon: combo("stroke-[2.2px] text-black"),
    },
    dark: {
        component: combo(""),
        drawer: combo(
            // Background and backdrop
            "bg-gray-800",
        ),
        backgroundButton: combo(""),
        backgroundBlur: combo("backdrop-blur-[1.5px]"),
        backgroundColor: combo("bg-black/50"),
        closeButton: combo("bg-transparent hover:bg-gray-700 focus:bg-gray-800"),
        closeIcon: combo("stroke-[2.2px] text-white"),
    },
    none: {
        component: combo(""),
        drawer: combo(""),
        backgroundButton: combo(""),
        backgroundBlur: combo(""),
        backgroundColor: combo(""),
        closeButton: combo(""),
        closeIcon: combo(""),
    },
};

export const theme = mergeStylesAndStructure(structure, styles);
