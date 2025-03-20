/**
 * API pour compter les addresss avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les addresss avec filtres.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getAddressCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    AddressService,
    CountAddressProps,
    CountAddressResponse
} from "@services/class/AddressClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Compte les addresss avec mise en cache
 * @param stringParams Paramètres de filtrage au format JSON
 * @returns Réponse contenant le nombre de addresss ou une erreur
 */
const getAddressCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountAddressResponse>> => {
        // Parse les paramètres en objet
        const params: CountAddressProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les addresss
        const response = await AddressService.count(params);
        
        console.log("getAddressCount -> Revalidating addresss count from database...");
        
        return response;
    },
    ["address/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["address/count"],
    },
);

/**
 * Gestionnaire de route GET pour compter les addresss
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountAddressResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getAddressCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getAddressCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getAddressCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getAddressCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getAddressCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
