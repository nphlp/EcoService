"use client";

import { combo } from "@lib/combo";
import { ChevronUp } from "lucide-react";
import { motion } from "motion/react";
import {
    Dispatch,
    ReactNode,
    RefObject,
    SetStateAction,
    createContext,
    startTransition,
    useContext,
    useEffect,
    useId,
    useLayoutEffect,
    useRef,
    useState,
} from "react";

// ==== Accordion Group ==== //

type AccordionGroupContextType = {
    openedAccordionIndex: number | null;
    setOpenedAccordionIndex: Dispatch<SetStateAction<number | null>>;
    idListRef: RefObject<Map<string, number>>;
};

// Context
const AccordionGroupContext = createContext<AccordionGroupContextType>({} as AccordionGroupContextType);

type AccordionGroupProps = {
    children: ReactNode;
    openByDefaultIndex?: number | null;
};

/**
 * Accordion Group to open one accordion at a time
 * Even if sub-accordion are nested in other tags
 * @example
 * ```tsx
 * <AccordionGroup openByDefaultIndex={1}>
 *     <Accordion />
 *     <Accordion /> // This will be opened by default
 *     <div>
 *         <Accordion />
 *         <Accordion />
 *     </div>
 * </AccordionGroup>
 * ```
 */
const AccordionGroup = (props: AccordionGroupProps) => {
    const { children, openByDefaultIndex = null } = props;

    const [openedAccordionIndex, setOpenedAccordionIndex] = useState(openByDefaultIndex);

    // Store the unique id list
    const idListRef = useRef<Map<string, number>>(new Map());

    return (
        <AccordionGroupContext.Provider value={{ openedAccordionIndex, setOpenedAccordionIndex, idListRef }}>
            {children}
        </AccordionGroupContext.Provider>
    );
};

// ==== Accordion Item ==== //

type AccordionContextType = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    index?: number;
};

// Context
const AccordionContext = createContext<AccordionContextType>({} as AccordionContextType);

type AccordionProviderProps = {
    children: ReactNode;
    openByDefault: boolean;
    index?: number;
};

// Item Provider
const AccordionProvider = (props: AccordionProviderProps) => {
    const { children, openByDefault, index } = props;

    const { openedAccordionIndex, setOpenedAccordionIndex } = useContext(AccordionGroupContext);

    // Check if this accordion is default opened by the group
    const isOpenByGroup = index !== undefined && index === openedAccordionIndex;

    // Check if default is from accordion or group
    const [open, setOpen] = useState(isOpenByGroup ?? openByDefault);

    // Update the opened index
    useEffect(() => {
        if (typeof index === "number" && open === true) {
            setOpenedAccordionIndex(index);
        }
    }, [open, index, setOpenedAccordionIndex]);

    // Update all accordions
    useEffect(() => {
        if (typeof index === "number" && openedAccordionIndex !== index) {
            startTransition(() => {
                setOpen(false);
            });
        }
    }, [openedAccordionIndex, index, setOpen]);

    return <AccordionContext.Provider value={{ open, setOpen, index }}>{children}</AccordionContext.Provider>;
};

type AccordionProps = {
    openByDefault?: boolean;
    className?: string;
    children: ReactNode;
};

/**
 * Accordion
 * @example
 * ```tsx
 * <Accordion>
 *     <AccordionButton>Clic me to open the accordion</AccordionButton>
 *     <AccordionContent>
 *         Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
 *     </AccordionContent>
 * </Accordion>
 * ```
 */
const Accordion = (props: AccordionProps) => {
    const { className, children, openByDefault = false } = props;

    // Use stable ID between SSR and client
    const id = useId();

    // Get the id list from group context
    const { idListRef } = useContext(AccordionGroupContext);

    // Store the index of this accordion
    const [index, setIndex] = useState<number | undefined>(undefined);

    // Register accordion and calculate index after mount
    useLayoutEffect(() => {
        if (idListRef) {
            const idList = idListRef.current;
            if (!idList.has(id)) {
                idList.set(id, idList.size);
            }
            const calculatedIndex = idList.get(id);
            if (index !== calculatedIndex) {
                setIndex(calculatedIndex);
            }
        }
    }, [id, idListRef, index]);

    return (
        <AccordionProvider openByDefault={openByDefault} index={index}>
            <div
                className={combo(
                    "w-full overflow-hidden rounded-2xl border border-gray-300 bg-white shadow-md",
                    className,
                )}
            >
                {children}
            </div>
        </AccordionProvider>
    );
};

type AccordionButtonProps = {
    classComponent?: string;
    children: ReactNode;
    classLabel?: string;
};

// AccordionButton
const AccordionButton = (props: AccordionButtonProps) => {
    const { children, classComponent, classLabel } = props;

    const { open, setOpen } = useContext(AccordionContext);

    return (
        <button className={combo("w-full p-2", classComponent)} onClick={() => setOpen(!open)}>
            <div
                className={combo(
                    "w-full items-center justify-between rounded-lg px-3 py-1.5",
                    "hover:cursor-pointer hover:bg-gray-100",
                    "transition-colors duration-200",
                    "flex items-center justify-between",
                )}
            >
                <div className={combo("flex flex-col items-start", classLabel)}>{children}</div>
                <motion.div
                    initial={{ rotate: open ? -180 : 0 }}
                    animate={{ rotate: open ? -180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ChevronUp className="size-6" />
                </motion.div>
            </div>
        </button>
    );
};

type AccordionContentProps = {
    children: ReactNode;
    className?: string;
};

// AccordionContent
const AccordionContent = (props: AccordionContentProps) => {
    const { children, className } = props;

    const { open } = useContext(AccordionContext);

    return (
        <motion.div
            initial={{ height: open ? "auto" : 0 }}
            animate={{ height: open ? "auto" : 0 }}
            transition={{ duration: 0.3 }}
        >
            <hr className="mx-5 border-gray-200" />
            <div className={combo("p-5", className)}>{children}</div>
        </motion.div>
    );
};

export { Accordion, AccordionButton, AccordionContent, AccordionGroup };
