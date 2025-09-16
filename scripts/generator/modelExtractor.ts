import { Prisma } from "@prisma/client";

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

/**
 * Récupère la liste des modèles disponibles dans le Prisma Client
 */
export const getModelsInfo = (): SchemaInfo => {
    const prismaClientModels = Prisma.dmmf.datamodel.models;

    const value = prismaClientModels
        .map((model) => {
            const fieldsObjectIncludingRelations = model.fields.filter(({ relationName }) => {
                return typeof relationName === "string" && relationName.length > 0;
            });

            const relationsPerModels = fieldsObjectIncludingRelations.map((f) => f.name).sort();

            return {
                [model.name]: {
                    fields: model.fields.map((f) => f.name).filter((f) => !relationsPerModels.includes(f)),
                    relations: relationsPerModels,
                },
            };
        })
        .sort();

    const modelsWithRelations: ModelRelations = Object.fromEntries(
        value
            .map((item) => {
                const [key, val] = Object.entries(item)[0];
                return [key, val];
            })
            .sort(),
    );

    return {
        models: Object.keys(modelsWithRelations),
        schema: modelsWithRelations,
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
