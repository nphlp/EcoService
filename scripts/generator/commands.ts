import path from "path";
import { ensureDir, removePath } from "./fileUtils";
import { generateAllRoute, generateIndexFiles } from "./indexGenerator";
import { extractModelNames } from "./modelExtractor";
import { generateModel } from "./modelGenerator";

/**
 * Génère tous les modèles
 */
export function generateAllModels(): void {
    console.log('🚀 Démarrage de la génération des fichiers...');
    
    // Extraire les noms des modèles
    const modelNames = extractModelNames();
    
    if (modelNames.length === 0) {
        console.error('❌ Aucun modèle trouvé dans le schéma Prisma');
        return;
    }
    
    console.log(`📋 Modèles trouvés: ${modelNames.join(', ')}`);
    
    // Supprimer les dossiers générés précédemment
    removePath(path.join(process.cwd(), 'services/class'));
    removePath(path.join(process.cwd(), 'services/actions'));
    removePath(path.join(process.cwd(), 'services/api'));
    removePath(path.join(process.cwd(), 'app/api/Routes.ts'));
    removePath(path.join(process.cwd(), 'app/api/[...routes]'));
    
    // Créer les dossiers nécessaires
    ensureDir(path.join(process.cwd(), 'services/class'));
    ensureDir(path.join(process.cwd(), 'services/actions'));
    ensureDir(path.join(process.cwd(), 'services/api'));
    ensureDir(path.join(process.cwd(), 'app/api/[...routes]'));
    
    // Générer les fichiers pour chaque modèle
    for (const modelName of modelNames) {
        generateModel(modelName);
    }
    
    // Générer les fichiers index
    generateIndexFiles(modelNames);
    
    // Générer le fichier [...routes]/route.ts
    generateAllRoute();
    
    console.log('✅ Génération terminée avec succès!');
}

/**
 * Liste les modèles disponibles
 */
export function listModels(): void {
    // Extraire les noms des modèles
    const modelNames = extractModelNames();
    
    if (modelNames.length === 0) {
        console.error('❌ Aucun modèle trouvé dans le schéma Prisma');
        return;
    }
    
    console.log(`📋 Modèles trouvés (${modelNames.length}):\n  - ${modelNames.join('\n  - ')}`);
    console.log('\n✅ Listage terminé avec succès!');
}

/**
 * Génère un modèle spécifique
 */
export function generateSpecificModel(modelName: string): void {
    // Vérifier si le modèle existe
    const modelNames = extractModelNames();
    if (!modelNames.includes(modelName)) {
        console.error(`❌ Modèle "${modelName}" non trouvé dans le schéma Prisma`);
        console.log(`📋 Modèles disponibles: ${modelNames.join(', ')}`);
        return;
    }
    
    console.log(`🚀 Démarrage de la génération pour le modèle ${modelName}...`);
    
    // Créer les dossiers nécessaires s'ils n'existent pas
    ensureDir(path.join(process.cwd(), 'services/class'));
    ensureDir(path.join(process.cwd(), 'services/actions'));
    ensureDir(path.join(process.cwd(), 'services/api'));
    
    // Générer les fichiers pour le modèle spécifique
    generateModel(modelName);
    
    console.log(`✅ Génération pour le modèle ${modelName} terminée avec succès!`);
} 