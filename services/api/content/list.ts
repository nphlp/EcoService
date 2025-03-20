/**
 * API pour récupérer une liste de contents avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer une liste de contents
 * avec filtrage, tri et pagination. Il utilise unstable_cache de Next.js
 * pour mettre en cache les résultats.
 * 
 * La fonction getContentListCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ContentService,
    FindManyContentProps,
    FindManyContentResponse,
} from "@services/class/ContentClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère une liste de contents mise en cache
 */
const getContentListCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindManyContentResponse>> => {
        // Parse les paramètres en objet
        const params: FindManyContentProps = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des contents
        const response = await ContentService.findMany(params);

        console.log("getContentList -> Revalidating contents list from database...");

        return response;
    },
    ["content"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["content"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de contents
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyContentResponse>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des contents
        const response = await getContentListCached(stringParams);

        // Retourne la liste des contents
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getContentListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getContentListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getContentListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getContentListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
