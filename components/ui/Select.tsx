"use client";

import { combo } from "@lib/combo";
import type { KeyboardEvent, MouseEvent } from "react";
import { SelectHTMLAttributes } from "react";

type InputProps = {
    label: string;
    defaultValue?: string;
    placeholder?: string;
    variant?: "default" | false;
    required?: boolean;
    options: {
        label: string;
        value: string;
    }[];
    classComponent?: string;
    classLabel?: string;
    classInput?: string;
} & Omit<
    SelectHTMLAttributes<HTMLSelectElement>,
    "className" | "label" | "required" | "placeholder" | "options" | "defaultValue"
>;

/**
 * Input image with preview
 * @example
 * ```tsx
 * // Define the state
 * const [category, setCategory] = useState<string>("");
 *
 * // Use the component
 * <Select
 *     label="Categories"
 *     options={categories.map((category) => ({
 *         label: category.name,
 *         value: category.id,
 *     }))}
 *     onChange={(e) => setCategory(e.target.value)}
 *     value={category}
 * />
 * ```
 */
export default function Select(props: InputProps) {
    const {
        label,
        defaultValue,
        placeholder,
        variant = "default",
        options,
        required = true,
        classComponent,
        classLabel,
        classInput,
        ...others
    } = props;

    /** Prevent a clic on the label to focus the input */
    const preventDefault = (e: MouseEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    /** Handle the ENTER keydown event to show the picker */
    const handleKeyDown = (e: KeyboardEvent<HTMLSelectElement>) => {
        if (e.key === "Enter" || e.key === "Space") {
            e.preventDefault();
            const select = e.target as HTMLSelectElement;
            select.showPicker();
        }
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
            <select
                className={combo(variant && theme[variant].input, classInput)}
                required={required}
                defaultValue={defaultValue}
                onKeyDown={handleKeyDown}
                {...others}
            >
                {!defaultValue && (
                    <option value="" disabled>
                        {placeholder ?? label}
                    </option>
                )}
                {options.map(({ label, value }, index) => (
                    <option key={index} value={value}>
                        {label}
                    </option>
                ))}
            </select>
        </label>
    );
}
