import { combo } from "@lib/combo";
import { LoaderColor } from "./Loader";

// =============== Button Base ================= //

/** Shared base styles for buttons and links */
export const buttonBase = {
    pointer: "cursor-pointer disabled:cursor-not-allowed",
    rounded: "rounded-lg",
    padding: "px-4 py-1.5",
    font: "font-medium",
    flex: "flex flex-row items-center justify-center gap-2",
    transition: "transition-all duration-150",
    outline: "outline-none ring-0 focus:ring-2 focus:ring-teal-300",
};

/** Keys for the `buttonBase` object */
export type ButtonBaseKeys = keyof typeof buttonBase;

export const buttonStyleComplete = Object.values(buttonBase).map((value) => value).join(" ");

/**
 * Return a string of combined styles for the given keys
 * @example
 * ```tsx
 * <Button baseStyleOnly={["rounded", "transition", "outline"]} />
 * <Link baseStyleOnly={["font", "transition", "outline"]} />
 * ```
 */
export const baseStyleOnlyFilter = (onlyKeys: ButtonBaseKeys[]): string => {
    const baseStyleKeys = Object.keys(buttonBase);
    const filteredKeys = baseStyleKeys.filter((key) => onlyKeys.includes(key as ButtonBaseKeys));
    const filteredValues = filteredKeys.map((key) => buttonBase[key as ButtonBaseKeys]);
    return combo(filteredValues);
};

/**
 * Return a string of combined styles excluding the given keys
 * @example
 * ```tsx
 * <Button baseStyleWithout={["flex", "rounded"]} />
 * <Link baseStyleWithout={["transition", "outline"]} />
 */
export const baseStyleWithoutFilter = (withoutKeys: ButtonBaseKeys[]): string => {
    const baseStyleKeys = Object.keys(buttonBase);
    const filteredKeys = baseStyleKeys.filter((key) => !withoutKeys.includes(key as ButtonBaseKeys));
    const filteredValues = filteredKeys.map((key) => buttonBase[key as ButtonBaseKeys]);
    return combo(filteredValues);
};

// =============== Button Theme ================= //

/** Shared variants for buttons and links */
export type ButtonVariant = "default" | "outline" | "ghost" | "underline" | "none";

/** Shared theme for buttons and links */
export const buttonTheme: {
    [key in ButtonVariant]: {
        button: string;
        isLoading: string;
        disabled: string;
        loaderColor: LoaderColor;
    };
} = {
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
        button: combo("border border-gray-300 bg-white text-gray-800", "hover:border-gray-500 hover:bg-gray-100"),
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
