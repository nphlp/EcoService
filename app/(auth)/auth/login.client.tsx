"use client";

import Button from "@comps/ui/Button";
import FeedbackClient, { FeedbackMode } from "@comps/ui/Feedback";
import Input from "@comps/ui/Input";
import Link from "@comps/ui/Link";
import { signIn } from "@lib/authClient";
import { isVendorOrEmployeeOrAdmin } from "@lib/checkRole";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginClient() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<string>("");
    const [mode, setMode] = useState<FeedbackMode>("none");

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [toggleVisibility, setToggleVisibility] = useState(false);

    const router = useRouter();

    const handleSubmit = async () => {
        setIsLoading(true);

        if (!email || !password) {
            setMessage("Please fill all fields.");
            setMode("warning");
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

            const isAuthorizedToDashboard = await isVendorOrEmployeeOrAdmin();  
            const redirectPath = isAuthorizedToDashboard ? "/dashboard" : "/profile";

            setTimeout(() => {
                router.push(redirectPath);
            }, 1000);
        } else if (error) {
            setMessage("Failed to login, invalid credentials.");
            setMode("error");
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="space-y-2">
                <h1 className="text-center text-2xl font-bold">Connexion</h1>
                <div className="text-wrap text-center text-xs text-gray-500">
                    Entrez vos informations personnelles pour vous connecter.
                </div>
            </div>
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-full space-y-4">
                    <Input
                        label="Email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                    />
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
                            className="p-2"
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
                    className="text-sm text-gray-500"
                    href="/auth"
                    label="not-registered-yet"
                    variant="underline"
                    baseStyleWithout={["padding", "font"]}
                >
                    Pas encore inscrit ?
                </Link>
                <FeedbackClient message={message} mode={mode} />
                <Button type="button" onClick={handleSubmit} label="login" isLoading={isLoading}>
                    Connexion
                </Button>
            </div>
        </>
    );
}
