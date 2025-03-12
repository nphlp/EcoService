#!/usr/bin/env tsx

import fs from "fs";
import path from "path";
import Handlebars from 'handlebars';
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

// Fonction pour obtenir le nom en minuscule d'un modèle
function getLowerName(name: string): string {
    return name.charAt(0).toLowerCase() + name.slice(1);
}

// Fonction pour obtenir le nom pluriel d'un modèle
function getPluralName(name: string): string {
    const lower = getLowerName(name);
    
    // Pluriels irréguliers et cas particuliers
    const irregularPlurals: Record<string, string> = {
        'category': 'categories',
        'family': 'families',
        'person': 'people',
        'man': 'men',
        'woman': 'women',
        'child': 'children',
        'tooth': 'teeth',
        'foot': 'feet',
        'mouse': 'mice',
        'goose': 'geese',
        'datum': 'data',
        'medium': 'media',
        'analysis': 'analyses',
        'diagnosis': 'diagnoses',
        'criterion': 'criteria',
        'phenomenon': 'phenomena'
    };
    
    // Vérifier si c'est un pluriel irrégulier
    if (irregularPlurals[lower]) {
        return irregularPlurals[lower];
    }
    
    // Règles de pluralisation régulières
    if (lower.endsWith('y') && !['ay', 'ey', 'iy', 'oy', 'uy'].some(vowel => lower.endsWith(vowel))) {
        return lower.slice(0, -1) + 'ies';
    } else if (lower.endsWith('s') || lower.endsWith('x') || lower.endsWith('z') || 
               lower.endsWith('ch') || lower.endsWith('sh')) {
        return lower + 'es';
    } else if (lower.endsWith('fe')) {
        return lower.slice(0, -2) + 'ves';
    } else if (lower.endsWith('f')) {
        return lower.slice(0, -1) + 'ves';
    } else {
        return lower + 's';
    }
}

// Fonction pour créer un dossier s'il n'existe pas
function ensureDir(dir: string): void {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

// Fonction pour générer un fichier à partir d'un template
function generateFile(templatePath: string, outputPath: string, replacements: Record<string, string | boolean>): void {
    // Vérifier si le fichier existe déjà
    if (fs.existsSync(outputPath)) {
        console.log(`⏩ Fichier existant, ignoré: ${outputPath}`);
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

// Fonction pour générer un fichier zod-sensitive s'il n'existe pas
function generateZodSensitiveFile(modelName: string): void {
    const outputPath = path.join(process.cwd(), `actions/zod-sensitive/${modelName}.ts`);
    
    // Ne pas écraser les fichiers zod-sensitive existants
    if (fs.existsSync(outputPath)) {
        console.log(`⏩ Fichier zod-sensitive existant, ignoré: ${outputPath}`);
        return;
    }
    
    // Utiliser le template base.hbs pour générer le fichier
    const templatePath = path.join(process.cwd(), 'templates/actions/zod-sensitive/base.hbs');
    
    // Remplacements pour le template
    const replacements = {
        'modelName': modelName,
        'modelNameLower': getLowerName(modelName)
    };
    
    // Générer le fichier à partir du template
    generateFile(templatePath, outputPath, replacements);
}

// Fonction pour vérifier si un modèle a des relations
function hasRelations(modelName: string): boolean {
    const zodGeneratedPath = path.join(process.cwd(), `actions/zod-generated/${getLowerName(modelName)}.ts`);
    
    if (!fs.existsSync(zodGeneratedPath)) {
        console.log(`⚠️ Fichier zod-generated non trouvé pour ${modelName}, supposant qu'il n'a pas de relations`);
        return false;
    }
    
    const fileContent = fs.readFileSync(zodGeneratedPath, 'utf-8');
    
    // Vérifie si le fichier contient une interface CompleteModel
    return fileContent.includes(`export interface Complete${modelName}`);
}

// Fonction pour générer un modèle spécifique
function generateModel(modelName: string): void {
    console.log(`📝 Génération des fichiers pour ${modelName}...`);
    
    const lowerName = getLowerName(modelName);
    const pluralName = getPluralName(modelName);
    const modelHasRelations = hasRelations(modelName);
    
    // Générer le fichier zod-sensitive s'il n'existe pas
    generateZodSensitiveFile(modelName);
    
    // Supprimer les fichiers existants pour ce modèle
    removePath(path.join(process.cwd(), `actions/database/${modelName}.ts`));
    removePath(path.join(process.cwd(), `actions/types/${modelName}.ts`));
    removePath(path.join(process.cwd(), `actions/zod/${modelName}.ts`));
    removePath(path.join(process.cwd(), `app/api/${pluralName}`));
    
    // Générer les fichiers à partir des templates
    const templates = [
        {
            template: 'templates/actions/types/base.hbs',
            output: `actions/types/${modelName}.ts`
        },
        {
            template: 'templates/actions/zod/base.hbs',
            output: `actions/zod/${modelName}.ts`
        },
        {
            template: 'templates/actions/database/base.hbs',
            output: `actions/database/${modelName}.ts`
        },
        {
            template: 'templates/app/api/_template/route.hbs',
            output: `app/api/${pluralName}/route.ts`
        },
        {
            template: 'templates/app/api/_template/unique/route.hbs',
            output: `app/api/${pluralName}/unique/route.ts`
        },
        {
            template: 'templates/app/api/_template/count/route.hbs',
            output: `app/api/${pluralName}/count/route.ts`
        }
    ];
    
    // Créer les dossiers nécessaires
    ensureDir(path.join(process.cwd(), `app/api/${pluralName}/unique`));
    ensureDir(path.join(process.cwd(), `app/api/${pluralName}/count`));
    
    // Générer chaque fichier
    for (const { template, output } of templates) {
        const outputPath = path.join(process.cwd(), output);
        
        // Remplacements pour le template
        const replacements = {
            'modelName': modelName,
            'modelNameLower': lowerName,
            'namePlural': pluralName,
            'hasRelations': modelHasRelations
        };
        
        // Générer le fichier à partir du template
        generateFile(template, outputPath, replacements);
    }
    
    console.log(`✅ Génération pour ${modelName} terminée avec succès!`);
}

// Fonction pour remplacer .nullish() par .nullable() dans les fichiers générés par zod-prisma
function fixNullishInZodGenerated(): void {
    console.log('🔧 Correction des types nullish dans les fichiers générés par zod-prisma...');
    
    const zodGeneratedDir = path.join(process.cwd(), 'actions/zod-generated');
    
    if (!fs.existsSync(zodGeneratedDir)) {
        console.error(`❌ Le répertoire ${zodGeneratedDir} n'existe pas.`);
        return;
    }
    
    // Lire tous les fichiers du répertoire
    const files = fs.readdirSync(zodGeneratedDir);
    
    let totalModified = 0;
    
    for (const file of files) {
        if (!file.endsWith('.ts')) continue;
        
        const filePath = path.join(zodGeneratedDir, file);
        let content = fs.readFileSync(filePath, 'utf-8');
        
        // Vérifier si le fichier contient des motifs à remplacer
        if (content.includes('.nullish()')) {
            console.log(`🔍 Motif '.nullish()' trouvé dans ${file}`);
            
            // Remplacer .nullish() par .nullable()
            const originalContent = content;
            content = content.replace(/\.nullish\(\)/g, '.nullable()');
            
            // Vérifier si des modifications ont été apportées
            if (content !== originalContent) {
                fs.writeFileSync(filePath, content);
                console.log(`✅ Modifications appliquées à ${file}`);
                totalModified++;
            } else {
                console.log(`⚠️ Motif trouvé mais aucune modification appliquée à ${file}`);
            }
        }
    }
    
    console.log(`🔧 ${totalModified} fichiers modifiés sur ${files.length} fichiers traités.`);
}

function makeRelationsOptional(): void {
    const zodGeneratedDir = path.join(process.cwd(), 'actions/zod-generated');
    const files = fs.readdirSync(zodGeneratedDir);

    let modifiedCount = 0;

    files.forEach(file => {
        if (!file.endsWith('.ts')) return;

        const filePath = path.join(zodGeneratedDir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Étape 1: Corriger les ?? dans l'interface CompleteXXX
        const doubleOptionalRegex = /(\s+)(\w+)\?\?:/g;
        const contentWithFixedDoubleOptional = content.replace(doubleOptionalRegex, '$1$2?:');
        
        if (content !== contentWithFixedDoubleOptional) {
            content = contentWithFixedDoubleOptional;
            modified = true;
            console.log(`Fixed double optional in ${file}`);
        }

        // Étape 2: Corriger les .optional().array().optional() dans le modèle RelatedXXXModel
        const doubleOptionalArrayRegex = /(\w+): Related(\w+)Model\.optional\(\)\.array\(\)\.optional\(\)/g;
        const contentWithFixedDoubleOptionalArray = content.replace(doubleOptionalArrayRegex, '$1: Related$2Model.array().optional()');
        
        if (content !== contentWithFixedDoubleOptionalArray) {
            content = contentWithFixedDoubleOptionalArray;
            modified = true;
            console.log(`Fixed double optional array in ${file}`);
        }

        // Étape 3: Corriger les .optional().optional() dans le modèle RelatedXXXModel
        const doubleOptionalModelRegex = /(\w+): Related(\w+)Model\.optional\(\)\.optional\(\)/g;
        const contentWithFixedDoubleOptionalModel = content.replace(doubleOptionalModelRegex, '$1: Related$2Model.optional()');
        
        if (content !== contentWithFixedDoubleOptionalModel) {
            content = contentWithFixedDoubleOptionalModel;
            modified = true;
            console.log(`Fixed double optional model in ${file}`);
        }

        // Étape 4: Ajouter .optional() aux relations qui n'en ont pas dans le modèle RelatedXXXModel
        const modelRegex = /export const Related\w+Model[^{]*{([\s\S]*?)}/;
        const modelMatch = content.match(modelRegex);
        
        if (modelMatch) {
            const modelContent = modelMatch[1];
            let modifiedModelContent = modelContent;
            
            // Pour les relations de type array sans .optional()
            modifiedModelContent = modifiedModelContent.replace(
                /(\s+)(\w+): Related(\w+)Model\.array\(\)(?!\.optional\(\))/g,
                '$1$2: Related$3Model.array().optional()'
            );
            
            // Pour les relations de type objet sans .optional()
            modifiedModelContent = modifiedModelContent.replace(
                /(\s+)(\w+): Related(\w+)Model(?!\.optional\(\))(?!\.array\(\))/g,
                '$1$2: Related$3Model.optional()'
            );
            
            if (modelContent !== modifiedModelContent) {
                content = content.replace(modelContent, modifiedModelContent);
                modified = true;
                console.log(`Added optional to relations in ${file}`);
            }
        }

        // Étape 5: Ajouter ? aux relations qui n'en ont pas dans l'interface CompleteXXX
        const interfaceRegex = /export interface Complete\w+[^{]*{([\s\S]*?)}/;
        const interfaceMatch = content.match(interfaceRegex);
        
        if (interfaceMatch) {
            const interfaceContent = interfaceMatch[1];
            const modifiedInterfaceContent = interfaceContent.replace(
                /(\s+)(\w+)(?!\?):(\s+)/g,
                '$1$2?:$3'
            );
            
            if (interfaceContent !== modifiedInterfaceContent) {
                content = content.replace(interfaceContent, modifiedInterfaceContent);
                modified = true;
                console.log(`Added optional to interface in ${file}`);
            }
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            modifiedCount++;
            console.log(`Made relations optional in ${file}`);
        }
    });

    console.log(`Made relations optional in ${modifiedCount} files`);
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
    removePath(path.join(process.cwd(), 'actions/database'));
    removePath(path.join(process.cwd(), 'actions/types'));
    removePath(path.join(process.cwd(), 'actions/zod'));
    removePath(path.join(process.cwd(), 'app/api/Routes.ts'));
    
    // Créer les dossiers nécessaires
    ensureDir(path.join(process.cwd(), 'actions/database'));
    ensureDir(path.join(process.cwd(), 'actions/types'));
    ensureDir(path.join(process.cwd(), 'actions/zod'));
    ensureDir(path.join(process.cwd(), 'actions/zod-sensitive'));
    
    // Générer les fichiers pour chaque modèle
    for (const modelName of modelNames) {
        generateModel(modelName);
    }
    
    // Générer le fichier Routes.ts
    generateRoutesFile(modelNames);
    
    // Corriger les types nullish dans les fichiers générés par zod-prisma
    fixNullishInZodGenerated();

    // Make relations optional in zod-generated files
    makeRelationsOptional();
    
    console.log('✅ Génération terminée avec succès!');
}

// Fonction pour générer le fichier Routes.ts
function generateRoutesFile(modelNames: string[]): void {
    console.log('📝 Génération du fichier Routes.ts...');
    
    // Préparer les données pour le template
    const models = modelNames.map(name => ({
        name,
        nameLower: getLowerName(name),
        namePlural: getPluralName(getLowerName(name))
    }));
    
    // Lire le template
    const templatePath = path.join(process.cwd(), 'templates/app/api/Routes.hbs');
    const template = fs.readFileSync(templatePath, 'utf-8');
    
    // Extraire les parties du template
    const headerMatch = template.match(/^([\s\S]*?){{#each models}}/);
    const header = headerMatch ? headerMatch[1] : '';
    
    const importBlockMatch = template.match(/{{#each models}}([\s\S]*?){{\/each}}\s*\n\s*export/);
    const importTemplate = importBlockMatch ? importBlockMatch[1] : '';
    
    const routeBlockMatch = template.match(/export type Routes = {\s*{{#each models}}([\s\S]*?){{\/each}}\s*};/);
    const routeTemplate = routeBlockMatch ? routeBlockMatch[1] : '';
    
    // Générer le contenu
    let content = header;
    
    // Générer les imports
    for (const model of models) {
        const importBlock = importTemplate
            .replace(/{{this\.name}}/g, model.name)
            .replace(/{{this\.namePlural}}/g, model.namePlural);
        content += importBlock;
    }
    
    content += 'export type Routes = {\n';
    
    // Générer les routes
    for (let i = 0; i < models.length; i++) {
        const model = models[i];
        let routeBlock = routeTemplate
            .replace(/{{this\.name}}/g, model.name)
            .replace(/{{this\.namePlural}}/g, model.namePlural);
        
        // Gérer le cas spécial {{#unless @last}}
        if (i < models.length - 1) {
            routeBlock = routeBlock.replace(/{{#unless @last}}([\s\S]*?){{\/unless}}/g, '$1');
        } else {
            routeBlock = routeBlock.replace(/{{#unless @last}}([\s\S]*?){{\/unless}}/g, '');
        }
        
        content += routeBlock;
    }
    
    content += '};';
    
    // Écrire le fichier
    const outputPath = path.join(process.cwd(), 'app/api/Routes.ts');
    ensureDir(path.dirname(outputPath));
    fs.writeFileSync(outputPath, content);
    
    console.log(`✅ Fichier Routes.ts généré: ${outputPath}`);
}

// Fonction pour lister les modèles
function listModels(): void {
    console.log('📋 Liste des modèles dans le schéma Prisma:');
    
    // Extraire les noms des modèles
    const modelNames = extractModelNames();
    
    if (modelNames.length === 0) {
        console.error('❌ Aucun modèle trouvé dans le schéma Prisma');
        return;
    }
    
    console.log(`\nModèles trouvés (${modelNames.length}): ${modelNames.join(', ')}`);
    console.log('\n✅ Listage terminé avec succès!');
}

function main(): void {
    const args = process.argv.slice(2);
    const command = args[0];

    if (command === "model") {
        const modelName = args[1];
        if (!modelName) {
            console.error("Please provide a model name");
            process.exit(1);
        }
        generateModel(modelName);
        fixNullishInZodGenerated();
        makeRelationsOptional();
    } else if (command === "list") {
        listModels();
    } else if (command === "fix-nullish") {
        fixNullishInZodGenerated();
    } else if (command === "make-relations-optional") {
        makeRelationsOptional();
    } else {
        generateAllModels();
    }
}

main();