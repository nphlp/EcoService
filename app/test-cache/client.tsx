"use client";

import Button from "@comps/ui/button";
import { refreshTag } from "./actions";

type ClientProps = {
    tag: string;
};

export default function Client(props: ClientProps) {
    const { tag } = props;

    return <Button label="Revalidate cache" onClick={() => refreshTag(tag)} />;
}
