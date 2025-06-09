"use client";

import Button from "@comps/ui/button";
import Feedback, { FeedbackMode } from "@comps/ui/feedback";
import Input from "@comps/ui/input";
import InputPassword from "@comps/ui/inputPassword";
import Link from "@comps/ui/link";
import { signIn } from "@lib/authClient";
import { hasRole } from "@lib/checkRole";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function LoginClient() {
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") ? "/" + searchParams.get("redirect") : null;

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
            setMessage("Please fill all fields.");
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
            setMessage("Successfully logged in.");
            setMode("success");
            setIsFeedbackOpen(true);
            const isAuthorizedToDashboard = await hasRole(["VENDOR", "EMPLOYEE", "ADMIN"]);
            const redirectAccordingRole = isAuthorizedToDashboard ? "/dashboard" : "/profile";

            setTimeout(() => {
                router.push(redirect ?? redirectAccordingRole);
            }, 1000);
        } else if (error) {
            setMessage("Failed to login, invalid credentials.");
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
                    <Input label="Email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <InputPassword
                        label="Mot de passe"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required={false}
                    />
                </div>
                <Link
                    className="rounded px-1 text-sm text-gray-500"
                    href="/auth?tab=register"
                    label="not-registered-yet"
                    variant="underline"
                    baseStyleWithout={["padding", "font", "rounded"]}
                >
                    Pas encore inscrit ?
                </Link>
                <Feedback message={message} mode={mode} isFeedbackOpen={isFeedbackOpen} />
                <Button type="submit" label="login" isLoading={isLoading}>
                    Connexion
                </Button>
            </form>
        </>
    );
}
