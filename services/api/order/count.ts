/**
 * API pour compter les orders avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les orders avec filtres.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getOrderCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    OrderService,
    CountOrderProps,
    CountOrderResponse
} from "@services/class/OrderClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Compte les orders avec mise en cache
 * @param stringParams Paramètres de filtrage au format JSON
 * @returns Réponse contenant le nombre de orders ou une erreur
 */
const getOrderCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountOrderResponse>> => {
        // Parse les paramètres en objet
        const params: CountOrderProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les orders
        const response = await OrderService.count(params);
        
        console.log("getOrderCount -> Revalidating orders count from database...");
        
        return response;
    },
    ["order/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["order/count"],
    },
);

/**
 * Gestionnaire de route GET pour compter les orders
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountOrderResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getOrderCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getOrderCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getOrderCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getOrderCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getOrderCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
