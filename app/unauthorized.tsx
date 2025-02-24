import ButtonClient from "@comps/client/Button";

export default function Page() {
    return (
        <div className="flex flex-1 flex-col items-center justify-center">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Mmm. You&apos;re not authorized</h2>
                <p>Please login before accessing this page.</p>
                <ButtonClient className="w-fit" type="link" href="/login" label="Login">
                    Go to Login
                </ButtonClient>
            </div>
        </div>
    );
}
