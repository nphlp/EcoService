"use client";

import ButtonClient from "./Button";
import { useSession } from "@lib/client";
import { Leaf } from "lucide-react";
import { useState } from "react";
import { combo } from "@lib/combo";
import { usePathname } from "next/navigation";

export default function HeaderClient() {
    const [visibilityMenu, setVisibilityMenu] = useState<boolean>(false);

    const { data: session } = useSession();

    const path = usePathname();

    type Link = {
        title: string;
        label: string;
        href: string;
        sessionActive?: boolean; // true show when session is true, false show when session is false, undefined show always
    };

    const linkList: Link[] = [
        { title: "Home", label: "home", href: "/" },
        { title: "Examples", label: "examples", href: "/examples" },
        {
            title: "Register",
            label: "register",
            href: "/register",
            sessionActive: false,
        },
        {
            title: "Login",
            label: "login",
            href: "/login",
            sessionActive: false,
        },
        {
            title: "Profile",
            label: "profile",
            href: "/profile",
            sessionActive: true,
        },
    ];

    return (
        <>
            {/* Mobile */}
            <header className="md:hidden">
                <ButtonClient
                    type="button"
                    label="show-menu"
                    variant="none"
                    padding="none"
                    className={combo(
                        "absolute bottom-5 right-5 z-50 rounded-full border-2 border-gray-500 bg-white p-3 shadow-md",
                        visibilityMenu && "hidden"
                    )}
                    onClick={() => setVisibilityMenu(true)}
                >
                    <Leaf />
                </ButtonClient>
                <ButtonClient
                    type="button"
                    label="cancel-menu"
                    variant="none"
                    padding="none"
                    ring={false}
                    className={combo(
                        "absolute inset-0 z-40 rounded-none bg-black opacity-10",
                        !visibilityMenu && "hidden"
                    )}
                    onClick={() => setVisibilityMenu(false)}
                >
                    {""}
                </ButtonClient>
                <nav
                    className={combo(
                        "absolute bottom-0 left-0 z-50 w-full px-4 pb-4",
                        !visibilityMenu && "hidden"
                    )}
                >
                    <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border-[1.5px] border-gray-300 bg-white p-4 shadow-md">
                        {linkList.map(
                            ({ sessionActive, href, label, title }, index) =>
                                (sessionActive === undefined ||
                                    (sessionActive && session) ||
                                    (!sessionActive && !session)) && (
                                    <ButtonClient
                                        key={index}
                                        type="link"
                                        href={href}
                                        label={label}
                                        variant="outline"
                                        className="w-full"
                                        onClick={() => setVisibilityMenu(false)}
                                    >
                                        {title}
                                    </ButtonClient>
                                )
                        )}
                        <ButtonClient
                            className="w-full"
                            type="button"
                            label="hide-menu"
                            variant="default"
                            onClick={() => setVisibilityMenu(false)}
                        >
                            Close
                        </ButtonClient>
                    </div>
                </nav>
            </header>

            {/* Desktop */}
            <header className="max-md:hidden">
                <nav className="flex flex-row gap-5 pt-4">
                    {linkList.map(
                        ({ sessionActive, href, label, title }, index) =>
                            (sessionActive === undefined ||
                                (sessionActive && session) ||
                                (!sessionActive && !session)) && (
                                <ButtonClient
                                    key={index}
                                    type="link"
                                    href={href}
                                    label={label}
                                    ring={false}
                                    variant="ghost"
                                    className={combo(
                                        "px-8",
                                        path === href && "font-bold"
                                    )}
                                >
                                    {title}
                                </ButtonClient>
                            )
                    )}
                </nav>
            </header>
        </>
    );
}
