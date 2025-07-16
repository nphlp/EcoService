export type OptionComboType = {
    slug: string;
    name: string;
};

// --- Get option from slug --- //

export const getOptionFromSlug = (slug: string | null, options: OptionComboType[]): OptionComboType | undefined =>
    options.find((option) => option.slug === slug);

// --- Create selected options --- //

export const createSelectedOptions = (selected: string | null, options: OptionComboType[]): OptionComboType[] => {
    const selectedOption = getOptionFromSlug(selected, options);
    return selectedOption ? [{ slug: selectedOption.slug, name: selectedOption.name }] : [];
};

// --- Create options --- //

type OptionDataType =
    | {
          slug: string;
          name: string;
          title?: undefined;
      }
    | {
          slug: string;
          name?: undefined;
          title: string;
      };

export const createOptions = (data: OptionDataType[] | undefined): OptionComboType[] => {
    if (!data) return [];
    return data.map((option) => ({
        slug: option.slug,
        name: option.title ?? option.name,
    }));
};

// --- Merge and deduplicate options --- //

type MergeAndDeduplicateOptionsProps = {
    optionsToMerge: OptionComboType[];
    limit: number;
};

export const mergeAndDeduplicateOptions = (props: MergeAndDeduplicateOptionsProps): OptionComboType[] => {
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
