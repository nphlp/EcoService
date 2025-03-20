"use client";

import { useFetch } from "@utils/FetchHook";
import { SelectArticleList } from "@actions/ArticleAction";
import { FindManyArticleResponse } from "@class/ArticleClass";
import { useEffect, useRef, useState } from "react";
import Button from "@comps/ui/Button";

type ClientProps = {
    initialData: {
        dataApiInit: FindManyArticleResponse;
        dataActionInit: FindManyArticleResponse;
    };
};

export default function Client(props: ClientProps) {
    const { initialData } = props;
    const { dataApiInit, dataActionInit } = initialData;

    const [fetchAuthor, setFetchAuthor] = useState(true);

    // For Fetch and useFetch data
    const [dataApi, setDataApi] = useState<FindManyArticleResponse>(dataApiInit);

    // For server and client Actions data
    const [dataAction, setDataAction] = useState<FindManyArticleResponse>(dataActionInit);
    const [isLoadingAction, setIsLoadingAction] = useState(false);
    const [errorAction, setErrorAction] = useState<string>();

    // With useFetch
    const {
        data: dataApiClient,
        isLoading: isLoadingApi,
        error: errorApi,
    } = useFetch({
        route: "/article",
        params: {
            include: {
                Author: fetchAuthor,
            },
        },
    });
    useEffect(() => {
        if (dataApiClient) setDataApi(dataApiClient);
    }, [dataApiClient]);

    // Without useFetch
    const mountRef = useRef(false);
    useEffect(() => {
        const fetchAction = async () => {
            try {
                console.log("ACTION TRIGGERED");
                setIsLoadingAction(true);
                const responseAction = await SelectArticleList({
                    include: {
                        Author: fetchAuthor,
                    },
                });

                if (responseAction) setDataAction(responseAction);
            } catch (error) {
                setErrorAction(error as string);
            } finally {
                setIsLoadingAction(false);
            }
        };

        // Disable fetch on first render, because there is initial data fetched from server
        if (mountRef.current) fetchAction();
        mountRef.current = true;
    }, [fetchAuthor]);


    if (errorApi || errorAction) {
        return (
            <div className="grid grid-cols-2 gap-4">
                <div>{errorApi ?? "There is no data."}</div>
                <div>{errorAction ?? "There is no data."}</div>
            </div>
        );
    }

    return (
        <div>
            <div className="flex justify-center py-4">
                <Button label="Toggle Author request" onClick={() => setFetchAuthor(!fetchAuthor)} />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <pre className="overflow-hidden">{isLoadingApi ? "Loading..." : JSON.stringify(dataApi, null, 2)}</pre>
                <pre className="overflow-hidden">{isLoadingAction ? "Loading..." : JSON.stringify(dataAction, null, 2)}</pre>
            </div>
        </div>
    );
}
