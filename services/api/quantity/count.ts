/**
 * API pour compter les quantitys avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les quantitys avec filtres.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getQuantityCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    QuantityService,
    CountQuantityProps,
    CountQuantityResponse
} from "@services/class/QuantityClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Compte les quantitys avec mise en cache
 * @param stringParams Paramètres de filtrage au format JSON
 * @returns Réponse contenant le nombre de quantitys ou une erreur
 */
const getQuantityCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountQuantityResponse>> => {
        // Parse les paramètres en objet
        const params: CountQuantityProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les quantitys
        const response = await QuantityService.count(params);
        
        console.log("getQuantityCount -> Revalidating quantitys count from database...");
        
        return response;
    },
    ["quantity/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["quantity/count"],
    },
);

/**
 * Gestionnaire de route GET pour compter les quantitys
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountQuantityResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getQuantityCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getQuantityCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getQuantityCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getQuantityCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getQuantityCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
