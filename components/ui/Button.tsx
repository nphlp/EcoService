"use client";

import { combo } from "@lib/combo";
import Loader from "@ui/Loader";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { buttonBase, buttonTheme, ButtonVariant } from "./buttonTheme";

type ButtonProps = {
    label: string;
    variant?: ButtonVariant;
    isLoading?: boolean;
    loadingLabel?: string;
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
        isLoading,
        loadingLabel = "Loading...",
        className,
        children,
        ...others
    } = props;

    return (
        <button
            className={combo(
                buttonBase,
                variant && buttonTheme[variant].button,
                isLoading ? variant && buttonTheme[variant].isLoading : variant && buttonTheme[variant].disabled,
                className,
            )}
            disabled={isLoading}
            {...others}
        >
            {isLoading ? (
                <>
                    <Loader color={variant && buttonTheme[variant].loaderColor} />
                    <span>{loadingLabel}</span>
                </>
            ) : (
                (children ?? label)
            )}
        </button>
    );
}
