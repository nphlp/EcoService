/**
 * API pour récupérer un(e) product unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) product par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getProductCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    ProductService,
    FindUniqueProductProps,
    FindUniqueProductResponse
} from "@services/class/ProductClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère un(e) product mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la product au format JSON
 * @returns Réponse contenant le/la product ou une erreur
 */
const getProductCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindUniqueProductResponse>> => {
        // Parse les paramètres en objet
        const params: FindUniqueProductProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la product
        const response = await ProductService.findUnique(params);
        
        console.log("getProductUnique -> Revalidating product from database...");
        
        return response;
    },
    ["product/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["product/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) product par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueProductResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getProductCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getProductCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getProductCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getProductCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getProductCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
