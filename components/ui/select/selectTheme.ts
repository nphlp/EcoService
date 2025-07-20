import { combo } from "@lib/combo";

export type VariantType = "default" | "dark" | "none";

export type ThemeType = {
    [key in VariantType]: {
        component: string;
        label: string;

        displayedValue: string;
        placeholder: string;

        buttonGroup: string;
        button: string;
        subButton: string;
        subButtonIcon: string;

        optionList: string;
        optionButton: string;
        optionIcon: string;
        optionLabel: string;
    };
};

export const theme: ThemeType = {
    default: {
        component: combo("space-y-1"),
        label: combo("text-gray-700 text-sm font-semibold"),

        displayedValue: combo("text-black"),
        placeholder: combo("text-gray-400"),

        buttonGroup: combo("relative"),
        button: combo(
            // Text position
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
            "absolute right-2 inset-y-0",
            // Accessibility
            "cursor-pointer",
        ),
        subButtonIcon: combo("stroke-gray-600"),

        optionList: combo("absolute w-full space-y-0.5 border border-gray-300 bg-white rounded-lg p-1"),
        optionButton: combo(
            // Display
            "flex gap-2",
            // Text position
            "text-left",
            // Size and padding
            "w-full px-2 py-0.5",
            // Border and radius
            "rounded-lg",
            // Background
            "bg-white hover:bg-gray-100",
            // Accessibility
            "cursor-pointer",
        ),
        optionIcon: combo("stroke-gray-600"),
        optionLabel: combo(""),
    },
    dark: {
        component: combo(""),
        label: combo(""),
        displayedValue: combo(""),
        placeholder: combo(""),
        buttonGroup: combo(""),
        button: combo(""),
        subButton: combo(""),
        subButtonIcon: combo(""),
        optionList: combo(""),
        optionButton: combo(""),
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
        subButtonIcon: combo(""),
        optionList: combo(""),
        optionButton: combo(""),
        optionIcon: combo(""),
        optionLabel: combo(""),
    },
};
