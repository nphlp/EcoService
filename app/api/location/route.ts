import { ResponseFormat, cacheLifeApi, parseAndDecodeParams } from "@utils/FetchConfig";
import { unstable_cacheLife as cacheLife, unstable_cacheTag as cacheTag } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError, ZodType, strictObject, z } from "zod";

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
if (!baseUrl) throw new Error("NEXT_PUBLIC_BASE_URL environment variable is not defined");

const devLocation: LocationResponse = {
    ip: "127.0.0.1",
    version: "IPv4",
    city: "Marseille",
    region: "Provence-Alpes-Côte d'Azur",
    region_code: "PACA",
    country_code: "FR",
    country_code_iso3: "FRA",
    country_name: "France",
    country_capital: "Paris",
    country_tld: ".fr",
    continent_code: "EU",
    in_eu: true,
    postal: "13001",
    latitude: 43.2965,
    longitude: 5.3698,
    timezone: "Europe/Paris",
    utc_offset: "+0100",
    country_calling_code: "+33",
    currency: "EUR",
    currency_name: "Euro",
    languages: "fr",
    country_area: 551695,
    country_population: 67391582,
    asn: "AS12876",
    org: "Online S.A.S.",
    hostname: "localhost.localdomain",
};

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
} | null;

export async function GET(request: NextRequest): Promise<NextResponse<ResponseFormat<LocationResponse>>> {
    try {
        const params: LocationProps = parseAndDecodeParams(request);

        const { ipAddress } = locationSchema.parse(params);

        // In localhost server ipAddress is empty, so we use a fake devLocation
        if (baseUrl?.includes("localhost")) return NextResponse.json({ data: devLocation }, { status: 200 });

        // If ipAddress is empty, we return null
        if (ipAddress === "") return NextResponse.json({ data: null }, { status: 200 });

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

const getLocationCached = async (ipAddress: string) => {
    "use cache";

    cacheLife(cacheLifeApi);
    cacheTag("location");

    const url = `https://ipapi.co/${ipAddress}/json/`;

    const response = await fetch(url, { method: "GET" });

    const data: LocationResponse = await response.json();

    return data;
};
