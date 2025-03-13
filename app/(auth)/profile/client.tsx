"use client";

import ButtonClient from "@comps/client/Button";
import InputClient from "@comps/client/Input";
import ModalClient from "@comps/client/Modal";
import Card from "@comps/server/Card";
import {
    changeEmail,
    updateUser,
    useSession
} from "@lib/authClient";
import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
export default function ProfileClient() {
    const { data: session } = useSession();

    // const router = useRouter();

    const [modalVisible, setModalVisible] = useState<boolean>(false);
    // const [sessionList, setSessionList] = useState<SessionList[] | null>(null);
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState("");
    const [toggleVisibility, setToggleVisibility] = useState(false);

    // Fetch session list
    // const fetchSessions = async () => {
    //     const { data: getSessionList } = await listSessions();
    //     setSessionList(getSessionList as SessionList[] | null);
    // };

    // useEffect(() => {
    //     // Check if user has verified email
    //     if (session) {
    //         setModalVisible(!session?.user.emailVerified);
    //     }
    //     fetchSessions();
    // }, [session]);

    return (
        <>
            <ModalClient
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                className="max-w-[350px] space-y-3"
            >
                <h2 className="text-center text-xl font-bold">Confirmation d&apos;email</h2>
                <div className="text-sm">Veuillez vérifier votre adresse email.</div>
                <div className="flex flex-col items-center">
                    <ButtonClient type="button" label="close" onClick={() => setModalVisible(false)}>
                        Fermer
                    </ButtonClient>
                </div>
            </ModalClient>
            {/* <Card className="flex w-[280px] flex-col gap-3">
                <div className="space-y-1">
                    <div className="text-xl font-bold">Session List</div>
                    <div className="flex flex-row gap-1">
                        <ButtonClient
                            type="button"
                            className="w-1/2 text-sm"
                            label="revoke-others"
                            variant="outline"
                            padding="sm"
                            onClick={async () => {
                                setSessionList(null);
                                fetchSessions();
                                await revokeOtherSessions();
                            }}
                        >
                            Revoke others
                        </ButtonClient>
                        <ButtonClient
                            type="button"
                            className="w-1/2 text-sm hover:bg-red-500"
                            label="revoke-all"
                            padding="sm"
                            onClick={async () => {
                                router.push("/");
                                await revokeSessions();
                            }}
                        >
                            Revoke all
                        </ButtonClient>
                    </div>
                </div>
                {sessionList ? (
                    sessionList.map(({ id, token, userAgent }, index) => (
                        <div key={index}>
                            <div className="flex flex-row gap-2 text-xs">
                                <span className="font-bold">Session {index + 1}</span>
                                <span className="italic text-gray-500">{session?.session.id === id && "Current"}</span>
                            </div>
                            <div className="flex flex-row items-center justify-between gap-1">
                                <div className="line-clamp-1 text-sm text-gray-700">{userAgent}</div>
                                {session?.session.token !== token && (
                                    <ButtonClient
                                        type="button"
                                        variant="none"
                                        padding="none"
                                        className="p-0.5"
                                        label="revoke-current-session"
                                        onClick={async () => {
                                            setSessionList(sessionList.filter((session) => session.token !== token));
                                            await revokeSession({ token });
                                        }}
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
                        <span className="text-sm text-gray-500">Loading sessions...</span>
                    </div>
                )}
            </Card> */}
            <Card className="w-[300px] space-y-3 rounded-2xl p-6">
                <div className="text-xl font-bold">Modifer</div>
                <div className="text-wrap text-xs text-gray-500">
                    Mettre à jour vos informations personnelles.
                </div>
                <div className="flex flex-col items-center gap-2">
                    <InputClient
                        label="Nom"
                        type="text"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        placeholder={session?.user.name}
                    />
                    <ButtonClient
                        type="button"
                        label="Mettre à jour le nom"
                        padding="sm"
                        className="text-sm"
                        onClick={async () => await updateUser({ name })}
                    >
                        Changer le nom
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
                        label="Mettre à jour l'email"
                        padding="sm"
                        className="text-sm"
                        onClick={async () => await changeEmail({ newEmail: email })}
                    >
                        Changer l&apos;email
                    </ButtonClient>
                </div>
                <div className="flex flex-col items-center gap-2">
                    <div className="flex w-full flex-row items-end gap-1.5">
                        <InputClient
                            label="Mot de passe"
                            placeholder="Mon nouveau mot de passe"
                            classInput="w-full"
                            type={toggleVisibility ? "text" : "password"}
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                        />
                        <ButtonClient
                            type="button"
                            label="togglePasswordVisibility"
                            className="border border-gray-300 p-0.5"
                            variant="outline"
                            padding="none"
                            onClick={() => setToggleVisibility(!toggleVisibility)}
                        >
                            {toggleVisibility && <Eye className="size-5" />}
                            {!toggleVisibility && <EyeClosed className="size-5" />}
                        </ButtonClient>
                    </div>
                    <ButtonClient
                        type="button"
                        label="update-name"
                        padding="sm"
                        className="text-sm"
                        onClick={async () => {
                            // await changeEmail({ newEmail: email })
                        }}
                    >
                        Changer le mot de passe
                    </ButtonClient>
                </div>
            </Card>
        </>
    );
}
