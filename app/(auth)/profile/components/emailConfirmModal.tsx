"use client";

import Button from "@comps/UI/button/button";
import Modal from "@comps/UI/modal/modal";
import { Session } from "@lib/auth-server";
import { useState } from "react";

type EmailConfirmModalProps = {
    session: NonNullable<Session>;
};

export default function EmailConfirmModal(props: EmailConfirmModalProps) {
    const { session } = props;

    const [isModalOpen, setIsModalOpen] = useState(!session.user.emailVerified);

    return (
        <Modal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            className={{ card: "max-w-[600px] space-y-3" }}
            withCross
        >
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
