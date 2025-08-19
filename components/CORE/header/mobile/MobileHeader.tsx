"use client";

import Button from "@comps/UI/button";
import Link from "@comps/UI/link";
import LogoutClient from "@comps/UI/logout";
import { useSession } from "@lib/authClient";
import { combo } from "@lib/combo";
import { Leaf } from "lucide-react";
import { useState } from "react";

type MobileHeaderProps = {
    className?: string;
};

export default function MobileHeader(props: MobileHeaderProps) {
    const { className } = props;
    const { data: session } = useSession();

    const [visibilityMenu, setVisibilityMenu] = useState<boolean>(false);

    const buttonClass = "w-full py-2";

    return (
        <div className={className}>
            <Button
                type="button"
                label="show-menu"
                variant="none"
                className={combo(
                    "absolute right-5 bottom-5 z-50 rounded-full border border-gray-500 bg-white p-3 shadow-md",
                    visibilityMenu && "hidden",
                )}
                onClick={() => setVisibilityMenu(true)}
            >
                <Leaf />
            </Button>
            <Button
                type="button"
                label="cancel-menu"
                variant="none"
                className={combo("absolute inset-0 z-40 rounded-none bg-black opacity-10", !visibilityMenu && "hidden")}
                onClick={() => setVisibilityMenu(false)}
            >
                {""}
            </Button>
            <nav className={combo("absolute bottom-0 left-0 z-50 w-full px-4 pb-4", !visibilityMenu && "hidden")}>
                <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white p-4 shadow-md">
                    <Link
                        href="/"
                        label="home"
                        variant="outline"
                        className={combo(buttonClass)}
                        onClick={() => setVisibilityMenu(false)}
                    >
                        Accueil
                    </Link>
                    <Link
                        href="/catalog"
                        label="catalog"
                        variant="outline"
                        className={combo(buttonClass)}
                        onClick={() => setVisibilityMenu(false)}
                    >
                        Catalogue
                    </Link>
                    <Link
                        href="/article"
                        label="articles"
                        variant="outline"
                        className={combo(buttonClass)}
                        onClick={() => setVisibilityMenu(false)}
                    >
                        Articles
                    </Link>
                    <Link
                        href="/diy"
                        label="diy"
                        variant="outline"
                        className={combo(buttonClass)}
                        onClick={() => setVisibilityMenu(false)}
                    >
                        DIY
                    </Link>
                    <Link
                        href="/examples"
                        label="examples"
                        variant="outline"
                        className={combo(buttonClass)}
                        onClick={() => setVisibilityMenu(false)}
                    >
                        Exemples
                    </Link>
                    {!session && (
                        <>
                            <Link
                                href="/auth"
                                label="auth"
                                variant="outline"
                                className={combo(buttonClass)}
                                onClick={() => setVisibilityMenu(false)}
                            >
                                Authentification
                            </Link>
                        </>
                    )}
                    {session && (
                        <>
                            <Link
                                href="/profile"
                                label="profile"
                                variant="outline"
                                className={combo(buttonClass)}
                                onClick={() => setVisibilityMenu(false)}
                            >
                                Profile
                            </Link>
                            <LogoutClient
                                variant="outline"
                                onClick={() => setVisibilityMenu(false)}
                                className={combo(buttonClass)}
                            >
                                Déconnexion
                            </LogoutClient>
                        </>
                    )}

                    {/* Close button */}
                    <Button
                        className={combo(buttonClass)}
                        type="button"
                        label="hide-menu"
                        variant="default"
                        onClick={() => setVisibilityMenu(false)}
                    >
                        Fermer
                    </Button>
                </div>
            </nav>
        </div>
    );
}
