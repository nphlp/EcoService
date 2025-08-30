"use client";

import { combo } from "@lib/combo";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { ReactNode } from "react";
import { ModalVariant, theme } from "./theme";

export type ModalClassName = {
    component?: string;
    subComponent?: string;

    cardContainer?: string;
    card?: string;

    backgroundBlur?: string;
    backgroundColor?: string;
    backgroundButton?: string;

    crossButton?: string;
    crossIcon?: string;
};

type ModalClientProps = {
    setIsModalOpen: (visible: boolean) => void;
    isModalOpen: boolean;

    // Config
    noBackgroundBlur?: boolean;
    noBackgroundColor?: boolean;
    noBackgroundButton?: boolean;
    withCross?: boolean;
    fixedToTop?: boolean;

    // Animation
    noAnimation?: boolean;
    duration?: number;

    // Styles
    variant?: ModalVariant;
    className?: ModalClassName;

    children: ReactNode;
};

/**
 * Input image with preview
 * @example
 * ```tsx
 * // Define the state
 * const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
 *
 * // Use the component
 * <Modal
 *     className={{
 *         cardContainer: "px-5 py-16",
 *         card: "max-w-[400px] space-y-4"
 *     }}
 *     setIsModalOpen={setIsModalOpen}
 *     isModalOpen={isModalOpen}
 *     withCross
 * >
 *     <div>
 *         <h1>Title</h1>
 *         <p>Description</p>
 *     </div>
 *     <Button label="Close" onClick={() => setIsModalOpen(false)} />
 * </Modal>
 * ```
 */
export default function Modal(props: ModalClientProps) {
    const {
        isModalOpen,
        setIsModalOpen,
        noBackgroundBlur = false,
        noBackgroundButton = false,
        noBackgroundColor = false,
        withCross = false,
        fixedToTop = false,
        noAnimation = false,
        duration = 0.3,
        className,
        children,
        variant = "default",
    } = props;

    const animationDuration = noAnimation ? 0 : duration;

    return (
        <div className={combo(!isModalOpen && "pointer-events-none", theme[variant].component, className?.component)}>
            {/* Sub Component */}
            <div className={combo(theme[variant].subComponent, className?.subComponent)}>
                {/* Background Blur */}
                {!noBackgroundBlur && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: isModalOpen ? 1 : 0,
                            transition: { duration: animationDuration / 6 },
                        }}
                        className={combo(theme[variant].backgroundBlur, className?.backgroundBlur)}
                    />
                )}

                {/* Background Color */}
                {!noBackgroundColor && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{
                            opacity: isModalOpen ? 1 : 0,
                            transition: { duration: animationDuration / 2 },
                        }}
                        className={combo(theme[variant].backgroundColor, className?.backgroundColor)}
                    />
                )}

                {/* Background Button */}
                {!noBackgroundButton && (
                    <motion.button
                        type="button"
                        aria-label="close-modal"
                        onClick={() => setIsModalOpen(false)}
                        className={combo(theme[variant].backgroundButton, className?.backgroundButton)}
                    />
                )}

                {/* Card Container */}
                <div className={combo(fixedToTop && "flex-1", theme[variant].cardContainer, className?.cardContainer)}>
                    {/* Card */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{
                            scale: isModalOpen ? 1 : 0,
                        }}
                        transition={{
                            duration: animationDuration,
                            ease: "easeInOut",
                            type: "spring",
                        }}
                        className={combo(theme[variant].card, className?.card)}
                    >
                        <CrossButton
                            setIsModalOpen={setIsModalOpen}
                            withCross={withCross}
                            className={className}
                            variant={variant}
                        />
                        {children}
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

type CrossButtonProps = {
    setIsModalOpen: (visible: boolean) => void;
    withCross: boolean;
    variant: ModalVariant;
    className?: {
        crossButton?: string;
        crossIcon?: string;
    };
};

const CrossButton = (props: CrossButtonProps) => {
    const { className, setIsModalOpen, withCross, variant } = props;

    if (!withCross) return null;

    return (
        <button
            type="button"
            aria-label="Close modal"
            onClick={() => setIsModalOpen(false)}
            className={combo(theme[variant].crossButton, className?.crossButton)}
        >
            <X className={combo(theme[variant].crossIcon, className?.crossIcon)} />
        </button>
    );
};
