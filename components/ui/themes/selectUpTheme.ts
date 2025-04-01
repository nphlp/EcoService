import { combo } from "@lib/combo";

export type SelectUpVariant = "default" | "dark" | "none";

export type SelectUpThemeType = {
    [key in SelectUpVariant]: {
        component: string;
        label: string;
        input: string;
        optionContainer: string;
    };
};

export const selectUpTheme: SelectUpThemeType = {
    default: {
        component: combo("flex flex-col gap-1"),
        label: combo("text-sm font-medium text-black"),
        input: combo(
            "w-full rounded-lg border border-black/20 bg-white px-4 py-1.5",
            "outline-none ring-0 focus:ring-2 focus:ring-teal-300",
            "transition-all duration-150",
        ),
        optionContainer: combo(
            "absolute top-full left-0 mt-1.5 w-full",
            "shadow-md shadow-black/20 rounded-xl bg-white border border-black/20 p-2 space-y-1.5",
        ),
    },
    dark: {
        component: combo("flex flex-col gap-1"),
        label: combo("text-sm font-medium text-white"),
        input: combo(
            "w-full rounded-lg border border-white/20 bg-white/10 px-4 py-1.5",
            "outline-none ring-0 focus:ring-2 focus:ring-teal-300",
            "transition-all duration-150",
        ),
        optionContainer: combo(
            "absolute top-full left-0 mt-1.5 w-full",
            "shadow-md shadow-white/20 rounded-xl bg-black/10 border border-white/20 p-2 space-y-1.5",
        ),
    },
    none: {
        component: "",
        label: "",
        input: "",
        optionContainer: "",
    },
};
