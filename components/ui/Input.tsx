"use client";

import { combo } from "@lib/combo";
import { InputHTMLAttributes, MouseEvent } from "react";

type InputProps = {
    label: string;
    variant?: "default" | false;
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

    const theme = {
        default: {
            component: combo("block space-y-2"),
            label: combo("text-lg font-medium text-white"),
            input: combo(
                "w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3",
                "outline-none ring-0 focus:ring-2 focus:ring-teal-300",
                "transition-all duration-150",
            ),
        },
    };

    return (
        <label onClick={preventDefault} className={combo(variant && theme[variant].component, classComponent)}>
            {/* Label */}
            <div className={combo(variant && theme[variant].label, classLabel)}>{label}</div>

            {/* Input */}
            <input className={combo(variant && theme[variant].input, classInput)} required={required} {...others} />
        </label>
    );
}
