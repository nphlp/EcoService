import { GetSession } from "@lib/auth";
import { redirect } from "next/navigation";
import LogoutClient from "@comps/client/Logout";
import Card from "@comps/server/Card";
import { CircleCheck, CircleX } from "lucide-react";
import ProfileClient from "./client";

export default async function ProfilePage() {
    const session = await GetSession();
    if (!session) {
        redirect("/login");
    }

    const expirationDate = new Date(session.session.expiresAt);
    const expirationFormatted = expirationDate.toLocaleTimeString().split(":").slice(0, 2).join("h");

    return (
        <div className="flex w-full flex-col items-center justify-start overflow-y-auto p-4">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                <Card className="w-[280px] space-y-3">
                    <h1 className="text-xl font-bold">Profile</h1>
                    <div className="space-y-2">
                        <div>
                            <div className="text-xs font-bold">Name</div>
                            <div className="text-sm text-gray-700">{session.user.name}</div>
                        </div>
                        <div>
                            <div className="text-xs font-bold">Email</div>
                            <div className="line-clamp-1 text-sm text-gray-700">{session.user.email}</div>
                        </div>
                        <div>
                            <div className="text-xs font-bold">Verified</div>
                            <div className="flex flex-row items-center gap-1 text-sm text-gray-700">
                                {session.user.emailVerified ? (
                                    <>
                                        <CircleCheck className="size-4 stroke-green-400" />
                                        <span className="font-bold text-green-400">Yes</span>
                                    </>
                                ) : (
                                    <>
                                        <CircleX className="size-4 stroke-red-400" />
                                        <span className="font-bold text-red-400">No</span>
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
                            <div className="text-sm text-gray-700">
                                expires at {expirationFormatted}
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center">
                        <LogoutClient variant="outline" />
                    </div>
                </Card>
                <ProfileClient />
            </div>
        </div>
    );
}
