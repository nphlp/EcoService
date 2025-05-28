"use client";

import Button from "@comps/ui/button";
import { normalRefresh, refreshTag } from "./actions";

type ClientProps = {
    tag: string;
};

export default function Client(props: ClientProps) {
    const { tag } = props;

    return (
        <>
            <Button label="Normal refresh" variant="outline" onClick={normalRefresh} />
            <Button label="Revalidate cache" onClick={() => refreshTag(tag)} />
        </>
    );
}
