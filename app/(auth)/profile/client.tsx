"use client";

import ButtonClient from "@comps/client/Button";
import InputClient from "@comps/client/Input";
import ModalClient from "@comps/client/Modal";
import Card from "@comps/server/Card";
import Loader from "@comps/server/Loader";
import {
    updateUser,
    changeEmail,
    listSessions,
    revokeOtherSessions,
    revokeSession,
    revokeSessions,
    useSession,
    SessionList,
} from "@lib/client";
import { CircleX, Eye, EyeClosed } from "lucide-react";
import { useEffect, useState } from "react";

export default function ProfileClient() {
    const { data: session } = useSession();

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [sessionList, setSessionList] = useState<SessionList[] | null>(null);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState("");
    const [toggleVisibility, setToggleVisibility] = useState(false);

    useEffect(() => {
        // Check if user has verified email
        if (session) {
            setModalVisible(!session?.user.emailVerified);
        }

        // Fetch session list
        const fetchSessions = async () => {
            const { data: getSessionList } = await listSessions();
            setSessionList(getSessionList as SessionList[] | null);
        };
        fetchSessions();
    }, [session]);

    return (
        <>
            <ModalClient
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                className="max-w-[350px] space-y-3"
            >
                <h2 className="text-center text-xl font-bold">
                    Email confirmation
                </h2>
                <div className="text-sm">
                    Please, make sure you have confirmed your email address.
                </div>
                <div className="flex flex-col items-center">
                    <ButtonClient
                        type="button"
                        label="close"
                        onClick={() => setModalVisible(false)}
                    >
                        Close
                    </ButtonClient>
                </div>
            </ModalClient>
            <Card className="flex w-[280px] flex-col gap-3">
                {/* TODO : ajuster les comportements lorsqu'une session est supprimée */}
                <div className="space-y-1">
                    <div className="text-xl font-bold">Session List</div>
                    <div className="flex flex-row gap-1">
                        <ButtonClient
                            type="button"
                            className="w-1/2 text-sm"
                            label="revoke-others"
                            variant="outline"
                            padding="sm"
                            onClick={async () => await revokeOtherSessions()}
                        >
                            Revoke others
                        </ButtonClient>
                        <ButtonClient
                            type="button"
                            className="w-1/2 text-sm hover:bg-red-500"
                            label="revoke-all"
                            padding="sm"
                            onClick={async () => await revokeSessions()}
                        >
                            Revoke all
                        </ButtonClient>
                    </div>
                </div>
                {sessionList ? (
                    sessionList.map(({ id,token, userAgent }, index) => (
                        <div key={index}>
                            <div className="flex flex-row gap-2 text-xs">
                                <span className="font-bold">
                                    Session {index + 1}
                                </span>
                                <span className="italic text-gray-500">
                                    {session?.session.id === id && "Current"}
                                </span>
                            </div>
                            <div className="flex flex-row items-center justify-between gap-1">
                                <div className="line-clamp-1 text-sm text-gray-700">
                                    {userAgent}
                                </div>
                                {session?.session.token !== token && (
                                    <ButtonClient
                                        type="button"
                                        variant="none"
                                        padding="none"
                                        className="p-0.5"
                                        label="revoke-current-session"
                                        onClick={async () =>
                                            await revokeSession({ token })
                                        }
                                    >
                                        <CircleX className="size-5 stroke-gray-600 transition-all duration-150 hover:stroke-red-600" />
                                    </ButtonClient>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex h-full flex-row items-center justify-center gap-2">
                        <Loader />
                        <span className="text-sm text-gray-500">
                            Loading sessions...
                        </span>
                    </div>
                )}
            </Card>
            <Card className="w-[280px] space-y-3">
                <div className="text-xl font-bold">Update profile</div>
                <div className="flex flex-col items-center gap-2">
                    <InputClient
                        label="Name"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder={session?.user.name}
                    />
                    <ButtonClient
                        type="button"
                        label="update-name"
                        padding="sm"
                        onClick={async () => await updateUser({ name })}
                    >
                        Update name
                    </ButtonClient>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <InputClient
                        label="Email"
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        value={email}
                        placeholder={session?.user.email}
                    />
                    <ButtonClient
                        type="button"
                        label="update-name"
                        padding="sm"
                        onClick={async () =>
                            await changeEmail({ newEmail: email })
                        }
                    >
                        Update email
                    </ButtonClient>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="flex flex-row items-end gap-1.5">
                        <InputClient
                            label="password"
                            type={toggleVisibility ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <ButtonClient
                            type="button"
                            label="togglePasswordVisibility"
                            className="border-[1.5px] border-gray-300 p-0.5"
                            variant="outline"
                            padding="none"
                            onClick={() =>
                                setToggleVisibility(!toggleVisibility)
                            }
                        >
                            {toggleVisibility && <Eye className="size-5" />}
                            {!toggleVisibility && (
                                <EyeClosed className="size-5" />
                            )}
                        </ButtonClient>
                    </div>
                    <ButtonClient
                        type="button"
                        label="update-name"
                        padding="sm"
                        onClick={async () => {
                            // await changeEmail({ newEmail: email })
                        }}
                    >
                        Update password
                    </ButtonClient>
                </div>
            </Card>
        </>
    );
}
