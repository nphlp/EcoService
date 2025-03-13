import LogoutClient from "@comps/client/Logout";
import Card from "@comps/server/Card";
import { GetSession } from "@lib/auth";
import { CircleCheck, CircleX, LogOut } from "lucide-react";
import { redirect } from "next/navigation";
import ProfileClient from "./client";

export const dynamic = "force-dynamic";

export default async function Page() {
    const session = await GetSession();
    if (!session) {
        redirect("/login");
    }

    const expirationDate = new Date(session.session.expiresAt);
    const expirationFormatted = expirationDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

    return (
        <div className="flex flex-1 flex-col items-center justify-center bg-gray-100 p-6">
            <div className="flex flex-col gap-5 md:flex-row">
                <Card className="flex w-[300px] flex-col gap-3 rounded-2xl p-6">
                    <h1 className="text-xl font-bold">Profil</h1>
                    <div className="text-wrap text-xs text-gray-500">
                        Consulter vos informations personnelles.
                    </div>
                    <div className="space-y-2">
                        <div>
                            <div className="text-xs font-bold">Nom</div>
                            <div className="text-sm text-gray-700">{session.user.name}</div>
                        </div>
                        <div>
                            <div className="text-xs font-bold">Email</div>
                            <div className="line-clamp-1 text-sm text-gray-700">{session.user.email}</div>
                        </div>
                        <div>
                            <div className="text-xs font-bold">Vérifié</div>
                            <div className="flex flex-row items-center gap-1 text-sm text-gray-700">
                                {session.user.emailVerified ? (
                                    <>
                                        <CircleCheck className="size-4 stroke-green-400" />
                                        <span className="font-bold text-green-400">Oui</span>
                                    </>
                                ) : (
                                    <>
                                        <CircleX className="size-4 stroke-red-400" />
                                        <span className="font-bold text-red-400">Non</span>
                                    </>
                                )}
                            </div>
                        </div>
                        {/* <div>
                            <div className="text-xs font-bold">Image</div>
                            <div className="text-sm text-gray-700">{session.user.image ?? "null"}</div>
                        </div> */}
                        <div>
                            <div className="text-xs font-bold">Session</div>
                            <div className="text-sm text-gray-700">Expire à {expirationFormatted}</div>
                        </div>
                    </div>
                    <div className="h-full"></div>
                    <div className="flex items-center justify-center">
                        <LogoutClient variant="outline">
                            <LogOut className="size-4" />
                            <span>Déconnexion</span>
                        </LogoutClient>
                    </div>
                </Card>
                <ProfileClient />
            </div>
        </div>
    );
}
