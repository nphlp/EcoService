"use client";

import Button from "@comps/ui/button";
import { useFetchV2 } from "@utils/FetchV2/FetchHookV2";
import { useEffect, useState } from "react";
import { DiyFetchParams, DiyListType } from "./fetchParams";

type ClientProps = {
    initialData: {
        diyList: DiyListType;
    };
};

export default function Client(props: ClientProps) {
    const { initialData } = props;
    const { diyList } = initialData;

    // Displayed data
    const [dataApi, setDataApi] = useState(diyList);

    // Toggle Author include
    const [fetchAuthor, setFetchAuthor] = useState(true);

    const { data, isLoading, error } = useFetchV2({
        route: "/diy",
        params: DiyFetchParams,
    });

    useEffect(() => {
        if (data) setDataApi(data);
    }, [data]);

    if (error) {
        return <div>{error ?? "There is no data."}</div>;
    }

    return (
        <div>
            <div className="flex justify-center py-4">
                <Button label="Toggle Author request" onClick={() => setFetchAuthor(!fetchAuthor)} />
            </div>
            <div>
                <pre className="overflow-hidden">{isLoading ? "Loading..." : JSON.stringify(dataApi, null, 2)}</pre>
            </div>
        </div>
    );
}
