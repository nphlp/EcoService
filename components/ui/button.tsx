"use client";

import Loader, { LoaderColor } from "@comps/ui/loader";
import { combo } from "@lib/combo";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { ButtonBaseKeys, buttonBaseTheme, buttonTheme, ButtonVariant } from "./themes/buttonTheme";
import { getBaseStyle } from "./themes/utils";

/** Button variant */
export type ButtonProps = {
    label: string;
    variant?: ButtonVariant;
    isLoading?: boolean;
    isDisabled?: boolean;
    loadingLabel?: string;
    loaderColor?: LoaderColor;
    className?: string;
    children?: ReactNode;
} & (
    | { baseStyle?: boolean; baseStyleOnly?: never; baseStyleWithout?: never }
    | { baseStyle?: never; baseStyleOnly?: ButtonBaseKeys[]; baseStyleWithout?: never }
    | { baseStyle?: never; baseStyleOnly?: never; baseStyleWithout?: ButtonBaseKeys[] }
) &
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

/**
 * Button component
 * @example
 * ```tsx
 * // Define the state
 * const [isLoading, setIsLoading] = useState(false);
 *
 * // Use the component
 * <Button
 *     type="submit"
 *     label="Send the form"
 *     isLoading={isLoading}
 *     loadingLabel="Sending..."
 * >
 *     Send
 * </Button>
 * ```
 */
export default function Button(props: ButtonProps) {
    const {
        label,
        variant = "default",
        isLoading,
        isDisabled,
        loadingLabel = "Loading...",
        loaderColor,
        className,
        children,
        baseStyle = true,
        baseStyleOnly,
        baseStyleWithout,
        ...others
    } = props;

    return (
        <button
            aria-label={label}
            className={combo(
                "cursor-pointer disabled:cursor-not-allowed",
                // Base styles
                getBaseStyle({ baseTheme: buttonBaseTheme, baseStyle, baseStyleOnly, baseStyleWithout }),
                // Variant styles
                buttonTheme[variant].button,
                isLoading ? buttonTheme[variant].isLoading : buttonTheme[variant].disabled,
                className,
            )}
            disabled={isLoading || isDisabled}
            {...others}
        >
            {isLoading ? (
                <>
                    <Loader color={loaderColor ?? buttonTheme[variant].loaderColor} />
                    <span>{loadingLabel}</span>
                </>
            ) : (
                (children ?? label)
            )}
        </button>
    );
}
