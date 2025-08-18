import { useState } from "react";
import { ComboOptionType, MultiSourceComboOptionType } from "./utils";

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
export const useComboboxMultiStates = (initialSelections: ComboOptionType[], initialOptions: ComboOptionType[]) => {
    const [query, setQuery] = useState<string>("");
    const [selected, setSelected] = useState<ComboOptionType[]>(initialSelections);
    const [options, setOptions] = useState<ComboOptionType[]>(initialOptions);
    return { query, setQuery, selected, setSelected, options, setOptions };
};

/**
 * Generic typed hook to manage combobox state with custom types
 * @example
 * ```tsx
 * // Import hook states
 * const comboboxStates = useComboboxSearchStates<MyType>(null, articleOptions);
 *
 * // Extract any state you need in the following properties
 * const { query, setQuery, selected, setSelected, options, setOptions } = comboboxStates;
 * ```
 */
export const useComboboxSearchStates = <T extends ComboOptionType | MultiSourceComboOptionType>(
    initialSelection: T | null,
    initialOptions: T[],
) => {
    const [query, setQuery] = useState<string>("");
    const [selected, setSelected] = useState<T | null>(initialSelection);
    const [options, setOptions] = useState<T[]>(initialOptions);
    return { query, setQuery, selected, setSelected, options, setOptions };
};

/**
 * Generic typed hook to manage combobox multi-selection state with custom types
 * @example
 * ```tsx
 * // Import hook states
 * const comboboxMultiStates = useComboboxSearchMultiStates<MyType>([], productOptions);
 *
 * // Extract any state you need in the following properties
 * const { query, setQuery, selected, setSelected, options, setOptions } = comboboxMultiStates;
 * ```
 */
export const useComboboxSearchMultiStates = <T extends ComboOptionType | MultiSourceComboOptionType>(
    initialSelections: T[],
    initialOptions: T[],
) => {
    const [query, setQuery] = useState<string>("");
    const [selected, setSelected] = useState<T[]>(initialSelections);
    const [options, setOptions] = useState<T[]>(initialOptions);
    return { query, setQuery, selected, setSelected, options, setOptions };
};
