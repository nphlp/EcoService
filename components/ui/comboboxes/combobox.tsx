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
import { Check, ChevronDown, X } from "lucide-react";
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { ComboOptionType } from "./utils";

type ComboboxProps = {
    label?: string;
    placeholder?: string;
    classComponent?: string;
    initialOptions: ComboOptionType[];
    states: {
        query: string;
        setQuery: (value: string) => void;
        selected: ComboOptionType | null;
        setSelected: (value: ComboOptionType | null) => void;
        options: ComboOptionType[];
        setOptions: (value: ComboOptionType[]) => void;
    };
};

/**
 * Typed hook to manage combobox state
 * @example
 * ```tsx
 * // Import hook states
 * const comboboxStates = useComboboxStates(null, articleOptions);
 *
 * // Extract any state you need in the following properties
 * const { query, setQuery, selected, setSelected, options, setOptions } = comboboxStates;
 * ```
 */
export const useComboboxStates = (initialSelection: ComboOptionType | null, initialOptions: ComboOptionType[]) => {
    const [query, setQuery] = useState<string>("");
    const [selected, setSelected] = useState<ComboOptionType | null>(initialSelection);
    const [options, setOptions] = useState<ComboOptionType[]>(initialOptions);
    return { query, setQuery, selected, setSelected, options, setOptions };
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
export default function Combobox(props: ComboboxProps) {
    const { label, placeholder, classComponent, initialOptions, states } = props;
    const { query, setQuery, selected, setSelected, options, setOptions } = states;

    const displayedOptions = options.filter((option) => option.slug.includes(StringToSlug(query)));

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
    };

    const handleSelectionChange = (option: ComboOptionType | null) => {
        if (!option) return;
        setSelected(option);
    };

    const handleDropdownClosing = () => {
        setOptions(initialOptions);
        setQuery("");
    };

    const handleDisplayValue = (option: ComboOptionType | null) => {
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
                        aria-label={label ?? "Search"}
                        displayValue={handleDisplayValue}
                        onChange={handleQueryChange}
                        placeholder={placeholder ?? "Search and select an option..."}
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
                                selected?.slug === option.slug && "font-semibold",
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
    selected: ComboOptionType | null;
    setSelected: (value: ComboOptionType | null) => void;
    setQuery: (value: string) => void;
};

export const ComboboxIcon = (props: ComboboxIconProps) => {
    const { selected, setSelected, setQuery } = props;

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
            className={combo("absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer rounded-full p-1")}
        >
            <X className="size-5 fill-white" />
        </button>
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
