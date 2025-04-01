"use client";

import { combo } from "@lib/combo";
import { InputHTMLAttributes, MouseEvent } from "react";
import { InputVariant, inputTheme } from "./themes/inputTheme";

/** Input props */
type InputProps = {
    label: string;
    variant?: InputVariant;
    required?: boolean;
    classComponent?: string;
    classLabel?: string;
    classInput?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "className" | "label" | "required">;

/**
 * Input image with preview
 * @example
 * ```tsx
 * // Define the state
 * const [name, setName] = useState<string>("");
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
    const { label, variant = "default", required = true, classComponent, classLabel, classInput, ...others } = props;

    /** Prevent a clic on the label to focus the input */
    const preventDefault = (e: MouseEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <label onClick={preventDefault} className={combo(inputTheme[variant].component, classComponent)}>
            {/* Label */}
            <div className={combo(inputTheme[variant].label, classLabel)}>{label}</div>

            {/* Input */}
            <input className={combo(inputTheme[variant].input, classInput)} required={required} {...others} />
        </label>
    );
}
