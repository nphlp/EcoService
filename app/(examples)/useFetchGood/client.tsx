"use client";

import { FindManyDiyProps, FindManyDiyResponse } from "@class/DiyClass";
import Button from "@comps/ui/Button";
import { useFetch } from "@utils/FetchHook";
import { useEffect, useState } from "react";

type ClientProps = {
    initialData: {
        diyList: FindManyDiyResponse<FindManyDiyProps>;
    };
};

export default function Client(props: ClientProps) {
    const { initialData } = props;
    const { diyList } = initialData;

    // Displayed data
    const [dataApi, setDataApi] = useState(diyList);

    // Toggle Author include
    const [fetchAuthor, setFetchAuthor] = useState(true);

    const {
        data: dataApiClient,
        isLoading: isLoadingApi,
        error: errorApi,
    } = useFetch({
        route: "/diy",
        params: {
            include: {
                Author: fetchAuthor ? {
                    select: {
                        name: true,
                    },
                } : false,
            },
            take: 2,
        },
    });

    useEffect(() => {
        if (dataApiClient) setDataApi(dataApiClient);
    }, [dataApiClient]);

    if (errorApi) {
        return <div>{errorApi ?? "There is no data."}</div>;
    }

    return (
        <div>
            <div className="flex justify-center py-4">
                <Button label="Toggle Author request" onClick={() => setFetchAuthor(!fetchAuthor)} />
            </div>
            <div>
                <pre className="overflow-hidden">{isLoadingApi ? "Loading..." : JSON.stringify(dataApi, null, 2)}</pre>
            </div>
        </div>
    );
}
