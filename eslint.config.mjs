import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import { defineConfig, globalIgnores } from "eslint/config";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const eslintConfig = defineConfig([
    ...nextVitals,
    ...nextTs,
    globalIgnores([
        ".next/**",
        ".github/**",
        "coverage/**",
        "components/SHADCN/**",
        "prettier.config.mjs",
        "postcss.config.mjs",
        "vitest.config.mjs",
        "prisma/client/**",
        "next-env.d.ts",
        // TODO: (remove this) Exclude API example routes and tests
        "api/examples/**",
        "test/unit/examples/**",
    ]),
    {
        files: ["**/*.ts", "**/*.tsx", "**/*.mts", "**/*.cts"],
        languageOptions: {
            parserOptions: { project: true, tsconfigRootDir: __dirname },
        },
        plugins: {
            "react-refresh": reactRefresh,
            "unused-imports": unusedImports,
        },
        rules: {
            "react-refresh/only-export-components": [
                "warn",
                {
                    allowConstantExport: true,
                    allowExportNames: [
                        // Page authorized exports
                        "metadata",
                        "generateMetadata",
                        "generateStaticParams",
                        "generateViewport",
                        "generateImageMetadata",
                        // OpenGraph image authorized exports
                        "alt",
                        "size",
                        "contentType",
                    ],
                },
            ],
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": "warn",
            "@typescript-eslint/no-deprecated": "error",
        },
    },
]);

export default eslintConfig;
