import { Routes as ExternalRoutes } from "@api/external/Routes";
import { Routes as StripeRoutes } from "@api/stripe/Routes";
import { NextRequest } from "next/server";

/**
 * Routes list
 */
export type RoutesList = ExternalRoutes & StripeRoutes;

/**
 * Re-validate time in seconds
 * 5 seconds in development
 * 300 seconds in production
 */
export const cacheLifeApi =
    process.env.NODE_ENV === "development"
        ? {
              stale: 5, // 5 seconds
              revalidate: 10, // 10 seconds
              expire: 20, // 20 seconds
          }
        : {
              stale: 60 * 5, // 5 minutes
              revalidate: 60 * 60, // 1 hour
              expire: 60 * 60 * 2, // 2 hours
          };

/**
 * Parse and decode params from the request
 */
export const parseAndDecodeParams = (request: NextRequest) => {
    const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
    const stringParams = decodeURIComponent(encodedParams);
    return JSON.parse(stringParams);
};

/**
 * Exact type
 * Used to ensure that the params are exactly the same as the shape of the object, without any extra properties
 */
export type Exact<T, Shape extends T> = T & {
    [K in Exclude<keyof Shape, keyof T>]?: never;
};

/**
 * Response format
 */
export type ResponseFormat<Response> =
    | {
          data: Response;
          error?: undefined;
      }
    | {
          data?: undefined;
          error: string;
      };
