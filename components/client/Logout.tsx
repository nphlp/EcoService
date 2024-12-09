"use client";

import ButtonClient, { ButtonClientProps } from "@comps/client/Button";
import { signOut } from "@lib/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

type LogoutClientProps = {
    className?: string;
    variant?: ButtonClientProps["variant"];
    padding?: ButtonClientProps["padding"];
};

export default function LogoutClient(props: LogoutClientProps) {
    const { variant, padding } = props;

    const [isLoading, setIsLoading] = useState(false);

    const router = useRouter();

    const handleClick = async () => {
        setIsLoading(true);
        const { data, error } = await signOut();

        if (data) {
            router.push("/");
        } else if (error) {
            console.log(data);
        }

        setIsLoading(false);
    };

    return (
        <ButtonClient
            type="button"
            variant={variant}
            label="Logout"
            padding={padding}
            isLoading={isLoading}
            onClick={handleClick}
        >
            Logout
        </ButtonClient>
    );
}
