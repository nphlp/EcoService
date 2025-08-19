"use client";

import { Combobox as ComboboxHeadlessUI, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { combo } from "@lib/combo";
import { StringToSlug } from "@utils/StringToSlug";
import { Check } from "lucide-react";
import { ChangeEvent } from "react";
import ComboboxIcon from "./sub-components/comboboxIcon";
import ComboboxLabel from "./sub-components/comboboxLabel";
import { ComboOptionType, MultiSourceComboOptionType } from "./utils";

type ComboboxProps<T extends ComboOptionType | MultiSourceComboOptionType> = {
    label: string;
    placeholder?: string;
    classComponent?: string;
    initialOptions: T[];
    states: {
        query: string;
        setQuery: (value: string) => void;
        selected: T | null;
        setSelected: (value: T | null) => void;
        options: T[];
        setOptions: (value: T[]) => void;
    };
    isLoading?: boolean;
};

/**
 * # Combobox
 * A component for selecting options with search functionality
 *
 * Three states to manage:
 * - **query**: the current search query
 * - **selected**: the currently selected option
 * - **options**: the list of available options
 *
 * Options can be:
 * - **static**: fetched server side (example 1)
 * - **dynamic**: fetched server side, refreshed client side (example 2)
 *
 * Options data can be:
 * - **single source**: all options come from a single API endpoint
 * - **multi source**: options come from multiple API endpoints
 *
 * Différences between single and multiple options are shown in the examples below.
 *
 * @example
 * ## Combobox with Static Options
 * Options are fetched server-side and do not change.
 *
 * ##### Serveur component
 * ```tsx
 * export default async function Page() {
 *     // Fetch single source
 *     const productList = await ProductFindManyServer({
 *         select: { slug: true, name: true },
 *         take: 6,
 *     });
 *
 *     // For multi source, add more resources
 *     // const articleList = await ArticleFindManyServer({
 *     //     select: { slug: true, name: true },
 *     //     take: 6,
 *     // });
 *
 *     // Format options
 *     const initialOptions = createComboOptions(productList, { slug: "slug", name: "name" });
 *
 *     // For multi source, format options with types
 *     // const productOptions = createComboOptions(productList, { slug: "slug", name: "name", type: "product" });
 *     // const articleOptions = createComboOptions(articleList, { slug: "slug", name: "name", type: "article" });
 *
 *     // For multi source, merge options
 *     // const initialOptions = [...productOptions, ...articleOptions];
 *
 *     return <Search initialOptions={initialOptions} />;
 * ```
 *
 * ##### Client component
 * ```tsx
 * "use client";
 *
 * type SearchProps = {
 *     initialOptions: ComboOptionType[];
 *
 *     // For multi source, use this type
 *     // initialOptions: MultiSourceComboOptionType[];
 * };
 *
 * export default function Search(props: SearchProps) {
 *     const { initialOptions } = props;
 *
 *     // States
 *     const comboboxStates = useComboboxStates(null, initialOptions);
 *
 *     return (
 *         <Combobox
 *             label="Produit"
 *             placeholder="Sélectionnez un produit"
 *             classComponent="w-full"
 *             initialOptions={initialOptions}
 *             states={comboboxStates}
 *         />
 *     );
 * }
 * ```
 *
 * ## Combobox with Dynamic Options
 * Options are fetched server-side, additional options can be fetched client-side.
 *
 * ##### Serveur component
 * ```tsx
 * export default async function Page() {
 *     // Fetch single source
 *     const productList = await ProductFindManyServer({
 *         select: { slug: true, name: true },
 *         take: 6,
 *     });
 *
 *     // For multi source, add more resources
 *     // const articleList = await ArticleFindManyServer({
 *     //     select: { slug: true, title: true },
 *     //     take: 6,
 *     // });
 *
 *     // Format options
 *     const initialOptions = createComboOptions(productList, { slug: "slug", name: "name" });
 *
 *     // For multi source, format options with types
 *     // const productOptions = createComboOptions(productList, { slug: "slug", name: "name", type: "product" });
 *     // const articleOptions = createComboOptions(articleList, { slug: "slug", name: "title", type: "article" });
 *
 *     // For multi source, merge options
 *     // const initialOptions = [...productOptions, ...articleOptions];
 *
 *     return <Search initialOptions={initialOptions} />;
 * ```
 *
 * ##### Client component
 * ```tsx
 * "use client";
 *
 * type SearchProps = {
 *     initialOptions: ComboOptionType[];
 *
 *     // For multi source, use this type
 *     // initialOptions: MultiSourceComboOptionType[];
 * };
 *
 * export default function Search(props: SearchProps) {
 *     const { initialOptions } = props;
 *
 *     // States
 *     const comboboxStates = useComboboxStates(null, initialOptions);
 *     const { selected, query, options, setOptions } = comboboxStates;
 *
 *     // Reactive fetch
 *     const { data: productData, isLoading: isLoadingProduct } = useFetchV2({
 *         route: "/product/findMany",
 *         params: {
 *             select: { slug: true, name: true },
 *             where: {
 *                 name: { contains: query },
 *                 // Exclude already selected option from the search
 *                 ...(selected && { slug: selected.slug }),
 *             },
 *             take: 6,
 *         },
 *     });
 *
 *     // For multi source, add more reactive fetches
 *     // const { data: articleData, isLoading: isLoadingArticle } = useFetchV2({
 *     //     route: "/article/findMany",
 *     //     params: {
 *     //         select: { slug: true, title: true },
 *     //         where: {
 *     //             title: { contains: query },
 *     //             // Exclude already selected option from the search
 *     //             ...(selected && { slug: { not: selected.slug } }),
 *     //         },
 *     //         take: 2,
 *     //     },
 *     // });
 *
 *     // Options updates
 *     useEffect(() => {
 *         // Required to avoid useEffect execution on initial render
 *         // and to keep initial options
 *         if (!productData) return;
 *
 *         // Create an options array from the selected state
 *         const selectedOptions = createSelectedOptions(selected);
 *
 *         // Create formatted options from the fetched data
 *         const productOptions = createComboOptions(productData, { slug: "slug", name: "name", type: "product" });
 *
 *         // For multi source, create options for other data
 *         // const articleOptions = createComboOptions(articleData, { slug: "slug", title: "title", type: "article" });
 *
 *         // Merge options
 *         const newOptions = [...selectedOptions, ...productOptions];
 *
 *         // For multi source, merge all options
 *         // const newOptions = [...selectedOptions, ...productOptions, ...articleOptions];
 *
 *         // Update options if different
 *         const areDifferent = !isEqual(newOptions, options);
 *         if (areDifferent) setOptions(newOptions);
 *     }, [productData, options, setOptions, selected]);
 *
 *     // For multi source, add articleData dependency
 *     // }, [productData, articleData, options, setOptions, selected];
 *
 *     const isLoading = isLoadingProduct;
 *
 *     // For multi source, chain loading states
 *     // const isLoading = isLoadingProduct || isLoadingArticle;
 *
 *     return (
 *         <Combobox
 *             label="Recherchez et sélectionnez"
 *             placeholder="Un produit, une catégorie ou un article..."
 *             classComponent="w-full"
 *             initialOptions={initialOptions}
 *             states={comboboxStates}
 *             isLoading={isLoading}
 *         />
 *     );
 * }
 * ```
 */
export default function Combobox<T extends ComboOptionType | MultiSourceComboOptionType>(props: ComboboxProps<T>) {
    const { label, placeholder, classComponent, initialOptions, states, isLoading } = props;
    const { query, setQuery, selected, setSelected, options, setOptions } = states;

    // The following line is usefull when options are static (not connected to an API)
    // When options are dynamic (connected to the API), this filter is done for nothing
    // But the code and usage is easier and cleaner with more conditions
    const displayedOptions = options.filter((option) => option.slug.includes(StringToSlug(query)));

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
    };

    const handleSelectionChange = (option: T | null) => {
        if (!option) return;
        setSelected(option);
    };

    const handleDropdownClosing = () => {
        setOptions(initialOptions);
        setQuery("");
    };

    const handleDisplayValue = (option: T | null) => {
        if (!option) return "";
        return option.name;
    };

    return (
        <div className={combo(classComponent)}>
            <label className="text-sm font-medium text-black">{label}</label>
            <ComboboxHeadlessUI
                as="div"
                className="mt-1"
                value={selected}
                onChange={handleSelectionChange}
                onClose={handleDropdownClosing}
                immediate
            >
                <div className="relative">
                    <ComboboxInput
                        aria-label={label}
                        displayValue={handleDisplayValue}
                        onChange={handleQueryChange}
                        // value={query} // Disable query value to allow "displayValue" to work properly
                        placeholder={placeholder ?? "Search and select an option..."}
                        className={combo(
                            "w-full rounded-lg border border-black/20 bg-white px-4 py-1.5",
                            "ring-0 outline-none focus:ring-2 focus:ring-teal-300",
                            "transition-all duration-150",
                        )}
                    />
                    <ComboboxIcon<T>
                        selected={selected}
                        setSelected={setSelected}
                        setQuery={setQuery}
                        isLoading={isLoading}
                    />
                </div>
                <ComboboxOptions
                    anchor="bottom"
                    className={combo(
                        "rounded-lg border border-gray-300 bg-white p-1",
                        // HeadlessUI styles
                        "w-(--input-width) [--anchor-gap:6px] empty:invisible",
                    )}
                >
                    {displayedOptions.map((option, index) => (
                        <ComboboxOption
                            key={index}
                            value={option}
                            className={combo(
                                "group bg-white data-focus:bg-gray-100",
                                "flex items-center gap-2",
                                "rounded-sm px-2 py-1",
                                "cursor-pointer text-sm",
                                selected?.slug === option.slug && "font-semibold",
                            )}
                        >
                            <Check className="invisible size-5 stroke-[2.5px] group-data-selected:visible" />
                            <ComboboxLabel option={option} query={query} />
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </ComboboxHeadlessUI>
        </div>
    );
}
