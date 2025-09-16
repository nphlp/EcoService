"use client";

import Button from "@comps/UI/button/button";
import { useEffect } from "react";

type ErrorProps = {
    error: Error & { digest?: string };
    reset: () => void;
};

export default function Error(props: ErrorProps) {
    const { error, reset } = props;

    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="max-w-3/4 space-y-4">
            <h2 className="text-2xl font-bold">Oups!</h2>
            <div>{error.message}</div>
            <Button type="button" label="reset" onClick={reset}>
                Try Again
            </Button>
        </div>
    );
}
