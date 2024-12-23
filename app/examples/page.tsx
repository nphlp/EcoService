import ButtonClient from "@comps/client/Button";

export default function Page() {
    return (
        <div className="space-y-4">
            <h1 className="text-2xl font-bold">Data Manipulation</h1>
            <p>Here are some examples of data manipulation.</p>
            <div className="space-y-2">
                <ButtonClient
                    type="link"
                    href="/examples/get-fruit-server"
                    label="get-fruit-server"
                    className="w-fit px-0"
                    variant="underline"
                >
                    - Get data (Server Component)
                </ButtonClient>
                <ButtonClient
                    type="link"
                    href="/examples/get-fruit-client"
                    label="get-fruit-client"
                    className="w-fit px-0"
                    variant="underline"
                >
                    - Get data (Client Component)
                </ButtonClient>
                <ButtonClient
                    type="link"
                    href="/examples/add-fruit-client"
                    label="add-fruit-client"
                    className="w-fit px-0"
                    variant="underline"
                >
                    - Add data (Client Component)
                </ButtonClient>
            </div>
        </div>
    );
}
