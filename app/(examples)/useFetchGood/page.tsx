import { Fetch } from "@utils/Fetch";
import Client from "./client";

export default async function Page() {
    const diyList = await Fetch(
        {
            route: "/diy",
            params: {
                include: {
                    Author: {
                        select: {
                            name: true,
                        },
                    },
                },
                take: 2,
            },
        },
    );

    if (!diyList.length) {
        return <div>There is no data.</div>;
    }

    return <Client initialData={{ diyList }} />;
}
