"use client";

import Loader from "@comps/UI/loader";
import { ComboboxButton } from "@headlessui/react";
import { combo } from "@lib/combo";
import { ChevronDown, X } from "lucide-react";
import { KeyboardEvent, MouseEvent } from "react";
import { ComboOptionType, MultiSourceComboOptionType } from "../utils";

type ComboboxIconSingleProps<T extends ComboOptionType | MultiSourceComboOptionType> = {
    selected: T | null;
    setSelected: (value: T | null) => void;
    setQuery: (value: string) => void;
    isLoading?: boolean;
};

type ComboboxIconMultiProps<T extends ComboOptionType | MultiSourceComboOptionType> = {
    selected: T[];
    setSelected: (value: T[]) => void;
    setQuery: (value: string) => void;
    isLoading?: boolean;
};

type ComboboxIconProps<T extends ComboOptionType | MultiSourceComboOptionType> =
    | ComboboxIconSingleProps<T>
    | ComboboxIconMultiProps<T>;

/**
 * Unified ComboboxIcon component that handles both single and multi selection
 * Shows loader, chevron (when no selection), or X button (when selection exists)
 */
export default function ComboboxIcon<T extends ComboOptionType | MultiSourceComboOptionType>(
    props: ComboboxIconProps<T>,
) {
    const { selected, setSelected, setQuery, isLoading } = props;

    const isMultiple = Array.isArray(selected);
    const hasSelection = isMultiple ? selected.length > 0 : selected !== null;

    const handleRemoveAll = () => {
        if (isMultiple) {
            (setSelected as (value: T[]) => void)([]);
        } else {
            (setSelected as (value: T | null) => void)(null);
        }
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
            <div className={combo("absolute top-1/2 right-2 -translate-y-1/2 rounded p-1")}>
                <Loader />
            </div>
        );
    }

    if (!hasSelection) {
        return (
            <ComboboxButton
                className={combo(
                    // Position
                    "absolute top-1/2 right-2 -translate-y-1/2",
                    // Border and radius
                    "rounded",
                    // Outline
                    "ring-teal-300 outline-none focus:ring-2",
                    "transition-all duration-150",
                    // Accessibility
                    "cursor-pointer",
                )}
            >
                <ChevronDown className="translate-y-px stroke-gray-600" />
            </ComboboxButton>
        );
    }

    return (
        <button
            type="button"
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={combo(
                // Position
                "absolute top-1/2 right-2 -translate-y-1/2",
                // Border and radius
                "rounded",
                // Outline
                "ring-teal-300 outline-none focus:ring-2",
                "transition-all duration-150",
                // Accessibility
                "cursor-pointer",
            )}
        >
            <X className="stroke-gray-600" />
        </button>
    );
}
