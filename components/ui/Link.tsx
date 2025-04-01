"use client";

import { combo } from "@lib/combo";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";
import {
    buttonBaseTheme,
    ButtonBaseKeys,
    ButtonVariant,
    buttonTheme,
} from "./themes/buttonTheme";
import { getBaseStyle } from "./themes/utils";

/** Link variant */
type LinkProps = {
    label: string;
    variant?: ButtonVariant;
    className?: string;
    children?: ReactNode;
} & (
    | { baseStyle?: boolean; baseStyleOnly?: never; baseStyleWithout?: never }
    | { baseStyle?: never; baseStyleOnly?: ButtonBaseKeys[]; baseStyleWithout?: never }
    | { baseStyle?: never; baseStyleOnly?: never; baseStyleWithout?: ButtonBaseKeys[] }
) &
    Omit<NextLinkProps, "className" | "children">;

/**
 * Button component
 * @example
 * ```tsx
 * // Define the state
 * const [isLoading, setIsLoading] = useState(false);
 *
 * // Use the component
 * <Link href="/" label="Home page">Home page</Link>
 * ```
 */
export default function Link(props: LinkProps) {
    const {
        label,
        variant = "default",
        baseStyle = true,
        baseStyleOnly,
        baseStyleWithout,
        className,
        children,
        ...others
    } = props;

    return (
        <NextLink
            className={combo(
                // Base styles
                getBaseStyle({ baseTheme: buttonBaseTheme, baseStyle, baseStyleOnly, baseStyleWithout }),
                // Variant styles
                buttonTheme[variant].button,
                buttonTheme[variant].disabled,
                className,
            )}
            {...others}
        >
            {children ?? label}
        </NextLink>
    );
}
