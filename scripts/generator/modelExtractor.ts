import fs from "fs";
import path from "path";

/**
 * Extrait les noms des modèles du schéma Prisma
 */
export function extractModelNames(): string[] {
    const schemaPath = path.join(process.cwd(), 'prisma/schema.prisma');
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
    
    const modelRegex = /model\s+(\w+)\s+\{/g;
    const modelNames: string[] = [];

    const matches = schemaContent.matchAll(modelRegex);

    for (const match of matches) {
        modelNames.push(match[1]);
    }

    return modelNames;
}

/**
 * Vérifie si un modèle a des relations
 */
export function hasModelRelations(modelName: string): boolean {
    const includePath = path.join(process.cwd(), `services/schemas/inputTypeSchemas/${modelName}IncludeSchema.ts`);
    return fs.existsSync(includePath);
}

/**
 * Obtient le nom en minuscule d'un modèle
 */
export function getLowerName(name: string): string {
    return name.charAt(0).toLowerCase() + name.slice(1);
} 