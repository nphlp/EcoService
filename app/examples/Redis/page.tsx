import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import Client from "./client";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

const cachedServerTimestamp = async () => {
    "use cache";

    cacheTag("time");
    cacheLife({
        stale: 5, // browser cache stale: before refetching data from server
        revalidate: 10, // server cache revalidate: before server revalidation
        expire: 60, // server cache expire: before cache expiration
    });

    const response = await fetch(`${baseUrl}/api/timestamp`);
    const data: { time: string } = await response.json();

    return data.time;
};

export default async function TestCachePage() {
    const time = await cachedServerTimestamp();

    const now = new Date();

    const localTime = now.toLocaleTimeString("fr-FR", { hour: "numeric", minute: "numeric", second: "numeric" });
    const formattedLocalTime = localTime.replace(":", "h ").replace(":", "min ") + "s";

    return (
        <div className="mx-auto w-4xl space-y-8 p-8">
            <h1 className="text-3xl font-bold">Test Redis Cache Handler</h1>
            <div className="space-y-4 rounded-lg border p-6">
                <h2 className="text-xl font-semibold">User 123</h2>
                <ul className="list-inside list-disc text-sm">
                    <li>Browser cache: 5s</li>
                    <li>Server cache: 10s</li>
                    <li>Expiration: 60s</li>
                </ul>
                <div>
                    <div className="flex justify-center text-lg font-semibold text-gray-600">
                        Local time: {formattedLocalTime}
                    </div>
                    <div className="flex justify-center text-2xl font-bold">Server time: {time}</div>
                </div>
                <div className="flex justify-center gap-4">
                    <Client tag="time" />
                </div>
            </div>
        </div>
    );
}
