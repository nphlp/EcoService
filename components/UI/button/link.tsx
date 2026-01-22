"use client";

import { combo } from "@lib/combo";
import { Route } from "next";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, MouseEvent, RefObject } from "react";
import { ButtonVariant, theme } from "./theme";

type OnNavigateEvent = { preventDefault: () => void };

export type LinkProps = {
    label: string;
    href: Route;
    isDisabled?: boolean;

    // Styles
    variant?: ButtonVariant;
    className?: string;
    noPointer?: boolean;
    noRing?: boolean;
    noPadding?: boolean;

    // Nextjs Link props
    onNavigate?: (e: OnNavigateEvent) => void;
    ref?: RefObject<HTMLAnchorElement | null>;
} &
    // Nextjs Link props
    Pick<NextLinkProps<Route>, "replace" | "scroll" | "prefetch"> &
    // Legacy Link props
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "href">;

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
const Link = (props: LinkProps) => {
    const {
        label,
        href,
        variant = "default",
        noPointer = false,
        noRing = false,
        noPadding = false,
        isDisabled,
        className,
        children,
        ...others
    } = props;

    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        if (isDisabled) {
            e.preventDefault();
            e.stopPropagation();
            return;
        }

        props?.onClick?.(e);
    };

    if (isDisabled) {
        return (
            <span
                aria-label={label}
                className={combo(
                    // Pointer events, ring, padding
                    !noPointer && "cursor-not-allowed",
                    !noRing && "transition-all duration-150",
                    noPadding && "p-0",
                    // Is loading or disabled styles
                    theme[variant].isDisabled,
                    // Variant styles
                    theme[variant].button,
                    className,
                )}
            >
                {children ?? label}
            </span>
        );
    }

    return (
        <NextLink
            href={href}
            aria-label={label}
            className={combo(
                // Pointer events, ring, padding
                !noPointer && "cursor-pointer",
                !noRing && "ring-teal-300 transition-all duration-150 outline-none focus-visible:ring-2", // Focus visible
                noPadding && "p-0",
                // Variant styles
                theme[variant].button,
                className,
            )}
            onClick={handleClick}
            {...others}
        >
            {children ?? label}
        </NextLink>
    );
};

export default Link;
