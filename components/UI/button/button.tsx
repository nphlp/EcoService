"use client";

import Loader from "@comps/UI/loader";
import { combo } from "@lib/combo";
import { ButtonHTMLAttributes, RefObject } from "react";
import { ButtonVariant, theme } from "./theme";

export type ButtonClassName = {
    button?: string;
    isLoading?: string;
    isDisabled?: string;
    loader?: string;
};

export type ButtonProps = {
    label: string;
    loadingLabel?: string;
    isLoading?: boolean;
    isDisabled?: boolean;

    // Styles
    variant?: ButtonVariant;
    className?: ButtonClassName;
    noPointer?: boolean;
    noRing?: boolean;
    focusVisible?: boolean;

    // Ref
    ref?: RefObject<HTMLButtonElement | null>;
} & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">;

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
        type = "button",
        label,
        loadingLabel = "Loading...",
        variant = "default",
        noPointer = false,
        noRing = false,
        focusVisible = false,
        isLoading,
        isDisabled,
        className,
        children,
        ref,
        ...others
    } = props;

    return (
        <button
            type={type}
            aria-label={label}
            ref={ref}
            className={combo(
                // Pointer events, ring, padding
                !noPointer && "cursor-pointer disabled:cursor-not-allowed",
                !noRing && "ring-teal-300 transition-all duration-150 outline-none",
                !focusVisible ? "focus:ring-2" : "focus-visible:ring-2",
                // Variant styles
                theme[variant].button,
                // Is loading or disabled styles
                isLoading && theme[variant].isLoading,
                isDisabled && theme[variant].isDisabled,
                className?.button,
            )}
            disabled={isLoading || isDisabled}
            {...others}
        >
            {isLoading ? (
                <>
                    <Loader className={combo(theme[variant].loaderColor, className?.loader)} />
                    {loadingLabel}
                </>
            ) : (
                (children ?? label)
            )}
        </button>
    );
}
