import { combo } from "@lib/combo";
import { LoaderColor } from "../loader";

// =============== Button Base ================= //

/** Shared base styles for buttons and links */
export const buttonBaseTheme = {
    pointer: "cursor-pointer disabled:cursor-not-allowed",
    rounded: "rounded-lg",
    padding: "px-4 py-1.5",
    font: "font-medium",
    flex: "flex flex-row items-center justify-center gap-2",
    transition: "transition-all duration-150",
    outline: "outline-none ring-0 focus:ring-2 focus:ring-teal-300",
};

/** Shared base styles for buttons and links */
export type ButtonBaseTheme = typeof buttonBaseTheme;

/** Keys for the `buttonBaseTheme` object */
export type ButtonBaseKeys = keyof ButtonBaseTheme;

// =============== Button Theme ================= //

/** Type for the button variant */
export type ButtonVariant = "default" | "outline" | "ghost" | "underline" | "none";

/** Type for the button theme */
export type ButtonThemeType = {
    [key in ButtonVariant]: {
        button: string;
        isLoading: string;
        disabled: string;
        loaderColor: LoaderColor;
    };
};

/** Shared theme for buttons and links */
export const buttonTheme: ButtonThemeType = {
    default: {
        button: combo("bg-black text-white", "hover:bg-gray-700"),
        isLoading: combo("hover:bg-black"),
        disabled: combo(
            "disabled:bg-gray-700 disabled:text-gray-300",
            "disabled:hover:bg-gray-700 disabled:hover:text-gray-300",
        ),
        loaderColor: "white",
    },
    outline: {
        button: combo(
            "border border-gray-300 bg-white text-gray-800",
            "hover:border-gray-500 hover:bg-gray-100",
            // Ring and focus
            "outline-none ring-0 focus:ring-2 focus:ring-teal-300 focus:border-gray-500",
        ),
        isLoading: combo("hover:border-gray-300 hover:bg-white"),
        disabled: combo(
            "disabled:border-gray-100 disabled:text-gray-300",
            "disabled:hover:bg-white disabled:hover:text-gray-300",
        ),
        loaderColor: "gray",
    },
    ghost: {
        button: combo("bg-white text-gray-800", "hover:bg-gray-200 hover:text-black"),
        isLoading: combo("hover:bg-white hover:text-gray-800"),
        disabled: combo(
            "disabled:bg-white disabled:text-gray-400",
            "disabled:hover:bg-white disabled:hover:text-gray-400",
        ),
        loaderColor: "gray",
    },
    underline: {
        button: combo("text-black hover:underline"),
        isLoading: combo("hover:text-black hover:underline"),
        disabled: combo("disabled:text-gray-400 disabled:hover:no-underline"),
        loaderColor: "gray",
    },
    none: {
        button: "",
        isLoading: "",
        disabled: "",
        loaderColor: "gray",
    },
};
