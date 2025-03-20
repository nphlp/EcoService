/**
 * API pour compter les accounts avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les accounts avec filtres.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getAccountCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    AccountService,
    CountAccountProps,
    CountAccountResponse
} from "@services/class/AccountClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Compte les accounts avec mise en cache
 * @param stringParams Paramètres de filtrage au format JSON
 * @returns Réponse contenant le nombre de accounts ou une erreur
 */
const getAccountCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountAccountResponse>> => {
        // Parse les paramètres en objet
        const params: CountAccountProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les accounts
        const response = await AccountService.count(params);
        
        console.log("getAccountCount -> Revalidating accounts count from database...");
        
        return response;
    },
    ["account/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["account/count"],
    },
);

/**
 * Gestionnaire de route GET pour compter les accounts
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountAccountResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getAccountCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getAccountCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getAccountCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getAccountCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getAccountCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
