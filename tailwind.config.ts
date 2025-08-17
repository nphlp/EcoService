import type { Config } from "tailwindcss";

export default {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "hsl(248, 79%, 13%)",
                secondary: "hsl(183, 100%, 40%)",
            },
            fontSize: {
                "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
                "3xs": ["0.5rem", { lineHeight: "0.625rem" }],
            },
        },
    },
    plugins: [],
} satisfies Config;
