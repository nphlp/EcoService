"use client";

import ButtonClient from "@comps/client/Button";
import FeedbackClient, { FeedbackProps } from "@comps/server/Feedback";
import InputClient from "@comps/client/Input";
import { signIn } from "@lib/client";
import { Eye, EyeClosed } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginClient() {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [message, setMessage] = useState<FeedbackProps["message"]>("");
    const [mode, setMode] = useState<FeedbackProps["mode"]>("");

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
            router.push("/profile");
        } else if (error) {
            setMessage("Failed to login, invalid credentials.");
            setMode("error");
        }

        setIsLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center gap-4">
            <div className="space-y-2">
                <InputClient label="email" type="email" onChange={(e) => setEmail(e.target.value)} value={email} />
                <div className="flex flex-row items-end gap-1.5">
                    <InputClient
                        label="password"
                        type={toggleVisibility ? "text" : "password"}
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                    />
                    <ButtonClient
                        type="button"
                        label="toggle-password-visibility"
                        className="border border-gray-300 p-0.5"
                        variant="outline"
                        padding="none"
                        onClick={() => setToggleVisibility(!toggleVisibility)}
                    >
                        {toggleVisibility && <Eye className="size-5" />}
                        {!toggleVisibility && <EyeClosed className="size-5" />}
                    </ButtonClient>
                </div>
            </div>
            <ButtonClient
                type="link"
                className="text-sm text-gray-500"
                href="/register"
                label="not-registered-yet"
                variant="underline"
                padding="sm"
            >
                Not registered yet?
            </ButtonClient>
            <FeedbackClient message={message} mode={mode} />
            <ButtonClient type="button" onClick={handleSubmit} label="login" isLoading={isLoading}>
                Login
            </ButtonClient>
        </div>
    );
}
