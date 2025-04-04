import Card from "@comps/server/card";
import Link from "@comps/ui/link";

export default function Page() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4">
            <Card className="pl-10 flex flex-col items-center gap-4">
                <h1 className="text-2xl font-bold">Examples</h1>
                <ul className="space-y-2">
                    <li className="list-disc">
                        <Link href="/examples/Fetch" variant="underline" label="Fetch" baseStyleWithout={["padding", "flex", "font"]}/>
                        <p className="text-xs text-gray-500">How to fetch data from the server</p>
                    </li>
                    <li className="list-disc">
                        <Link href="/examples/useFetch" variant="underline" label="useFetch" baseStyleWithout={["padding", "flex", "font"]}/>
                        <p className="text-xs text-gray-500">How to fetch data from the client</p>
                    </li>
                    <li className="list-disc">
                        <Link href="/examples/FetchParallelized" variant="underline" label="Fetch Parallelized" baseStyleWithout={["padding", "flex", "font"]}/>
                        <p className="text-xs text-gray-500">How to fetch data from the server in parallel</p>
                    </li>
                    <li className="list-disc">
                        <Link href="/examples/Form" variant="underline" label="Form" baseStyleWithout={["padding", "flex", "font"]}/>
                        <p className="text-xs text-gray-500">How to create a form</p>
                    </li>
                    <li className="list-disc">
                        <Link href="/examples/ImageImport" variant="underline" label="Image Import" baseStyleWithout={["padding", "flex", "font"]}/>
                        <p className="text-xs text-gray-500">How to import an image</p>
                    </li>
                    <li className="list-disc">
                        <Link href="/examples/ViewTransition" variant="underline" label="View Transition" baseStyleWithout={["padding", "flex", "font"]}/>
                        <p className="text-xs text-gray-500">How to create a view transition</p>
                    </li>
                </ul>
            </Card>
        </div>
    )
}