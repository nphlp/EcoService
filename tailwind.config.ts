import type { Config } from "tailwindcss";

export default {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                eco: "#0E073B",
                ecoco: "#00C2CB",
            },
            fontSize: {
                xxs: ["0.625rem", { lineHeight: "0.75rem" }],
            },
        },
    },
    plugins: [],
} satisfies Config;
