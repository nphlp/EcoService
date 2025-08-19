"use client";

import { PortalContext } from "@comps/CORE/portal/PortalContext";
import Button from "@comps/UI/button";
import { combo } from "@lib/combo";
import { X } from "lucide-react";
import { ReactNode, useContext, useEffect } from "react";

type ModalProps = {
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
export default function Modal(props: ModalProps) {
    const { isModalOpen, setIsModalOpen, className, children, withCross = true } = props;

    const { setIsOpen, setBox, setContent } = useContext(PortalContext);

    useEffect(() => {
        if (isModalOpen) {
            setIsOpen(true);
            setBox({ w: "100vw", h: "100vh" });
            setContent(
                <PortalLayout setIsModalOpen={setIsModalOpen} className={className} withCross={withCross}>
                    {children}
                </PortalLayout>,
            );
        } else {
            setIsOpen(false);
            setBox({});
            setContent(null);
        }
    }, [isModalOpen, className, withCross, children, setIsModalOpen, setIsOpen, setBox, setContent]);

    return <> </>;
}

type ModalLayoutProps = {
    setIsModalOpen: (visible: boolean) => void;
    className?: string;
    children: ReactNode;
    withCross?: boolean;
};

const PortalLayout = (props: ModalLayoutProps) => {
    const { setIsModalOpen, className, children, withCross = true } = props;

    return (
        <div className="flex h-full items-center justify-center">
            <button
                type="button"
                aria-label="close-modal"
                onClick={() => setIsModalOpen(false)}
                className="absolute top-0 left-0 z-50 h-screen w-screen bg-black/50 backdrop-blur-[1.5px]"
            />
            <div
                className={combo(
                    "rounded-xl border border-gray-300 bg-white px-12 py-5 shadow-md",
                    "relative z-50 bg-white",
                    className,
                )}
            >
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
            </div>
        </div>
    );
};
