import { combo } from "@lib/combo";
import { mergeStylesAndStructure } from "../../../lib/mergeStyles";
import { SelectClassName } from "./select";

export type VariantType = "default" | "dark" | "none";

type StructureType = {
    [key in keyof SelectClassName]-?: SelectClassName[key];
};

export type StylesType = {
    [key in VariantType]: StructureType;
};

const structure: StructureType = {
    component: combo(""),
    label: combo("mb-1"),

    displayedValue: combo(""),
    placeholder: combo(""),

    buttonGroup: combo("relative"),
    button: combo(
        // Text
        "text-black text-left",
        // Size and padding
        "w-full",
        // Outline
        "outline-none focus:ring-2 ring-teal-300",
        "transition-all duration-150",
        // Accessibility
        "cursor-pointer",
    ),

    subButton: combo(
        // Position
        "absolute right-2 top-1/2 -translate-y-1/2",
        // Outline
        "outline-none focus:ring-2 ring-teal-300",
        "transition-all duration-150",
        // Accessibility
        "cursor-pointer",
    ),
    subCross: combo(""),

    subDiv: combo(
        // Position
        "absolute right-2 top-1/2 -translate-y-1/2",
        // Accessibility
        "pointer-events-none",
    ),
    subChevron: combo(""),

    optionList: combo(
        // Position
        "absolute z-50",
        // Size and padding
        "w-full",
    ),
    optionButton: combo(
        // Display
        "flex items-center gap-2",
        // Border and radius
        "rounded",
        // Text
        "text-black text-sm",
        // Size and padding
        "w-full px-2 py-1",
        // Accessibility
        "cursor-pointer",
    ),
    optionIcon: combo("size-5 stroke-[2.5px]"),
    optionLabel: combo(""),
};

const styles: StylesType = {
    default: {
        component: combo(""),
        label: combo("text-gray-700 text-sm font-semibold"),

        displayedValue: combo("text-black"),
        placeholder: combo("text-gray-400"),

        buttonGroup: combo(""),
        button: combo(
            // Text
            "text-left",
            // Size and padding
            "px-4 py-1.5 w-full",
            // Border and radius
            "border border-gray-300 focus:border-gray-500 rounded-lg",
            // Background
            "bg-white",
        ),

        subButton: combo(
            // Position
            "absolute right-2 top-1/2 -translate-y-1/2",
            // Border and radius
            "rounded",
        ),
        subCross: combo("stroke-gray-600"),

        subDiv: combo(
            // Position
            "absolute right-2 top-1/2 -translate-y-1/2",
            // Accessibility
            "pointer-events-none",
        ),
        subChevron: combo("stroke-gray-600 translate-y-px"),

        optionList: combo(
            // Position
            "absolute",
            // Size and padding
            "w-full p-1",
            // Border and radius
            "border border-gray-300 rounded-lg",
            // Background
            "bg-white",
        ),
        optionButton: combo(
            // Text
            "text-black",
            // Background
            "bg-white hover:bg-gray-200",
            // Outline
            "outline-none focus:bg-gray-200",
        ),
        optionIcon: combo(""),
        optionLabel: combo(""),
    },
    dark: {
        component: combo(""),
        label: combo("text-gray-200 text-sm font-semibold"),

        displayedValue: combo("text-white"),
        placeholder: combo("text-gray-400"),

        buttonGroup: combo(""),
        button: combo(
            // Text
            "text-white text-left",
            // Size and padding
            "px-4 py-1.5 w-full",
            // Border and radius
            "border border-gray-500 focus:border-gray-300 rounded-lg",
            // Background
            "bg-black",
        ),

        subButton: combo(
            // Position
            "absolute right-2 top-1/2 -translate-y-1/2",
            // Border and radius
            "rounded",
        ),
        subCross: combo("stroke-gray-300"),

        subDiv: combo(
            // Position
            "absolute right-2 top-1/2 -translate-y-1/2",
            // Accessibility
            "pointer-events-none",
        ),
        subChevron: combo("stroke-gray-300 translate-y-px"),

        optionList: combo(
            // Position
            "absolute",
            // Size and padding
            "w-full p-1",
            // Border and radius
            "border border-gray-500 rounded-lg",
            // Background
            "bg-black",
        ),
        optionButton: combo(
            // Text
            "text-white",
            // Background
            "bg-black hover:bg-gray-700",
            // Outline
            "outline-none focus:bg-gray-700",
        ),
        optionIcon: combo(""),
        optionLabel: combo(""),
    },
    none: {
        component: combo(""),
        label: combo(""),
        displayedValue: combo(""),
        placeholder: combo(""),
        buttonGroup: combo(""),
        button: combo(""),
        subButton: combo(""),
        subCross: combo(""),
        subDiv: combo(""),
        subChevron: combo(""),
        optionList: combo(""),
        optionButton: combo(""),
        optionIcon: combo(""),
        optionLabel: combo(""),
    },
};

export const theme = mergeStylesAndStructure(structure, styles);
