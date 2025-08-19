"use client";

import Button from "@comps/UI/button";
import Modal from "@comps/UI/modal";
import { useState } from "react";

export default function Client() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div>
            <Modal setIsModalOpen={setIsModalOpen} isModalOpen={isModalOpen}>
                <h2 className="text-lg font-semibold">Modal Title</h2>
                <div className="mt-1">This is an awesome modal content.</div>
            </Modal>
            <Button label="Open Modal" type="button" onClick={() => setIsModalOpen(true)} />
        </div>
    );
}
