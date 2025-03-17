import type { Config } from "tailwindcss";

export default {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0E073B",
                secondary: "#00C2CB",
            },
            fontSize: {
                xxs: ["0.625rem", { lineHeight: "0.75rem" }],
            },
        },
    },
    plugins: [],
} satisfies Config;
