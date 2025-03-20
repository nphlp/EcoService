/**
 * API pour récupérer une liste de sessions avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer une liste de sessions
 * avec filtrage, tri et pagination. Il utilise unstable_cache de Next.js
 * pour mettre en cache les résultats.
 * 
 * La fonction getSessionListCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    SessionService,
    FindManySessionProps,
    FindManySessionResponse,
} from "@services/class/SessionClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère une liste de sessions mise en cache
 */
const getSessionListCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindManySessionResponse>> => {
        // Parse les paramètres en objet
        const params: FindManySessionProps = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des sessions
        const response = await SessionService.findMany(params);

        console.log("getSessionList -> Revalidating sessions list from database...");

        return response;
    },
    ["session"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["session"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de sessions
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindManySessionResponse>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des sessions
        const response = await getSessionListCached(stringParams);

        // Retourne la liste des sessions
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getSessionListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getSessionListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getSessionListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getSessionListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
