import { apiRouter } from "@orpc/router";
import { createRouterClient } from "@orpc/server";

/**
 * Mock oRPC direct client
 * -> bypass HTTP layer
 * -> directly calls route handlers
 */
export const oRPC_bypass_http = createRouterClient(apiRouter, { context: async () => ({}) });
