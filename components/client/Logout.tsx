"use client";

import ButtonClient, { ButtonClientProps } from "@comps/client/Button";
import { signOut } from "@lib/client";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes } from "react";

type ButtonType = Exclude<ButtonHTMLAttributes<HTMLButtonElement>["type"], undefined>;

type LogoutClientProps = {
    onClick?: () => void;
} & Omit<Extract<ButtonClientProps, { type: ButtonType }>, "onClick" | "type" | "label" | "children">;

export default function LogoutClient(props: LogoutClientProps) {
    const { onClick, ...others } = props;

    const router = useRouter();

    const handleClick = async () => {
        const { data } = await signOut();

        if (data) {
            router.push("/");
        } else {
            throw new Error("Something went wrong...");
        }

        onClick?.();
    };
    return (
        <ButtonClient type="button" label="logout" onClick={handleClick} {...others}>
            Logout
        </ButtonClient>
    );
}
