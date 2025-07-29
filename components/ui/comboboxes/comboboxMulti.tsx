"use client";

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
import Popover from "../popover";
import { MultiComboOptionType } from "./utils";

type ComboboxMultiProps = {
    label?: string;
    placeholder?: string;
    classComponent?: string;
    initialOptions: MultiComboOptionType[];
    states: {
        query: string;
        setQuery: (value: string) => void;
        selected: MultiComboOptionType[];
        setSelected: (value: MultiComboOptionType[]) => void;
        options: MultiComboOptionType[];
        setOptions: (value: MultiComboOptionType[]) => void;
    };
};

/**
 * Typed hook to manage combobox multi-selection state
 * @example
 * ```tsx
 * // Import hook states
 * const comboboxMultiStates = useComboboxMultiStates([], productOptions);
 *
 * // Extract any state you need in the following properties
 * const { query, setQuery, selected, setSelected, options, setOptions } = comboboxMultiStates;
 * ```
 */
export const useComboboxMultiStates = (
    initialSelections: MultiComboOptionType[],
    initialOptions: MultiComboOptionType[],
) => {
    const [query, setQuery] = useState<string>("");
    const [selected, setSelected] = useState<MultiComboOptionType[]>(initialSelections);
    const [options, setOptions] = useState<MultiComboOptionType[]>(initialOptions);
    return { query, setQuery, selected, setSelected, options, setOptions };
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
export default function ComboboxMulti(props: ComboboxMultiProps) {
    const { label, placeholder, classComponent, initialOptions, states } = props;
    const { query, setQuery, selected, setSelected, options, setOptions } = states;

    const displayedOptions = options.filter((option) => option.slug.includes(StringToSlug(query)));

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
    };

    const handleSelectionChange = (options: MultiComboOptionType[]) => {
        setSelected(options);
        setQuery("");
    };

    const handleDropdownClosing = () => {
        setOptions(initialOptions);
        setQuery("");
    };

    const handleRemove = (optionToRemove: MultiComboOptionType) => {
        const optionsLeft = selected.filter((selectedOption) => selectedOption.slug !== optionToRemove.slug);
        setSelected(optionsLeft);
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
                <ComboboxDisplay
                    className="mt-1"
                    selected={selected}
                    initialOptions={initialOptions}
                    handleRemove={handleRemove}
                />
                <div className={combo("relative", selected.length > 0 ? "mt-2.5" : "mt-0")}>
                    <ComboboxInput
                        aria-label={label ?? "Search"}
                        onChange={handleQueryChange}
                        placeholder={placeholder ?? "Search and select multiple options..."}
                        className={combo(
                            "w-full rounded-lg border border-black/20 bg-white px-4 py-1.5",
                            "ring-0 outline-none focus:ring-2 focus:ring-teal-300",
                            "transition-all duration-150",
                        )}
                    />
                    <ComboboxIcon selected={selected} setSelected={setSelected} setQuery={setQuery} />
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
                            <ComboboxLabel optionName={option.name} query={query} />
                        </ComboboxOption>
                    ))}
                </ComboboxOptions>
            </ComboboxHeadlessUI>
        </div>
    );
}

type ComboboxIconProps = {
    selected: MultiComboOptionType[];
    setSelected: (value: MultiComboOptionType[]) => void;
    setQuery: (value: string) => void;
};

export const ComboboxIcon = (props: ComboboxIconProps) => {
    const { selected, setSelected, setQuery } = props;

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
            className={combo("absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer rounded-full p-1")}
        >
            <X className="size-5 fill-white" />
        </button>
    );
};

type ComboboxDisplayProps = {
    selected: MultiComboOptionType[];
    initialOptions: MultiComboOptionType[];
    maxLength?: number;
    handleRemove: (option: MultiComboOptionType) => void;
    className?: string;
};

const ComboboxDisplay = (props: ComboboxDisplayProps) => {
    const { selected, initialOptions, maxLength = 12, handleRemove, className } = props;

    const needsEllipsis = (name: string) => name.length > maxLength;
    const ellipsis = (name: string) => (needsEllipsis(name) ? name.slice(0, maxLength) : name);

    const selectedOptions = initialOptions.filter((option) =>
        selected.some((selectedOption) => selectedOption.slug === option.slug),
    );

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
                {selectedOptions.map((option, index) => (
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

type ComboboxLabelProps = {
    optionName: string;
    query: string;
};

const ComboboxLabel = (props: ComboboxLabelProps) => {
    const { optionName, query } = props;

    // Slugify the option name and the query
    const nameSlug = StringToSlug(optionName);
    const querySlug = StringToSlug(query);

    // Find the index of the query in the option name
    const queryStartIndex = nameSlug.indexOf(querySlug);
    const queryEndIndex = queryStartIndex + querySlug.length;

    // Slice the option name into before, highlighted and after
    const before = optionName.slice(0, queryStartIndex);
    const highlighted = optionName.slice(queryStartIndex, queryEndIndex);
    const after = optionName.slice(queryEndIndex);

    return (
        <span>
            <span>{before}</span>
            <span className="rounded-sm bg-teal-200 font-bold">{highlighted}</span>
            <span>{after}</span>
        </span>
    );
};
