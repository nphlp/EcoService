import { OpenAPIReferencePlugin } from "@orpc/openapi/plugins";
import { onError } from "@orpc/server";
import { RPCHandler } from "@orpc/server/fetch";
import { ZodToJsonSchemaConverter } from "@orpc/zod/zod4";
import { apiRouter } from "../api/router";

const handler = new RPCHandler(apiRouter, {
    interceptors: [
        onError((error) => {
            console.error(error);
        }),
    ],
    plugins: [
        new OpenAPIReferencePlugin({
            docsProvider: "scalar",
            docsPath: "/",
            specPath: "/spec.json",
            schemaConverters: [new ZodToJsonSchemaConverter()],
            specGenerateOptions: {
                info: {
                    title: "Task API",
                    version: "1.0.0",
                    description: "API for managing tasks with oRPC",
                },
                servers: [
                    {
                        url: "/api/orpc",
                        description: "Development server",
                    },
                ],
            },
        }),
    ],
});

async function handleRequest(request: Request) {
    const { response } = await handler.handle(request, {
        prefix: "/api/orpc",
        context: {},
    });

    return response ?? new Response("Not found", { status: 404 });
}

const HEAD = handleRequest;
const GET = handleRequest;
const POST = handleRequest;
const PUT = handleRequest;
const PATCH = handleRequest;
const DELETE = handleRequest;

const RpcHanlder = { HEAD, GET, POST, PUT, PATCH, DELETE };

export default RpcHanlder;
