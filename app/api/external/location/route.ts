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

        const location = await getLocationCached(ipAddress);

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
    async (ipAddress: string) => {
        const url = `https://ipapi.co/${ipAddress}/json/`;

        const response = await fetch(url, { method: "GET" });

        const data: LocationResponse = await response.json();

        return data;
    },
    ["location"],
    { revalidate: 3600, tags: ["location"] },
);
