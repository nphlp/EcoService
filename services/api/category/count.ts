/**
 * API pour compter les categorys avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les categorys avec filtres.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getCategoryCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    CategoryService,
    CountCategoryProps,
    CountCategoryResponse
} from "@services/class/CategoryClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Compte les categorys avec mise en cache
 * @param stringParams Paramètres de filtrage au format JSON
 * @returns Réponse contenant le nombre de categorys ou une erreur
 */
const getCategoryCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountCategoryResponse>> => {
        // Parse les paramètres en objet
        const params: CountCategoryProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les categorys
        const response = await CategoryService.count(params);
        
        console.log("getCategoryCount -> Revalidating categorys count from database...");
        
        return response;
    },
    ["category/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["category/count"],
    },
);

/**
 * Gestionnaire de route GET pour compter les categorys
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountCategoryResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getCategoryCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getCategoryCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getCategoryCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getCategoryCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getCategoryCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
