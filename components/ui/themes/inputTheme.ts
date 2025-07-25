import { combo } from "@lib/combo";
import { mergeStylesAndStructure } from "./utils";

export type InputVariant = "default" | "none";

export type InputStructureType = {
    component: string;
    label: string;
    input: string;
};

export type StylesType = {
    [key in InputVariant]: InputStructureType;
};

const structure: InputStructureType = {
    component: combo("block space-y-1"),
    label: combo(""),
    input: combo(
        "w-full border px-4 py-1.5",
        // Ring and focus
        "outline-none ring-0 focus:ring-2 focus:ring-teal-300 focus:border-gray-500",
        // Transition
        "transition-all duration-150",
    ),
};

export const styles: StylesType = {
    default: {
        component: combo(""),
        label: combo("text-sm font-medium text-foreground"),
        input: combo("rounded-lg border-gray-300 bg-background"),
    },
    none: {
        component: combo(""),
        label: combo(""),
        input: combo(""),
    },
};

export const theme = mergeStylesAndStructure(structure, styles);
