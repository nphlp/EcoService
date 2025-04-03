"use client";

import { combo } from "@lib/combo";
import { StringToSlug } from "@utils/StringToSlug";
import { motion } from "framer-motion";
import { Check, ChevronUp, X } from "lucide-react";
import type { ChangeEvent, FocusEvent, KeyboardEvent, MouseEvent } from "react";
import { InputHTMLAttributes, useEffect, useState } from "react";
import { selectUpTheme, SelectUpVariant } from "./themes/selectUpTheme";

/** Options type */
export type OptionsType = {
    label: string;
    value: string;
};

/** Select props */
type SelectUpProps = {
    label: string;
    placeholder: string;
    variant?: SelectUpVariant;
    required?: boolean;
    onSelectValueChange: (selected: OptionsType["value"]) => void;
    options: OptionsType[];
    defaultOption?: OptionsType;
    classComponent?: string;
    classLabel?: string;
    classInput?: string;
    classOption?: string;
    classOptionContainer?: string;
} & Omit<
    InputHTMLAttributes<HTMLInputElement>,
    | "onChange"
    | "value"
    | "className"
    | "label"
    | "required"
    | "placeholder"
    | "options"
    | "defaultValue"
    | "defaultChecked"
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
 *     onSelectValueChange={setCategory}
 * />
 * ```
 */
export default function SelectUp(props: SelectUpProps) {
    const {
        label,
        variant = "default",
        options,
        defaultOption,
        placeholder,
        required = true,
        onSelectValueChange,
        classComponent,
        classLabel,
        classInput,
        classOption,
        classOptionContainer,
        ...others
    } = props;

    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [selectedLabel, setSelectedLabel] = useState<OptionsType["label"]>(defaultOption?.label ?? "");
    const [filteredOptions, setFilteredOptions] = useState<OptionsType[]>(options);
    const [isValid, setIsValid] = useState(false);

    /** Prevent a clic on the label to focus the input */
    const preventDefault = (e: MouseEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const handleWrite = (e: ChangeEvent<HTMLInputElement>) => {
        // Open the options
        setIsOpen(true);

        // Get the user value
        const userValue = e.target.value;

        // Slugify the value for a better filtering
        const valueSlug = StringToSlug(userValue);

        // Filter the options with slugs
        const filteredOptions = options.filter((option) => StringToSlug(option.label).includes(valueSlug));

        setIsValid(false);
        setFilteredOptions(filteredOptions);
        setSelectedLabel(userValue);
    };

    const handleSelect = (value: OptionsType["label"]) => () => {
        setSelectedLabel(value);
        setIsOpen(false);
        setIsValid(true);
        setFilteredOptions(options);

        // Remove focus on the input
        const inputElement = document.getElementById(`input-${StringToSlug(label)}`) as HTMLInputElement;
        inputElement.focus();
        // inputElement.blur();
    };

    const handleBlur = (e: FocusEvent<HTMLInputElement | HTMLButtonElement>) => {
        // If the blur is not a click on a button, close the options
        if (e.relatedTarget?.tagName !== "INPUT" && e.relatedTarget?.tagName !== "BUTTON") {
            setIsOpen(false);
            // If the input is not valid, reset the selected value
            if (!isValid) {
                setSelectedLabel("");
            }
        }

        // Reset the filtered options after the picker is closed
        setTimeout(() => {
            setFilteredOptions(options);
        }, 300);
    };

    const handleKeyDownInput = (e: KeyboardEvent<HTMLInputElement>) => {
        // If the Enter key is pressed, open the options
        if (e.key === "Enter" || e.key === "ArrowDown") {
            e.preventDefault();
            const firstChildTarget = document.getElementById(`options-container-${StringToSlug(label)}`)
                ?.children[0] as HTMLButtonElement;
            if (firstChildTarget) {
                firstChildTarget.focus();
            }
            setIsOpen(true);
        }
        if (e.key === "Escape") {
            e.preventDefault();
            setIsOpen(false);
            const inputElement = document.getElementById(`input-${StringToSlug(label)}`) as HTMLInputElement;
            inputElement.blur();
        }
    };

    const handleKeyDownOption = (e: KeyboardEvent<HTMLButtonElement>) => {
        const currentButton = e.target as HTMLButtonElement;
        const inputElement = document.getElementById(`input-${StringToSlug(label)}`) as HTMLInputElement;

        if (e.key === "Escape") {
            e.preventDefault();
            inputElement.focus();
            setIsOpen(false);
        }
        if (e.key === "ArrowDown") {
            e.preventDefault();
            const nextButton = currentButton.nextSibling as HTMLButtonElement;
            if (nextButton) {
                nextButton.focus();
            }
        }
        if (e.key === "ArrowUp") {
            e.preventDefault();
            const previousButton = currentButton.previousSibling as HTMLButtonElement;
            if (previousButton) {
                previousButton.focus();
            } else {
                inputElement.focus();
            }
        }
    };

    // Fire the parent state when the selectedLabel changes
    useEffect(() => {
        const newSelectedValue = options.find((option) => option.label === selectedLabel)?.value;

        if (newSelectedValue) onSelectValueChange(newSelectedValue);
        else onSelectValueChange("");
    }, [selectedLabel, options, onSelectValueChange]);

    return (
        <label onClick={preventDefault} className={combo("relative", selectUpTheme[variant].component, classComponent)}>
            {/* Label */}
            <div className={combo(selectUpTheme[variant].label, classLabel)}>{label}</div>

            {/* Arrow */}
            {selectedLabel !== "" ? (
                <button
                    type="button"
                    onClick={() => {
                        setSelectedLabel("");
                        setIsOpen(false);
                        setIsValid(false);
                    }}
                    className={combo(
                        "absolute right-2 bottom-[6.5px] z-20",
                        "rounded-full bg-white shadow-[0_0_3px_3px_rgba(255,255,255,1)] backdrop-blur-sm hover:cursor-pointer",
                        "flex size-6 items-center justify-center",
                        "ring-0 outline-none focus:ring-2 focus:ring-teal-300",
                    )}
                >
                    <div className="rounded-full bg-gray-800 p-[3px]">
                        <X className="size-3 stroke-white stroke-3" />
                    </div>
                </button>
            ) : (
                <motion.div
                    initial={{ rotate: 0 }}
                    animate={{ rotate: isOpen ? -180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="absolute right-2 bottom-[6.5px] z-20"
                >
                    <button
                        type="button"
                        onClick={() => setIsOpen(!isOpen)}
                        className={combo(
                            "rounded-full bg-white shadow-[0_0_3px_3px_rgba(255,255,255,1)] backdrop-blur-sm hover:cursor-pointer",
                            "flex items-center justify-center",
                            "ring-0 outline-none focus:ring-2 focus:ring-teal-300",
                        )}
                    >
                        <ChevronUp className="-translate-y-px" />
                    </button>
                </motion.div>
            )}

            {/* Input */}
            <input
                type="text"
                id={`input-${StringToSlug(label)}`}
                className={combo(
                    "appearance-none placeholder:text-gray-400",
                    !isValid && "text-gray-400",
                    selectUpTheme[variant].input,
                    classInput,
                )}
                required={required}
                onKeyDown={handleKeyDownInput}
                placeholder={placeholder}
                onClick={() => setIsOpen(true)}
                onBlur={handleBlur}
                onChange={handleWrite}
                value={selectedLabel}
                {...others}
            />

            {/* Options */}
            <motion.div
                initial={{ height: 0 }}
                animate={{ height: isOpen ? "" : 0 }}
                transition={{ duration: 0.3 }}
                className={combo(
                    "absolute top-full left-0 mt-1.5 w-full",
                    "overflow-y-hidden rounded-xl shadow-md shadow-black/20",
                    classOptionContainer,
                )}
            >
                {/* Container not scrollable */}
                <div className={combo("overflow-hidden rounded-xl border border-black/20 bg-white")}>
                    {/* Scrollable list of options */}
                    <div
                        id={`options-container-${StringToSlug(label)}`}
                        className={combo("max-h-48 overflow-y-auto rounded-xl p-2")}
                    >
                        {filteredOptions.length ? (
                            filteredOptions.map(({ label }, index) => (
                                <button
                                    key={index}
                                    type="button"
                                    onClick={handleSelect(label)}
                                    onBlur={handleBlur}
                                    onKeyDown={handleKeyDownOption}
                                    className={combo(
                                        "flex flex-row justify-start items-center gap-2",
                                        "hover:cursor-pointer hover:bg-gray-100",
                                        "ring-0 outline-none focus:ring-2 focus:ring-teal-300",
                                        "w-full rounded-md px-3 py-0.5 text-sm",
                                        selectedLabel === label && "font-semibold",
                                        classOption,
                                    )}
                                >
                                    {selectedLabel === label ? <Check className={combo("size-4 stroke-3")} />
                                        :
                                        <div className="size-4"></div>}
                                    <span>{label}</span>
                                </button>
                            ))
                        ) : (
                            <div className="flex items-center justify-center">Aucun élément...</div>
                        )}
                    </div>
                </div>
            </motion.div>
        </label>
    );
}
