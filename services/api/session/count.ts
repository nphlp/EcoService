/**
 * API pour compter les sessions avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les sessions avec filtres.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getSessionCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    SessionService,
    CountSessionProps,
    CountSessionResponse
} from "@services/class/SessionClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Compte les sessions avec mise en cache
 * @param stringParams Paramètres de filtrage au format JSON
 * @returns Réponse contenant le nombre de sessions ou une erreur
 */
const getSessionCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountSessionResponse>> => {
        // Parse les paramètres en objet
        const params: CountSessionProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les sessions
        const response = await SessionService.count(params);
        
        console.log("getSessionCount -> Revalidating sessions count from database...");
        
        return response;
    },
    ["session/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["session/count"],
    },
);

/**
 * Gestionnaire de route GET pour compter les sessions
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountSessionResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getSessionCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getSessionCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getSessionCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getSessionCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getSessionCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
