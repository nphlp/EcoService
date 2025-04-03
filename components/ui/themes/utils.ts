import { combo } from "@lib/combo";

/**
 * Complete button styles
 * @example
 * ```tsx
 * <Button baseStyle={false} />
 * ```
 */
export const baseStyleDefault = <T extends object>(objectBase: T): string =>
    Object.values(objectBase)
        .map((value) => value)
        .join(" ");

/**
 * Return a string of combined styles for the given keys
 * @example
 * ```tsx
 * <Button baseStyleOnly={["rounded", "transition", "outline"]} />
 * <Link baseStyleOnly={["font", "transition", "outline"]} />
 * ```
 */
export const baseStyleOnlyFilter = <T extends object, K extends keyof T>(baseTheme: T, onlyKeys: K[]): string => {
    const baseStyleKeys = Object.keys(baseTheme) as K[];
    const filteredKeys = baseStyleKeys.filter((key) => onlyKeys.includes(key));
    const filteredValues = filteredKeys.map((key) => baseTheme[key]);
    return combo(filteredValues);
};

/**
 * Return a string of combined styles excluding the given keys
 * @example
 * ```tsx
 * <Button baseStyleWithout={["flex", "rounded"]} />
 * <Link baseStyleWithout={["transition", "outline"]} />
 */
export const baseStyleWithoutFilter = <T extends object, K extends keyof T>(baseTheme: T, withoutKeys: K[]): string => {
    const baseStyleKeys = Object.keys(baseTheme) as K[];
    const filteredKeys = baseStyleKeys.filter((key) => !withoutKeys.includes(key));
    const filteredValues = filteredKeys.map((key) => baseTheme[key]);
    return combo(filteredValues);
};

/**
 * Get the base style for the button or link
 * @example
 * ```tsx
 * <Button baseStyleOnly={["rounded", "transition", "outline"]} />
 * <Link baseStyleOnly={["font", "transition", "outline"]} />
 */
export const getBaseStyle = <T extends object, K extends keyof T>(props: {
    baseTheme: T;
    baseStyle: boolean;
    baseStyleOnly?: K[];
    baseStyleWithout?: K[];
}) => {
    const { baseTheme, baseStyle, baseStyleOnly, baseStyleWithout } = props;
    if (baseStyleOnly) {
        return baseStyleOnlyFilter(baseTheme, baseStyleOnly);
    } else if (baseStyleWithout) {
        return baseStyleWithoutFilter(baseTheme, baseStyleWithout);
    } else if (baseStyle) {
        return baseStyleDefault(baseTheme);
    } else {
        return "";
    }
};
