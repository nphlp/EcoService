import { BetterSessionClient } from "@lib/client";
import { useState } from "react";
import ButtonClient from "../Button";
import LogoutClient from "../Logout";
import { Leaf } from "lucide-react";
import { combo } from "@lib/combo";


type MobileHeaderProps = {
    session: BetterSessionClient | null;
};

export default function MobileHeader(props: MobileHeaderProps) {
    const { session } = props;

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
                    <ButtonClient
                        type="link"
                        href="/"
                        label="home"
                        variant="outline"
                        className="w-full"
                        onClick={() => setVisibilityMenu(false)}
                    >
                        Home
                    </ButtonClient>
                    <ButtonClient
                        type="link"
                        href="/catalogue"
                        label="catalogue"
                        variant="outline"
                        className="w-full"
                        onClick={() => setVisibilityMenu(false)}
                    >
                        Catalogue
                    </ButtonClient>
                    {!session && (
                        <>
                            <ButtonClient
                                type="link"
                                href="/register"
                                label="register"
                                variant="outline"
                                className="w-full"
                                onClick={() => setVisibilityMenu(false)}
                            >
                                Catalogue
                            </ButtonClient>
                            <ButtonClient
                                type="link"
                                href="/login"
                                label="login"
                                variant="outline"
                                className="w-full"
                                onClick={() => setVisibilityMenu(false)}
                            >
                                Login
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
                                className="w-full"
                                onClick={() => setVisibilityMenu(false)}
                            >
                                Profile
                            </ButtonClient>
                            <LogoutClient
                                variant="outline"
                                onClick={() => setVisibilityMenu(false)}
                                className="w-full"
                            />
                        </>
                    )}

                    {/* Close button */}
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