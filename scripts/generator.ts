#!/usr/bin/env tsx

import fs from "fs";
import Handlebars from 'handlebars';
import path from "path";
/**
 * Script de génération simplifié pour créer les fichiers backend à partir du schéma Prisma
 * 
 * Ce script:
 * 1. Extrait les noms des modèles du schéma Prisma
 * 2. Supprime les dossiers générés précédemment (sauf zod-sensitive)
 * 3. Génère les fichiers pour chaque modèle en utilisant des templates simples
 */

// Fonction pour extraire les noms des modèles du schéma Prisma
function extractModelNames(): string[] {
    const schemaPath = path.join(process.cwd(), 'prisma/schema.prisma');
    const schemaContent = fs.readFileSync(schemaPath, 'utf-8');
    
    const modelRegex = /model\s+(\w+)\s+\{/g;
    const modelNames: string[] = [];
    let match;
    
    while ((match = modelRegex.exec(schemaContent)) !== null) {
        modelNames.push(match[1]);
    }
    
    return modelNames;
}

// Fonction pour vérifier si un modèle a des relations
function hasModelRelations(modelName: string): boolean {
    const includePath = path.join(process.cwd(), `services/schemas/inputTypeSchemas/${modelName}IncludeSchema.ts`);
    return fs.existsSync(includePath);
}

// Fonction pour obtenir le nom en minuscule d'un modèle
function getLowerName(name: string): string {
    return name.charAt(0).toLowerCase() + name.slice(1);
}

// Fonction pour créer un dossier s'il n'existe pas
function ensureDir(dir: string): void {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Fonction pour générer un fichier à partir d'un template
function generateFile(templatePath: string, outputPath: string, replacements: Record<string, unknown>): void {
    // Vérifier si le fichier existe déjà
    if (fs.existsSync(outputPath)) {
        console.log(`⏩ Fichier existant, ignoré: ${outputPath}`);
        return;
    }
    
    // Vérifier si le template existe
    if (!fs.existsSync(templatePath)) {
        console.error(`❌ Template non trouvé: ${templatePath}`);
        return;
    }
    
    // Lire le template
    const templateContent = fs.readFileSync(templatePath, 'utf-8');
    
    // Compiler le template avec Handlebars
    const template = Handlebars.compile(templateContent);
    
    // Appliquer les remplacements avec Handlebars
    const content = template(replacements);
    
    // Créer le dossier si nécessaire
    ensureDir(path.dirname(outputPath));
    
    // Écrire le fichier généré
    fs.writeFileSync(outputPath, content);
    
    console.log(`✅ Fichier généré: ${outputPath}`);
}

// Fonction pour supprimer un dossier ou un fichier
function removePath(pathToRemove: string): void {
    if (!fs.existsSync(pathToRemove)) return;
    
    if (fs.lstatSync(pathToRemove).isDirectory()) {
        fs.rmSync(pathToRemove, { recursive: true, force: true });
        console.log(`🗑️ Dossier supprimé: ${pathToRemove}`);
    } else {
        fs.unlinkSync(pathToRemove);
        console.log(`🗑️ Fichier supprimé: ${pathToRemove}`);
    }
}

// Fonction pour générer un modèle spécifique
function generateModel(modelName: string): void {
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

// Fonction pour générer les fichiers index
function generateIndexFiles(modelNames: string[]): void {
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

// Fonction pour générer le fichier [...routes]/route.ts
function generateAllRoute(): void {
    console.log('📝 Génération du fichier [...routes]/route.ts...');
    
    // Créer le dossier si nécessaire
    ensureDir(path.join(process.cwd(), 'app/api/[...routes]'));
    
    // Générer le fichier route.ts
    generateFile(
        path.join(process.cwd(), 'templates/app/api/[...routes]/route.hbs'),
        path.join(process.cwd(), 'app/api/[...routes]/route.ts'),
        {}
    );
    
    console.log('✅ Génération du fichier [...routes]/route.ts terminée avec succès!');
}

// Fonction pour générer tous les modèles
function generateAllModels(): void {
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

// Fonction pour lister les modèles
function listModels(): void {
    // Extraire les noms des modèles
    const modelNames = extractModelNames();
    
    if (modelNames.length === 0) {
        console.error('❌ Aucun modèle trouvé dans le schéma Prisma');
        return;
    }
    
    console.log(`📋 Modèles trouvés (${modelNames.length}):\n  - ${modelNames.join('\n  - ')}`);
    console.log('\n✅ Listage terminé avec succès!');
}

function main(): void {
    const args = process.argv.slice(2);
    const command = args[0];
    const modelName = args[1];

    if (command === "list") {
        listModels();
    } else if (command === "model" && modelName) {
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
    } else {
        generateAllModels();
    }
}

main();