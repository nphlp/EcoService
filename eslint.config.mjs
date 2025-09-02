import { FlatCompat } from "@eslint/eslintrc";
import tsParser from "@typescript-eslint/parser";
import reactRefresh from "eslint-plugin-react-refresh";
import unusedImports from "eslint-plugin-unused-imports";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
    baseDirectory: __dirname,
});

const eslintConfig = [
    {
        ignores: [
            ".conductor/**",
            ".next/**",
            ".next-test/**",
            ".github/**",
            "prettier.config.mjs",
            "eslint.config.mjs",
            "vitest.config.mjs",
            "postcss.config.mjs",
            "prisma/client/**",
            "node_modules/**",
            "next-env.d.ts",
        ],
    },
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        languageOptions: {
            parser: tsParser,
            parserOptions: { project: true },
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
];

export default eslintConfig;
