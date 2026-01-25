"use client";

import Button from "@comps/UI/button/button";
import Link from "@comps/UI/button/link";
import Feedback, { FeedbackMode } from "@comps/UI/feedback";
import Input from "@comps/UI/input/input";
import { requestPasswordReset } from "@lib/auth-client";
import { FormEvent, useState } from "react";

export default function ForgotPassword() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [email, setEmail] = useState("");

    const [message, setMessage] = useState<string>("");
    const [mode, setMode] = useState<FeedbackMode>("none");
    const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!email) {
            setMessage("Veuillez entrer votre adresse email.");
            setMode("warning");
            setIsFeedbackOpen(true);
            setIsLoading(false);
            return;
        }

        const { error } = await requestPasswordReset({
            email,
            redirectTo: "/reset-password",
        });

        if (error) {
            setMessage("Une erreur est survenue. Veuillez réessayer.");
            setMode("error");
            setIsFeedbackOpen(true);
            setIsLoading(false);
            return;
        }

        setMessage("Si un compte existe avec cet email, vous recevrez un lien de réinitialisation.");
        setMode("success");
        setIsFeedbackOpen(true);
        setIsLoading(false);
    };

    return (
        <>
            <div className="space-y-2">
                <h1 className="text-center text-2xl font-bold">Mot de passe oublié</h1>
                <div className="text-center text-xs text-wrap text-gray-500">
                    Entrez votre adresse email pour recevoir un lien de réinitialisation.
                </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4">
                <div className="w-full space-y-4">
                    <Input label="Email" type="email" setValue={setEmail} value={email} />
                </div>
                <Link
                    className="rounded px-1 text-sm text-gray-500"
                    href="/auth?tab=login"
                    label="back-to-login"
                    variant="underline"
                >
                    Retour à la connexion
                </Link>
                <Feedback message={message} mode={mode} isFeedbackOpen={isFeedbackOpen} />
                <Button type="submit" label="send-reset-email" isLoading={isLoading}>
                    Envoyer le lien
                </Button>
            </form>
        </>
    );
}
