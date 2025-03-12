"use client";

import ButtonClient, { ButtonClientProps } from "@comps/client/Button";
import Loader from "@comps/server/Loader";
import { signOut } from "@lib/authClient";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, ReactNode, useState } from "react";

type ButtonType = Exclude<ButtonHTMLAttributes<HTMLButtonElement>["type"], undefined>;

type LogoutClientProps = {
    children: ReactNode;
    onClick?: () => void;
} & Omit<Extract<ButtonClientProps, { type: ButtonType }>, "onClick" | "type" | "label" | "children">;

export default function LogoutClient(props: LogoutClientProps) {
    const { children, onClick, ...others } = props;

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    
    const handleClick = async () => {
        setIsLoading(true)
        
        onClick?.();
        
        const { data } = await signOut();

        if (data) {
            router.push("/");
        } else {
            throw new Error("Something went wrong...");
        }
    };

    return (
        <ButtonClient type="button" label="logout" onClick={handleClick} {...others}>
            {isLoading ? <Loader /> : children}
        </ButtonClient>
    );
}
