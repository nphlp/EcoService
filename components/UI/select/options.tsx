"use client";

import { combo } from "@lib/combo";
import { Check } from "lucide-react";
import { KeyboardEvent, MouseEvent, useContext } from "react";
import { Context } from "./context";
import { theme } from "./theme";
import { SelectOptionType, getOptionFromSlug } from "./utils";

type OptionProps = {
    option: SelectOptionType;
};

const Option = (props: OptionProps) => {
    const { option } = props;

    const { setIsOpen, buttonRef, options, selected, setSelected, variant, className } = useContext(Context);

    // Get the selected option
    const selectedOption = getOptionFromSlug(selected, options);

    // Handle click
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const slug = e.currentTarget.getAttribute("data-options-slug");
        if (slug) setSelected(slug);
        setIsOpen(false);
    };

    // Handle key down
    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const key = e.key;

        if (key === "Enter") {
            // Select the option
            const option = e.currentTarget.getAttribute("data-options-slug");
            if (option) setSelected(option);
            buttonRef.current?.focus();
            setIsOpen(false);
        }

        if (key === "ArrowDown") {
            // Focus next option
            const nextOption: HTMLElement | null = e.currentTarget.nextElementSibling as HTMLElement | null;
            if (nextOption) {
                nextOption.focus();
            } else {
                buttonRef.current?.focus();
            }
        }

        if (key === "ArrowUp") {
            // Focus previous option
            const previousOption: HTMLElement | null = e.currentTarget.previousElementSibling as HTMLElement | null;
            if (previousOption) {
                previousOption.focus();
            } else {
                buttonRef.current?.focus();
            }
        }

        if (["Escape", "Tab"].includes(key)) {
            buttonRef.current?.focus();
            setIsOpen(false);
        }
    };

    return (
        <button
            type="button"
            /**
             * This data attribute is used to manage focus within the dropdown
             * Used by `./options.tsx` and `./button.tsx`
             */
            data-options-slug={option.slug}
            onClick={handleClick}
            onKeyDown={handleKeyDown}
            className={combo(theme[variant].optionButton, className?.optionButton)}
        >
            <Check
                className={combo(
                    theme[variant].optionIcon,
                    className?.optionIcon,
                    selectedOption?.slug !== option.slug && "invisible",
                )}
            />

            <span className={combo(theme[variant].optionLabel, className?.optionLabel)}>{option.label}</span>
        </button>
    );
};

export default Option;
