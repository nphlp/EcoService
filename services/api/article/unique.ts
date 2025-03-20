/**
 * API pour récupérer un(e) article unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) article par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getArticleCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ArticleService,
    FindUniqueArticleProps,
    FindUniqueArticleResponse
} from "@services/class/ArticleClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère un(e) article mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la article au format JSON
 * @returns Réponse contenant le/la article ou une erreur
 */
const getArticleCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindUniqueArticleResponse>> => {
        // Parse les paramètres en objet
        const params: FindUniqueArticleProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la article
        const response = await ArticleService.findUnique(params);
        
        console.log("getArticleUnique -> Revalidating article from database...");
        
        return response;
    },
    ["article/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["article/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) article par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueArticleResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getArticleCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getArticleCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getArticleCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getArticleCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getArticleCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
