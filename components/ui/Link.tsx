"use client";

import { combo } from "@lib/combo";
import { ReactNode } from "react";
import { buttonBase, buttonTheme, ButtonVariant } from "./buttonTheme";
import NextLink, { LinkProps as NextLinkProps } from "next/link";

type LinkProps = {
    label: string;
    variant?: ButtonVariant;
    className?: string;
    children?: ReactNode;
} & Omit<NextLinkProps, "className" | "children">;

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
    const { label, variant = "default", className, children, ...others } = props;

    return (
        <NextLink
            className={combo(
                buttonBase,
                variant && buttonTheme[variant].button,
                variant && buttonTheme[variant].disabled,
                className,
            )}
            {...others}
        >
            {children ?? label}
        </NextLink>
    );
}
