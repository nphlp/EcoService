"use client";

import { combo } from "@lib/combo";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, ReactNode, forwardRef } from "react";
import { ButtonVariant, theme } from "./theme";

export type LinkProps = {
    label: string;

    // Styles
    variant?: ButtonVariant;
    className?: string;
    noPointer?: boolean;
    noRing?: boolean;
    noPadding?: boolean;

    children?: ReactNode;
} & Omit<AnchorHTMLAttributes<HTMLAnchorElement> & NextLinkProps, "className" | "children">;

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
        noPointer = false,
        noRing = false,
        noPadding = false,
        className,
        children,
        ...others
    } = props;

    return (
        <NextLink
            ref={ref}
            aria-label={label}
            className={combo(
                // Pointer events, ring, padding
                !noPointer && "cursor-pointer disabled:cursor-not-allowed",
                !noRing && "ring-teal-300 transition-all duration-150 outline-none focus:ring-2",
                noPadding && "p-0",
                // Variant styles
                theme[variant].button,
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
