"use client";

import { Combobox as ComboboxHeadlessUI, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { combo } from "@lib/combo";
import { StringToSlug } from "@utils/StringToSlug";
import { Check, X } from "lucide-react";
import { motion } from "motion/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Popover from "../popover";
import ComboboxIcon from "./sub-components/comboboxIcon";
import ComboboxLabel from "./sub-components/comboboxLabel";
import { ComboOptionType, MultiSourceComboOptionType } from "./utils";

type ComboboxMultiProps<T extends ComboOptionType | MultiSourceComboOptionType> = {
    label: string;
    placeholder?: string;
    classComponent?: string;
    initialOptions: T[];
    states: {
        query: string;
        setQuery: (value: string) => void;
        selected: T[];
        setSelected: (value: T[]) => void;
        options: T[];
        setOptions: (value: T[]) => void;
    };
    isLoading?: boolean;
    displaySelectedValuesInDropdown?: boolean;
};

/**
 * # ComboboxMulti
 * A component for selecting multiple options with search functionality
 *
 * Three states to manage:
 * - **query**: the current search query
 * - **selected**: the currently selected options (array)
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
 * **displaySelectedValuesInDropdown**: Shows selected options in dropdown for easy deselection.
 * Not recommended for lists with many selections.
 *
 * @example
 * ## ComboboxMulti with Static Options
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
 *     //     select: { slug: true, title: true },
 *     //     take: 2,
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
 *     const comboboxStates = useComboboxMultiStates([], initialOptions);
 *
 *     return (
 *         <ComboboxMulti
 *             label="Produit"
 *             placeholder="Sélectionnez un produit"
 *             classComponent="w-full"
 *             initialOptions={initialOptions}
 *             states={comboboxStates}
 *             displaySelectedValuesInDropdown
 *         />
 *     );
 * }
 * ```
 *
 * ## ComboboxMulti with Dynamic Options
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
 *     //     take: 2,
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
 *     const comboboxStates = useComboboxMultiStates([], initialOptions);
 *     const { selected, query, options, setOptions } = comboboxStates;
 *
 *     // Reactive fetch
 *     const { data: productData, isLoading: isLoadingProduct } = useFetchV2({
 *         route: "/product/findMany",
 *         params: {
 *             select: { slug: true, name: true },
 *             where: {
 *                 name: { contains: query },
 *                 // Exclude already selected options from the search
 *                 slug: { notIn: selected.map((option) => option.slug) },
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
 *     //             slug: { notIn: selected.map((option) => option.slug) },
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
 *         // Create formatted options from the fetched data
 *         const productOptions = createComboOptions(productData, { slug: "slug", name: "name" });
 *
 *         // For multi source, create options for other data
 *         // const articleOptions = createComboOptions(articleData, { slug: "slug", name: "title", type: "article" });
 *
 *         // Merge options
 *         const mergedOptions = [...selected, ...productOptions];
 *
 *         // For multi source, merge all options
 *         // const mergedOptions = [...selected, ...productOptions, ...articleOptions];
 *
 *         // Add "selected.length" to get selected options and 6 options more
 *         // Useful only if "displaySelectedValuesInDropdown" is enabled
 *         const newOptions = deduplicateOptions(mergedOptions, 6 + selected.length);
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
 *         <ComboboxMulti
 *             label="Recherchez et sélectionnez"
 *             placeholder="Un produit, une catégorie ou un article..."
 *             classComponent="w-full"
 *             initialOptions={initialOptions}
 *             states={comboboxStates}
 *             isLoading={isLoading}
 *             displaySelectedValuesInDropdown
 *         />
 *     );
 * }
 * ```
 */
export default function ComboboxMulti<T extends ComboOptionType | MultiSourceComboOptionType>(
    props: ComboboxMultiProps<T>,
) {
    const {
        label,
        placeholder,
        classComponent,
        initialOptions,
        states,
        isLoading,
        displaySelectedValuesInDropdown = false,
    } = props;
    const { query, setQuery, selected, setSelected, options, setOptions } = states;

    const displayedOptions = options
        // The following line is usefull when options are static (not connected to an API)
        // When options are dynamic (connected to the API), this filter is done for nothing
        // But the code and usage is easier and cleaner with more conditions
        .filter((option) => option.slug.includes(StringToSlug(query)))
        // Include or exclude the selected options from the dropdown options
        .filter((option) => {
            // If true, show all options
            if (displaySelectedValuesInDropdown) return true;
            // If false, filter out already selected options
            return !selected.some((selectedOption) => selectedOption.slug === option.slug);
        });

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
    };

    const handleSelectionChange = (options: T[]) => {
        setSelected(options);
        setQuery("");
    };

    const handleDropdownClosing = () => {
        setOptions(initialOptions);
        setQuery("");
    };

    return (
        <div className={combo(classComponent)}>
            <label className="text-sm font-medium text-black">{label}</label>
            <ComboboxHeadlessUI
                as="div"
                value={selected}
                onChange={handleSelectionChange}
                onClose={handleDropdownClosing}
                multiple
                immediate
            >
                <ComboboxDisplay className="mt-1" selected={selected} setSelected={setSelected} />
                <div className={combo("relative", selected.length > 0 ? "mt-2.5" : "mt-0")}>
                    <ComboboxInput
                        aria-label={label}
                        onChange={handleQueryChange}
                        value={query}
                        placeholder={placeholder ?? "Search and select multiple options..."}
                        className={combo(
                            // Size and padding
                            "w-full px-4 py-1.5",
                            // Border and radius
                            "rounded-lg border border-gray-300 focus:border-gray-500",
                            // Backgrounde
                            "bg-white",
                            // Accessibility
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
                                selected.some((selectedOption) => selectedOption.slug === option.slug) &&
                                    "font-semibold",
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

type ComboboxDisplayProps<T extends ComboOptionType | MultiSourceComboOptionType> = {
    selected: T[];
    setSelected: (value: T[]) => void;
    maxLength?: number;
    className?: string;
};

const ComboboxDisplay = <T extends ComboOptionType | MultiSourceComboOptionType>(props: ComboboxDisplayProps<T>) => {
    const { selected, setSelected, maxLength = 12, className } = props;

    const needsEllipsis = (name: string) => name.length > maxLength;
    const ellipsis = (name: string) => (needsEllipsis(name) ? name.slice(0, maxLength) : name);

    const handleRemove = (optionToRemove: T) => {
        const optionsLeft = selected.filter((selectedOption) => selectedOption.slug !== optionToRemove.slug);
        setSelected(optionsLeft);
    };

    // Current container height
    const [currentHeight, setCurrentHeight] = useState("auto");
    const heightRef = useRef<HTMLDivElement>(null);
    const resizeObserverRef = useRef<ResizeObserver | null>(null);

    // Update card height
    useEffect(() => {
        const updateHeight = () => {
            if (heightRef.current) {
                const visualHeight = heightRef.current.offsetHeight;
                setCurrentHeight(visualHeight + "px");
            }
        };

        resizeObserverRef.current = new ResizeObserver(updateHeight);

        if (heightRef.current) {
            resizeObserverRef.current.observe(heightRef.current);
        }

        return () => {
            if (resizeObserverRef.current) {
                resizeObserverRef.current.disconnect();
            }
        };
    }, [selected]);

    return (
        <motion.div
            initial={{ height: "auto" }}
            animate={{ height: currentHeight }}
            transition={{
                duration: 0.15,
                ease: "easeInOut",
            }}
            className={className}
        >
            <div ref={heightRef} className="flex flex-row flex-wrap gap-1">
                {selected.map((option, index) => (
                    <div
                        key={index}
                        id={`tag-${option.slug}-${index}`}
                        className={combo(
                            "h-fit rounded-full border border-gray-300 py-0.5 pr-0.5 pl-2",
                            "flex items-center gap-1",
                            "relative",
                            "select-none",
                        )}
                    >
                        <Popover
                            idToTrack={`tag-${option.slug}-${index}`}
                            name={option.name}
                            needsEllipsis={needsEllipsis(option.name)}
                        />
                        <div className="relative text-xs">
                            <span
                                className={combo(
                                    "absolute",
                                    "pointer-events-none",
                                    "right-0 h-full w-[12px] text-transparent",
                                    needsEllipsis(option.name) && "bg-linear-to-r from-transparent to-white",
                                )}
                            >
                                {ellipsis(option.name)}
                            </span>
                            <span>{ellipsis(option.name)}</span>
                        </div>
                        <button
                            type="button"
                            onClick={() => handleRemove(option)}
                            className="cursor-pointer rounded-full p-1 hover:bg-gray-100"
                        >
                            <X className="size-4" />
                        </button>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};
