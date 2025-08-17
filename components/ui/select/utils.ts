export type SelectOptionType = {
    label: string;
    slug: string;
};

export const getOptionFromSlug = (slug: string | null, options: SelectOptionType[]): SelectOptionType | undefined =>
    options.find((option) => option.slug === slug);

/**
 * Parse any array of data to a list of options
 * @example
 * ```tsx
 * // Input
 * const data = [
 *     { name: "Option 1", slug: "option-1" },
 *     { name: "Option 2", slug: "option-2" },
 * ];
 *
 * // Usage
 * const options = createSelectOptions(data, { label: "name", slug: "slug" });
 *
 * // Output
 * options = [
 *      { label: "Option 1", slug: "option-1" },
 *      { label: "Option 2", slug: "option-2" },
 *  ]
 * ```
 */
export const createSelectOptions = <T extends { [key: string]: string }>(
    data: T[] | undefined,
    { label, slug }: { label: keyof T; slug: keyof T },
): SelectOptionType[] =>
    data?.map((option) => ({
        label: option[label],
        slug: option[slug],
    })) ?? [];
