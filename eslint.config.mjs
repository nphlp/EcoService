import { FlatCompat } from "@eslint/eslintrc";
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
    ...compat.extends("next/core-web-vitals", "next/typescript"),
    {
        plugins: {
            "react-refresh": reactRefresh,
            "unused-imports": unusedImports,
        },
        rules: {
            "react-refresh/only-export-components": "warn",
            "unused-imports/no-unused-imports": "error",
            "unused-imports/no-unused-vars": "warn",
        },
    },
];

export default eslintConfig;
