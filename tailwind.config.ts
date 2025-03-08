import type { Config } from "tailwindcss";

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#0E073B",
                secondary: "#00C2CB",
            },
            fontSize: {
                "xxs": ["0.625rem", { lineHeight: "0.75rem" }],
            },
        },
    },
    plugins: [],
} satisfies Config;
