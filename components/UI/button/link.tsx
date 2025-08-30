"use client";

import { combo } from "@lib/combo";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { AnchorHTMLAttributes, MouseEvent, ReactNode, RefObject } from "react";
import { ButtonVariant, theme } from "./theme";

export type LinkProps = {
    label: string;
    href: string;

    // Styles
    variant?: ButtonVariant;
    className?: string;
    noPointer?: boolean;
    noRing?: boolean;
    noPadding?: boolean;

    ref?: RefObject<HTMLAnchorElement | null>;
    onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
    isDisabled?: boolean;

    children?: ReactNode;
} & Pick<
    AnchorHTMLAttributes<HTMLAnchorElement> & NextLinkProps,
    "id" | "href" | "style" | "target" | "onClick" | "onMouseDown"
>;

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
        variant = "default",
        noPointer = false,
        noRing = false,
        noPadding = false,
        isDisabled,
        ref,
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
                ref={ref}
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
            ref={ref}
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
