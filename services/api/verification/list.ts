/**
 * API pour récupérer une liste de verifications avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer une liste de verifications
 * avec filtrage, tri et pagination. Il utilise unstable_cache de Next.js
 * pour mettre en cache les résultats.
 * 
 * La fonction getVerificationListCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    VerificationService,
    FindManyVerificationProps,
    FindManyVerificationResponse,
} from "@services/class/VerificationClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère une liste de verifications mise en cache
 */
const getVerificationListCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindManyVerificationResponse>> => {
        // Parse les paramètres en objet
        const params: FindManyVerificationProps = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des verifications
        const response = await VerificationService.findMany(params);

        console.log("getVerificationList -> Revalidating verifications list from database...");

        return response;
    },
    ["verification"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["verification"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de verifications
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyVerificationResponse>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des verifications
        const response = await getVerificationListCached(stringParams);

        // Retourne la liste des verifications
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getVerificationListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getVerificationListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getVerificationListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getVerificationListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
