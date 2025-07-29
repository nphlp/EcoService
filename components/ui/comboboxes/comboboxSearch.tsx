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
import { Check, ChevronDown, X } from "lucide-react";
import { ChangeEvent, KeyboardEvent, MouseEvent, useState } from "react";
import { ComboOptionType, getOptionFromSlug, MultiComboOptionType } from "./utils";

type ComboboxProps<T extends ComboOptionType | MultiComboOptionType> = {
    label?: string;
    placeholder?: string;
    classComponent?: string;
    initialOptions: T[];
    states: {
        query: string;
        setQuery: (value: string) => void;
        selected: string | null;
        setSelected: (value: string | null) => void;
        options: T[];
        setOptions: (value: T[]) => void;
    };
    isLoading?: boolean;
};

export const useComboboxStates = <T extends ComboOptionType | MultiComboOptionType>(
    initialSelection: string | null,
    initialOptions: T[],
) => {
    const [query, setQuery] = useState<string>("");
    const [selected, setSelected] = useState<string | null>(initialSelection);
    const [options, setOptions] = useState<T[]>(initialOptions);
    return { query, setQuery, selected, setSelected, options, setOptions };
};

export default function ComboboxSearch<T extends ComboOptionType | MultiComboOptionType>(props: ComboboxProps<T>) {
    const { label, placeholder, classComponent, initialOptions, states, isLoading } = props;
    const { setQuery, selected, setSelected, options, setOptions } = states;

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
    };

    const handleSelectionChange = (value: string | null) => {
        if (value === null) return;
        setSelected(value);
    };

    const handleDropdownClosing = () => {
        setOptions(initialOptions);
        setQuery("");
    };

    const handleDisplayValue = (slug: string) => {
        const option = getOptionFromSlug(slug, options);
        return option?.name ?? "";
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
                        "w-(--input-width) border border-gray-300 bg-white p-1 empty:invisible",
                        "rounded-lg",
                        "[--anchor-gap:6px]",
                    )}
                >
                    {options.map((option, index) => (
                        <ComboboxOption
                            key={index}
                            value={option.slug} // TODO: change that to the option object
                            className={combo(
                                "group bg-white data-focus:bg-blue-100",
                                "flex items-center gap-2",
                                "rounded-sm px-2 py-1",
                                "cursor-pointer text-sm",
                                selected === option.slug && "font-semibold",
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
    selected: string | null;
    setSelected: (value: string | null) => void;
    setQuery: (value: string) => void;
    isLoading?: boolean;
};

export const ComboboxIcon = (props: ComboboxIconProps) => {
    const { selected, setSelected, setQuery, isLoading } = props;

    const handleRemoveAll = () => {
        setSelected("");
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
            className={combo("absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer rounded-full p-1")}
        >
            <X className="size-5 fill-white" />
        </button>
    );
};
