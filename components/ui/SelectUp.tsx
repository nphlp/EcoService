"use client";

import { combo } from "@lib/combo";
import { motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import type { KeyboardEvent, MouseEvent } from "react";
import { InputHTMLAttributes, useState } from "react";
import Button from "./Button";
import { selectUpTheme, SelectUpVariant } from "./themes/selectUpTheme";

/** Options type */
export type OptionsType = {
    label: string;
    value: string;
};

/** Select props */
type SelectUpProps = {
    label: string;
    defaultValue?: string;
    placeholder: string;
    variant?: SelectUpVariant;
    required?: boolean;
    options: OptionsType[];
    classComponent?: string;
    classLabel?: string;
    classInput?: string;
    classOption?: string;
    classOptionContainer?: string;
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
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
export default function SelectUp(props: SelectUpProps) {
    const {
        label,
        defaultValue,
        variant = "default",
        options,
        placeholder,
        required = true,
        classComponent,
        classLabel,
        classInput,
        classOption,
        classOptionContainer,
        ...others
    } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selected, setSelected] = useState<OptionsType["value"]>(defaultValue ?? "");

    /** Prevent a clic on the label to focus the input */
    const preventDefault = (e: MouseEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    /** Handle the ENTER keydown event to show the picker */
    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter" || e.key === "Space") {
            e.preventDefault();
            const select = e.target as HTMLInputElement;
            select.showPicker();
        }
    };

    return (
        <label onClick={preventDefault} className={combo("relative", selectUpTheme[variant].component, classComponent)}>
            {/* Label */}
            <div className={combo(selectUpTheme[variant].label, classLabel)}>{label}</div>

            {/* Arrow */}
            <motion.div
                initial={{ rotate: 0 }}
                animate={{ rotate: isOpen ? -180 : 0 }}
                transition={{ duration: 0.3 }}
                className="pointer-events-none bg-white backdrop-blur-sm shadow-[0_0_3px_3px_rgba(255,255,255,1)] rounded-full absolute right-2 bottom-[6.5px] z-20 flex items-center justify-center"
            >
                <ChevronUp className="-translate-y-px" />
            </motion.div>

            {/* Input */}
            <input
                className={combo("appearance-none", selectUpTheme[variant].input, classInput)}
                required={required}
                defaultValue={defaultValue}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                onClick={() => setIsOpen(true)}
                onBlur={() => setIsOpen(false)}
                onChange={(e) => setSelected(e.target.value)}
                value={selected}
                {...others}
            />

            {/* Options */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: isOpen ? "" : 0 }}
                transition={{ duration: 0.3 }}
                className={combo(
                    selectUpTheme[variant].optionContainer,
                    // !isOpen && "hidden",
                    !isOpen && "border-transparent py-0",
                    "h-48 overflow-y-auto transition-[padding,border] duration-300",
                    classOptionContainer,
                )}
            >
                    {options.map(({ label, value }, index) => (
                        <Button
                            key={index}
                            label={label}
                            variant="outline"
                            onClick={() => {
                                setSelected(value);
                                setIsOpen(false);
                            }}
                            className={combo("w-full justify-start", classOption)}
                        >
                            {label}
                        </Button>
                    ))}
            </motion.div>
        </label>
    );
}
