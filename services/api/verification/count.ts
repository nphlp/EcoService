/**
 * API pour compter les verifications avec mise en cache
 * 
 * Ce fichier définit un point d'API pour compter les verifications avec filtres.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getVerificationCountCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    VerificationService,
    CountVerificationProps,
    CountVerificationResponse
} from "@services/class/VerificationClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Compte les verifications avec mise en cache
 * @param stringParams Paramètres de filtrage au format JSON
 * @returns Réponse contenant le nombre de verifications ou une erreur
 */
const getVerificationCountCached = cache(
    async (stringParams: string): Promise<ResponseFormat<CountVerificationResponse>> => {
        // Parse les paramètres en objet
        const params: CountVerificationProps = JSON.parse(stringParams);
        
        // Utilise le service pour compter les verifications
        const response = await VerificationService.count(params);
        
        console.log("getVerificationCount -> Revalidating verifications count from database...");
        
        return response;
    },
    ["verification/count"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["verification/count"],
    },
);

/**
 * Gestionnaire de route GET pour compter les verifications
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<CountVerificationResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getVerificationCountCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getVerificationCountCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getVerificationCountCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getVerificationCountCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getVerificationCountCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
