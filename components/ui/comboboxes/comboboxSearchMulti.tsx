"use client";

import { ComboOptionType, MultiComboOptionType } from "@comps/ui/comboboxes/utils";
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
import { motion } from "framer-motion";
import { Check, ChevronDown, X } from "lucide-react";
import { ChangeEvent, KeyboardEvent, MouseEvent, useEffect, useRef, useState } from "react";

type ComboboxMultiProps<T extends ComboOptionType | MultiComboOptionType> = {
    label?: string;
    placeholder?: string;
    classComponent?: string;
    states: {
        query: string;
        setQuery: (value: string) => void;
        selected: string[];
        setSelected: (value: string[]) => void;
        options: T[];
        setOptions: (value: T[]) => void;
    };
    isLoading?: boolean;
    displaySelectedValuesInDropdown?: boolean;
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
export const useComboboxMultiStates = <T extends ComboOptionType | MultiComboOptionType>(
    initialSelections: string[],
    initialOptions: T[],
) => {
    const [query, setQuery] = useState<string>("");
    const [selected, setSelected] = useState<string[]>(initialSelections);
    const [options, setOptions] = useState<T[]>(initialOptions);
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
export default function ComboboxSearchMulti<T extends ComboOptionType | MultiComboOptionType>(
    props: ComboboxMultiProps<T>,
) {
    const { label, placeholder, classComponent, states, isLoading, displaySelectedValuesInDropdown = false } = props;
    const { setQuery, selected, setSelected, options } = states;

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
    };

    const handleSelectionChange = (value: string[]) => {
        setSelected(value);
    };

    const handleDropdownClosing = () => {
        setQuery("");
    };

    const handleRemove = (slug: string) => {
        const optionToRemove = selected.filter((selectedSlug) => selectedSlug !== slug);
        setSelected(optionToRemove);
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
                <ComboboxDisplay className="mt-1" selected={selected} options={options} handleRemove={handleRemove} />
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
                        "w-(--input-width) empty:invisible",
                        "rounded-lg border border-gray-300 bg-white p-1",
                        "[--anchor-gap:6px]",
                    )}
                >
                    {options
                        // If displaySelectedValuesInDropdown is enabled, filter out
                        .filter((option) => displaySelectedValuesInDropdown || !selected.includes(option.slug))
                        .map((option, index) => (
                            <ComboboxOption
                                key={index}
                                value={option.slug} // TODO: change that to the option object
                                className={combo(
                                    "group bg-white data-focus:bg-blue-100",
                                    "flex items-center gap-2",
                                    "rounded-sm px-2 py-1",
                                    "cursor-pointer text-sm",
                                    selected.includes(option.slug) && "font-semibold",
                                )}
                            >
                                <Check className="invisible size-5 stroke-[2.5px] group-data-selected:visible" />
                                <div className="flex w-full items-center justify-start gap-2">
                                    <span>{option.name}</span>
                                    {"type" in option && (
                                        <span className="text-3xs rounded-full bg-gray-500 px-1.5 pt-[3px] pb-[2px] font-semibold text-white uppercase">
                                            {option.type}
                                        </span>
                                    )}
                                </div>
                            </ComboboxOption>
                        ))}
                </ComboboxOptions>
            </ComboboxHeadlessUI>
        </div>
    );
}

type ComboboxIconProps = {
    selected: string[];
    setSelected: (value: string[]) => void;
    setQuery: (value: string) => void;
    isLoading?: boolean;
};

export const ComboboxIcon = (props: ComboboxIconProps) => {
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
            className={combo("absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer rounded-full p-1")}
        >
            <X className="size-5 fill-white" />
        </button>
    );
};

type ComboboxDisplayProps = {
    selected: string[];
    options: ComboOptionType[] | MultiComboOptionType[];
    maxLength?: number;
    handleRemove: (slug: string) => void;
    className?: string;
};

const ComboboxDisplay = (props: ComboboxDisplayProps) => {
    const { selected, options, maxLength = 12, handleRemove, className } = props;

    const needsEllipsis = (name: string) => name.length > maxLength;
    const ellipsis = (name: string) => (needsEllipsis(name) ? name.slice(0, maxLength) : name);

    const selectedOptions = options.filter((option) => selected.includes(option.slug));

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
