/**
 * API pour récupérer une liste de articles avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer une liste de articles
 * avec filtrage, tri et pagination. Il utilise unstable_cache de Next.js
 * pour mettre en cache les résultats.
 * 
 * La fonction getArticleListCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ArticleService,
    FindManyArticleProps,
    FindManyArticleResponse,
} from "@services/class/ArticleClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère une liste de articles mise en cache
 */
const getArticleListCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindManyArticleResponse>> => {
        // Parse les paramètres en objet
        const params: FindManyArticleProps = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des articles
        const response = await ArticleService.findMany(params);

        console.log("getArticleList -> Revalidating articles list from database...");

        return response;
    },
    ["article"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["article"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de articles
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyArticleResponse>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des articles
        const response = await getArticleListCached(stringParams);

        // Retourne la liste des articles
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getArticleListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getArticleListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getArticleListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getArticleListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
