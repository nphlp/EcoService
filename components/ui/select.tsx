"use client";

import { combo } from "@lib/combo";
import { ChevronUp } from "lucide-react";
import type { KeyboardEvent, MouseEvent } from "react";
import { useState } from "react";
import { SelectHTMLAttributes } from "react";
import { selectTheme, SelectVariant } from "./themes/selectTheme";
import { motion } from "framer-motion";

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

    const [isOpen, setIsOpen] = useState(false);

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
            <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: isOpen ? -180 : 0 }}
                transition={{ duration: 0.3 }}
                className={combo(
                    "pointer-events-none absolute right-2 bottom-[6.5px] z-20",
                    "rounded-full bg-white shadow-[0_0_3px_3px_rgba(255,255,255,1)] backdrop-blur-sm",
                    "flex items-center justify-center",
                    "ring-0 outline-none focus:ring-2 focus:ring-teal-300",
                )}
            >
                <ChevronUp className="-translate-y-px" />
            </motion.div>

            {/* Input */}
            <select
                className={combo("appearance-none hover:cursor-pointer", selectTheme[variant].input, classInput)}
                required={required}
                defaultValue={defaultValue}
                onFocus={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
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
