"use client";

import ImageProfile from "@comps/UI/imageProfile";
import { BetterSessionClient, useSession } from "@lib/authClient";
import { CircleCheck, CircleX } from "lucide-react";

type ProfileInfoProps = {
    session: NonNullable<BetterSessionClient>;
};

export default function ProfileInfo(props: ProfileInfoProps) {
    const { session: serverSession } = props;
    const { data: clientSession } = useSession();

    // SSR session
    const session = clientSession ?? serverSession;

    return (
        <div className="flex flex-row items-center gap-5">
            <ImageProfile
                imageBase64={session.user.image ?? null}
                name={session.user.name}
                className="size-16"
                classTemplate="stroke-[1.2px]"
            />
            <div>
                <div className="text-md font-bold text-gray-700">
                    <span>{session.user.name}</span>
                    <span> </span>
                    <span>{session.user.lastname}</span>
                </div>
                <div className="line-clamp-1 flex flex-row items-center gap-1 text-sm text-gray-700">
                    <div>{session.user.email}</div>
                    <div>
                        {session.user.emailVerified ? (
                            <CircleCheck className="size-4 stroke-green-400" />
                        ) : (
                            <CircleX className="size-4 stroke-red-400" />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
