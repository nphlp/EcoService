"use client";

import { combo } from "@lib/combo";
import { ChevronDown } from "lucide-react";
import type { KeyboardEvent, MouseEvent } from "react";
import { SelectHTMLAttributes } from "react";
import { selectTheme, SelectVariant } from "./themes/selectTheme";

/** Options type */
export type OptionsType = {
    label: string;
    value: string;
};

/** Select props */
type SelectProps = {
    label: string;
    defaultValue?: string;
    placeholder?: string;
    variant?: SelectVariant;
    required?: boolean;
    options: OptionsType[];
    classComponent?: string;
    classLabel?: string;
    classInput?: string;
    classOption?: string;
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
 *     placeholder="Sélectionnez une catégorie"
 *     options={categories.map((category) => ({
 *         label: category.name,
 *         value: category.id,
 *     }))}
 *     onChange={(e) => setCategory(e.target.value)}
 *     value={category}
 * />
 * ```
 */
export default function Select(props: SelectProps) {
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
        classOption,
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

    return (
        <label onClick={preventDefault} className={combo("relative", selectTheme[variant].component, classComponent)}>
            {/* Label */}
            <div className={combo(selectTheme[variant].label, classLabel)}>{label}</div>

            {/* Arrow */}
            <div className="pointer-events-none absolute right-2 bottom-[5px] z-20 flex items-center justify-center">
                <ChevronDown className="-translate-y-px" />
            </div>

            {/* Input */}
            <select
                className={combo("appearance-none", selectTheme[variant].input, classInput)}
                required={required}
                defaultValue={defaultValue}
                onKeyDown={handleKeyDown}
                {...others}
            >
                {!defaultValue && (
                    <option value="" className={combo(selectTheme[variant].option, classOption)} disabled>
                        {placeholder ?? label}
                    </option>
                )}
                {options.map(({ label, value }, index) => (
                    <option key={index} value={value} className={combo(selectTheme[variant].option, classOption)}>
                        {label}
                    </option>
                ))}
            </select>
        </label>
    );
}
