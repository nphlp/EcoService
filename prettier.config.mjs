const prettierConfig = {
    // Basic prettier config
    tabWidth: 4,
    useTabs: false,
    printWidth: 120,
    bracketSpacing: true,

    // Plugins imports
    plugins: ["@trivago/prettier-plugin-sort-imports", "prettier-plugin-tailwindcss"],

    // Sorting imports config
    importOrder: ["^@/(.*)$", "^[./]"], // Ordre : imports @/ puis imports relatifs ./
    importOrderSeparation: false, // Pas de ligne vide entre les groupes
    importOrderSortSpecifiers: true, // Trie les éléments dans chaque import
};

export default prettierConfig;
