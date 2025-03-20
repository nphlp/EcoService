/**
 * API pour compter les users avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les users avec filtres.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getUserCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    UserService,
    CountUserProps,
    CountUserResponse
} from "@services/class/UserClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Compte les users avec mise en cache
 * @param stringParams Paramètres de filtrage au format JSON
 * @returns Réponse contenant le nombre de users ou une erreur
 */
const getUserCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountUserResponse>> => {
        // Parse les paramètres en objet
        const params: CountUserProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les users
        const response = await UserService.count(params);
        
        console.log("getUserCount -> Revalidating users count from database...");
        
        return response;
    },
    ["user/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["user/count"],
    },
);

/**
 * Gestionnaire de route GET pour compter les users
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountUserResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getUserCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getUserCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getUserCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getUserCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getUserCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
