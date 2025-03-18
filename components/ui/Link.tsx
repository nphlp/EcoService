"use client";

import { combo } from "@lib/combo";
import NextLink, { LinkProps as NextLinkProps } from "next/link";
import { ReactNode } from "react";
import {
    baseStyleOnlyFilter,
    baseStyleWithoutFilter,
    ButtonBaseKeys,
    buttonStyleComplete,
    buttonTheme,
    ButtonVariant,
} from "./buttonTheme";

type LinkProps = {
    label: string;
    variant?: ButtonVariant;
    className?: string;
    children?: ReactNode;
    baseStyle?: boolean;
} & (
    | { baseStyleOnly?: ButtonBaseKeys[]; baseStyleWithout?: never }
    | { baseStyleWithout?: ButtonBaseKeys[]; baseStyleOnly?: never }
    | { baseStyleOnly?: never; baseStyleWithout?: never }
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

    let baseStyleList = buttonStyleComplete;

    if (baseStyleOnly) {
        baseStyleList = baseStyleOnlyFilter(baseStyleOnly as ButtonBaseKeys[]);
    } else if (baseStyleWithout) {
        baseStyleList = baseStyleWithoutFilter(baseStyleWithout as ButtonBaseKeys[]);
    }

    return (
        <NextLink
            className={combo(
                baseStyle && baseStyleList,
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
