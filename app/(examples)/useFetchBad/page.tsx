"use client";

import { useFetch } from "@utils/FetchHook";
import { SelectArticleList } from "@actions/ArticleAction";
import { FindManyArticleProps, FindManyArticleResponse } from "@class/ArticleClass";
import { useEffect, useState } from "react";

export default function Page() {
    // With useFetch
    const {
        data: dataApi,
        isLoading: isLoadingApi,
        error: errorApi,
    } = useFetch({
        route: "/article",
        fetchOnFirstRender: true, // Fetch on first mounting (default: false)
        params: {
            include: {
                Author: true,
            },
        },
    });

    // Without useFetch
    const [dataAction, setDataAction] = useState<FindManyArticleResponse<FindManyArticleProps>>();
    const [isLoadingAction, setIsLoadingAction] = useState(false);
    const [errorAction, setErrorAction] = useState<string>();
    useEffect(() => {
        const fetchAction = async () => {
            console.log("ACTION TRIGGERED");
            try {
                setIsLoadingAction(true);
                const responseAction = await SelectArticleList({
                    include: {
                        Author: true,
                    },
                });

                if (responseAction) setDataAction(responseAction);
            } catch (error) {
                setErrorAction(error as string);
            } finally {
                setIsLoadingAction(false);
            }
        };

        fetchAction();
    }, []);

    if (errorApi || errorAction) {
        return (
            <div className="grid grid-cols-2 gap-4">
                <div>{errorApi ?? "There is no data."}</div>
                <div>{errorAction ?? "There is no data."}</div>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-2 gap-4">
            <pre>{isLoadingApi ? "Loading..." : JSON.stringify(dataApi, null, 2)}</pre>
            <pre>{isLoadingAction ? "Loading..." : JSON.stringify(dataAction, null, 2)}</pre>
        </div>
    );
}
