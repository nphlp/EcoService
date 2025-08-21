"use client";

import { combo } from "@lib/combo";
import { X } from "lucide-react";
import { ReactNode } from "react";
import { ModalVariant, theme } from "./theme";

export type ModalClassName = {
    component?: string;
    backgroundButton?: string;
    backgroundBlur?: string;
    backgroundDark?: string;
    card?: string;
    crossButton?: string;
    crossIcon?: string;
};

type ModalClientProps = {
    setIsModalOpen: (visible: boolean) => void;
    isModalOpen: boolean;

    // Config
    noBackgroundBlur?: boolean;
    noBackgroundDark?: boolean;
    noBackgroundButton?: boolean;
    withCross?: boolean;

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
 *     setIsModalOpen={setIsModalOpen}
 *     isModalOpen={isModalOpen}
 *     className="w-1/2"
 *     withCross={false}
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
        noBackgroundDark = false,
        withCross = false,
        className,
        children,
        variant = "default",
    } = props;

    if (!isModalOpen) return null;

    return (
        <div className={combo(theme[variant].component, className?.component)}>
            {/* Background Button */}
            {!noBackgroundButton && (
                <button
                    type="button"
                    aria-label="close-modal"
                    onClick={() => setIsModalOpen(false)}
                    className={combo(theme[variant].backgroundButton, className?.backgroundButton)}
                />
            )}

            {/* Background Blur */}
            {!noBackgroundBlur && <div className={combo(theme[variant].backgroundBlur, className?.backgroundBlur)} />}

            {/* Background Dark */}
            {!noBackgroundDark && <div className={combo(theme[variant].backgroundDark, className?.backgroundDark)} />}

            {/* Card */}
            <div className={combo(theme[variant].card, className?.card)}>
                <CrossButton
                    setIsModalOpen={setIsModalOpen}
                    withCross={withCross}
                    className={className}
                    variant={variant}
                />
                {children}
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
