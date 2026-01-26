"use client";

import Button from "@comps/UI/button/button";
import Link from "@comps/UI/button/link";
import Feedback, { FeedbackMode } from "@comps/UI/feedback";
import Input from "@comps/UI/input/input";
import InputPassword from "@comps/UI/inputPassword";
import { signIn } from "@lib/auth-client";
import { hasRole } from "@permissions/hasRole";
import { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginClient() {
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") ? (("/" + searchParams.get("redirect")) as Route) : undefined;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [message, setMessage] = useState<string>("");
    const [mode, setMode] = useState<FeedbackMode>("none");
    const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!email || !password) {
            setMessage("Veuillez remplir tous les champs.");
            setMode("warning");
            setIsFeedbackOpen(true);
            setIsLoading(false);
            return;
        }

        const { data, error } = await signIn.email({
            email,
            password,
        });

        if (data) {
            setMessage("Connexion réussie.");
            setMode("success");
            setIsFeedbackOpen(true);

            const isAuthorizedToDashboard = await hasRole(["VENDOR", "EMPLOYEE", "ADMIN"]);
            const redirectAccordingRole = isAuthorizedToDashboard ? "/dashboard" : "/profile";

            setTimeout(() => {
                router.push(redirect ?? redirectAccordingRole);
            }, 200);

            setTimeout(() => {
                setEmail("");
                setPassword("");
            }, 1000);
        } else if (error) {
            setMessage("Identifiants invalides.");
            setMode("error");
            setIsFeedbackOpen(true);
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-2">
                <h1 className="text-center text-2xl font-bold">Connexion</h1>
                <div className="text-center text-xs text-wrap text-gray-500">
                    Entrez vos informations personnelles pour vous connecter.
                </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4">
                <div className="w-full space-y-4">
                    <Input label="Email" type="email" setValue={setEmail} value={email} />
                    <InputPassword label="Mot de passe" setValue={setPassword} value={password} required={false} />
                </div>
                <div className="flex flex-col items-center gap-1">
                    <Link
                        className="rounded px-1 text-sm text-gray-500"
                        href="/forgot-password"
                        label="forgot-password"
                        variant="underline"
                    >
                        Mot de passe oublié ?
                    </Link>
                    <Link
                        className="rounded px-1 text-sm text-gray-500"
                        href="/auth?tab=register"
                        label="not-registered-yet"
                        variant="underline"
                    >
                        Pas encore inscrit ?
                    </Link>
                </div>
                <Feedback message={message} mode={mode} isFeedbackOpen={isFeedbackOpen} />
                <Button type="submit" label="login" isLoading={isLoading}>
                    Connexion
                </Button>
            </form>
        </>
    );
}
