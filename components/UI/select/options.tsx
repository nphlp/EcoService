"use client";

import { combo } from "@lib/combo";
import { Check } from "lucide-react";
import { KeyboardEvent, MouseEvent, useContext } from "react";
import { Context } from "./context";
import { theme } from "./theme";
import { getOptionFromSlug } from "./utils";

const Options = () => {
    const {
        isOpen,
        setIsOpen,
        buttonRef,
        optionListRef,
        options,
        dropdownGap,
        selected,
        setSelected,
        variant,
        className,
    } = useContext(Context);

    if (!isOpen) return null;

    // Select button position
    const buttonRect = buttonRef.current?.getBoundingClientRect();
    const buttonBottom = buttonRect?.bottom ?? 0;

    // Options dropdown position
    const top = buttonBottom + dropdownGap;
    const left = buttonRect?.left;
    const width = buttonRect?.width;

    // Get the selected option
    const selectedOption = getOptionFromSlug(selected, options);

    // Handle click
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        const slug = e.currentTarget.getAttribute("data-slug");
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
            const option = e.currentTarget.getAttribute("data-slug");
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

        if (key === "Escape") {
            buttonRef.current?.focus();
            setIsOpen(false);
        }
    };

    return (
        <div
            ref={optionListRef}
            className={combo(theme[variant].optionList, className?.optionList)}
            style={{ top, left, width }}
        >
            {options?.map((option, index) => (
                <button
                    key={index}
                    type="button"
                    data-slug={option.slug}
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
            ))}
        </div>
    );
};

export default Options;
