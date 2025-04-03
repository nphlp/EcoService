"use client";

import Modal from "@comps/client/Modal";
import Button from "@comps/ui/Button";
import { useState } from "react";

export default function Info() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    return (
        <>
            <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
                <div className="flex flex-col gap-4">
                    <div className="text-lg font-bold">Plus d&apos;infos</div>
                    <div className="text-base">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.
                    </div>
                </div>
            </Modal>
            <div className="space-y-4 text-center">
                <div className="text-2xl font-bold">Create a product</div>
                <div className="space-y-1 text-xs">
                    <div className="text-gray-500">
                        This is an example of how to create a product with a select input.
                    </div>
                    <div className="flex items-center justify-center gap-1">
                        <span className="text-gray-500">Pour en savoir plus </span>
                        <Button
                            label="cliquez-ici."
                            variant="underline"
                            baseStyleWithout={["padding", "font", "outline"]}
                            onClick={() => setIsModalOpen(true)}
                        ></Button>
                    </div>
                </div>
            </div>
        </>
    );
}
