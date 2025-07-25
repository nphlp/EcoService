import type { Config } from "tailwindcss";

export default {
    content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "var(--primary)",
                secondary: "var(--secondary)",

                primaryAccent: "var(--primary-accent)",
                secondaryAccent: "var(--secondary-accent)",

                background: "var(--background)",
                backgroundAccent: "var(--background-accent)",

                foreground: "var(--foreground)",
                foregroundAccent: "var(--foreground-accent)",
            },
            fontSize: {
                "2xs": ["0.625rem", { lineHeight: "0.75rem" }],
                "3xs": ["0.5rem", { lineHeight: "0.625rem" }],
            },
        },
    },
    plugins: [],
} satisfies Config;
