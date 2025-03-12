import LoginClient from "./loginClient";
import RegisterClient from "./registerClient";
import TabClient from "./tab";

export const dynamic = 'force-dynamic';

export default function Page() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center p-6">
            <TabClient
                cardList={[
                    {
                        label: "Login",
                        component: <LoginClient />,
                    },
                    {
                        label: "Register",
                        component: <RegisterClient />,
                    },
                ]}
            />
        </div>
    );
}
