import { combo } from "@lib/combo";

/** Input theme */
export type InputVariant = "default" | "dark" | "none";

/** Input theme type */
export type InputThemeType = {
    [key in InputVariant]: {
        component: string;
        label: string;
        input: string;
    };
};

/** Input theme */
export const inputTheme: InputThemeType = {
    default: {
        component: combo("block space-y-1"),
        label: combo("text-sm font-medium text-gray-600"),
        input: combo(
            "w-full rounded-lg border border-black/20 bg-white px-4 py-1.5",
            "outline-none ring-0 focus:ring-2 focus:ring-teal-300",
            "transition-all duration-150",
        ),
    },
    dark: {
        component: combo("block space-y-1"),
        label: combo("text-sm font-medium text-gray-400"),
        input: combo(
            "w-full rounded-lg border border-white/20 bg-white/10 px-4 py-1.5",
            "outline-none ring-0 focus:ring-2 focus:ring-teal-300",
            "transition-all duration-150",
        ),
    },
    none: {
        component: "",
        label: "",
        input: "",
    },
};
