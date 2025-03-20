/**
 * API pour récupérer un(e) verification unique avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer un(e) verification par son ID.
 * Il utilise unstable_cache de Next.js pour mettre en cache les résultats,
 * ce qui améliore les performances en évitant des requêtes répétées à la base de données.
 * 
 * La fonction getVerificationCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    VerificationService,
    FindUniqueVerificationProps,
    FindUniqueVerificationResponse
} from "@services/class/VerificationClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère un(e) verification mis(e) en cache par ID
 * @param stringParams Paramètres contenant l'ID du/de la verification au format JSON
 * @returns Réponse contenant le/la verification ou une erreur
 */
const getVerificationCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindUniqueVerificationResponse>> => {
        // Parse les paramètres en objet
        const params: FindUniqueVerificationProps = JSON.parse(stringParams);
        
        // Utilise le service pour récupérer le/la verification
        const response = await VerificationService.findUnique(params);
        
        console.log("getVerificationUnique -> Revalidating verification from database...");
        
        return response;
    },
    ["verification/unique"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["verification/unique"],
    },
);

/**
 * Gestionnaire de route GET pour récupérer un(e) seul(e) verification par ID
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindUniqueVerificationResponse>>> => {
    try {
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);
        
        const response = await getVerificationCached(stringParams);
        
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getVerificationCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getVerificationCached -> Invalid Zod params -> " + error.message
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getVerificationCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getVerificationCached -> " + (error as Error).message });
        }
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
