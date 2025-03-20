/**
 * API pour compter les doItYourselfs avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les doItYourselfs avec filtres.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getDoItYourselfCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    DoItYourselfService,
    CountDoItYourselfProps,
    CountDoItYourselfResponse
} from "@services/class/DoItYourselfClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Compte les doItYourselfs avec mise en cache
 * @param stringParams Paramètres de filtrage au format JSON
 * @returns Réponse contenant le nombre de doItYourselfs ou une erreur
 */
const getDoItYourselfCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountDoItYourselfResponse>> => {
        // Parse les paramètres en objet
        const params: CountDoItYourselfProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les doItYourselfs
        const response = await DoItYourselfService.count(params);
        
        console.log("getDoItYourselfCount -> Revalidating doItYourselfs count from database...");
        
        return response;
    },
    ["doItYourself/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["doItYourself/count"],
    },
);

/**
 * Gestionnaire de route GET pour compter les doItYourselfs
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountDoItYourselfResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getDoItYourselfCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getDoItYourselfCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getDoItYourselfCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getDoItYourselfCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getDoItYourselfCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
