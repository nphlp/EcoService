import * as fs from "fs";
import * as path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

type ModelRelations = {
    [modelName: string]: {
        fields: string[];
        relations: string[];
    };
};

type SchemaInfo = {
    models: string[];
    schema: ModelRelations;
};

type RuntimeField = {
    name: string;
    kind: "scalar" | "object" | "enum";
    type: string;
    relationName?: string;
};

type RuntimeModel = {
    fields: RuntimeField[];
    dbName: string | null;
};

type RuntimeDataModel = {
    models: Record<string, RuntimeModel>;
    enums: Record<string, unknown>;
    types: Record<string, unknown>;
};

/**
 * Parse le runtimeDataModel depuis le fichier class.ts généré par Prisma
 */
const getRuntimeDataModel = (): RuntimeDataModel => {
    const classFilePath = path.resolve(__dirname, "../../prisma/client/internal/class.ts");
    const classContent = fs.readFileSync(classFilePath, "utf-8");

    const match = classContent.match(/config\.runtimeDataModel = JSON\.parse\("(.+?)"\)/);
    if (!match) {
        throw new Error("Could not find runtimeDataModel in Prisma client class.ts");
    }

    // Désérialiser le JSON échappé
    const jsonStr = match[1].replace(/\\"/g, '"').replace(/\\\\/g, "\\");
    return JSON.parse(jsonStr) as RuntimeDataModel;
};

/**
 * Récupère la liste des modèles disponibles dans le Prisma Client
 */
export const getModelsInfo = (): SchemaInfo => {
    const runtimeDataModel = getRuntimeDataModel();

    const modelsWithRelations: ModelRelations = {};

    for (const [modelName, model] of Object.entries(runtimeDataModel.models)) {
        const relations = model.fields
            .filter((f) => f.kind === "object" && f.relationName)
            .map((f) => f.name)
            .sort();

        const fields = model.fields.filter((f) => f.kind !== "object" || !f.relationName).map((f) => f.name);

        modelsWithRelations[modelName] = {
            fields,
            relations,
        };
    }

    // Trier par nom de modèle
    const sortedModels = Object.keys(modelsWithRelations).sort();
    const sortedSchema: ModelRelations = {};
    for (const modelName of sortedModels) {
        sortedSchema[modelName] = modelsWithRelations[modelName];
    }

    return {
        models: sortedModels,
        schema: sortedSchema,
    };
};

/**
 * Check si un modèle a des relations avec d'autres modèles
 */
export const hasModelRelations = (modelName: string): boolean => {
    const { schema } = getModelsInfo();
    return schema[modelName].relations.length > 0;
};

/**
 * Convertit un nom de modèle PascalCase en version camelCase
 */
export const getLowerName = (name: string): string => {
    return name.charAt(0).toLowerCase() + name.slice(1);
};
