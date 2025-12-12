import { createRouterClient } from "@orpc/server";
import "server-only";
import { apiRouter } from "../api/router";

globalThis.$client = createRouterClient(apiRouter, {
    context: async () => ({
        // Prevent using dynamic values that break Nextjs "Full Routing Caching"
        // Authentifcation cookies is managed by `/api/auth` Better Auth route
        // headers: await headers(),
    }),
});
