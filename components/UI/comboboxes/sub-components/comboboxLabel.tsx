"use client";

import { stringToSlug } from "@utils/string-format";
import { ComboOptionType, MultiSourceComboOptionType } from "../utils";

type ComboboxLabelProps<T extends ComboOptionType | MultiSourceComboOptionType> = {
    option: T;
    query: string;
};

/**
 * Shared ComboboxLabel component for highlighting search queries
 * and displaying type badges for multi-source options
 */
export default function ComboboxLabel<T extends ComboOptionType | MultiSourceComboOptionType>(
    props: ComboboxLabelProps<T>,
) {
    const { option, query } = props;

    const highlightQuery = (optionName: string, query: string) => {
        // Slugify the option name and the query
        const nameSlug = stringToSlug(optionName);
        const querySlug = stringToSlug(query);

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
}
