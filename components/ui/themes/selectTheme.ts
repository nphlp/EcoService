import { combo } from "@lib/combo";

export type SelectVariant = "default" | "dark" | "none";

export type SelectThemeType = {
    [key in SelectVariant]: {
        component: string;
        label: string;
        input: string;
        option: string;
    };
};

export const selectTheme: SelectThemeType = {
    default: {
        component: combo("flex flex-col gap-1"),
        label: combo("text-sm font-medium text-black"),
        input: combo(
            "w-full rounded-lg border border-black/20 bg-white px-4 py-1.5",
            "outline-none ring-0 focus:ring-2 focus:ring-teal-300",
            "transition-all duration-150",
        ),
        option: combo("text-black bg-white"),
    },
    dark: {
        component: combo("flex flex-col gap-1"),
        label: combo("text-sm font-medium text-white"),
        input: combo(
            "w-full rounded-lg border border-white/20 bg-white/10 px-4 py-1.5",
            "outline-none ring-0 focus:ring-2 focus:ring-teal-300",
            "transition-all duration-150",
        ),
        option: combo("text-black bg-white"),
    },
    none: {
        component: "",
        label: "",
        input: "",
        option: "",
    },
};
