"use client";

import { useSession } from "@lib/authClient";
import { combo } from "@lib/combo";
import { Leaf } from "lucide-react";
import { useState } from "react";
import ButtonClient from "@comps/client/button";
import LogoutClient from "@comps/client/logout";

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
            <ButtonClient
                type="button"
                label="show-menu"
                variant="none"
                padding="none"
                className={combo(
                    "absolute right-5 bottom-5 z-50 rounded-full border border-gray-500 bg-white p-3 shadow-md",
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
                className={combo("absolute inset-0 z-40 rounded-none bg-black opacity-10", !visibilityMenu && "hidden")}
                onClick={() => setVisibilityMenu(false)}
            >
                {""}
            </ButtonClient>
            <nav className={combo("absolute bottom-0 left-0 z-50 w-full px-4 pb-4", !visibilityMenu && "hidden")}>
                <div className="flex w-full flex-col items-center justify-center gap-2 rounded-2xl border border-gray-300 bg-white p-4 shadow-md">
                    <ButtonClient
                        type="link"
                        href="/"
                        label="home"
                        variant="outline"
                        className={combo(buttonClass)}
                        onClick={() => setVisibilityMenu(false)}
                    >
                        Accueil
                    </ButtonClient>
                    <ButtonClient
                        type="link"
                        href="/catalog"
                        label="catalog"
                        variant="outline"
                        className={combo(buttonClass)}
                        onClick={() => setVisibilityMenu(false)}
                    >
                        Catalogue
                    </ButtonClient>
                    <ButtonClient
                        type="link"
                        href="/article"
                        label="articles"
                        variant="outline"
                        className={combo(buttonClass)}
                        onClick={() => setVisibilityMenu(false)}
                    >
                        Articles
                    </ButtonClient>
                    <ButtonClient
                        type="link"
                        href="/diy"
                        label="diy"
                        variant="outline"
                        className={combo(buttonClass)}
                        onClick={() => setVisibilityMenu(false)}
                    >
                        DIY
                    </ButtonClient>
                    <ButtonClient
                        type="link"
                        href="/examples"
                        label="examples"
                        variant="outline"
                        className={combo(buttonClass)}
                        onClick={() => setVisibilityMenu(false)}
                    >
                        Exemples
                    </ButtonClient>
                    {!session && (
                        <>
                            <ButtonClient
                                type="link"
                                href="/auth"
                                label="auth"
                                variant="outline"
                                className={combo(buttonClass)}
                                onClick={() => setVisibilityMenu(false)}
                            >
                                Authentification
                            </ButtonClient>
                        </>
                    )}
                    {session && (
                        <>
                            <ButtonClient
                                type="link"
                                href="/profile"
                                label="profile"
                                variant="outline"
                                className={combo(buttonClass)}
                                onClick={() => setVisibilityMenu(false)}
                            >
                                Profile
                            </ButtonClient>
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
                    <ButtonClient
                        className={combo(buttonClass)}
                        type="button"
                        label="hide-menu"
                        variant="default"
                        onClick={() => setVisibilityMenu(false)}
                    >
                        Fermer
                    </ButtonClient>
                </div>
            </nav>
        </div>
    );
}
