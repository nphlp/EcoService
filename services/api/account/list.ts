/**
 * API pour récupérer une liste de accounts avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer une liste de accounts
 * avec filtrage, tri et pagination. Il utilise unstable_cache de Next.js
 * pour mettre en cache les résultats.
 * 
 * La fonction getAccountListCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    AccountService,
    FindManyAccountProps,
    FindManyAccountResponse,
} from "@services/class/AccountClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère une liste de accounts mise en cache
 */
const getAccountListCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindManyAccountResponse>> => {
        // Parse les paramètres en objet
        const params: FindManyAccountProps = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des accounts
        const response = await AccountService.findMany(params);

        console.log("getAccountList -> Revalidating accounts list from database...");

        return response;
    },
    ["account"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["account"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de accounts
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyAccountResponse>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des accounts
        const response = await getAccountListCached(stringParams);

        // Retourne la liste des accounts
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getAccountListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getAccountListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getAccountListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getAccountListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
