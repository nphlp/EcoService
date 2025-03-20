/**
 * API pour récupérer une liste de users avec mise en cache
 * 
 * Ce fichier définit un point d'API pour récupérer une liste de users
 * avec filtrage, tri et pagination. Il utilise unstable_cache de Next.js
 * pour mettre en cache les résultats.
 * 
 * La fonction getUserListCached parse les paramètres, appelle le service,
 * et gère les erreurs potentielles avant de retourner les données.
 */
import { ResponseFormat } from "@app/api/Routes";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import {
    UserService,
    FindManyUserProps,
    FindManyUserResponse,
} from "@services/class/UserClass";
import { unstable_cache as cache } from "next/cache";
import { NextRequest, NextResponse } from "next/server";
import { ZodError } from "zod";

/**
 * Récupère une liste de users mise en cache
 */
const getUserListCached = cache(
    async (stringParams: string): Promise<ResponseFormat<FindManyUserResponse>> => {
        // Parse les paramètres en objet
        const params: FindManyUserProps = JSON.parse(stringParams);

        // Utilise le service pour récupérer la liste des users
        const response = await UserService.findMany(params);

        console.log("getUserList -> Revalidating users list from database...");

        return response;
    },
    ["user"],
    {
        revalidate: process.env.NODE_ENV === "development" ? 5 : 300,
        tags: ["user"],
    },
);

/**
 * Gestionnaire de route GET pour l'API de users
 */
export const GET = async (request: NextRequest): Promise<NextResponse<ResponseFormat<FindManyUserResponse>>> => {
    try {
        // Récupère les paramètres et les décode
        const encodedParams = request.nextUrl.searchParams.get("params") ?? "{}";
        const stringParams = decodeURIComponent(encodedParams);

        // Récupère la liste des users
        const response = await getUserListCached(stringParams);

        // Retourne la liste des users
        return NextResponse.json(response, { status: 200 });
    } catch (error) {
        console.error("getUserListCached -> " + (error as Error).message);
        if (process.env.NODE_ENV === "development") {
            if (error instanceof ZodError)
                return NextResponse.json({
                    error: "getUserListCached -> Invalid Zod params -> " + error.message,
                });
            if (error instanceof PrismaClientKnownRequestError)
                return NextResponse.json({ error: "getUserListCached -> Prisma error -> " + error.message });
            return NextResponse.json({ error: "getUserListCached -> " + (error as Error).message });
        }
        // TODO: add logging
        return NextResponse.json({ error: "Something went wrong..." }, { status: 500 });
    }
};
