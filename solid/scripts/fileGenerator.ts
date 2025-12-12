import path from "path";
import { generateFile } from "./fileUtils";
import { FileTemplate, indexTemplates, templates } from "./mapping";
import { getLowerName, hasModelRelations } from "./modelExtractor";

/**
 * Générateur des fichiers à partir des templates
 *
 * Ce module implémente la logique de génération des fichiers en:
 * - Traitant les variables dans les chemins des templates
 * - Générant les fichiers spécifiques à chaque modèle
 * - Générant les fichiers d'index et de configuration globale
 */

/**
 * Traite un template en remplaçant les variables dans le chemin de sortie
 *
 * @param template Le template à traiter
 * @param replacements Dictionnaire des valeurs de remplacement
 * @returns Un nouveau template avec les variables remplacées dans le chemin de sortie
 */
const processTemplate = (template: FileTemplate, replacements: Record<string, unknown>): FileTemplate => {
    let output = template.output;

    // Remplacer les variables dans le chemin de sortie
    for (const [key, value] of Object.entries(replacements)) {
        if (typeof value === "string") {
            output = output.replace(new RegExp(`{{${key}}}`, "g"), value);
        }
    }

    return {
        input: template.input,
        output: output,
    };
};

/**
 * Génère tous les fichiers spécifiques à un modèle
 *
 * Pour chaque modèle, génère:
 * - La classe de service
 * - Les actions CRUD
 * - Les endpoints API
 *
 * @param modelName Nom du modèle pour lequel générer les fichiers
 */
export const generateModelFiles = (modelName: string): void => {
    const lowerName = getLowerName(modelName);
    const hasRelations = hasModelRelations(modelName);

    // Préparer les remplacements de variables pour les templates
    const replacements = {
        modelName, // Nom original (ex: User)
        modelNameLower: lowerName, // Nom en camelCase (ex: user)
        hasRelations, // Indique si le modèle a des relations
    };

    // Générer chaque fichier défini dans les templates
    for (const template of templates) {
        // Traiter les variables dans le chemin de sortie
        const processedTemplate = processTemplate(template, replacements);

        // Générer le fichier
        generateFile(
            path.join(process.cwd(), processedTemplate.input),
            path.join(process.cwd(), processedTemplate.output),
            replacements,
        );
    }
};

/**
 * Génère les fichiers index et de configuration globale
 *
 * Crée les fichiers qui agrègent tous les modèles:
 * - Index d'export pour faciliter les imports
 * - Configuration des routes API
 *
 * @param modelNames Liste des noms de tous les modèles
 */
export const generateIndexFiles = (modelNames: string[]): void => {
    // Préparer les données enrichies pour tous les modèles
    const models = modelNames.map((name) => ({
        name, // Nom original du modèle
        nameLower: getLowerName(name), // Version camelCase du nom
        hasRelations: hasModelRelations(name), // Indique si le modèle a des relations
    }));

    // Données à injecter dans les templates
    const replacements = { models };

    // Générer chaque fichier index
    for (const template of indexTemplates) {
        generateFile(path.join(process.cwd(), template.input), path.join(process.cwd(), template.output), replacements);
    }
};
