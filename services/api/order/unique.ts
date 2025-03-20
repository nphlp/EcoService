/**
 * API pour récupérer un(e) order unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) order par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getOrderCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    OrderService,
    FindUniqueOrderProps,
    FindUniqueOrderResponse
} from "@services/class/OrderClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère un(e) order mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la order au format JSON
 * @returns Réponse contenant le/la order ou une erreur
 */
const getOrderCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindUniqueOrderResponse>> => {
        // Parse les paramètres en objet
        const params: FindUniqueOrderProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la order
        const response = await OrderService.findUnique(params);
        
        console.log("getOrderUnique -> Revalidating order from database...");
        
        return response;
    },
    ["order/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["order/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) order par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueOrderResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getOrderCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getOrderCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getOrderCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getOrderCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getOrderCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
