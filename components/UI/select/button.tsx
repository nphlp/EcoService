import { combo } from "@lib/combo";
import { ChevronDown, X } from "lucide-react";
import { FocusEvent, KeyboardEvent, MouseEvent, useContext } from "react";
import { Context } from "./context";
import { theme } from "./theme";
import { getOptionFromSlug } from "./utils";

const Button = () => {
    const {
        variant,
        className,
        selected,
        options,
        placeholder,
        label,
        canNotBeEmpty,
        setIsOpen,
        isOpen,
        setSelected,
        buttonRef,
        optionListRef,
    } = useContext(Context);

    // Get the selected option
    const selectedOption = getOptionFromSlug(selected, options);

    // Check if there is a selection
    const hasSelection = !!selectedOption;

    // Handle focus
    const handleFocus = (e: FocusEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        setIsOpen(true);
    };

    // Handle blur
    const handleBlur = (e: FocusEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        // On click outside, not on an option
        if (!e.relatedTarget?.hasAttribute("data-slug")) {
            setIsOpen(false);
        }
    };

    // Handle key down
    const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>) => {
        const key = e.key;
        const listenedKeys = ["Enter", "ArrowDown"];

        if (listenedKeys.includes(key)) {
            e.preventDefault();
            e.stopPropagation();

            // Open options if not open (this behavior happens after a keyboard selection)
            if (!isOpen) setIsOpen(true);

            // Focus the first option
            const firstOption: HTMLElement | null =
                optionListRef.current?.querySelector("[data-slug]:first-child") ?? null;
            if (firstOption) firstOption.focus();
        }

        if (key === "ArrowUp") {
            e.preventDefault();
            e.stopPropagation();

            // Open options if not open (this behavior happens after a keyboard selection)
            if (!isOpen) setIsOpen(true);

            // Focus the last option
            const lastOption: HTMLElement | null =
                optionListRef.current?.querySelector("[data-slug]:last-child") ?? null;
            if (lastOption) lastOption.focus();
        }

        if (key === "Escape") {
            e.currentTarget.blur();
        }
    };

    // Open or reset
    const handleClickSubButton = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        e.stopPropagation();

        if (!canNotBeEmpty && hasSelection) {
            setSelected("");
        }
    };

    return (
        <div className={combo(theme[variant].buttonGroup, className?.buttonGroup)}>
            <button
                ref={buttonRef} // Used to position the SelectOptions through the portal
                type="button"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={combo(theme[variant].button, className?.button)}
            >
                {hasSelection ? (
                    <span className={combo(theme[variant].displayedValue, className?.displayedValue)}>
                        {selectedOption.label}
                    </span>
                ) : (
                    <span className={combo(theme[variant].placeholder, className?.placeholder)}>
                        {placeholder ?? label}
                    </span>
                )}
            </button>
            {!canNotBeEmpty && hasSelection ? (
                <button
                    type="button"
                    className={combo(theme[variant].subButton, className?.subButton)}
                    onClick={handleClickSubButton}
                >
                    <X className={combo(theme[variant].subCross, className?.subCross)} />
                </button>
            ) : (
                <div className={combo(theme[variant].subDiv, className?.subDiv)}>
                    <ChevronDown className={combo(theme[variant].subChevron, className?.subChevron)} />
                </div>
            )}
        </div>
    );
};

export default Button;
