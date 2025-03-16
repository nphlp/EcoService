"use client";

import { combo } from "@lib/combo";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";
import { baseStyle, ButtonBaseKeys, buttonTheme, ButtonVariant } from "./buttonTheme";

type LinkProps = {
    label: string;
    variant?: ButtonVariant;
    baseStyleList?: ButtonBaseKeys[];
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
    const { label, variant = "default",baseStyleList = ["outline", "rounded", "padding", "font", "flex", "transition"], className, children, ...others } = props;

    return (
        <NextLink
            className={combo(
                baseStyleList && baseStyle(baseStyleList),
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
