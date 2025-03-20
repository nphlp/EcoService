/**
 * API pour récupérer un(e) category unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) category par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getCategoryCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    CategoryService,
    FindUniqueCategoryProps,
    FindUniqueCategoryResponse
} from "@services/class/CategoryClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère un(e) category mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la category au format JSON
 * @returns Réponse contenant le/la category ou une erreur
 */
const getCategoryCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindUniqueCategoryResponse>> => {
        // Parse les paramètres en objet
        const params: FindUniqueCategoryProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la category
        const response = await CategoryService.findUnique(params);
        
        console.log("getCategoryUnique -> Revalidating category from database...");
        
        return response;
    },
    ["category/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["category/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) category par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueCategoryResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getCategoryCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getCategoryCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getCategoryCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getCategoryCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getCategoryCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
