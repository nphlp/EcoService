import type { Config } from "tailwindcss";
import animate from 'tailwindcss-animate'
import reactAria from 'tailwindcss-react-aria-components'

export default {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                background: "var(--background)",
                foreground: "var(--foreground)",
            },
        },
    },
    plugins: [
        animate,
        reactAria
    ],
} satisfies Config;
