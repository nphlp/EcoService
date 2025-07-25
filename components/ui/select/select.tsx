"use client";

import { PortalContext } from "@comps/CORE/Portal";
import { combo } from "@lib/combo";
import { Check, ChevronDown, X } from "lucide-react";
import {
    createContext,
    FocusEvent,
    KeyboardEvent,
    MouseEvent,
    ReactNode,
    RefObject,
    useContext,
    useEffect,
    useRef,
    useState,
    type ButtonHTMLAttributes,
} from "react";
import { theme, VariantType } from "./selectTheme";
import { getOptionFromSlug, SelectOptionType } from "./utils";

type CommonProps = {
    // Props
    label: string;
    placeholder?: string;
    variant: VariantType;
    dropdownGap: number;
    canNotBeEmpty?: boolean;
    required?: boolean;

    // Styles
    classComponent?: string;
    classLabel?: string;

    classDisplayedValue?: string;
    classPlaceholder?: string;

    classButtonGroup?: string;
    classButton?: string;

    classSubButton?: string;
    classSubCross?: string;

    classSubDiv?: string;
    classSubChevron?: string;

    classOptionList?: string;
    classOptionButton?: string;
    classOptionIcon?: string;
    classOptionLabel?: string;

    // External States
    options: SelectOptionType[];
    setSelected: (value: SelectOptionType["slug"]) => void;
    selected: SelectOptionType["slug"];
};

// ========== Context ========== //

type ContextType = CommonProps & {
    // Internal States
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;

    buttonRef: RefObject<HTMLButtonElement | null>;
    optionListRef: RefObject<HTMLDivElement | null>;
};

const Context = createContext<ContextType>({} as ContextType);

// ========== Provider ========== //

type ProviderProps = CommonProps & {
    children: ReactNode;
};

const Provider = (props: ProviderProps) => {
    const { children, ...others } = props;

    // Internal States
    const [isOpen, setIsOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const optionListRef = useRef<HTMLDivElement>(null);

    // Context value
    const value = { ...others, isOpen, setIsOpen, buttonRef, optionListRef };

    return <Context.Provider value={value}>{children}</Context.Provider>;
};

// ========== Select ========== //

type SelectProps = Omit<CommonProps, "variant" | "dropdownGap"> & {
    // Override this props to set a default value
    variant?: VariantType;
    dropdownGap?: number;
} & Omit<
        ButtonHTMLAttributes<HTMLButtonElement>,
        "label" | "placeholder" | "required" | "className" | "options" | "value"
    >;

export default function Select(props: SelectProps) {
    // Define default values
    const { variant = "default", dropdownGap = 8, ...others } = props;

    return (
        <Provider {...{ variant, dropdownGap, ...others }}>
            <SelectComponent>
                {/* Label */}
                <SelectLabel />
                {/* Button */}
                <SelectButton />
                {/* Options */}
                <SelectOptions />
            </SelectComponent>
        </Provider>
    );
}

// ========== Select Component ========== //

type SelectComponentProps = {
    children: ReactNode;
};

const SelectComponent = (props: SelectComponentProps) => {
    const { children } = props;

    const { variant, classComponent } = useContext(Context);

    const preventDefault = (e: MouseEvent<HTMLLabelElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    return (
        <label className={combo(theme[variant].component, classComponent)} onClick={preventDefault}>
            {children}
        </label>
    );
};

// ========== Select Label ========== //

const SelectLabel = () => {
    const { variant, classLabel, label } = useContext(Context);

    return <div className={combo(theme[variant].label, classLabel)}>{label}</div>;
};

// ========== Select Button ========== //

const SelectButton = () => {
    const {
        variant,
        classButton,
        classButtonGroup,
        classSubButton,
        classSubCross,
        classSubDiv,
        classSubChevron,
        classDisplayedValue,
        classPlaceholder,
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
        <div className={combo(theme[variant].buttonGroup, classButtonGroup)}>
            <button
                ref={buttonRef} // Used to position the SelectOptions through the portal
                type="button"
                onFocus={handleFocus}
                onBlur={handleBlur}
                onKeyDown={handleKeyDown}
                className={combo(theme[variant].button, classButton)}
            >
                {hasSelection ? (
                    <span className={combo(theme[variant].displayedValue, classDisplayedValue)}>
                        {selectedOption.label}
                    </span>
                ) : (
                    <span className={combo(theme[variant].placeholder, classPlaceholder)}>{placeholder ?? label}</span>
                )}
            </button>
            {!canNotBeEmpty && hasSelection ? (
                <button
                    type="button"
                    className={combo(theme[variant].subButton, classSubButton)}
                    onClick={handleClickSubButton}
                >
                    <X className={combo(theme[variant].subCross, classSubCross)} />
                </button>
            ) : (
                <div className={combo(theme[variant].subDiv, classSubDiv)}>
                    <ChevronDown className={combo(theme[variant].subChevron, classSubChevron)} />
                </div>
            )}
        </div>
    );
};

// ========== Select Options ========== //

const SelectOptions = () => {
    const selectContext = useContext(Context);
    const { isOpen: isSelectOpen, buttonRef, dropdownGap } = selectContext;

    const { setIsOpen, setBox, setContent } = useContext(PortalContext);

    const buttonRect = buttonRef.current?.getBoundingClientRect();

    const top = (buttonRect?.bottom ?? 0) + dropdownGap;
    const left = buttonRect?.left;
    const width = buttonRect?.width;

    useEffect(() => {
        if (isSelectOpen) {
            setIsOpen(true);
            setBox({ x: left, y: top, w: width });
            setContent(<SelectOptionsPortal {...selectContext} />);
        } else {
            setIsOpen(false);
            setBox({});
            setContent(null);
        }
    }, [isSelectOpen, selectContext, setIsOpen, setBox, setContent, left, top, width]);

    return <></>;
};

type SelectOptionsPortalProps = ContextType;

const SelectOptionsPortal = (props: SelectOptionsPortalProps) => {
    const {
        selected,
        variant,
        classOptionList,
        classOptionButton,
        classOptionIcon,
        classOptionLabel,
        options,
        optionListRef,
        buttonRef,
        setSelected,
        setIsOpen,
    } = props;

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
        <div ref={optionListRef} className={combo(theme[variant].optionList, classOptionList)}>
            {options?.map((option, index) => (
                <button
                    key={index}
                    type="button"
                    data-slug={option.slug}
                    onClick={handleClick}
                    onKeyDown={handleKeyDown}
                    className={combo(theme[variant].optionButton, classOptionButton)}
                >
                    <Check
                        className={combo(
                            theme[variant].optionIcon,
                            classOptionIcon,
                            selectedOption?.slug !== option.slug && "invisible",
                        )}
                    />

                    <span className={combo(theme[variant].optionLabel, classOptionLabel)}>{option.label}</span>
                </button>
            ))}
        </div>
    );
};
