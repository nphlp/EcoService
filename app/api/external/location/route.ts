import { parseAndDecodeParams, ResponseFormat } from "@utils/FetchConfig";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { strictObject, z, ZodError, ZodType } from "zod";

export type LocationProps = {
    ipAddress: string;
};

const locationSchema: ZodType<LocationProps> = strictObject({
    ipAddress: z.string(),
});

export type LocationResponse = {
    ip: string;
    version: string;
    city: string;
    region: string;
    region_code: string;
    country_code: string;
    country_code_iso3: string;
    country_name: string;
    country_capital: string;
    country_tld: string;
    continent_code: string;
    in_eu: boolean;
    postal: string;
    latitude: number;
    longitude: number;
    timezone: string;
    utc_offset: string;
    country_calling_code: string;
    currency: string;
    currency_name: string;
    languages: string;
    country_area: number;
    country_population: number;
    asn: string;
    org: string;
    hostname: string;
};

export async function GET(request: NextRequest): Promise<NextResponse<ResponseFormat<LocationResponse>>> {
    try {
        const params: LocationProps = parseAndDecodeParams(request);

        const { ipAddress } = locationSchema.parse(params);

        const ip =
            process.env.NODE_ENV === "development" && (ipAddress === "::1" || ipAddress === "127.0.0.1")
                ? "2a02:8429:805c:e501:51fe:1f20:a904:751d"
                : ipAddress;

        const location = await getLocationCached(ip);

        return NextResponse.json({ data: location }, { status: 200 });
    } catch (error) {
        console.error("Location -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({ error: "Location -> Invalid Zod params -> " + error.message });
            return NextResponse.json({ error: "Location -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
}

const getLocationCached = cache(
    async (ip: string) => {
        const url = `https://ipapi.co/${ip}/json/`;

        const response = await fetch(url, {
            method: "GET",
            headers: { // Fake user agent to avoid being rate limited
                "User-Agent":
                    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0.0.0 Safari/537.36",
                Accept: "application/json",
                "Accept-Language": "fr,fr-FR;q=0.9,en-US;q=0.8,en;q=0.7",
                "Cache-Control": "no-cache",
            },
        });

        const data: LocationResponse = await response.json();

        return data;
    },
    ["location"],
    { revalidate: 3600, tags: ["location"] },
);
