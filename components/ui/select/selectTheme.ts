import { combo } from "@lib/combo";
import { mergeStylesAndStructure } from "../themes/utils";

export type VariantType = "default" | "dark" | "none";

type StructureType = {
    component: string;
    label: string;

    displayedValue: string;
    placeholder: string;

    buttonGroup: string;
    button: string;

    subButton: string;
    subCross: string;

    subDiv: string;
    subChevron: string;

    optionList: string;
    optionButton: string;
    optionIcon: string;
    optionLabel: string;
};

export type StylesType = {
    [key in VariantType]: StructureType;
};

const structure: StructureType = {
    component: combo("space-y-1"),
    label: combo(""),

    displayedValue: combo(""),
    placeholder: combo(""),

    buttonGroup: combo("relative"),
    button: combo(
        // Text
        "text-black text-left",
        // Size and padding
        "w-full",
        // Accessibility
        "cursor-pointer",
    ),

    subButton: combo(
        // Position
        "absolute right-2 top-1/2 -translate-y-1/2",
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
        "absolute",
        // Spacing
        "space-y-0.5",
        // Size and padding
        "w-full",
    ),
    optionButton: combo(
        // Display
        "flex gap-2",
        // Text
        "text-black text-left",
        // Size and padding
        "w-full",
        // Accessibility
        "cursor-pointer",
    ),
    optionIcon: combo(""),
    optionLabel: combo(""),
};

const styles: StylesType = {
    default: {
        component: combo("space-y-1"),
        label: combo("text-gray-700 text-sm font-semibold"),

        displayedValue: combo("text-black"),
        placeholder: combo("text-gray-400"),

        buttonGroup: combo("relative"),
        button: combo(
            // Text
            "text-left",
            // Size and padding
            "px-4 py-1.5 w-full",
            // Border and radius
            "border border-gray-300 focus:border-gray-500 rounded-lg",
            // Background
            "bg-white",
            // Outline
            "outline-none focus:ring-2 ring-teal-300",
            "transition-all duration-150",
            // Accessibility
            "cursor-pointer",
        ),

        subButton: combo(
            // Position
            "absolute right-2 top-1/2 -translate-y-1/2",
            // Border and radius
            "rounded",
            // Outline
            "outline-none focus:ring-2 ring-teal-300",
            "transition-all duration-150",
            // Accessibility
            "cursor-pointer",
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
            // Spacing
            "space-y-0.5",
            // Size and padding
            "w-full p-1",
            // Border and radius
            "border border-gray-300 rounded-lg",
            // Background
            "bg-white",
        ),
        optionButton: combo(
            // Display
            "flex gap-2",
            // Text
            "text-left",
            // Size and padding
            "w-full px-2 py-0.5",
            // Border and radius
            "rounded",
            // Background
            "bg-white hover:bg-gray-100",
            // Outline
            "outline-none focus:ring-2 ring-teal-300",
            "transition-all duration-150",
            // Accessibility
            "cursor-pointer",
        ),
        optionIcon: combo("stroke-gray-600"),
        optionLabel: combo(""),
    },
    dark: {
        component: combo("space-y-1"),
        label: combo("text-gray-200 text-sm font-semibold"),

        displayedValue: combo("text-white"),
        placeholder: combo("text-gray-400"),

        buttonGroup: combo("relative"),
        button: combo(
            // Text
            "text-white text-left",
            // Size and padding
            "px-4 py-1.5 w-full",
            // Border and radius
            "border border-gray-500 focus:border-gray-300 rounded-lg",
            // Background
            "bg-black",
            // Outline
            "outline-none focus:ring-2 ring-teal-500",
            "transition-all duration-150",
            // Accessibility
            "cursor-pointer",
        ),

        subButton: combo(
            // Position
            "absolute right-2 top-1/2 -translate-y-1/2",
            // Border and radius
            "rounded",
            // Outline
            "outline-none focus:ring-2 ring-teal-500",
            "transition-all duration-150",
            // Accessibility
            "cursor-pointer",
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
            // Spacing
            "space-y-0.5",
            // Size and padding
            "w-full p-1",
            // Border and radius
            "border border-gray-500 rounded-lg",
            // Background
            "bg-black",
        ),
        optionButton: combo(
            // Display
            "flex gap-2",
            // Text
            "text-white text-left",
            // Size and padding
            "w-full px-2 py-0.5",
            // Border and radius
            "rounded",
            // Background
            "bg-black hover:bg-gray-700",
            // Outline
            "outline-none focus:ring-2 ring-teal-500",
            "transition-all duration-150",
            // Accessibility
            "cursor-pointer",
        ),
        optionIcon: combo("stroke-gray-300"),
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
