"use client";

import { combo } from "@lib/combo";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, ReactNode, forwardRef } from "react";
import { ButtonBaseKeys, ButtonVariant, buttonBaseTheme, buttonTheme } from "./themes/buttonTheme";
import { getBaseStyle } from "./themes/utils";

/** Link variant */
export type LinkProps = {
    label: string;
    variant?: ButtonVariant;
    className?: string;
    children?: ReactNode;
} & (
    | { baseStyle?: boolean; baseStyleOnly?: never; baseStyleWithout?: never }
    | { baseStyle?: never; baseStyleOnly?: ButtonBaseKeys[]; baseStyleWithout?: never }
    | { baseStyle?: never; baseStyleOnly?: never; baseStyleWithout?: ButtonBaseKeys[] }
) &
    Omit<AnchorHTMLAttributes<HTMLAnchorElement> & NextLinkProps, "className" | "children">;

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
const Link = forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
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
            ref={ref}
            aria-label={label}
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
});

Link.displayName = "Link";
export default Link;
