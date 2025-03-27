import { FetchV2 } from "@utils/FetchV2";
import Client from "./client";
import { DiyFetchParams } from "./fetchParams";

export default async function Page() {
    const diyList = await FetchV2({
        route: "/diy",
        params: DiyFetchParams,
    });

    if (!diyList.length) {
        return <div>There is no data.</div>;
    }

    return <Client initialData={{ diyList }} />;
}
