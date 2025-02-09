"use client";

import Card from "@comps/server/Card";
import { combo } from "@lib/combo";
import { ReactNode } from "react";

type ModalClientProps = {
    modalVisible: boolean;
    setModalVisible: (visible: boolean) => void;
    className?: string;
    children: ReactNode;
};

export default function ModalClient(props: ModalClientProps) {
    const { modalVisible, setModalVisible, className, children } = props;

    if (!modalVisible) return null;

    return (
        <div className="absolute left-0 top-0 z-50 flex h-screen w-screen flex-col items-center justify-center">
            <button
                type="button"
                aria-label="close-modal"
                onClick={() => setModalVisible(false)}
                className="absolute left-0 top-0 z-50 h-screen w-screen bg-black opacity-50"
            />
            <Card
                className={combo(
                    "relative z-50 bg-white opacity-100",
                    className
                )}
            >
                {children}
            </Card>
        </div>
    );
}
