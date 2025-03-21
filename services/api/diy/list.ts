/**
 * API pour récupérer une liste de diys avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer une liste de diys
 * avec filtrage, tri et pagination. Il utilise unstable_cache de Next.js
 * pour mettre en cache les résultats.
 * 
 * La fonction getDiyListCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    DiyService,
    FindManyDiyProps,
    FindManyDiyResponse,
} from "@services/class/DiyClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère une liste de diys mise en cache
 */
const getDiyListCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindManyDiyResponse>> => {
        // Parse les paramètres en objet
        const params: FindManyDiyProps = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des diys
        const response = await DiyService.findMany(params);

        console.log("getDiyList -> Revalidating diys list from database...");

        return response;
    },
    ["diy"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["diy"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de diys
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyDiyResponse>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des diys
        const response = await getDiyListCached(stringParams);

        // Retourne la liste des diys
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getDiyListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getDiyListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getDiyListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getDiyListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
