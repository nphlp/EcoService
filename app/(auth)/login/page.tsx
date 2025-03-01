import Card from "@comps/server/Card";
import LoginClient from "./client";

export default function Page() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center p-6">
            <Card className="w-min space-y-4">
                <h1 className="text-center text-xl font-bold">Login</h1>
                <div className="text-wrap text-center text-xs text-gray-500">
                    Enter your personal informations to login.
                </div>
                <LoginClient />
            </Card>
        </div>
    );
}
