/**
 * API pour compter les products avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les products avec filtres.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getProductCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ProductService,
    CountProductProps,
    CountProductResponse
} from "@services/class/ProductClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Compte les products avec mise en cache
 * @param stringParams Paramètres de filtrage au format JSON
 * @returns Réponse contenant le nombre de products ou une erreur
 */
const getProductCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountProductResponse>> => {
        // Parse les paramètres en objet
        const params: CountProductProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les products
        const response = await ProductService.count(params);
        
        console.log("getProductCount -> Revalidating products count from database...");
        
        return response;
    },
    ["product/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["product/count"],
    },
);

/**
 * Gestionnaire de route GET pour compter les products
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountProductResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getProductCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getProductCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getProductCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getProductCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getProductCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
