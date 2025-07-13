/**
 * API entry point for all dynamic routes
 *
 * This file uses a dynamic routing system to handle all API requests.
 * It parses the request path and redirects to the appropriate handler.
 *
 * Inspired by the BetterAuth approach, this system centralizes routing logic
 * and simplifies the API architecture.
 */
import * as routes from "@services/api";
import { NextRequest, NextResponse } from "next/server";

// Type for route handlers
type Route = (request: NextRequest) => Promise<NextResponse>;

/**
 * Function to get the appropriate route handler based on the path
 */
const findRoute = (path: string[]): Route | null => {
    // Api Route List
    const ApiRoutes: Record<string, Route> = routes;

    // If the path is empty, return null
    if (path.length === 0 || path.length === 1) {
        return null;
    }

    // If the path has a single segment, return the main handler (list)
    const ModelName = path[0].charAt(0).toUpperCase() + path[0].slice(1);

    // If the path has two segments, check sub-routes
    if (path.length === 2) {
        const subRoute = path[1];

        // If the sub-route is "findMany", return the handler to get the list of items
        if (subRoute === "findMany") {
            return ApiRoutes[`${ModelName}FindManyApi`] ?? null;
        }

        // If the sub-route is "findUnique", return the handler to get a unique item
        if (subRoute === "findUnique") {
            return ApiRoutes[`${ModelName}FindUniqueApi`] ?? null;
        }

        // If the sub-route is "findFirst", return the handler to get the first item
        if (subRoute === "findFirst") {
            return ApiRoutes[`${ModelName}FindFirstApi`] ?? null;
        }

        // If the sub-route is "count", return the handler to get the count of items
        if (subRoute === "count") {
            return ApiRoutes[`${ModelName}CountApi`] ?? null;
        }
    }

    // If the path is longer or the sub-route is not recognized, return null
    return null;
};

// Type for request parameters
type ParamsProps = { params: Promise<{ routes: string[] }> };

/**
 * GET handler for all routes
 */
export async function GET(request: NextRequest, props: ParamsProps): Promise<NextResponse> {
    const { params } = props;
    const { routes } = await params;

    const route = findRoute(routes);

    if (route) {
        try {
            return route(request);
        } catch (error) {
            console.error(`Error in route ${routes.join("/")}: ${(error as Error).message}`);
            return NextResponse.json({ error: "Internal server error" }, { status: 500 });
        }
    }

    return NextResponse.json({ error: "Route not found" }, { status: 404 });
}
