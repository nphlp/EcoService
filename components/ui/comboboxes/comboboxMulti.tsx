"use client";

import { Combobox as ComboboxHeadlessUI, ComboboxInput, ComboboxOption, ComboboxOptions } from "@headlessui/react";
import { combo } from "@lib/combo";
import { StringToSlug } from "@utils/StringToSlug";
import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import Popover from "../popover";
import ComboboxIcon from "./sub-components/comboboxIcon";
import ComboboxLabel from "./sub-components/comboboxLabel";
import { ComboOptionType, MultiSourceComboOptionType } from "./utils";

// TODO
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
