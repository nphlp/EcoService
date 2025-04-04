import fs from "fs";
import path from "path";

/**
 * Analyse du schéma Prisma pour extraire les informations des modèles
 *
 * Ce module fournit des utilitaires pour:
 * - Extraire les noms des modèles définis dans schema.prisma
 * - Déterminer si un modèle possède des relations
 * - Formater les noms de modèles selon différentes conventions
 */

/**
 * Extrait la liste des noms de modèles à partir du schéma Prisma
 *
 * Analyse le fichier schema.prisma pour identifier toutes les déclarations
 * de modèle et en extraire les noms.
 *
 * @returns Liste des noms de modèles trouvés dans le schéma
 */
export const extractModelNames = (): string[] => {
    const schemaPath = path.join(process.cwd(), "prisma/schema.prisma");
    const schemaContent = fs.readFileSync(schemaPath, "utf-8");

    const modelRegex = /model\s+(\w+)\s+\{/g;
    const modelNames: string[] = [];

    const matches = schemaContent.matchAll(modelRegex);

    for (const match of matches) {
        modelNames.push(match[1]);
    }

    return modelNames;
};

/**
 * Détermine si un modèle a des relations avec d'autres modèles
 *
 * Vérifie l'existence d'un fichier de schéma d'inclusion spécifique au modèle,
 * qui est généralement créé uniquement pour les modèles ayant des relations.
 *
 * @param modelName Nom du modèle à vérifier
 * @returns true si le modèle a des relations, false sinon
 */
export const hasModelRelations = (modelName: string): boolean => {
    const includePath = path.join(process.cwd(), `services/schemas/inputTypeSchemas/${modelName}IncludeSchema.ts`);
    return fs.existsSync(includePath);
};

/**
 * Convertit un nom de modèle en version camelCase
 *
 * Transforme le premier caractère du nom en minuscule, tout en préservant
 * la casse du reste du nom. Exemple: 'User' -> 'user'
 *
 * @param name Nom du modèle à convertir
 * @returns Version camelCase du nom
 */
export const getLowerName = (name: string): string => {
    return name.charAt(0).toLowerCase() + name.slice(1);
};
