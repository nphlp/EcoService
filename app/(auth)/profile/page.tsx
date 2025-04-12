import LogoutClient from "@comps/client/logout";
import Card from "@comps/server/card";
import { GetSession } from "@lib/auth";
import { CircleCheck, CircleX, LogOut } from "lucide-react";
import { unauthorized } from "next/navigation";
import ProfileClient from "./client";

export default async function Page() {
    const session = await GetSession();
    if (!session) {
        unauthorized();
    }

    const expirationDate = new Date(session.session.expiresAt);
    const expirationFormatted = expirationDate.toLocaleTimeString("fr-FR", { hour: "2-digit", minute: "2-digit" });

    return (
        <div className="h-full bg-gray-50 border-t-1 border-gray-300 p-6 overflow-y-auto">
            <div className="min-h-full flex flex-col items-center justify-center">
                <div className="flex flex-col items-center">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:grid-cols-3">
                        <Card className="flex w-[300px] flex-col gap-3 rounded-2xl p-6">
                            <h1 className="text-xl font-bold">Profil</h1>
                            <div className="text-xs text-wrap text-gray-500">
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
                                <div>
                                    <div className="text-xs font-bold">Image</div>
                                    <div className="text-sm text-gray-700">{session.user.image ?? "null"}</div>
                                </div>
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
            </div>
        </div>
    );
}
