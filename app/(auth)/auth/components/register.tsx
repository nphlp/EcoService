"use client";

import Button from "@comps/UI/button/button";
import Link from "@comps/UI/button/link";
import Feedback, { FeedbackMode } from "@comps/UI/feedback";
import Input from "@comps/UI/input/input";
import InputPassword from "@comps/UI/inputPassword";
import { signUp } from "@lib/auth-client";
import { UpdateLastnameProcess } from "@process/ProfileUpdate";
import { Route } from "next";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RegisterClient() {
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") ? (("/" + searchParams.get("redirect")) as Route) : undefined;

    const [isLoading, setIsLoading] = useState<boolean>(false);

    const [message, setMessage] = useState<string>("");
    const [mode, setMode] = useState<FeedbackMode>("none");
    const [isFeedbackOpen, setIsFeedbackOpen] = useState<boolean>(false);

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        if (!firstname || !lastname || !email || !password) {
            setMessage("Veuillez remplir tous les champs.");
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

        try {
            const { data } = await signUp.email({
                name: firstname,
                email,
                password,
                image: undefined,
            });

            if (data) {
                const userData = await UpdateLastnameProcess({ lastname });

                if (userData) {
                    setMessage("Inscription réussie.");
                    setMode("success");
                    setIsFeedbackOpen(true);

                    setTimeout(() => {
                        router.push(redirect ?? "/profile");
                    }, 200);

                    setTimeout(() => {
                        setFirstname("");
                        setLastname("");
                        setEmail("");
                        setPassword("");
                    }, 1000);
                } else {
                    throw new Error("Une erreur est survenue.");
                }
            } else {
                throw new Error("Échec de l'inscription.");
            }
        } catch (error) {
            setMessage((error as Error).message);
            setMode("error");
            setIsFeedbackOpen(true);
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-2">
                <h1 className="text-center text-2xl font-bold">S&apos;inscrire</h1>
                <div className="text-center text-xs text-wrap text-gray-500">
                    Entrez vos informations personnelles pour vous inscrire.
                </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col items-center justify-center gap-4">
                <div className="w-full space-y-4">
                    <Input label="Prénom" type="text" setValue={setFirstname} value={firstname} />
                    <Input label="Nom" type="text" setValue={setLastname} value={lastname} />
                    <Input label="Email" type="email" setValue={setEmail} value={email} />
                    <InputPassword label="Mot de passe" setValue={setPassword} value={password} required={false} />
                </div>
                <Link
                    href="/auth"
                    className="rounded px-1 text-sm text-gray-500"
                    label="already-registered"
                    variant="underline"
                >
                    Déjà inscrit?
                </Link>
                <Feedback message={message} mode={mode} isFeedbackOpen={isFeedbackOpen} />
                <Button type="button" label="register" onClick={handleSubmit} isLoading={isLoading}>
                    S&apos;inscrire
                </Button>
            </form>
        </>
    );
}
