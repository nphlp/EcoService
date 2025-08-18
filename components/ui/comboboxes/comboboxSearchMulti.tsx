"use client";

import { ComboOptionType, MultiSourceComboOptionType } from "@comps/ui/comboboxes/utils";
import Loader from "@comps/ui/loader";
import Popover from "@comps/ui/popover";
import {
    ComboboxButton,
    Combobox as ComboboxHeadlessUI,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from "@headlessui/react";
import { combo } from "@lib/combo";
import { StringToSlug } from "@utils/StringToSlug";
import { motion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";

// TODO
// Keyboard accessibility
// Highlight selected option
// Documentation

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
 * Combobox multi-selection component
 * @example
 * ```tsx
 * // Import hook states
 * const comboboxMultiStates = useComboboxMultiStates([], productOptions);
 *
 * // Extract only what you need
 * const { selected, setOptions } = comboboxMultiStates;
 *
 * // Use the component
 * <ComboboxMulti
 *     label="Produits"
 *     placeholder="Sélectionnez des produits"
 *     classComponent="w-full"
 *     initialOptions={productOptions}
 *     states={comboboxMultiStates}
 * />
 * ```
 */
export default function ComboboxSearchMulti<T extends ComboOptionType | MultiSourceComboOptionType>(
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

    const displayedOptions = options.filter((option) => {
        // If true, show all options
        if (displaySelectedValuesInDropdown) return true;
        // If false, filter out already selected options
        return !selected.some((selectedOption) => selectedOption.slug === option.slug);
    });

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
    };

    const handleSelectionChange = (value: T[]) => {
        setSelected(value);
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
                <ComboboxDisplay className="mt-1" selected={selected} setSelected={setSelected} options={options} />
                <div className={combo("relative", selected.length > 0 ? "mt-2.5" : "mt-0")}>
                    <ComboboxInput
                        aria-label={label}
                        onChange={handleQueryChange}
                        value={query}
                        placeholder={placeholder ?? "Search and select multiple options..."}
                        className={combo(
                            "w-full rounded-lg border border-black/20 bg-white px-4 py-1.5",
                            "ring-0 outline-none focus:ring-2 focus:ring-teal-300",
                            "transition-all duration-150",
                        )}
                    />
                    <ComboboxIcon
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
                                selected.includes(option) && "font-semibold",
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

type ComboboxIconProps<T extends ComboOptionType | MultiSourceComboOptionType> = {
    selected: T[];
    setSelected: (value: T[]) => void;
    setQuery: (value: string) => void;
    isLoading?: boolean;
};

export const ComboboxIcon = <T extends ComboOptionType | MultiSourceComboOptionType>(props: ComboboxIconProps<T>) => {
    const { selected, setSelected, setQuery, isLoading } = props;

    const handleRemoveAll = () => {
        setSelected([]);
        setQuery("");
    };

    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handleRemoveAll();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();
        handleRemoveAll();
    };

    if (isLoading) {
        return (
            <div className={combo("absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer rounded-full p-1")}>
                <Loader />
            </div>
        );
    }

    if (selected.length === 0) {
        return (
            <ComboboxButton
                className={combo("absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer rounded-full p-1")}
            >
                <ChevronDown className="size-5 fill-white" />
            </ComboboxButton>
        );
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={combo(
                "absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer rounded-full p-1",
                "ring-0 outline-none focus:ring-2 focus:ring-teal-300",
                "transition-all duration-150",
            )}
        >
            <X className="size-5 fill-white" />
        </button>
    );
};

type ComboboxDisplayProps<T extends ComboOptionType | MultiSourceComboOptionType> = {
    selected: T[];
    setSelected: (value: T[]) => void;
    options: T[];
    maxLength?: number;
    className?: string;
};

const ComboboxDisplay = <T extends ComboOptionType | MultiSourceComboOptionType>(props: ComboboxDisplayProps<T>) => {
    const { selected, setSelected, maxLength = 12, className } = props;

    const needsEllipsis = (name: string) => name.length > maxLength;
    const ellipsis = (name: string) => (needsEllipsis(name) ? name.slice(0, maxLength) : name);

    const handleRemove = (slug: string) => {
        const optionToRemove = selected.filter((selectedOption) => selectedOption.slug !== slug);
        setSelected(optionToRemove);
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
                            onClick={() => handleRemove(option.slug)}
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

type ComboboxLabelProps<T extends ComboOptionType | MultiSourceComboOptionType> = {
    option: T;
    query: string;
};

const ComboboxLabel = <T extends ComboOptionType | MultiSourceComboOptionType>(props: ComboboxLabelProps<T>) => {
    const { option, query } = props;

    const highlightQuery = (optionName: string, query: string) => {
        // Slugify the option name and the query
        const nameSlug = StringToSlug(optionName);
        const querySlug = StringToSlug(query);

        // Find the index of the query in the option name
        const queryStartIndex = nameSlug.indexOf(querySlug);
        const queryEndIndex = queryStartIndex + querySlug.length;

        // Slice the option name into before, highlighted and after
        return {
            before: optionName.slice(0, queryStartIndex),
            highlighted: optionName.slice(queryStartIndex, queryEndIndex),
            after: optionName.slice(queryEndIndex),
        };
    };

    const { before, highlighted, after } = highlightQuery(option.name, query);

    return (
        <div className="flex w-full items-center justify-start gap-2">
            <span>
                <span>{before}</span>
                <span className="rounded-sm bg-teal-200 font-bold">{highlighted}</span>
                <span>{after}</span>
            </span>
            {"type" in option && (
                <span className="text-3xs rounded-full bg-gray-500 px-1.5 pt-[3px] pb-[2px] font-semibold text-white uppercase">
                    {option.type}
                </span>
            )}
        </div>
    );
};
