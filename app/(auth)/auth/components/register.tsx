"use client";

import Button from "@comps/ui/Button";
import Feedback, { FeedbackMode } from "@comps/ui/Feedback";
import Input from "@comps/ui/Input";
import Link from "@comps/ui/Link";
import { signUp } from "@lib/authClient";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterClient() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [mode, setMode] = useState<FeedbackMode>("none");

    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toggleVisibility, setToggleVisibility] = useState(false);

    const router = useRouter();

    const handleSubmit = async () => {
        setIsLoading(true);

        if (!firstname || !lastname || !email || !password) {
            setMessage("Please fill all fields.");
            setMode("warning");
            setIsLoading(false);
            return;
        }

        const { data, error } = await signUp.email({
            name: firstname + " " + lastname,
            email,
            password,
            image: undefined,
        });

        if (data) {
            setMessage("Successfully registered.");
            setMode("success");

            setTimeout(() => {
                router.push("/profile");
            }, 2000);
        } else if (error) {
            setMessage("Failed to register.");
            setMode("error");
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-2">
                <h1 className="text-center text-2xl font-bold">S&apos;inscrire</h1>
                <div className="text-wrap text-center text-xs text-gray-500">
                    Entrez vos informations personnelles pour vous inscrire.
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-full space-y-4">
                    <Input
                        label="Prénom"
                        type="text"
                        onChange={(e) => setFirstname(e.target.value)}
                        value={firstname}
                    />
                    <Input
                        label="Nom"
                        type="text"
                        onChange={(e) => setLastname(e.target.value)}
                        value={lastname}
                    />
                    <Input label="Email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                    <div className="flex flex-row items-end gap-1.5">
                        <Input
                            label="Mot de passe"
                            type={toggleVisibility ? "text" : "password"}
                            classComponent="w-full"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <Button
                            type="button"
                            label="toggle-password-visibility"
                            className="p-2 hover:border-gray-300"
                            variant="outline"
                            baseStyleWithout={["padding", "font"]}
                            onClick={() => setToggleVisibility(!toggleVisibility)}
                        >
                            {toggleVisibility && <Eye className="size-5" />}
                            {!toggleVisibility && <EyeClosed className="size-5" />}
                        </Button>
                    </div>
                </div>
                <Link
                    href="/auth"
                    className="text-sm text-gray-500"
                    label="already-registered"
                    variant="underline"
                    baseStyleWithout={["padding", "font"]}
                >
                    Déjà inscrit?
                </Link>
                <Feedback message={message} mode={mode} />
                <Button type="button" onClick={handleSubmit} label="register" isLoading={isLoading}>
                    S&apos;inscrire
                </Button>
            </div>
        </>
    );
}
