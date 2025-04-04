import { NextRequest } from "next/server";

/**
 * Re-validate time in seconds
 * 5 seconds in development
 * 300 seconds in production
 */
export const revalidate = process.env.NODE_ENV === "development" ? 5 : 300;

/**
 * Parse and decode params from the request
 */
export const parseAndDecodeParams = (request: NextRequest) => {
    const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
    const stringParams = decodeURIComponent(encodedParams);
    return JSON.parse(stringParams);
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
