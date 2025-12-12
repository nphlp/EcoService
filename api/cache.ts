import { Prisma } from "@prisma/client/client";
import { deepPropsSort } from "@utils/string-format";

type ModelName = keyof Prisma.TypeMap["model"];
type ModelNameLowerCase = Prisma.TypeMap["meta"]["modelProps"];

type PrismaOperations = keyof Prisma.TypeMap["model"][ModelName]["operations"];

// Fetch operations
export type FetchOps = Extract<
    PrismaOperations,
    "findMany" | "findUnique" | "findFirst" | "count" | "aggregate" | "groupBy"
>;

const tag = (model: ModelNameLowerCase, operation?: FetchOps, custom?: string | number | Record<string, unknown>) => {
    let tag = `${model}`;

    if (operation) {
        tag += `-${operation}`;
    }

    if (custom && typeof custom === "object") {
        tag += `-${deepPropsSort(custom)}`;
    }

    if (custom && typeof custom !== "object") {
        tag += `-${String(custom)}`;
    }

    // TODO: add 256 hash function to reduce tag length
    // Hash method ?
    tag = tag.length > 256 ? tag.slice(0, 255) : tag;

    return tag;
};

export { tag };
