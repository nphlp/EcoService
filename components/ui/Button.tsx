"use client";

import { combo } from "@lib/combo";
import Loader, { LoaderColor } from "@ui/Loader";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { baseStyle, ButtonBaseKeys, buttonTheme, ButtonVariant } from "./buttonTheme";

type ButtonProps = {
    label: string;
    variant?: ButtonVariant;
    baseStyleList?: ButtonBaseKeys[];
    isLoading?: boolean;
    loadingLabel?: string;
    loaderColor?: LoaderColor;
    className?: string;
    children?: ReactNode;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className" | "children">;

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
        baseStyleList = ["outline", "rounded", "padding", "font", "flex", "transition"],
        isLoading,
        loadingLabel = "Loading...",
        loaderColor,
        className,
        children,
        ...others
    } = props;

    return (
        <button
            className={combo(
                baseStyleList && baseStyle(baseStyleList),
                variant && buttonTheme[variant].button,
                isLoading ? variant && buttonTheme[variant].isLoading : variant && buttonTheme[variant].disabled,
                className,
            )}
            disabled={isLoading}
            {...others}
        >
            {isLoading ? (
                <>
                    <Loader color={loaderColor ?? (variant && buttonTheme[variant].loaderColor)} />
                    <span>{loadingLabel}</span>
                </>
            ) : (
                (children ?? label)
            )}
        </button>
    );
}
