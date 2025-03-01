"use client";

import ButtonClient from "@comps/client/Button";
import { useEffect } from "react";

type PageProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function Page(props: PageProps) {
    const { error, reset } = props;

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex flex-1 flex-col items-center justify-center">
            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Oups! Something went wrong...</h2>
                <div>{error.message}</div>
                <ButtonClient type="button" label="reset" onClick={reset}>
                    Try Again
                </ButtonClient>
            </div>
        </div>
    );
}
