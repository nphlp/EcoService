/**
 * API pour récupérer une liste de categorys avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer une liste de categorys
 * avec filtrage, tri et pagination. Il utilise unstable_cache de Next.js
 * pour mettre en cache les résultats.
 * 
 * La fonction getCategoryListCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    CategoryService,
    FindManyCategoryProps,
    FindManyCategoryResponse,
} from "@services/class/CategoryClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère une liste de categorys mise en cache
 */
const getCategoryListCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindManyCategoryResponse>> => {
        // Parse les paramètres en objet
        const params: FindManyCategoryProps = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des categorys
        const response = await CategoryService.findMany(params);

        console.log("getCategoryList -> Revalidating categorys list from database...");

        return response;
    },
    ["category"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["category"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de categorys
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyCategoryResponse>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des categorys
        const response = await getCategoryListCached(stringParams);

        // Retourne la liste des categorys
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getCategoryListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getCategoryListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getCategoryListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getCategoryListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
