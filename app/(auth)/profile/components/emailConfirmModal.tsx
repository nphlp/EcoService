"use client";

import Button from "@comps/ui/button";
import Modal from "@comps/ui/modal";
import { BetterSessionServer } from "@lib/auth";
import { useState } from "react";

type EmailConfirmModalProps = {
    session: NonNullable<BetterSessionServer>;
};

export default function EmailConfirmModal(props: EmailConfirmModalProps) {
    const { session } = props;

    const [isModalOpen, setIsModalOpen] = useState(!session.user.emailVerified);

    return (
        <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} className="max-w-[600px] space-y-3">
            <h2 className="text-center text-xl font-bold">Confirmation d&apos;email</h2>
            <div className="text-sm">Veuillez vérifier votre adresse email.</div>
            <div className="flex flex-col items-center">
                <Button label="close" onClick={() => setIsModalOpen(false)}>
                    Fermer
                </Button>
            </div>
        </Modal>
    );
}
