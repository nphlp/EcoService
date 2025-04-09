import TabClient from "@comps/client/tabs";
import LoginClient from "./components/login";
import RegisterClient from "./components/register";

export const dynamic = "force-dynamic";

export default function Page() {
    return (
        <div className="flex h-full flex-col items-center justify-center bg-gray-100 p-6">
            <TabClient
                cardList={[
                    {
                        label: "Connexion",
                        component: <LoginClient />,
                    },
                    {
                        label: "S'inscrire",
                        component: <RegisterClient />,
                    },
                ]}
            />
        </div>
    );
}
