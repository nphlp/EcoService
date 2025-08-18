"use client";

import Loader from "@comps/ui/loader";
import {
    ComboboxButton,
    Combobox as ComboboxHeadlessUI,
    ComboboxInput,
    ComboboxOption,
    ComboboxOptions,
} from "@headlessui/react";
import { combo } from "@lib/combo";
import { StringToSlug } from "@utils/StringToSlug";
import { Check, ChevronDown, X } from "lucide-react";
import { ChangeEvent, KeyboardEvent, MouseEvent } from "react";
import ComboboxLabel from "./sub-components/comboboxLabel";
import { ComboOptionType, MultiSourceComboOptionType } from "./utils";

// TODO
// Documentation

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
 * Combobox component
 * @example
 * ```tsx
 * // Import hook states
 * const comboboxStates = useComboboxStates(null, articleOptions);
 *
 * // Extract only what you need
 * const { selected, setOptions } = comboboxStates;
 *
 * // Use the component
 * <Combobox
 *     label="Article"
 *     placeholder="Sélectionnez un article"
 *     classComponent="w-full"
 *     initialOption={articleOptions}
 *     states={comboboxStates}
 * />
 * ```
 */
export default function Combobox<T extends ComboOptionType | MultiSourceComboOptionType>(props: ComboboxProps<T>) {
    const { label, placeholder, classComponent, initialOptions, states, isLoading } = props;
    const { query, setQuery, selected, setSelected, options, setOptions } = states;

    // TODO: add a condition for "static" or "dynamic" options
    // The following line is only required when options are fixed (not connected to an API)
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

type ComboboxIconProps<T extends ComboOptionType | MultiSourceComboOptionType> = {
    selected: T | null;
    setSelected: (value: T | null) => void;
    setQuery: (value: string) => void;
    isLoading?: boolean;
};

export const ComboboxIcon = <T extends ComboOptionType | MultiSourceComboOptionType>(props: ComboboxIconProps<T>) => {
    const { selected, setSelected, setQuery, isLoading } = props;

    const handleRemoveAll = () => {
        setSelected(null);
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

    if (!selected) {
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
