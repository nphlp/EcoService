"use client";

import { combo } from "@lib/combo";
import { ChangeEvent, InputHTMLAttributes, MouseEvent } from "react";
import { InputVariant, theme } from "./theme";

export type InputClassName = {
    component?: string;
    label?: string;
    input?: string;
};

/** Input props */
export type InputProps = {
    label: string;

    // Styles
    variant?: InputVariant;
    className?: InputClassName;

    // States
    setValue: (value: string) => void;

    /** Custom execution after input change */
    afterChange?: () => void;
    required?: boolean;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "label" | "onChange" | "required">;

/**
 * Input component
 * @example
 * ```tsx
 * // Define the state
 * const [name, setName] = useInputState();
 *
 * // Use the component
 * <Input
 *     label="Name"
 *     type="text"
 *     onChange={setName}
 *     value={name}
 * />
 * ```
 */
export default function Input(props: InputProps) {
    const { label, variant = "default", setValue, afterChange, required = true, className, ...others } = props;

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValue(e.target.value);
        afterChange?.();
    };

    /** Prevent a clic on the label to focus the input */
    const preventDefault = (e: MouseEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <label onClick={preventDefault} className={combo(theme[variant].component, className?.component)}>
            {/* Label */}
            <div className={combo(theme[variant].label, className?.label)}>{label}</div>

            {/* Input */}
            <input
                onChange={handleChange}
                className={combo(theme[variant].input, className?.input)}
                required={required}
                {...others}
            />
        </label>
    );
}
