import TabClient from "@app/(auth)/auth/components/tabs";
import { connection } from "next/server";
import { Suspense } from "react";
import LoginClient from "./components/login";
import RegisterClient from "./components/register";

export default async function Page() {
    return (
        <Suspense>
            <SuspendedPage />
        </Suspense>
    );
}

const SuspendedPage = async () => {
    await connection();

    return (
        <div className="flex w-full flex-1 flex-col items-center justify-center bg-gray-100 p-7">
            <TabClient
                cardList={[
                    {
                        label: "Connexion",
                        component: <LoginClient />,
                        searchParams: "login",
                    },
                    {
                        label: "S'inscrire",
                        component: <RegisterClient />,
                        searchParams: "register",
                    },
                ]}
            />
        </div>
    );
};
