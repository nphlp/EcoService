"use client";

import Button from "@comps/UI/button/button";
import { ArticleFindUniqueResponse } from "@services/types";
import { useState } from "react";
import { handleAdd, handleDelete, handleUpdate } from "./actions";

type MutationsProps = {
    articleClient: ArticleFindUniqueResponse;
};

export default function Mutations(props: MutationsProps) {
    const { articleClient } = props;

    const [isLoading, setIsLoading] = useState(false);

    return (
        <div className="space-y-2">
            <h2 className="text-xl font-semibold">Article Mutations</h2>
            <div className="max-h-60 overflow-auto">
                {isLoading ? (
                    <p>Loading...</p>
                ) : (
                    <pre className="whitespace-pre-wrap">{JSON.stringify(articleClient, null, 2)}</pre>
                )}
            </div>
            <div className="flex gap-4">
                <Button
                    label="Add article"
                    onClick={async () => {
                        setIsLoading(true);
                        const response = await handleAdd();
                        console.log("Article created:", response);
                        setIsLoading(false);
                    }}
                />
                <Button
                    label="Update article"
                    onClick={async () => {
                        setIsLoading(true);
                        const response = await handleUpdate();
                        console.log("Article updated:", response);
                        setIsLoading(false);
                    }}
                />
                <Button
                    label="Delete article"
                    onClick={async () => {
                        setIsLoading(true);
                        const response = await handleDelete();
                        console.log("Article deleted:", response);
                        setIsLoading(false);
                    }}
                />
            </div>
        </div>
    );
}
