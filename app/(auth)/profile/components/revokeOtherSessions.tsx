"use client";

import Button from "@comps/ui/button";
import { revokeOtherSessions } from "@lib/authClient";

export default function RevokeOtherSessions() {
    return (
        <Button
            label="Revoquer les sessions"
            variant="underline"
            className="rounded text-sm"
            baseStyleOnly={["pointer", "outline"]}
            onClick={() => {
                revokeOtherSessions();
            }}
        />
    );
}
