"use client";

import { combo } from "@lib/combo";
import Loader, { LoaderColor } from "@ui/Loader";
import { ButtonHTMLAttributes, ReactNode } from "react";
import {
    baseStyleOnlyFilter,
    baseStyleWithoutFilter,
    ButtonBaseKeys,
    buttonStyleComplete,
    buttonTheme,
    ButtonVariant,
} from "./buttonTheme";

type ButtonProps = {
    label: string;
    variant?: ButtonVariant;
    isLoading?: boolean;
    loadingLabel?: string;
    loaderColor?: LoaderColor;
    className?: string;
    children?: ReactNode;
    baseStyle?: boolean;
} & (
    | { baseStyleOnly?: ButtonBaseKeys[]; baseStyleWithout?: never }
    | { baseStyleWithout?: ButtonBaseKeys[]; baseStyleOnly?: never }
    | { baseStyleOnly?: never; baseStyleWithout?: never }
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
        baseStyle = true,
        isLoading,
        loadingLabel = "Loading...",
        loaderColor,
        className,
        children,
        baseStyleOnly,
        baseStyleWithout,
        ...others
    } = props;

    let baseStyleList = buttonStyleComplete;

    if (baseStyleOnly) {
        baseStyleList = baseStyleOnlyFilter(baseStyleOnly as ButtonBaseKeys[]);
    } else if (baseStyleWithout) {
        baseStyleList = baseStyleWithoutFilter(baseStyleWithout as ButtonBaseKeys[]);
    }

    return (
        <button
            className={combo(
                baseStyle && baseStyleList,
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
