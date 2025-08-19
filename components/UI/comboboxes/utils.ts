// --- Types --- //

export type ComboOptionType = {
    slug: string;
    name: string;
};

export type MultiSourceComboOptionType = ComboOptionType & {
    type: string;
};

// --- Create selected options --- //

/**
 * Create a list of options from a selected option
 * @example
 * ```tsx
 * // Input
 * const selected = "option-1";
 * const options = [
 *     { slug: "option-1", name: "Option 1" },
 *     { slug: "option-2", name: "Option 2" },
 * ];
 *
 * // Usage
 * const selectedOptions = createSelectedOptions(selected, options);
 *
 * // Output
 * selectedOptions = [
 *     { slug: "option-1", name: "Option 1" },
 * ];
 * ```
 */

function createSelectedOptions<T extends ComboOptionType | MultiSourceComboOptionType>(selected: T | null): T[] {
    if (!selected) return [];

    const hasType = "type" in selected;

    const option = hasType
        ? {
              slug: selected.slug,
              name: selected.name,
              type: selected.type,
          }
        : {
              slug: selected.slug,
              name: selected.name,
          };

    return [option as T];
}

// --- Create options --- //
/**
 * Parse any array of data to a list of options
 * @example
 * ```tsx
 * // Input
 * const data = [
 *     { id: "option-1", name: "Option 1" },
 *     { id: "option-2", name: "Option 2" },
 * ];
 *
 * // Usage
 * const options = createSelectOptions(data, { slug: "id", name: "name" });
 *
 * // Output
 * options = [
 *      { slug: "option-1", name: "Option 1" },
 *      { slug: "option-2", name: "Option 2" },
 *  ]
 * ```
 */

// Overload for ComboOptionType
function createComboOptions<T>(
    data: T[] | undefined,
    { slug, name }: { slug: keyof T; name: keyof T },
): ComboOptionType[];

// Overload for MultiComboOptionType
function createComboOptions<T>(
    data: T[] | undefined,
    { slug, name, type }: { slug: keyof T; name: keyof T; type: string },
): MultiSourceComboOptionType[];

// Implementation
function createComboOptions<T>(
    data: T[] | undefined,
    { slug, name, type }: { slug: keyof T; name: keyof T; type?: string },
): ComboOptionType[] | MultiSourceComboOptionType[] {
    return (
        data?.map((option) => ({
            slug: String(option[slug]),
            name: String(option[name]),
            ...(type && { type }),
        })) ?? []
    );
}

// --- Deduplicate options --- //

/**
 * Remove duplicates from a list of options
 * @example
 * ```tsx
 * // Input
 * const options = [
 *     { slug: "option-1", name: "Option 1" },
 *     { slug: "option-1", name: "Option 1" },
 *     { slug: "option-2", name: "Option 2" },
 * ];
 *
 * // Usage
 * const deduplicatedOptions = deduplicateOptions(options);
 *
 * // Output
 * deduplicatedOptions = [
 *     { slug: "option-1", name: "Option 1" },
 *     { slug: "option-2", name: "Option 2" },
 * ];
 */

function deduplicateOptions<T extends ComboOptionType | MultiSourceComboOptionType>(
    mergedOptions: T[],
    limit: number,
): T[] {
    // Already seen options
    const seenOptions = new Set<string>();

    // Remove duplicates
    const cleanedOptions = mergedOptions.filter((option) => {
        if (seenOptions.has(option.slug)) {
            // If the slug already exists, do not add it
            return false;
        }

        // If the slug does not exist yet, add it
        seenOptions.add(option.slug);
        return true;
    });

    // Return options
    return cleanedOptions.slice(0, limit);
}

// --- Exports --- //

export { createComboOptions, createSelectedOptions, deduplicateOptions };
