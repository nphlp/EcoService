"use client";

import { useBasketStore } from "@comps/CORE/basket/basketStore";
import Button, { ButtonProps } from "@comps/UI/button/button";
import Loader from "@comps/UI/loader";
import { signOut } from "@lib/authClient";
import { useRouter } from "next/navigation";
import { ReactNode, useState } from "react";

type LogoutProps = {
    children: ReactNode;
    onClick?: () => void;
} & Omit<ButtonProps, "onClick" | "label" | "children">;

export default function Logout(props: LogoutProps) {
    const { children, onClick, ...others } = props;

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const { clearLocalBasket } = useBasketStore();

    const handleClick = async () => {
        setIsLoading(true);

        onClick?.();

        const { data } = await signOut();

        // Delete basket cookie
        clearLocalBasket();

        if (data) {
            router.push("/");
        } else {
            throw new Error("Something went wrong...");
        }
    };

    return (
        <Button label="logout" onClick={handleClick} {...others}>
            {isLoading ? <Loader /> : children}
        </Button>
    );
}
