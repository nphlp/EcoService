import path from "path";
import { ensureDir, generateFile } from "./fileUtils";
import { getLowerName, hasModelRelations } from "./modelExtractor";

/**
 * Génère un modèle spécifique
 */
export function generateModel(modelName: string): void {
    console.log(`📝 Génération des fichiers pour ${modelName}...`);
    
    const lowerName = getLowerName(modelName);
    const hasRelations = hasModelRelations(modelName);
    
    // Remplacements pour les templates
    const replacements = {
        modelName,
        modelNameLower: lowerName,
        hasRelations
    };
    
    // Générer les fichiers de classe
    generateFile(
        path.join(process.cwd(), 'templates/services/class/{{model}}Class.hbs'),
        path.join(process.cwd(), `services/class/${modelName}Class.ts`),
        replacements
    );
    
    // Générer les fichiers d'actions
    generateFile(
        path.join(process.cwd(), 'templates/services/actions/{{model}}Action.hbs'),
        path.join(process.cwd(), `services/actions/${modelName}Action.ts`),
        replacements
    );
    
    // Générer les fichiers API
    // Créer le dossier nécessaire
    ensureDir(path.join(process.cwd(), `services/api/${lowerName}`));
    
    // Générer le fichier index.ts
    generateFile(
        path.join(process.cwd(), 'templates/services/api/{{model}}/index.hbs'),
        path.join(process.cwd(), `services/api/${lowerName}/index.ts`),
        replacements
    );
    
    // Générer le fichier list.ts principal
    generateFile(
        path.join(process.cwd(), 'templates/services/api/{{model}}/list.hbs'),
        path.join(process.cwd(), `services/api/${lowerName}/list.ts`),
        replacements
    );
    
    // Générer le fichier unique.ts
    generateFile(
        path.join(process.cwd(), 'templates/services/api/{{model}}/unique.hbs'),
        path.join(process.cwd(), `services/api/${lowerName}/unique.ts`),
        replacements
    );
    
    // Générer le fichier count.ts
    generateFile(
        path.join(process.cwd(), 'templates/services/api/{{model}}/count.hbs'),
        path.join(process.cwd(), `services/api/${lowerName}/count.ts`),
        replacements
    );
    
    console.log(`✅ Génération pour ${modelName} terminée avec succès!`);
} 