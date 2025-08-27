import react from "@vitejs/plugin-react";
import dotenv from "dotenv";
import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

// Charger les variables d'environnement du fichier .env
dotenv.config({ quiet: true });

const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

export default defineConfig({
    plugins: [tsconfigPaths(), react()],
    test: {
        environment: "jsdom",
        env: {
            NEXT_PUBLIC_BASE_URL,
        },
        exclude: ["**/.next/**", "**/.next-test/**", "**/node_modules/**", "**/.conductor/**"],
    },
});
