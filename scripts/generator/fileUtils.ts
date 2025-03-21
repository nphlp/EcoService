import fs from "fs";
import Handlebars from 'handlebars';
import path from "path";

/**
 * Crée un dossier s'il n'existe pas
 */
export function ensureDir(dir: string): void {
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }
}

/**
 * Génère un fichier à partir d'un template
 */
export function generateFile(templatePath: string, outputPath: string, replacements: Record<string, unknown>): void {
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

/**
 * Supprime un dossier ou un fichier
 */
export function removePath(pathToRemove: string): void {
    if (!fs.existsSync(pathToRemove)) return;
    
    if (fs.lstatSync(pathToRemove).isDirectory()) {
        fs.rmSync(pathToRemove, { recursive: true, force: true });
        console.log(`🗑️ Dossier supprimé: ${pathToRemove}`);
    } else {
        fs.unlinkSync(pathToRemove);
        console.log(`🗑️ Fichier supprimé: ${pathToRemove}`);
    }
} 