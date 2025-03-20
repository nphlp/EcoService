/**
 * API pour compter les contents avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les contents avec filtres.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getContentCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ContentService,
    CountContentProps,
    CountContentResponse
} from "@services/class/ContentClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Compte les contents avec mise en cache
 * @param stringParams Paramètres de filtrage au format JSON
 * @returns Réponse contenant le nombre de contents ou une erreur
 */
const getContentCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountContentResponse>> => {
        // Parse les paramètres en objet
        const params: CountContentProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les contents
        const response = await ContentService.count(params);
        
        console.log("getContentCount -> Revalidating contents count from database...");
        
        return response;
    },
    ["content/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["content/count"],
    },
);

/**
 * Gestionnaire de route GET pour compter les contents
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountContentResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getContentCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getContentCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getContentCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getContentCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getContentCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
