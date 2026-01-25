"use client";

import Button from "@comps/UI/button/button";
import Link from "@comps/UI/button/link";
import Feedback, { FeedbackMode } from "@comps/UI/feedback";
import InputPassword from "@comps/UI/inputPassword";
import { resetPassword } from "@lib/auth-client";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

type ResetPasswordProps = {
    token?: string;
};

export default function ResetPassword(props: ResetPasswordProps) {
    const { token } = props;
    const router = useRouter();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState<string>("");
    const [mode, setMode] = useState<FeedbackMode>("none");
    const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!password || !confirmPassword) {
            setMessage("Veuillez remplir tous les champs.");
            setMode("warning");
            setIsFeedbackOpen(true);
            setIsLoading(false);
            return;
        }

        if (password !== confirmPassword) {
            setMessage("Les mots de passe ne correspondent pas.");
            setMode("warning");
            setIsFeedbackOpen(true);
            setIsLoading(false);
            return;
        }

        if (password.length < 10) {
            setMessage("Le mot de passe doit contenir au moins 10 caractères.");
            setMode("warning");
            setIsFeedbackOpen(true);
            setIsLoading(false);
            return;
        }

        if (!token) {
            setMessage("Lien de réinitialisation invalide ou expiré.");
            setMode("error");
            setIsFeedbackOpen(true);
            setIsLoading(false);
            return;
        }

        const { error } = await resetPassword({
            newPassword: password,
            token,
        });

        if (error) {
            setMessage("Lien de réinitialisation invalide ou expiré.");
            setMode("error");
            setIsFeedbackOpen(true);
            setIsLoading(false);
            return;
        }

        setMessage("Mot de passe réinitialisé avec succès.");
        setMode("success");
        setIsFeedbackOpen(true);

        setTimeout(() => {
            router.push("/auth?tab=login");
        }, 2000);
    };

    if (!token) {
        return (
            <div className="space-y-4">
                <div className="space-y-2">
                    <h1 className="text-center text-2xl font-bold">Lien invalide</h1>
                    <div className="text-center text-xs text-wrap text-gray-500">
                        Ce lien de réinitialisation est invalide ou a expiré.
                    </div>
                </div>
                <div className="flex justify-center">
                    <Link href="/forgot-password" label="request-new-link" variant="default">
                        Demander un nouveau lien
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <>
            <div className="space-y-2">
                <h1 className="text-center text-2xl font-bold">Nouveau mot de passe</h1>
                <div className="text-center text-xs text-wrap text-gray-500">
                    Entrez votre nouveau mot de passe (10 caractères minimum).
                </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4">
                <div className="w-full space-y-4">
                    <InputPassword label="Nouveau mot de passe" setValue={setPassword} value={password} />
                    <InputPassword
                        label="Confirmer le mot de passe"
                        setValue={setConfirmPassword}
                        value={confirmPassword}
                    />
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
                <Button type="submit" label="reset-password" isLoading={isLoading}>
                    Réinitialiser
                </Button>
            </form>
        </>
    );
}
