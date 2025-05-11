"use client";

import { UpdateUser } from "@actions/UserAction";
import Button from "@comps/ui/button";
import Feedback, { FeedbackMode } from "@comps/ui/feedback";
import Input from "@comps/ui/input";
import InputPassword from "@comps/ui/inputPassword";
import Link from "@comps/ui/link";
import { signUp } from "@lib/authClient";
import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";

export default function RegisterClient() {
    const searchParams = useSearchParams();
    const redirect = searchParams.get("redirect") ? "/" + searchParams.get("redirect") : null;

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
            setMessage("Please fill all fields.");
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
                const userData = await UpdateUser({
                    where: { id: data.user.id },
                    data: {
                        lastname,
                    },
                });

                if (userData) {
                    setMessage("Successfully registered.");
                    setMode("success");
                    setIsFeedbackOpen(true);

                    // Redirect to profile page
                    setTimeout(() => {
                        router.push(redirect ?? "/profile");
                    }, 2000);
                } else {
                    throw new Error("Something went wrong.");
                }
            } else {
                throw new Error("Failed to register.");
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
                    <Input
                        label="Prénom"
                        type="text"
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstname}
                    />
                    <Input label="Nom" type="text" onChange={(e) => setLastname(e.target.value)} value={lastname} />
                    <Input label="Email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <InputPassword
                        label="Mot de passe"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        required={false}
                    />
                </div>
                <Link
                    href="/auth"
                    className="rounded px-1 text-sm text-gray-500"
                    label="already-registered"
                    variant="underline"
                    baseStyleWithout={["padding", "font", "rounded"]}
                >
                    Déjà inscrit?
                </Link>
                <Feedback message={message} mode={mode} isFeedbackOpen={isFeedbackOpen} />
                <Button type="button" onClick={handleSubmit} label="register" isLoading={isLoading}>
                    S&apos;inscrire
                </Button>
            </form>
        </>
    );
}
