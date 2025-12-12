import { combo } from "@lib/combo";

type StructureType = {
    [key: string]: string;
};

type StylesType = {
    [key: string]: {
        [key: string]: string;
    };
};

/**
 * Add CSS structure to all CSS styles
 * @example
 * ```tsx
 * // Before
 * const structure = {
 *     component: "space-y-1",
 * };
 *
 * const styles = {
 *     default: {
 *         component: "bg-white",
 *     },
 *     dark: {
 *         component: "bg-black",
 *     },
 * };
 *
 * // Usage
 * const mergedStyles = mergeStylesAndStructure(structure, styles);
 *
 * // After
 * const mergedStyles = {
 *     default: {
 *         component: "bg-white space-y-1",
 *     },
 *     dark: {
 *         component: "bg-black space-y-1",
 *     },
 * };
 */
export const mergeStylesAndStructure = (structure: StructureType, styles: StylesType): StylesType => {
    const result: StylesType = {};

    for (const [variantName, variantStyles] of Object.entries(styles)) {
        result[variantName] = {};

        for (const [elementName, structureClasses] of Object.entries(structure)) {
            const designClasses = variantStyles[elementName];
            result[variantName][elementName] = combo(structureClasses, designClasses);
        }
    }

    return result;
};
