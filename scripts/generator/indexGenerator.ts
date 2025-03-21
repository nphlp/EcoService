import path from "path";
import { generateFile } from "./fileUtils";
import { getLowerName, hasModelRelations } from "./modelExtractor";

/**
 * Génère les fichiers index pour les services et l'API
 */
export function generateIndexFiles(modelNames: string[]): void {
    console.log('📝 Génération des fichiers index...');
    
    // Préparer les données pour les templates
    const models = modelNames.map(name => ({
        name,
        nameLower: getLowerName(name),
        hasRelations: hasModelRelations(name)
    }));
    
    // Générer le fichier index.ts pour services/class
    generateFile(
        path.join(process.cwd(), 'templates/services/class/index.hbs'),
        path.join(process.cwd(), 'services/class/index.ts'),
        { models }
    );
    
    // Générer le fichier index.ts pour services/actions
    generateFile(
        path.join(process.cwd(), 'templates/services/actions/index.hbs'),
        path.join(process.cwd(), 'services/actions/index.ts'),
        { models }
    );
    
    // Générer le fichier index.ts pour services/api
    generateFile(
        path.join(process.cwd(), 'templates/services/api/index.hbs'),
        path.join(process.cwd(), 'services/api/index.ts'),
        { models }
    );
    
    // Générer le fichier index.ts principal pour services
    generateFile(
        path.join(process.cwd(), 'templates/services/index.hbs'),
        path.join(process.cwd(), 'services/index.ts'),
        { models }
    );
    
    // Générer le fichier Routes.ts
    generateFile(
        path.join(process.cwd(), 'templates/app/api/Routes.hbs'),
        path.join(process.cwd(), 'app/api/Routes.ts'),
        { models }
    );
    
    console.log('✅ Génération des fichiers index terminée avec succès!');
}

/**
 * Génère le fichier [...routes]/route.ts
 */
export function generateAllRoute(): void {
    console.log('📝 Génération du fichier [...routes]/route.ts...');
    
    // Générer le fichier route.ts
    generateFile(
        path.join(process.cwd(), 'templates/app/api/[...routes]/route.hbs'),
        path.join(process.cwd(), 'app/api/[...routes]/route.ts'),
        {}
    );
    
    console.log('✅ Génération du fichier [...routes]/route.ts terminée avec succès!');
} 