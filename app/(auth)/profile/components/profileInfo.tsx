"use client";

import Button from "@comps/UI/button/button";
import ImageProfile from "@comps/UI/imageProfile";
import { SessionClient, sendVerificationEmail, useSession } from "@lib/auth-client";
import { CircleCheck, CircleX, Mail } from "lucide-react";
import { useState } from "react";

type ProfileInfoProps = {
    session: NonNullable<SessionClient>;
};

export default function ProfileInfo(props: ProfileInfoProps) {
    const { session: serverSession } = props;
    const { data: clientSession } = useSession();
    const [isLoading, setIsLoading] = useState(false);

    // SSR session
    const session = clientSession ?? serverSession;

    const handleResend = async () => {
        setIsLoading(true);
        await sendVerificationEmail({ email: session.user.email });
        setIsLoading(false);
    };

    const isVerified = session.user.emailVerified;

    return (
        <div className="flex flex-row items-center gap-5">
            <ImageProfile
                imageBase64={session.user.image ?? null}
                name={session.user.name}
                className="size-16"
                classTemplate="stroke-[1.2px]"
            />
            <div className="flex flex-1 items-center justify-between gap-4">
                <div>
                    <div className="text-md font-bold text-gray-700">
                        <span>{session.user.name}</span>
                        <span> </span>
                        <span>{session.user.lastname}</span>
                    </div>
                    <div className="line-clamp-1 flex flex-row items-center gap-1 text-sm text-gray-700">
                        <div>{session.user.email}</div>
                        <div>
                            {isVerified ? (
                                <CircleCheck className="size-4 stroke-green-400" />
                            ) : (
                                <CircleX className="size-4 stroke-red-400" />
                            )}
                        </div>
                    </div>
                </div>
                {!isVerified && (
                    <Button
                        label="Renvoyer l'email de vérification"
                        variant="outline"
                        isLoading={isLoading}
                        loadingLabel="Envoi..."
                        onClick={handleResend}
                        className={{ button: "text-sm" }}
                    >
                        <span>Renvoyer</span>
                        <Mail className="size-4" />
                    </Button>
                )}
            </div>
        </div>
    );
}
