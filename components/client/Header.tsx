"use client";

import { BetterSessionClient, useSession } from "@lib/client";
import { combo } from "@lib/combo";
import { Leaf } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ButtonClient from "./Button";

type Link = {
    title: string;
    label: string;
    href: string;
    sessionActive?: boolean; // true show when session is true, false show when session is false, undefined show always
};

export default function HeaderClient() {
    const { data: session } = useSession();

    const linkList: Link[] = [
        { title: "Home", label: "home", href: "/" },
        { title: "Examples", label: "examples", href: "/examples" },
        { title: "Catalogue", label: "catalogue", href: "/catalogue" },
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
            <header>
                <div className="md:hidden">
                    <MobileHeader linkList={linkList} session={session} />
                </div>
                <div className="bg-white text-center max-md:hidden">
                    <BrowserHeader linkList={linkList} session={session} />
                </div>
            </header>
        </>
    );
}

type BrowserHeaderProps = {
    linkList: Link[];
    session: BetterSessionClient | null;
};

const BrowserHeader = (props: BrowserHeaderProps) => {
    const { linkList, session } = props;

    const path = usePathname();

    return (
        <>
            <nav className="flex flex-row items-center justify-center gap-5 py-4">
                {linkList.map(
                    ({ sessionActive, href, label, title }, index) =>
                        (sessionActive === undefined ||
                            (sessionActive && session) ||
                            (!sessionActive && !session)) && (
                            <ButtonClient
                                key={index}
                                type="link"
                                // pageTransition={href === "/" ? true : false}
                                href={href}
                                label={label}
                                ring={false}
                                variant="ghost"
                                className={combo(
                                    "px-8",
                                    path === href && "font-bold",
                                )}
                            >
                                {title}
                            </ButtonClient>
                        ),
                )}
            </nav>
        </>
    );
};

type MobileHeaderProps = {
    linkList: Link[];
    session: BetterSessionClient | null;
};

const MobileHeader = (props: MobileHeaderProps) => {
    const { linkList, session } = props;

    const [visibilityMenu, setVisibilityMenu] = useState<boolean>(false);

    return (
        <>
            <ButtonClient
                type="button"
                label="show-menu"
                variant="none"
                padding="none"
                className={combo(
                    "absolute bottom-5 right-5 z-50 rounded-full border-2 border-gray-500 bg-white p-3 shadow-md",
                    visibilityMenu && "hidden",
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
                    !visibilityMenu && "hidden",
                )}
                onClick={() => setVisibilityMenu(false)}
            >
                {""}
            </ButtonClient>
            <nav
                className={combo(
                    "absolute bottom-0 left-0 z-50 w-full px-4 pb-4",
                    !visibilityMenu && "hidden",
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
                            ),
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
        </>
    );
};
