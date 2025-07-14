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
import isEqual from "lodash/isEqual";
import { Check, ChevronDown, X } from "lucide-react";
import { ChangeEvent, useEffect } from "react";

export type OptionComboType = {
    slug: string;
    name: string;
};

type ComboboxProps = {
    label?: string;
    placeholder?: string;
    classComponent?: string;
    initialOption: OptionComboType[];
    // States
    query: string;
    setQuery: (value: string) => void;
    selected: string | null;
    setSelected: (value: string | null) => void;
    options: OptionComboType[];
    setOptions: (value: OptionComboType[]) => void;
};

/**
 * Combobox component
 * @example
 * ```tsx
 * // Get initial selection and options from server
 * const initialSelection: string | null = null;
 * const initialOption: OptionComboType[] = articleOptions;
 *
 * // Define the state
 * const [query, setQuery] = useState<string>("");
 * const [selected, setSelected] = useState<string | null>(initialSelection);
 * const [options, setOptions] = useState<OptionComboType[]>(initialOption);
 *
 * // Use the component
 * <Combobox
 *     label="Article"
 *     placeholder="Sélectionnez un article"
 *     classComponent="w-full"
 *     initialOption={articleOptions}
 *     query={query}
 *     setQuery={setQuery}
 *     selected={selected}
 *     setSelected={setSelected}
 *     options={options}
 *     setOptions={setOptions}
 * />
 * ```
 */
export default function Combobox(props: ComboboxProps) {
    const {
        label,
        placeholder,
        classComponent,
        initialOption,
        query,
        setQuery,
        selected,
        setSelected,
        options,
        setOptions,
    } = props;

    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value;
        setQuery(value);
    };

    const handleSelectionChange = (value: string | null) => {
        if (value === null) return;
        setSelected(value);
        setQuery("");
    };

    const handleDisplayValue = (slug: string) => {
        const option = options.find((option) => option.slug === slug);
        return option?.name ?? "";
    };

    const handleDropdownClosing = () => {
        setQuery("");
        setOptions(initialOption);
    };

    useEffect(() => {
        if (query.length > 0) {
            const querySlug = StringToSlug(query);
            const newOptions = initialOption.filter((option) => option.slug.includes(querySlug));
            if (!isEqual(newOptions, options)) setOptions(newOptions);
        } else {
            setOptions(initialOption);
        }
    }, [query, options, initialOption, setOptions]);

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
                        "w-(--input-width) border bg-white p-1 empty:invisible",
                        "rounded-lg",
                        "[--anchor-gap:6px]",
                    )}
                >
                    {options.map((option, index) => (
                        <ComboboxOption
                            key={index}
                            value={option.slug}
                            className={combo(
                                "group bg-white data-focus:bg-blue-100",
                                "flex items-center gap-2",
                                "rounded-sm px-2 py-1",
                                "cursor-pointer text-sm",
                                selected === option.slug && "font-semibold",
                            )}
                        >
                            <Check className="invisible size-5 stroke-[2.5px] group-data-selected:visible" />
                            {option.name}
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
};

export const ComboboxIcon = (props: ComboboxIconProps) => {
    const { selected, setSelected, setQuery } = props;

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
            onClick={() => {
                setSelected("");
                setQuery("");
            }}
            className={combo("absolute top-1/2 right-1 -translate-y-1/2 cursor-pointer rounded-full p-1")}
        >
            <X className="size-5 fill-white" />
        </button>
    );
};
