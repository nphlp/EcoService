import ButtonClient from "@comps/client/Button";

export default function NotFoundPage() {
    return (
        <div className="flex min-h-full w-full flex-col items-center justify-center bg-white">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold">
                    Mmm? There is nothing here...
                </h2>
                <div>
                    Maybe this page does not exist. Please go back home, or try it
                    again later.
                </div>
                <ButtonClient className="w-fit" type="link" label="home" href="/">
                    Go back Home
                </ButtonClient>
            </div>
        </div>
    );
}
