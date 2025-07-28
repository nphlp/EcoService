export type OptionComboType<T extends string | undefined = undefined> = {
    slug: string;
    name: string;
    type?: T;
};

// --- Get option from slug --- //

export const getOptionFromSlug = <T extends string | undefined>(
    slug: string | null,
    options: OptionComboType<T>[],
): OptionComboType<T> | undefined => options.find((option) => option.slug === slug);

// --- Create selected options --- //

export const createSelectedOptions = <T extends string | undefined>(
    selected: string | null,
    options: OptionComboType<T>[],
): OptionComboType<T>[] => {
    const selectedOption = getOptionFromSlug(selected, options);
    return selectedOption ? [{ slug: selectedOption.slug, name: selectedOption.name, type: selectedOption.type }] : [];
};

// --- Create options --- //

type OptionDataType<T> =
    | {
          slug: string;
          name: string;
          title?: undefined;
          type?: T;
      }
    | {
          slug: string;
          name?: undefined;
          title: string;
          type?: T;
      };

export const createOptions = <T extends string | undefined = undefined>(
    data: OptionDataType<T>[] | undefined,
    type?: T,
): OptionComboType<T>[] =>
    data?.map((option) => ({
        slug: option.slug,
        name: option.title ?? option.name,
        type: type,
    })) ?? [];

// --- Deduplicate options --- //

type DeduplicateOptionsProps<T extends string | undefined> = {
    mergedOptions: OptionComboType<T>[];
    limit: number;
};

export const deduplicateOptions = <T extends string | undefined>(
    props: DeduplicateOptionsProps<T>,
): OptionComboType<T>[] => {
    const { mergedOptions, limit } = props;

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
};
