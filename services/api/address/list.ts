/**
 * API pour récupérer une liste de addresss avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer une liste de addresss
 * avec filtrage, tri et pagination. Il utilise unstable_cache de Next.js
 * pour mettre en cache les résultats.
 * 
 * La fonction getAddressListCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    AddressService,
    FindManyAddressProps,
    FindManyAddressResponse,
} from "@services/class/AddressClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère une liste de addresss mise en cache
 */
const getAddressListCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindManyAddressResponse>> => {
        // Parse les paramètres en objet
        const params: FindManyAddressProps = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des addresss
        const response = await AddressService.findMany(params);

        console.log("getAddressList -> Revalidating addresss list from database...");

        return response;
    },
    ["address"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["address"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de addresss
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyAddressResponse>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des addresss
        const response = await getAddressListCached(stringParams);

        // Retourne la liste des addresss
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getAddressListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getAddressListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getAddressListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getAddressListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
