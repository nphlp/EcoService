import ButtonClient from "@comps/client/Button";
import LogoutClient from "@comps/client/Logout";
import { GetSession } from "@lib/auth";

export default async function HomePage() {
    const session = await GetSession();

    return (
        <div className="flex w-full flex-col items-center justify-start overflow-y-auto p-4">
            <div className="flex flex-col items-center justify-center gap-2">
                <h1 className="text-2xl font-bold">
                    {session
                        ? `Hello ${session.user.name.split(" ")[0]}!`
                        : "Hello World!"}
                </h1>
                {session && (
                    <>
                        <ButtonClient type="link" label="stripe" href="/stripe">
                            Stripe API
                        </ButtonClient>
                        <LogoutClient variant="outline" />
                    </>
                )}
            </div>
        </div>
    );
}
