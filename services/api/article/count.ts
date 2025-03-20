/**
 * API pour compter les articles avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les articles avec filtres.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getArticleCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ArticleService,
    CountArticleProps,
    CountArticleResponse
} from "@services/class/ArticleClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Compte les articles avec mise en cache
 * @param stringParams Paramètres de filtrage au format JSON
 * @returns Réponse contenant le nombre de articles ou une erreur
 */
const getArticleCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountArticleResponse>> => {
        // Parse les paramètres en objet
        const params: CountArticleProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les articles
        const response = await ArticleService.count(params);
        
        console.log("getArticleCount -> Revalidating articles count from database...");
        
        return response;
    },
    ["article/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["article/count"],
    },
);

/**
 * Gestionnaire de route GET pour compter les articles
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountArticleResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getArticleCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getArticleCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getArticleCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getArticleCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getArticleCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
