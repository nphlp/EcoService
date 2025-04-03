"use client";

import Card from "@comps/server/Card";
import Button from "@comps/ui/Button";
import { combo } from "@lib/combo";
import { X } from "lucide-react";
import { ReactNode } from "react";

type ModalClientProps = {
    setIsModalOpen: (visible: boolean) => void;
    isModalOpen: boolean;
    withCross?: boolean;
    className?: string;
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
    const { isModalOpen, setIsModalOpen, className, children, withCross = true } = props;

    if (!isModalOpen) return null;

    return (
        <div className="absolute top-0 left-0 z-50 flex h-screen w-screen flex-col items-center justify-center">
            <button
                type="button"
                aria-label="close-modal"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-0 left-0 z-50 h-screen w-screen bg-black/50 backdrop-blur-sm"
            />
            <Card className={combo("relative z-50 bg-white", className)}>
                {withCross && (
                    <Button
                        label="Close modal"
                        variant="ghost"
                        baseStyleWithout={["font", "padding"]}
                        onClick={() => setIsModalOpen(false)}
                        className="absolute top-2 right-2 p-0.5"
                >
                        <X className="stroke-[2.2px] text-black" />
                    </Button>
                )}
                {children}
            </Card>
        </div>
    );
}
