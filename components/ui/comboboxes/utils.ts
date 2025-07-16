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

// --- Merge and deduplicate options --- //

type MergeAndDeduplicateOptionsProps<T extends string | undefined> = {
    optionsToMerge: OptionComboType<T>[];
    limit: number;
};

export const mergeAndDeduplicateOptions = <T extends string | undefined>(
    props: MergeAndDeduplicateOptionsProps<T>,
): OptionComboType<T>[] => {
    const { optionsToMerge, limit } = props;

    // Remove duplicates
    const seenSlugs = new Set<string>();
    const cleanedOptions = optionsToMerge.filter((option) => {
        // If the slug does not exist yet, add it
        if (!seenSlugs.has(option.slug)) {
            seenSlugs.add(option.slug);
            return true;
        }

        // If the slug already exists, do not add it
        return false;
    });

    // Return options
    return cleanedOptions.slice(0, limit);
};
